-- Tadris Bartar: initial Supabase schema (grade 2 pilot; extensible to grades 1-6)
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null check (role in ('student','teacher','parent','admin')),
  grade smallint check (grade between 1 and 6),
  parent_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade default auth.uid(),
  name text not null,
  grade smallint not null check (grade between 1 and 6),
  join_code text not null unique default upper(substr(encode(gen_random_bytes(8),'hex'),1,8)),
  created_at timestamptz not null default now()
);

create table if not exists public.class_members (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade default auth.uid(),
  joined_at timestamptz not null default now(),
  unique(class_id, student_id)
);

create table if not exists public.student_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade default auth.uid(),
  grade smallint not null check (grade between 1 and 6),
  subject text not null,
  skill_code text not null,
  attempts integer not null default 0 check (attempts >= 0),
  correct integer not null default 0 check (correct >= 0 and correct <= attempts),
  mastery numeric(5,2) not null default 0 check (mastery between 0 and 100),
  last_activity_at timestamptz not null default now(),
  payload jsonb not null default '{}'::jsonb,
  unique(student_id, grade, subject, skill_code)
);

create table if not exists public.learning_events (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade default auth.uid(),
  grade smallint not null check (grade between 1 and 6),
  subject text not null,
  skill_code text not null,
  event_type text not null check (event_type in ('answer','lesson_view','practice_complete','assessment')),
  is_correct boolean,
  duration_ms integer check (duration_ms is null or duration_ms >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  teacher_id uuid not null references public.profiles(id) on delete cascade default auth.uid(),
  title text not null,
  grade smallint not null check (grade between 1 and 6),
  content jsonb not null default '{}'::jsonb,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id, full_name, role, grade)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''),
          case when new.raw_user_meta_data->>'role' in ('student','teacher','parent') then new.raw_user_meta_data->>'role' else 'student' end,
          nullif(new.raw_user_meta_data->>'grade','')::smallint)
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
alter table public.student_progress enable row level security;
alter table public.learning_events enable row level security;
alter table public.assignments enable row level security;

create policy "profile self read" on public.profiles for select using (id=auth.uid() or parent_id=auth.uid());
create policy "profile self update" on public.profiles for update using (id=auth.uid()) with check (id=auth.uid());
create policy "class teacher manages" on public.classes for all using (teacher_id=auth.uid()) with check (teacher_id=auth.uid());
create policy "class visible to members" on public.classes for select using (exists(select 1 from public.class_members m where m.class_id=classes.id and m.student_id=auth.uid()));
create policy "member self read" on public.class_members for select using (student_id=auth.uid() or exists(select 1 from public.classes c where c.id=class_id and c.teacher_id=auth.uid()));
create policy "member self join" on public.class_members for insert with check (student_id=auth.uid());
create policy "progress owner all" on public.student_progress for all using (student_id=auth.uid()) with check (student_id=auth.uid());
create policy "learning event owner all" on public.learning_events for all using (student_id=auth.uid()) with check (student_id=auth.uid());
create policy "assignment teacher manages" on public.assignments for all using (teacher_id=auth.uid()) with check (teacher_id=auth.uid());
create policy "assignment visible to class" on public.assignments for select using (exists(select 1 from public.class_members m where m.class_id=assignments.class_id and m.student_id=auth.uid()));

-- Students join by code without granting public read access to the classes table.
create or replace function public.join_class_by_code(p_code text)
returns uuid language plpgsql security definer set search_path=public as $$
declare v_class_id uuid; v_grade smallint; v_role text;
begin
  select role into v_role from public.profiles where id=auth.uid();
  if v_role <> 'student' then raise exception 'فقط حساب دانش‌آموز می‌تواند عضو کلاس شود.'; end if;
  select id, grade into v_class_id, v_grade from public.classes
    where join_code=upper(trim(p_code));
  if v_class_id is null then raise exception 'کد کلاس معتبر نیست.'; end if;
  insert into public.class_members(class_id, student_id) values(v_class_id, auth.uid())
    on conflict(class_id, student_id) do nothing;
  return v_class_id;
end; $$;
grant execute on function public.join_class_by_code(text) to authenticated;

create index if not exists idx_progress_student on public.student_progress(student_id, last_activity_at desc);
create index if not exists idx_events_student_skill on public.learning_events(student_id, skill_code, created_at desc);
create index if not exists idx_class_members_student on public.class_members(student_id);
