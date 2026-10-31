/* Supabase adapter for Tadris Bartar. Safe offline fallback; no secrets stored here. */
(function () {
  const cfg = window.TADRIS_SUPABASE_CONFIG || {};
  const ready = () => Boolean(cfg.enabled && cfg.url && !cfg.url.includes('YOUR_PROJECT') && cfg.anonKey && !cfg.anonKey.includes('YOUR_SUPABASE')) && Boolean(window.supabase?.createClient);
  let client = null;
  function getClient() {
    if (!ready()) throw new Error('تنظیمات اتصال ابری هنوز کامل نشده است.');
    if (!client) client = window.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    });
    return client;
  }
  async function signUp({ email, password, fullName, role = 'student', grade = 2 }) {
    const c = getClient();
    const { data, error } = await c.auth.signUp({ email, password, options: { data: { full_name: fullName, role, grade } } });
    if (error) throw error;
    return data;
  }
  async function signIn({ email, password }) {
    const { data, error } = await getClient().auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }
  async function signOut() {
    const { error } = await getClient().auth.signOut(); if (error) throw error;
  }
  async function getSession() {
    const { data, error } = await getClient().auth.getSession(); if (error) throw error; return data.session;
  }
  async function saveProgress(progress) {
    const c = getClient();
    const { data: auth, error: authError } = await c.auth.getUser();
    if (authError) throw authError;
    if (!auth.user) throw new Error('برای ذخیره ابری ابتدا وارد حساب شوید.');
    const row = {
      student_id: auth.user.id,
      grade: Number(progress.grade || 2),
      subject: String(progress.subject || 'general'),
      skill_code: String(progress.skill_code || progress.stage_id || 'unmapped'),
      attempts: Number(progress.attempts || 0),
      correct: Number(progress.correct || 0),
      mastery: Math.max(0, Math.min(100, Number(progress.mastery || 0))),
      last_activity_at: new Date().toISOString(),
      payload: progress
    };
    const { data, error } = await c.from('student_progress').upsert(row, { onConflict: 'student_id,grade,subject,skill_code' }).select().single();
    if (error) throw error; return data;
  }
  async function loadMyProgress() {
    const { data, error } = await getClient().from('student_progress').select('*').order('last_activity_at', { ascending: false });
    if (error) throw error; return data;
  }
  async function createClass({ name, grade = 2 }) {
    const { data, error } = await getClient().from('classes').insert({ name, grade }).select().single();
    if (error) throw error; return data;
  }
  async function joinClass(code) {
    const { data, error } = await getClient().rpc('join_class_by_code', { p_code: code.trim().toUpperCase() });
    if (error) throw error; return { classId: data };
  }
  window.TadrisCloud = {
    isConfigured: ready, getClient, signUp, signIn, signOut, getSession,
    saveProgress, loadMyProgress, createClass, joinClass,
    status: () => ready() ? 'configured' : 'offline-unconfigured'
  };
})();
