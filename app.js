// Original application logic, isolated as a compatibility layer.

const $=id=>document.getElementById(id);
const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const W1=(()=>{
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
const EM=['⭐','🍎','🐟','🎈','🌸','🍪'];
const em=()=>EM[rnd(0,EM.length-1)];
function objs(n,loose){const e=em();if(loose)return '<div class="objs loose">'+e.repeat(n)+'</div>';let h='<div class="objs">';for(let i=0;i<n;i+=10)h+='<div class="orow">'+e.repeat(Math.min(10,n-i))+'</div>';return h+'</div>'}
function rods(t,u,sm){let h='<div class="blk'+(sm?' sm':'')+'">';for(let i=0;i<t;i++)h+='<i class="rod"></i>';if(u)h+='<div class="us">'+'<i class="unit"></i>'.repeat(u)+'</div>';return h+'</div>'}
function numOpts(res,c){const s=[res];for(const x of shuf(c)){if(s.length>=4)break;if(x>=0&&x<=99&&!s.includes(x))s.push(x)}let k=1;while(s.length<4){if(res+k<=99&&!s.includes(res+k))s.push(res+k);else if(res-k>=0&&!s.includes(res-k))s.push(res-k);k++}return shuf(s.map(v=>({h:fa(v),ok:v===res})))}
function digOpts(res,other){const s=[res];if(other!==res)s.push(other);for(const x of shuf([0,1,2,3,4,5,6,7,8,9])){if(s.length>=4)break;if(!s.includes(x))s.push(x)}return shuf(s.map(v=>({h:fa(v),ok:v===res})))}
function lab(ok,others){const seen=new Set([ok]),r=[{h:ok,ok:true}];for(const o of others){if(r.length>=4)break;if(!seen.has(o)){seen.add(o);r.push({h:o,ok:false})}}return shuf(r)}
const tu=(t,u)=>`${fa(t)} ده‌تایی و ${fa(u)} یکی`;
function tq(n,p,v){const t=Math.floor(n/10),u=n%10;const o=lab(tu(t,u),[tu(u,t),tu(t+1,u),tu(t,u<9?u+1:u-1),t>1?tu(t-1,u):tu(t+2,u),tu(t+2,u)]);
 return{p,v:v||'',o,hint:'عدد دو رقمی دارد: رقم سمت چپ دهگان (ده‌تایی) و رقم سمت راست یکان است.',x:`در ${fa(n)} رقم دهگان ${fa(t)} و رقم یکان ${fa(u)} است؛ یعنی ${tu(t,u)}.`}}
function g0(i){
 if(i===0||i===4){const n=rnd(11,29);return{p:'چند تا شکل می‌بینی؟',v:objs(n),o:numOpts(n,[n+1,n-1,n+10,n-10,n+2]),hint:'هر ردیف ۱۰ تایی است. ردیف‌های پر را ده‌تا‌ده‌تا بشمار و بقیه را یکی‌یکی اضافه کن.',x:`ده‌تا‌ده‌تا و بعد یکی‌یکی می‌شماریم: ${fa(n)} تا.`}}
 if(i===1){const n=rnd(10,98);return{p:`عدد بعد از ${fa(n)} کدام است؟`,v:'',o:numOpts(n+1,[n,n+2,n-1,n+10,n+11]),hint:'یکی به عدد اضافه کن.',x:`${fa(n)} + ۱ = ${fa(n+1)}`}}
 if(i===2){const n=rnd(11,99);return{p:`عدد قبل از ${fa(n)} کدام است؟`,v:'',o:numOpts(n-1,[n,n-2,n+1,n-10,n-11]),hint:'یکی از عدد کم کن.',x:`${fa(n)} − ۱ = ${fa(n-1)}`}}
 if(i===3){const a=rnd(10,97);return{p:'عدد گمشده کدام است؟',v:`<div class="seq"><i>${fa(a)}</i><i class="qq">؟</i><i>${fa(a+2)}</i></div>`,o:numOpts(a+1,[a,a+2,a+3,a-1,a+10]),hint:'عدد گمشده یکی بعد از اولی و یکی قبل از آخری است.',x:`${fa(a)}، ${fa(a+1)}، ${fa(a+2)}`}}
 let s=new Set();while(s.size<4)s.add(rnd(10,99));let a=[...s],ts=new Set(a.map(x=>Math.floor(x/10)));if(ts.size<4)return g0(5);const m=Math.max(...a);
 return{p:'کدام عدد از همه بزرگ‌تر است؟',v:'',o:shuf(a.map(v=>({h:fa(v),ok:v===m}))),hint:'اول دهگان‌ها را مقایسه کن؛ هر عددی دهگان بزرگ‌تری دارد، بزرگ‌تر است.',x:`${fa(m)} دهگان بزرگ‌تری دارد.`}}
function g1(i){
 const t=rnd(1,5),u=rnd(1,9),n=t*10+u;
 if(i===0)return{p:'این شکل چه عددی را نشان می‌دهد؟',v:rods(t,u),o:numOpts(n,[u*10+t,n+10,n-10,n+1,n-1]),hint:'میله‌ها ده‌تایی‌اند و مربع‌های تکی، یکی. اول میله‌ها را ده‌تا‌ده‌تا بشمار.',x:`${fa(t)} ده‌تایی = ${fa(t*10)} و ${fa(u)} یکی؛ پس ${fa(n)}.`};
 if(i===1)return tq(n,`عدد ${fa(n)} چند ده‌تایی و چند یکی دارد؟`);
 if(i===2)return{p:`${tu(t,u)} یعنی چه عددی؟`,v:'',o:numOpts(n,[u*10+t,n+10,n-10,n+1,n-1]),hint:'هر ده‌تایی ۱۰ تاست.',x:`${fa(t*10)} + ${fa(u)} = ${fa(n)}`};
 const t2=rnd(1,9);let u2=rnd(1,9);while(u2===t2)u2=rnd(1,9);const n2=t2*10+u2;
 if(i===3)return{p:`در عدد ${fa(n2)} رقم دهگان کدام است؟`,v:'',o:digOpts(t2,u2),hint:'دهگان رقم سمت چپ است.',x:`دهگان ${fa(n2)} می‌شود ${fa(t2)}.`};
 if(i===4)return{p:`در عدد ${fa(n2)} رقم یکان کدام است؟`,v:'',o:digOpts(u2,t2),hint:'یکان رقم سمت راست است.',x:`یکان ${fa(n2)} می‌شود ${fa(u2)}.`};
 const m=rnd(11,29);return tq(m,`${fa(m)} تا شکل را ده‌تا‌ده‌تا دسته کن. چند ده‌تایی و چند یکی می‌شود؟`,objs(m,true))}
function g2(i){
 if(i%2===0){const t=rnd(1,4),u=rnd(1,9),n=t*10+u;const c=[[t,u],[u,t],[t+1,u],[t,u<9?u+1:u-1],[t>1?t-1:t+2,u],[t+2,u]];const seen=new Set(),o=[];c.forEach((p,k)=>{const key=p.join();if(o.length<4&&!seen.has(key)){seen.add(key);o.push({h:rods(p[0],p[1],true),ok:k===0})}});
  return{p:`کدام شکل عدد ${fa(n)} را نشان می‌دهد؟`,v:'',o:shuf(o),hint:'میله‌های بلند ده‌تایی‌اند. تعداد میله‌ها دهگان و مربع‌های تکی یکان را نشان می‌دهند.',x:`${fa(n)} یعنی ${tu(t,u)}: ${fa(t)} میله و ${fa(u)} مربع تکی.`}}
 const n=rnd(12,69);return tq(n,`برای رسم عدد ${fa(n)} چند ده‌تایی و چند یکی لازم است؟`)}
function g3(i){
 let a,b,add=i<3,t1,u1,t2,u2;
 if(i===0){t1=rnd(1,8);u1=rnd(1,8);a=t1*10+u1;b=rnd(1,9-u1)}
 else if(i===1){a=rnd(1,6)*10;b=rnd(1,8-a/10+1)*10;if(a+b>90)b=10}
 else if(i===2){t1=rnd(1,4);t2=rnd(1,4);u1=rnd(1,5);u2=rnd(1,9-u1);a=t1*10+u1;b=t2*10+u2}
 else if(i===3){u1=rnd(2,9);t1=rnd(1,9);a=t1*10+u1;b=rnd(1,u1)}
 else if(i===4){a=rnd(2,9)*10;b=rnd(1,a/10-1)*10}
 else{t1=rnd(2,9);u1=rnd(1,9);t2=rnd(1,t1-1);u2=rnd(1,u1);a=t1*10+u1;b=t2*10+u2}
 const op=add?'+':'−',res=add?a+b:a-b,ta=Math.floor(a/10),tb=Math.floor(b/10),ua=a%10,ub=b%10,tr=Math.floor(res/10),ur=res%10;
 const wrong=add?Math.abs(a-b):a+b;
 return{p:'حاصل را پیدا کن',v:`<div class="eq">${fa(a)} ${op} ${fa(b)} = <span class="q">؟</span></div>`,o:numOpts(res,[res+10,res-10,res+1,res-1,wrong]),hint:`اول یکان‌ها را حساب کن: ${fa(ua)} ${op} ${fa(ub)}، بعد دهگان‌ها: ${fa(ta)} ${op} ${fa(tb)}.`,x:`یکان‌ها: ${fa(ua)} ${op} ${fa(ub)} = ${fa(ur)}؛ دهگان‌ها: ${fa(ta)} ${op} ${fa(tb)} = ${fa(tr)}؛ جواب ${fa(res)}.`}}
function g4(i){
 if(i<4){const d=[2,5,10,2][i],m=[3,3,2,1][i],s=d*rnd(1,d===2?6:d===5?4:3),T=[0,1,2,3].map(k=>s+k*d),res=T[m];
  return{p:'الگوی شمارش را ادامه بده؛ عدد گمشده کدام است؟',v:'<div class="seq">'+T.map((x,k)=>k===m?'<i class="qq">؟</i>':`<i>${fa(x)}</i>`).join('')+'</div>',o:numOpts(res,[res+d,res-d,res+1,res-1,res+2]),hint:`هر بار ${fa(d)} تا اضافه می‌شود.`,x:`${T.map(fa).join('، ')} (هر بار ${fa(d)} تا اضافه می‌شود)`}}
 const k=i===4?10:5,n=i===4?rnd(2,4):rnd(3,6),e=em(),res=n*k;
 return{p:`دسته‌ها را ${fa(k)}تا‌${fa(k)}تا بشمار. در مجموع چند تا شکل داریم؟`,v:'<div class="grps">'+Array(n).fill(`<div class="g">${e.repeat(k)}</div>`).join('')+'</div>',o:numOpts(res,[res+k,res-k,res+1,res-1,n+k]),hint:`هر دسته ${fa(k)} تاست: ${fa(k)}، ${fa(2*k)}، ${fa(3*k)}، …`,x:`${fa(n)} دسته ${fa(k)} تایی: `+Array.from({length:n},(_,j)=>fa((j+1)*k)).join('، ')}}
return [g0,g1,g2,g3,g4];
})();
const W2=(()=>{
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
function numOpts(res,c){const s=[res];for(const x of shuf(c)){if(s.length>=4)break;if(x>=0&&x<=99&&!s.includes(x))s.push(x)}let k=1;while(s.length<4){if(res+k<=99&&!s.includes(res+k))s.push(res+k);else if(res-k>=0&&!s.includes(res-k))s.push(res-k);k++}return shuf(s.map(v=>({h:fa(v),ok:v===res})))}
function mkq(add,mode){
 let a,b,ua,ub;
 for(;;){a=rnd(11,99);b=rnd(11,89);ua=a%10;ub=b%10;
  if(add){if(a+b>99)continue;const c=ua+ub>=10;if((mode===1&&!c)||(mode===0&&c))continue;break}
  else{if(a-b<10)continue;const br=ua<ub;if((mode===1&&!br)||(mode===0&&br))continue;break}}
 const op=add?'+':'−',res=add?a+b:a-b,ta=Math.floor(a/10),tb=Math.floor(b/10);
 const col=`<div class="col"><span></span><span>${fa(ta)}</span><span>${fa(ua)}</span><span>${op}</span><span>${fa(tb)}</span><span>${fa(ub)}</span><div class="ln"></div><span></span><span class="q">؟</span><span class="q">؟</span></div>`;
 let hint,x;
 if(add){const s=ua+ub,c=s>=10?1:0;hint=`اول یکان‌ها را جمع کن: ${fa(ua)} + ${fa(ub)}`+(c?' (اگر ۱۰ یا بیشتر شد، یک ده‌تایی به دهگان می‌رود).':'.');
  x=`یکان‌ها: ${fa(ua)} + ${fa(ub)} = ${fa(s)}`+(c?` ← ${fa(s%10)} را می‌نویسیم و ۱ ده‌تایی به دهگان می‌رود`:'')+`؛ دهگان‌ها: ${fa(ta)} + ${fa(tb)}`+(c?' + ۱':'')+` = ${fa(ta+tb+c)}؛ جواب ${fa(res)}.`}
 else{const br=ua<ub;hint=br?`${fa(ua)} از ${fa(ub)} کمتر است؛ یک ده‌تایی قرض بگیر و ۱۰ تا به یکان اضافه کن.`:`اول یکان‌ها را کم کن: ${fa(ua)} − ${fa(ub)}، بعد دهگان‌ها.`;
  x='یکان‌ها: '+(br?`${fa(ua)} از ${fa(ub)} کمتر است، قرض می‌گیریم: ${fa(ua+10)} − ${fa(ub)} = ${fa(ua+10-ub)}`:`${fa(ua)} − ${fa(ub)} = ${fa(ua-ub)}`)+`؛ دهگان‌ها: ${fa(ta)}`+(br?' − ۱':'')+` − ${fa(tb)} = ${fa(ta-(br?1:0)-tb)}؛ جواب ${fa(res)}.`}
 return{p:add?'حاصل جمع را پیدا کن':'حاصل تفریق را پیدا کن',v:col,o:numOpts(res,[res+10,res-10,res+1,res-1,add?(a-b>0?a-b:res+2):a+b]),hint,x}
}
return [i=>mkq(true,0),i=>mkq(true,1),i=>mkq(false,0),i=>mkq(false,1),i=>mkq(i%2===0,2)];
})();
const WF=(()=>{
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
function mk(ok,others){const seen=new Set([ok]),r=[{h:ok,ok:true}];for(const o of others){if(r.length>=4)break;if(!seen.has(o)){seen.add(o);r.push({h:o,ok:false})}}return shuf(r)}
function g0(i){
 const D=[
 ['مهربان',['محربان','مهرابان','مهربام'],'کلمه از «مهر» و «بان» ساخته شده است؛ حرف «ر» را فراموش نکن.'],
 ['کاغذ',['کاغز','کاقذ','کاغظ'],'حرف آخر این کلمه «ذ» است، نه «ز».'],
 ['پرندگان',['پرنده‌گان','پرنده‌کان','پرندکان'],'جمع «پرنده» می‌شود «پرندگان»؛ پیوسته و بدون فاصله.'],
 ['بانظم',['بانضم','بانزم','بانذم'],'«نظم» با «ظ» نوشته می‌شود، مثل «نظم و ترتیب».'],
 ['سپاسگزارم',['سپاسگذارم','سپاسکزارم','سباسگزارم'],'«سپاس‌گزار» با «گ» و «ز» نوشته می‌شود.'],
 ['گفت‌وگو',['گفت‌وکو','گفت‌گو','گفتوغو'],'این کلمه از «گفت» و «گو» ساخته شده است.']][i];
 return{p:'کدام کلمه درست نوشته شده است؟',v:'',o:mk(D[0],D[1]),hint:D[2],x:`شکل درست کلمه «${D[0]}» است.`}}
function g1(i){
 const w=['کلاس','فکر','گروه','بازی','شهری','کار'][i],ok='هم‌'+w;
 return{p:'کلمه‌ی ساخته‌شده را پیدا کن',v:`<div class="eq" style="direction:rtl;font-size:34px">هم + ${w} = <span class="q">؟</span></div>`,o:mk(ok,[w+'‌هم','همه‌'+w,'هم '+w]),hint:'کلمه‌ی «هم» را با نیم‌فاصله به اول کلمه می‌چسبانیم.',x:`هم + ${w} = ${ok}`}}
function g2(i){
 if(i<4){const w=['رایانه','کتابخانه','ساده','تازه'][i],ok=w+'‌ای';
  return{p:'کلمه‌ی ساخته‌شده را پیدا کن',v:`<div class="eq" style="direction:rtl;font-size:34px">${w} + ای = <span class="q">؟</span></div>`,o:mk(ok,[w+'ای',w+'ی','ای‌'+w]),hint:'«ای» یعنی «یک»؛ مثل «یک رایانه» می‌شود «رایانه‌ای».',x:`${w} + ای = ${ok}`}}
 const S2=[['دیشب ........ در آسمان می‌درخشید.','ستاره‌ای',['ستاره','ستاره‌ها','ستاره‌ی']],['مردم چند سال یک‌بار ........ برای خود انتخاب می‌کنند.','نماینده‌ای',['نماینده','نماینده‌ها','نماینده‌ی']]][i-4];
 return{p:'جمله را کامل کن',v:`<div class="poem">${S2[0].replace('........','<span class="blank"></span>')}</div>`,o:mk(S2[1],S2[2]),hint:'«ای» یعنی «یک»؛ باید بگوییم «یک ستاره» یا «یک نماینده».',x:S2[0].replace('........',S2[1])}}
function g3(i){
 const P=[
 [['من یار #','دانا و خوش بیانم'],'مهربانم',['هنرمندم','پنددانم','بی‌زبانم']],
 [['دانا و خوش #','من یار مهربانم'],'بیانم',['زیانم','زبانم','هنرمندم']],
 [['گویم سخن #','با آن‌که بی‌زبانم'],'فراوان',['مهربان','هنرمند','غافل']],
 [['گویم سخن فراوان','با آن‌که #'],'بی‌زبانم',['بی‌زیانم','خوش‌بیانم','مهربانم']],
 [['من دوستی #','با سود و بی‌زیانم'],'هنرمند',['مهربان','فراوان','غافل']],
 [['از من مباش #','من یار مهربانم'],'غافل',['دانا','فراوان','هنرمند']]][i];
 return{p:'شعر «یار مهربان» را کامل کن',v:'<div class="poem">'+P[0].map(l=>l.replace('#','<span class="blank"></span>')).join('<br>')+'</div>',o:mk(P[1],P[2]),hint:'آخر مصراع‌ها شبیه هم است: «ـانم». شعر را بلند بخوان!',x:P[0].map(l=>l.replace('#',P[1])).join(' ... ')}}
function g4(i){
 const D=[
 ['آیا همه‌ی نوشته‌های رایانه، کتاب‌ها و مجلّه‌ها برای ما مفید است؟','خیر، کتاب‌ها و مجلّه‌های ویژه‌ی سنّ خودمان را می‌خوانیم',['بله، همه‌ی آن‌ها مفیدند','فقط نوشته‌های رایانه مفیدند','هیچ کتابی مفید نیست'],'کتاب و مجلّه‌ی مناسب سنّ خودمان را انتخاب می‌کنیم.'],
 ['نام کتاب‌های مناسب را کجا پیدا می‌کنیم؟','در آخر کتاب فارسی',['روی تخته‌ی کلاس','در کیف دوستمان','در رایانه‌ی مدرسه'],'به آخر کتاب فارسی نگاه کن.'],
 ['برای انتخاب کتاب خوب، با چه کسانی مشورت می‌کنیم؟','با بزرگ‌ترها',['فقط با خودمان','با هیچ‌کس','با کوچک‌ترها'],'پس از هم‌فکری و مشورت با بزرگ‌ترها انتخاب می‌کنیم.'],
 ['کتاب خوب را مانند چه چیزی انتخاب می‌کنیم؟','دوست خوب',['لباس نو','غذای خوشمزه','اسباب‌بازی'],'کتاب خوب را هم مانند دوست خوب انتخاب می‌کنیم.'],
 ['«مونس» یعنی چه؟','همدم و دوست',['دشمن','ترسو','تنبل'],'مونس کسی است که کنارش احساس تنهایی نمی‌کنیم.'],
 ['«نشاط» یعنی چه؟','شادی',['غم','خواب','ترس'],'وقتی خوشحالیم، نشاط داریم.']][i];
 return{p:D[0],v:'',o:mk(D[1],D[2]),hint:D[3],x:'پاسخ درست: '+D[1]}}
return [g0,g1,g2,g3,g4];
})();
const KEY='adventure2-v1';
let P={name:'',prog:{},xp:0,coins:0,log:[],last:'',streak:0,set:{sfx:true,mus:true}};
try{const r=localStorage.getItem(KEY);if(r){const o=JSON.parse(r);P=Object.assign(P,o);P.set=Object.assign({sfx:true,mus:true},o.set||{});if(!Array.isArray(P.log))P.log=[]}}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}};
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
const AVS='data:image/jpeg;base64,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';
const HASHES=['ff792ed87c694aa658e33b6030cb8951cf42e76f7cf44bf216b91c3fbb5f305f','d-1229544045'];
/* ---------- bank (teacher content) ---------- */
let BANK={t:0,titles:{},stages:{}};
try{const r=localStorage.getItem('adv-bank');if(r)BANK=JSON.parse(r)}catch(e){}
BANK.titles=BANK.titles||{};BANK.stages=BANK.stages||{};
let DB=null,UID=null,TEACH=false;
function saveBank(){BANK.t=Date.now();try{localStorage.setItem('adv-bank',JSON.stringify(BANK))}catch(e){}if(DB){try{DB.doc('config/bank').set({json:JSON.stringify(BANK)}).catch(()=>{})}catch(e){}}}
async function initDb(){try{if(!window.claude||!claude.use)return;DB=await claude.use('db');const u=await claude.use('user');if(u&&u.id)UID=await u.id();if(DB){const s=await DB.doc('config/bank').get();if(s.exists){const b=JSON.parse(s.data().json);if(b&&b.t>BANK.t){BANK=b;BANK.titles=BANK.titles||{};BANK.stages=BANK.stages||{};try{localStorage.setItem('adv-bank',JSON.stringify(BANK))}catch(e){}}}}}catch(e){}}
initDb();
/* ---------- sound ---------- */
let AC=null,musT=null;
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,t0,d,ty,v){const a=ac();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.type=ty||'sine';o.frequency.value=f;o.connect(g);g.connect(a.destination);const t=a.currentTime+t0;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v||.2,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.start(t);o.stop(t+d+.05)}
const NT=n=>440*Math.pow(2,(n-69)/12);
const SFX={
 tap:()=>tone(700,0,.07,'triangle',.1),
 ok:()=>[72,76,79].forEach((n,i)=>tone(NT(n),i*.09,.25,'triangle',.22)),
 combo:()=>[84,88,91,96].forEach((n,i)=>tone(NT(n),i*.07,.2,'square',.08)),
 bad:()=>{tone(190,0,.28,'sawtooth',.14);tone(140,.13,.32,'sawtooth',.12)},
 hint:()=>[84,88,91].forEach((n,i)=>tone(NT(n),i*.06,.2,'sine',.14)),
 win:()=>[72,76,79,84,88,91,96].forEach((n,i)=>tone(NT(n),i*.11,.38,'triangle',.2)),
 lose:()=>[67,64,60].forEach((n,i)=>tone(NT(n),i*.2,.45,'sine',.2)),
 unlock:()=>[79,84,88].forEach((n,i)=>tone(NT(n),i*.08,.3,'sine',.18))};
function sfx(n){if(P.set.sfx){try{SFX[n]()}catch(e){}}}
function musOn(){if(musT||!P.set.mus||!ac())return;let b=0;const sc=[60,62,64,67,69,72,74,76],ch=[48,53,55,52];musT=setInterval(()=>{if(b%8===0)tone(NT(ch[(b/8)%4]),0,1.7,'sine',.05);if(Math.random()<.7)tone(NT(sc[Math.floor(Math.random()*sc.length)]),0,.55,'triangle',.032);b++},430)}
function musOff(){clearInterval(musT);musT=null}
function paintSnd(){$('sfxb').textContent=P.set.sfx?'🔊':'🔇';$('musb').textContent=P.set.mus?'🎵':'🎶';$('musb').style.opacity=P.set.mus?1:.45;$('sfxb').style.opacity=P.set.sfx?1:.45}
$('sfxb').onclick=()=>{P.set.sfx=!P.set.sfx;save();paintSnd();sfx('tap')};
$('musb').onclick=()=>{P.set.mus=!P.set.mus;save();paintSnd();P.set.mus?musOn():musOff()};
document.addEventListener('pointerdown',()=>{ac();if(P.set.mus)musOn()},{once:true});
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.btn,.wc,.tile,.sn,.back,.tool,.rb,.tab'))sfx('tap')});
/* ---------- griffin ---------- */
const WC=['#4da3ff','#ff6b3d','#34d399','#a855f7'];
const SHOP=[
 {c:'hat',t:'🎩 کلاه',items:[{id:'h0',n:'بدون کلاه',v:'',p:0},{id:'h1',n:'تاج',v:'👑',p:80},{id:'h2',n:'کلاه فارغ‌التحصیلی',v:'🎓',p:60},{id:'h3',n:'کلاه‌خود رستم',v:'⛑️',p:70},{id:'h4',n:'گل بهاری',v:'🌸',p:40}]},
 {c:'wing',t:'🪽 بال‌ها',items:[{id:'w0',n:'آبی و طلایی',v:0,p:0},{id:'w1',n:'آتشین',v:1,p:90},{id:'w2',n:'زمردی',v:2,p:90},{id:'w3',n:'ارغوانی',v:3,p:110}]},
 {c:'halo',t:'✨ هاله',items:[{id:'a0',n:'طلایی',v:'#ffe066',p:0},{id:'a1',n:'آبی یخی',v:'#7dd3fc',p:50},{id:'a2',n:'صورتی',v:'#f9a8d4',p:50},{id:'a3',n:'سبز',v:'#86efac',p:50}]},
 {c:'cmp',t:'🐾 همراه',items:[{id:'c0',n:'بدون همراه',v:'',p:0},{id:'c1',n:'رخش (اسب رستم)',v:'🐎',p:120},{id:'c2',n:'ستاره‌ی درخشان',v:'⭐',p:60},{id:'c3',n:'پروانه',v:'🦋',p:60},{id:'c4',n:'کتاب سحرآمیز',v:'📖',p:70}]}];
if(!P.shop||!P.shop.own||!P.shop.eq)P.shop={own:['h0','w0','a0','c0'],eq:{hat:'h0',wing:'w0',halo:'a0',cmp:'c0'}};
const HC=10,EC=15;
const wsvF=t=>`<svg viewBox="0 0 120 100" class="wsv">${[-52,-26,0,26,52].map((a,i)=>`<ellipse cx="${64-(i%2)*6}" cy="60" rx="${50-Math.abs(a)/6}" ry="9" fill="url(#w${t}${i%2})" transform="rotate(${a} 118 60)"/>`).join('')}</svg>`;
const eqv=c=>{const cat=SHOP.find(x=>x.c===c),it=cat.items.find(i=>i.id===P.shop.eq[c])||cat.items[0];return it.v};
const gwHTML=w=>{const ws=wsvF(eqv('wing'));return `<div class="gwrap" style="--w:${w}px;--hc:${eqv('halo')}"><i class="halo"></i><i class="rays"></i><div class="wl"><div class="wing">${ws}</div></div><div class="wr"><div class="wing">${ws}</div></div><img class="gi" src="${AVS}" alt="سیمرغ"><b class="hat">${eqv('hat')}</b><b class="cmp">${eqv('cmp')}</b><b class="sp s1">✦</b><b class="sp s2">✧</b><b class="sp s3">✦</b></div>`};
const refreshGw=()=>document.querySelectorAll('[data-gw]').forEach(e=>{e.innerHTML=gwHTML(+e.dataset.gw)});
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)}
document.querySelectorAll('[data-gw]').forEach(e=>{e.innerHTML=gwHTML(+e.dataset.gw)});
let lock=false;
const BANKS={
f1:[['بازی ویژه',[
'x|هر کلمه را به کلمه‌ی ساخته‌شده وصل کن|هم + کار>هم‌کار;هم + کلاس>هم‌کلاس;هم + فکر>هم‌فکر;هم + گروه>هم‌گروه|«هم» را به اول کلمه می‌چسبانیم.',
'g|جفت‌ها را پیدا کن|رایانه>رایانه‌ای;ساده>ساده‌ای;تازه>تازه‌ای;ستاره>ستاره‌ای|«ای» به آخر کلمه اضافه می‌شود.',
'o|برخی از کتاب‌ها مفید هستند|با «برخی» شروع کن.',
'o|برای خواندن نماز به مسجد می‌آییم|با «برای» شروع کن.',
'w|به کسی که سواد داشته باشد … می‌گوییم (یک کلمه)|باسواد/با‌سواد|با + سواد']]],
f2:[['تمرین',[
'm|با + ادب = ؟|بادب|بی‌ادب|ادب‌با|بدادب|«با» یعنی داشتن یک ویژگی.',
'm|«باارزش» یعنی چه؟|چیزی که ارزش دارد|چیزی که ارزش ندارد|چیزی که کوچک است|چیزی که تازه است|«با» یعنی دارا بودن.',
's|صدای «و» را در کلمه‌ها جور کن|او:گروه,رود,روز;و:ورزش,وحشی,وارد;اُ:موز,خورشید,دو;بی‌صدا:خواهر,خواستن,خواب|کلمه را بلند بخوان و گوش کن.',
'w|به کسی که سواد دارد می‌گوییم …|باسواد/با‌سواد|با + سواد']],
['بازی ویژه',[
'x|وصل کن|با + سواد>باسواد;با + ادب>بادب;با + ارزش>باارزش|«با» را به اول کلمه می‌چسبانیم.',
'g|کلمه را با صدای «و»اش جفت کن|گروه>او;ورزش>و;موز>اُ;خواب>بی‌صدا|هر کلمه را بلند بخوان.',
'b|بادکنک بزن! کدام کلمه صدای «او» دارد؟|روز|ورزش|موز|خواب|روز و رود و گروه صدای «او» دارند.',
'o|مردم به مسجد محله می‌روند|با «مردم» شروع کن.']]],
f3:[['تمرین',[
'm|بی + سواد = ؟|بی‌سواد|باسواد|سواد‌بی|بیسوادی|«بی» یعنی نداشتن.',
'm|«بی‌سلیقه» یعنی کسی که …|سلیقه ندارد|سلیقه دارد|کتاب دارد|رنگ دارد|«بی» یعنی نداشتن یک ویژگی.',
's|جمله‌ها را به علامت درستشان وصل کن|نقطه:علی به سفر رفت,مریم کتاب می‌خواند;علامت پرسش:چرا دیروز نیامدی,تو کجا بودی|جمله‌ی پرسشی علامت پرسش می‌گیرد.',
'm|کدام علامت پایان جمله‌ی پرسشی است؟|؟|.|،|!|جمله‌های پرسشی با «؟» تمام می‌شوند.']],
['بازی ویژه',[
'x|وصل کن|بی‌سواد>کسی که سواد ندارد;بی‌سلیقه>کسی که سلیقه ندارد;بی‌ارزش>چیزی که ارزش ندارد|«بی» یعنی نداشتن.',
'g|جفت کن|بی‌ادب>ادب ندارد;بی‌رنگ>رنگ ندارد;بی‌صدا>صدا ندارد;بی‌کار>کار ندارد|«بی» یعنی نداشتن.',
'b|بادکنک بزن! علامت پایان جمله‌ی خبری کدام است؟|.|؟|!|،|جمله‌ی خبری با نقطه تمام می‌شود.',
'o|چرا دیروز به مدرسه نیامدی؟|با «چرا» شروع کن.']]],
f4:[['تمرین',[
'm|هم‌معنی «آهسته» کدام است؟|یواش|بلند|سنگین|زیاد|هم‌معنی یعنی معنی یکسان.',
'm|«آغاز» یعنی …|شروع|پایان|بزرگ|تمیز|آغاز = ابتدا = شروع.',
'm|هم‌معنی «تمیز» کدام است؟|پاکیزه|کثیف|بزرگ|تازه|تمیز = پاکیزه.',
'm|کدام کلمه آخرش صدای «ـَن» می‌دهد؟|حتماً|ماه|میز|درخت|علامت «ـً» آخر کلمه صدای «ـَن» می‌دهد.']],
['بازی ویژه',[
'x|هم‌معنی ها را وصل کن|آهسته>یواش;تمیز>پاکیزه;خوشحال>شاد;مراقبت>مواظبت|هم‌معنی ها یک معنی دارند.',
'g|جفت‌های هم‌معنی را پیدا کن|آغاز>شروع;آرام>یواش;شاد>خوشحال;پاکیزه>تمیز|هر دو کلمه یک معنی دارند.',
'b|بادکنک بزن! هم‌معنی «خوشحال» کدام است؟|شاد|غمگین|کثیف|تازه|خوشحال = شاد.',
'o|او معمولاً با دقت می‌نویسد|با «او» شروع کن.']]],
f5:[['تمرین',[
'm|مخالف «زیاد» کدام است؟|کم|بیش|خیلی|همه|مخالف یعنی معنی برعکس.',
'm|مخالف «روز» کدام است؟|شب|صبح|ظهر|عصر|روز ≠ شب.',
'm|مخالف «خوشحال» کدام است؟|غمگین|شاد|تازه|بزرگ|خوشحال ≠ غمگین.',
'm|«مرد‌ها» یعنی …|چند مرد|یک مرد|مرد بزرگ|مرد کوچک|«ها» یعنی بیشتر از یکی.']],
['بازی ویژه',[
'x|مخالف ها را وصل کن|زیاد>کم;روز>شب;خوشحال>غمگین;تمیز>کثیف|مخالف یعنی برعکس.',
'g|جفت‌های مخالف را پیدا کن|گرم>سرد;بزرگ>کوچک;بالا>پایین;دور>نزدیک|مخالف یعنی برعکس.',
'b|بادکنک بزن! مخالف «تمیز» کدام است؟|کثیف|پاکیزه|شاد|تازه|تمیز ≠ کثیف.',
'o|چوپان درست‌کار گوسفندان را نگه می‌داشت|با «چوپان» شروع کن.']]],
f6:[['تمرین',[
'm|خوش + مزه = ؟|خوش‌مزه|مزه‌خوش|خوشمزهها|بدمزه|خوش + مزه = خوش‌مزه.',
'm|در «خوش‌خنده، خنده‌رو، خنده‌دار» کدام کلمه مشترک است؟|خنده|خوش|رو|دار|کلمه‌ای که در همه هست.',
's|صدای آخر کلمه را جور کن|صدای «ـِ»:خانه,کاسه,میوه;صدای «ه»:کوه,ماه,راه|کلمه را بلند بخوان.',
'w|با + مزه = ؟|بامزه/با‌مزه|با + مزه']],
['بازی ویژه',[
'x|وصل کن|خوش + مزه>خوش‌مزه;با + مزه>بامزه;بد + مزه>بدمزه;خنده + دار>خنده‌دار|دو کلمه را به هم می‌چسبانیم.',
'g|هر کلمه را با اجزایش جفت کن|خنده‌رو>خنده + رو;خنده‌دار>خنده + دار;خوش‌خنده>خوش + خنده;بدمزه>بد + مزه|کلمه را بشکن.',
'b|بادکنک بزن! کدام کلمه آخرش صدای «ه» می‌دهد؟|کوه|خانه|کاسه|میوه|کوه صدای «ه» می‌دهد.',
'o|این بستنی خیلی خوش‌مزه است|با «این» شروع کن.']]],
f7:[['تمرین',[
'm|شیرینی‌فروش چه کار می‌کند؟|شیرینی می‌فروشد|آهنگ می‌سازد|درخت می‌کارد|کتاب می‌خواند|شیرینی‌فروش = شیرینی می‌فروشد.',
'm|آهنگ‌ساز چه کار می‌کند؟|آهنگ می‌سازد|نان می‌پزد|شیرینی می‌فروشد|نقاشی می‌کشد|آهنگ‌ساز = آهنگ می‌سازد.',
's|اسم‌های اشاره را جور کن|نزدیک:این,همین;دور:آن,همان|نزدیک: این و همین. دور: آن و همان.',
'w|برای کتابی که نزدیک است می‌گوییم همین کتاب یا … کتاب؟|این|نزدیک = این']],
['بازی ویژه',[
'x|وصل کن|شیرینی‌فروش>شیرینی می‌فروشد;آهنگ‌ساز>آهنگ می‌سازد;نانوا>نان می‌پزد;باغبان>از باغ مراقبت می‌کند|شغل یعنی کار.',
'g|جفت کن|این>نزدیک;آن>دور;همین کتاب>کتاب نزدیک;همان درخت>درخت دور|این و همین = نزدیک.',
'b|بادکنک بزن! برای درختی که دور است چه می‌گوییم؟|آن درخت|این درخت|همین درخت|این کتاب|دور: آن و همان.',
'o|آن درخت بلند است|با «آن» شروع کن.']]],
f8:[['تمرین',[
'x|وصل کن|عمو>برادر بابا;عمه>خواهر بابا;دایی>برادر مامان;خاله>خواهر مامان|بستگان پدری و مادری را فرق بگذار.',
's|بستگان را جور کن|پدری:عمو,عمه,دخترعمو;مادری:دایی,خاله,پسرخاله|عمو و عمه از طرف بابا هستند.',
'm|پدر و مادر بابا و مامان را چه می‌گوییم؟|پدربزرگ و مادربزرگ|عمو و عمه|دایی و خاله|دوست و همکلاسی|پدر و مادر بابا و مامان.',
'm|در کدام کلمه «ی» آخر صدای «آ» می‌دهد؟|موسی|ماهی|کاغذی|یزدی|موسی و عیسی و حتی.']],
['بازی ویژه',[
'g|جفت کن|دایی>برادر مادر;خاله>خواهر مادر;عمو>برادر پدر;عمه>خواهر پدر|دایی و خاله مادری هستند.',
'b|بادکنک بزن! به دختر عمه چه می‌گوییم؟|دخترعمه|دخترخاله|دختردایی|خواهر|دختر عمه.',
'o|من با دختر عمه‌ام بازی می‌کنم|با «من» شروع کن.',
'm|کدام کلمه آخرش صدای «آ» دارد؟|عیسی|ماهی|کوهی|ساده|عیسی و موسی و مجتبی.']]],
f10:[['تمرین',[
's|کلمه‌ها را به هنرمند درست وصل کن|نقاش:رنگ,قلم‌مو,بوم;سفالگر:گِل,کوزه,چرخ|رنگ و بوم مال نقاش است.',
'm|«من به سفر رفتم» مربوط به چه زمانی است؟|گذشته|آینده|حال|هیچ‌کدام|رفتم یعنی کار انجام شده.',
'm|«من به سفر خواهم رفت» مربوط به چه زمانی است؟|آینده|گذشته|حال|هیچ‌کدام|خواهم رفت یعنی بعداً.',
'm|کدام کلمه آینده را نشان می‌دهد؟|خواهد|رفت|دید|گفت|خواهم، خواهی، خواهد.']],
['بازی ویژه',[
'x|وصل کن|رفتم>گذشته;خواهم رفت>آینده;می‌روم>حال|رفتم یعنی گذشته.',
'g|جفت کن|رنگ>نقاش;گِل>سفالگر;قلم‌مو>نقاشی;کوزه>سفال|هر هنرمند ابزار خودش را دارد.',
'b|بادکنک بزن! کدام یک مربوط به نقاشی است؟|بوم|کوزه|گِل|چرخ|بوم و رنگ و قلم‌مو.',
'o|من فردا به سفر خواهم رفت|با «من» شروع کن.']]],
f12:[['تمرین',[
'm|«شیر قوی است» درباره‌ی چند چیز است؟|یک چیز|دو چیز|همه‌ی حیوانات|هیچ‌کدام|فقط درباره‌ی شیر حرف زدیم.',
'm|شیر از پلنگ … است.|قوی‌تر|قوی‌ترین|قوی|قویی|دو چیز را مقایسه کردیم: «تر».',
'm|شیر … حیوان جنگل است.|قوی‌ترین|قوی‌تر|قوی|ضعیف|با همه مقایسه شد: «ترین».',
'x|وصل کن|تر>مقایسه‌ی دو چیز;ترین>مقایسه با همه;قوی>فقط یک چیز|تر برای دو چیز، ترین برای همه.']],
['بازی ویژه: رستم',[
'g|پهلوانان شاهنامه را جفت کن|رستم>پهلوان شاهنامه;رخش>اسب رستم;سهراب>پسر رستم;فردوسی>سراینده‌ی شاهنامه|داستان رستم و سهراب را به یاد بیاور.',
'b|بادکنک بزن! شاهنامه را چه کسی سروده است؟|فردوسی|حافظ|سعدی|نظامی|فردوسی شاعر بزرگ ایرانی است.',
'o|رستم پهلوان بزرگ ایران است|با «رستم» شروع کن.',
'w|نام اسب رستم چیست؟|رخش|اسب رستم «رخش» نام داشت.']]],
f13:[['تمرین',[
'm|زیارت + گاه = ؟|زیارت‌گاه|گاه‌زیارت|زیارتی|زیارت‌ها|محل زیارت.',
'm|نمایش + گاه = ؟|نمایش‌گاه|گاه‌نمایش|نمایشی|نمایش‌ها|محل نمایش.',
'm|«زیارت‌گاه» یعنی …|محل زیارت|محل بازی|محل خواب|محل ورزش|گاه یعنی جا و محل.',
's|جمع کلمه‌ها را جور کن|«ها»:گل‌ها,کتاب‌ها,خانه‌ها;«ان»:درختان,کودکان,مردان|«ها» و «ان» نشانه‌ی جمع هستند.']],
['بازی ویژه',[
'x|وصل کن|زیارت>زیارت‌گاه;نمایش>نمایش‌گاه;ورزش>ورزش‌گاه;آرام>آرام‌گاه|گاه = جا و محل.',
'g|جفت کن: مفرد و جمع|گل>گل‌ها;پرنده>پرندگان;کودک>کودکان;کتاب>کتاب‌ها|جمع بستن یعنی بیشتر از یکی.',
'b|بادکنک بزن! جمع «درخت» با «ان» کدام است؟|درختان|درخت‌ها|درختی|درخت‌ان|درخت + ان = درختان.',
'o|ایران سرزمین زیبایی است|با «ایران» شروع کن.']]],
f14:[['تمرین',[
'm|چوب + ی = ؟|چوبی|چوب‌ها|چوبان|بی‌چوب|یعنی از جنس چوب.',
'm|یزد + ی = ؟|یزدی|یزدان|یزد‌ها|بی‌یزد|یعنی اهل یزد.',
'm|«یزدی» یعنی …|کسی که اهل یزد است|کسی که چوب دارد|کسی که شیر می‌خورد|جایی که آب دارد|«ی» نسبت می‌دهد.',
'm|پرچم ایران چند رنگ دارد؟|سه رنگ|دو رنگ|چهار رنگ|یک رنگ|سبز و سفید و سرخ.']],
['بازی ویژه: پرچم',[
'x|هر رنگ پرچم را به معنایش وصل کن|سبز>رویش و زندگی;سفید>صلح و پاکی;سرخ>دلاوری|رنگ‌های پرچم ایران.',
'g|جفت کن|چوب>چوبی;یزد>یزدی;کاغذ>کاغذی;شیراز>شیرازی|«ی» به آخر کلمه می‌آید.',
'b|بادکنک بزن! «شیر آب را بستم» یعنی کدام شیر؟|شیر آب|حیوان جنگل|نوشیدنی|رنگ|هم‌نویسه یعنی نوشتن یکسان و معنی متفاوت.',
'o|پرچم ایران سه رنگ دارد|با «پرچم» شروع کن.']]],
f15:[['تمرین',[
'm|نیکو + کار = ؟|نیکوکار|کارنیکو|نیکوها|نیکوان|کسی که کار نیکو می‌کند.',
'm|«ستم‌کار» یعنی …|کسی که ظلم و ستم می‌کند|کسی که کار نیکو می‌کند|کسی که کار می‌کند|کسی که می‌خندد|ستم یعنی ظلم.',
'm|جمع «تشنه» با «ان» کدام است؟|تشنگان|تشنهان|تشنان|تشنه‌ها|«ه» حذف می‌شود و «گان» می‌آید.',
'w|جمع «دیده» با «ان» چه می‌شود؟|دیدگان|دیده + ان = دیدگان']],
['بازی ویژه',[
'x|وصل کن|نیکو>نیکوکار;درست>درست‌کار;ستم>ستم‌کار|«کار» یعنی انجام دهنده.',
'g|مفرد و جمع را جفت کن|تشنه>تشنگان;گرسنه>گرسنگان;دیده>دیدگان;بنده>بندگان|«ه» حذف و «گان» اضافه می‌شود.',
'b|بادکنک بزن! جمع «گرسنه» کدام است؟|گرسنگان|گرسنهان|گرسنان|گرسنه‌ها|گرسنه + ان = گرسنگان.',
'o|نوروز عید باستانی ایرانیان است|با «نوروز» شروع کن.']]],
f16:[['تمرین',[
'm|نا + مناسب = ؟|نامناسب|مناسب‌نا|بی‌مناسب|مناسبان|«نا» معنی را برعکس می‌کند.',
'm|«نابینا» یعنی کسی که …|نمی‌بیند|می‌بیند|راه می‌رود|خوشحال است|نا + بینا.',
'm|نا + راحت = ؟|ناراحت|راحتان|راحت‌نا|بی‌راحت|«نا» معنی را برعکس می‌کند.',
'm|«آرام آرام» چگونگی چه چیزی را نشان می‌دهد؟|انجام کار|رنگ چیزی|نام شهر|شغل|آرام آرام غذا می‌خورد.']],
['بازی ویژه',[
'x|وصل کن|نا + مناسب>نامناسب;نا + بینا>نابینا;نا + راحت>ناراحت|«نا» پیشوند است.',
'g|جفت کن|مناسب>نامناسب;بینا>نابینا;راحت>ناراحت;امید>ناامید|«نا» به اول کلمه می‌آید.',
'b|بادکنک بزن! «باران … می‌بارد.»|نم نم|آرام|زرد|خانه|نم نم نشان می‌دهد باران چطور می‌بارد.',
'o|باران نم نم می‌بارد|با «باران» شروع کن.']]],
f17:[['تمرین',[
'm|یک سال چند فصل دارد؟|چهار فصل|سه فصل|دو فصل|شش فصل|بهار، تابستان، پاییز، زمستان.',
'm|هر فصل چند ماه دارد؟|سه ماه|دو ماه|چهار ماه|یک ماه|سال دوازده ماه و چهار فصل دارد.',
's|کلمه‌ها را به فصلشان وصل کن|تابستان:گرما,هندوانه,شنا;زمستان:برف,آدم‌برفی,سرما|به فصل فکر کن.',
'm|صدای «شُرشُر» مربوط به چیست؟|آب|باد|ماشین|پرنده|شُرشُر صدای آب است.']],
['بازی ویژه',[
'g|فصل و نشانه‌اش را جفت کن|تابستان>هندوانه;زمستان>آدم‌برفی;بهار>شکوفه;پاییز>برگ‌ریزان|به فصل فکر کن.',
'x|وصل کن|گرما>تابستان;برف>زمستان;شکوفه>بهار;برگ‌ریزان>پاییز|هر فصل نشانه دارد.',
'b|بادکنک بزن! کدام مربوط به تابستان است؟|هندوانه|برف|کلاه پشمی|بخاری|هندوانه میوه‌ی تابستان است.',
'o|در تابستان به مسافرت می‌رویم|با «در» شروع کن.']]],
m1:[['بازی ویژه',[
't|عدد ۷ را با چوب‌خط بکش|7|هر پنج خط یک دسته می‌شود.',
'c|از ۱۲ خانه، ۵ خانه را رنگ کن|12|5|فقط ۵ خانه را رنگ بزن.',
'k|ساعت ۷ را نشان بده|7:00|عقربه‌ی کوتاه روی ۷ و عقربه‌ی بلند روی ۱۲.',
'g|عدد و حرف را جفت کن|۱۲>دوازده;۲۰>بیست;۱۵>پانزده;۳۰>سی|عدد را بخوان.',
'b|بادکنک بزن! الگو: ۴ ، ۸ ، ۱۲ ، … عدد بعدی؟|۱۶|۱۴|۱۵|۲۰|هر بار ۴ تا اضافه می‌شود.']]],
m2:[['بازی ویژه',[
'x|هر عبارت را به حاصلش وصل کن|۲۰ + ۱۵>۳۵;۲۴ + ۱۷>۴۱;۴۳ − ۲۷>۱۶;۸۱ − ۳۷>۴۴|یکان و دهگان را جدا حساب کن.',
'b|بادکنک بزن! عدد ۳۷ به کدام نزدیک‌تر است؟|۴۰|۳۰|۲۰|۵۰|۳۷ از ۳۵ بیشتر است.',
'w|۱۷ + ۲۴ = ؟|41|یکان‌ها: ۷ + ۴ = ۱۱؛ یک ده‌تایی به دهگان می‌رود.',
'w|۴۳ − ۲۷ = ؟|16|یک ده‌تایی قرض بگیر.',
'g|جفت کن|۵۰ + ۲۰>۷۰;۶۰ − ۲۰>۴۰;۳۰ + ۳۰>۶۰;۹۰ − ۱۰>۸۰|ده‌تایی‌ها را جمع و تفریق کن.']]],
m3:[['تمرین',[
'm|مربع چند ضلع دارد؟|۴|۳|۵|۶|مربع چهار ضلع و چهار گوشه دارد.',
'm|پنج‌ضلعی چند گوشه دارد؟|۵|۴|۶|۳|تعداد گوشه‌ها با تعداد ضلع‌ها برابر است.',
's|کدام شکل خط تقارن دارد؟|خط تقارن دارد:دایره,مربع,مستطیل;خط تقارن ندارد:متوازی‌الاضلاع|اگر شکل را تا کنیم و دو نیمه روی هم بیفتند، خط تقارن دارد.',
'x|شکل را به تعداد ضلعش وصل کن|مثلث>۳ ضلع;مربع>۴ ضلع;پنج‌ضلعی>۵ ضلع;شش‌ضلعی>۶ ضلع|ضلع‌ها را بشمار.']],
['بازی ویژه',[
'k|ساعت چهار و نیم را نشان بده|4:30|عقربه‌ی کوتاه بین ۴ و ۵ و عقربه‌ی بلند روی ۶.',
'b|بادکنک بزن! سه ساعت بعد از ۴ و نیم چند است؟|۷ و نیم|۶ و نیم|۸ و نیم|۵ و نیم|۴ + ۳ = ۷.',
'g|جفت کن|مربع>۴ گوشه;مثلث>۳ گوشه;پنج‌ضلعی>۵ گوشه;دایره>گوشه ندارد|گوشه‌ها را بشمار.',
'o|مربع چهار ضلع و چهار گوشه دارد|با «مربع» شروع کن.']]],
m4:[['تمرین',[
'm|عدد بعد از ۸۰۹ کدام است؟|۸۱۰|۸۰۸|۹۰۹|۸۱۹|یکی به عدد اضافه کن.',
'm|عدد قبل از ۳۶۲ کدام است؟|۳۶۱|۳۶۳|۳۵۲|۳۷۲|یکی از عدد کم کن.',
'b|بادکنک بزن! ۲۳۰ ، ۲۴۰ ، ۲۵۰ ، … عدد بعدی؟|۲۶۰|۲۵۵|۳۰۰|۲۶۵|هر بار ۱۰ تا اضافه می‌شود.',
'w|۴۰۰ + ۷۰ + ۱ = ؟|471|صدگان، دهگان و یکان را کنار هم بنویس.']],
['بازی ویژه',[
'x|وصل کن|۳ صدتایی و ۵ ده‌تایی و ۴ یکی>۳۵۴;۲ صدتایی و ۵ یکی>۲۰۵;۴ صدتایی و ۷ ده‌تایی و ۱ یکی>۴۷۱;۱ صدتایی و ۷ ده‌تایی>۱۷۰|هر رقم ارزش مکانی دارد.',
'g|عدد و حرف را جفت کن|۲۰۵>دویست و پنج;۴۷۱>چهارصد و هفتاد و یک;۳۰۰>سیصد;۵۰۰>پانصد|عدد را بخوان.',
'b|بادکنک بزن! عدد ۷۳۱ را بدون یکان تقریبی بنویس.|۷۳۰|۷۴۰|۷۰۰|۷۳۵|یکان را صفر می‌کنیم.',
'm|کدام عدد از همه بزرگ‌تر است؟|۶۵۰|۳۹۷|۱۹۶|۴۵۲|اول صدگان را مقایسه کن.']]],
m5:[['تمرین',[
'w|۶۳۰ + ۲۴۸ = ؟|878|یکان، دهگان و صدگان را جداگانه جمع کن.',
'w|۷۸۹ − ۵۱۷ = ؟|272|از یکان شروع کن.',
'm|۳۵۶ + ۳۶۹ = ؟|۷۲۵|۷۱۵|۷۳۵|۶۲۵|یکان: ۶ + ۹ = ۱۵؛ ده‌تایی می‌رود.',
'm|۵۲۸ − ۱۹۲ = ؟|۳۳۶|۳۴۶|۴۳۶|۳۲۶|یک صدتایی را باز کن و قرض بگیر.']],
['بازی ویژه',[
'x|حاصل را وصل کن|۴۹۲ + ۲۳۳>۷۲۵;۲۰۰ + ۲۰۰ + ۱۰۰>۵۰۰;۱۰۰ + ۱۰۰ + ۲۰۰ + ۵۰>۴۵۰;۹۰۰ − ۲۰۰>۷۰۰|صدگان را جدا حساب کن.',
'b|بادکنک بزن! ۴۲۳ − ۱۲۷ تقریباً چند است؟|۳۰۰|۲۰۰|۴۰۰|۵۰۰|بدون یکان: ۴۲۰ − ۱۲۰ = ۳۰۰.',
'm|میوه‌فروش ۱۰۹ سیب سبز و ۲۵۴ سیب قرمز دارد. روی هم چند سیب دارد؟|۳۶۳|۳۵۳|۳۷۳|۳۴۳|۱۰۹ + ۲۵۴.',
'g|جفت کن|۲۰۰ + ۳۰۰>۵۰۰;۴۰۰ + ۴۰۰>۸۰۰;۶۰۰ − ۳۰۰>۳۰۰;۹۰۰ − ۳۰۰>۶۰۰|صدتایی‌ها را جمع و تفریق کن.']]],
m6:[['تمرین',[
'm|۱ سانتی‌متر چند میلی‌متر است؟|۱۰|۱۰۰|۱|۵|هر سانتی‌متر ۱۰ میلی‌متر است.',
'w|۵ سانتی‌متر چند میلی‌متر است؟|50|۵ × ۱۰',
'm|۱۲ میلی‌متر یعنی ۱ سانتی‌متر و … میلی‌متر|۲|۱۲|۱|۱۰|۱۲ − ۱۰ = ۲.',
'w|۷ سانتی‌متر چند میلی‌متر است؟|70|۷ × ۱۰']],
['بازی ویژه',[
'k|۱۵ دقیقه بعد از ساعت ۶ چند است؟ نشان بده|6:15|یک ربع بعد از ۶.',
'k|۳۰ دقیقه بعد از ساعت ۱۲ چند است؟ نشان بده|12:30|نیم ساعت بعد از ۱۲.',
'b|بادکنک بزن! یک ربع بعد از ۴ و ۱۵ دقیقه ساعت چند است؟|۴:۳۰|۴:۴۵|۵:۱۵|۴:۲۰|یک ربع یعنی ۱۵ دقیقه.',
'x|وصل کن|۱ سانتی‌متر>۱۰ میلی‌متر;۲ سانتی‌متر>۲۰ میلی‌متر;۳ سانتی‌متر>۳۰ میلی‌متر;۵ سانتی‌متر>۵۰ میلی‌متر|ضربدر ۱۰.']]],
m7:[['تمرین',[
'c|۳ خانه از ۸ خانه را رنگ کن (سه هشتم)|8|3|فقط ۳ خانه را رنگ بزن.',
'm|نصف عدد ۱۰ چند است؟|۵|۲|۲۰|۱|نصف یعنی دو قسمت مساوی.',
'w|۱۰۰ ریال برابر است با ۲ سکه‌ی چند ریالی؟|50|۱۰۰ را نصف کن.',
'c|۶ خانه را نصف کن و نصفش را رنگ بزن|6|3|نصف ۶ می‌شود ۳.']],
['بازی ویژه',[
'x|سکه‌ها را به مقدارشان وصل کن|۴ سکه‌ی ۱۰۰ ریالی>۴۰۰ ریال;۵ سکه‌ی ۱۰۰ ریالی>۵۰۰ ریال;۳ سکه‌ی ۵۰ ریالی>۱۵۰ ریال;۲ سکه‌ی ۵۰ ریالی>۱۰۰ ریال|سکه‌ها را جمع کن.',
'b|بادکنک بزن! ۴۰۰ ریال چند سکه‌ی ۱۰ ریالی است؟|۴۰|۴|۴۰۰|۱۴|۴۰۰ ÷ ۱۰ = ۴۰.',
'b|بادکنک بزن! یک شکل را به ۴ قسمت مساوی کنیم هر قسمت …|یک چهارم|یک دوم|دو سوم|یک سوم|۴ قسمت مساوی.',
'c|یک چهارم ۱۲ خانه را رنگ کن|12|3|۱۲ را به ۴ قسمت مساوی کن.']]],
m8:[['تمرین',[
'm|در نمودار ستونی هر خانه ۱۰ کتاب است. ۳ خانه یعنی چند کتاب؟|۳۰|۱۰|۱۳|۳|۳ × ۱۰.',
'c|برای ۴۰ کتاب چند خانه رنگ کنیم؟ (هر خانه ۱۰ کتاب)|8|4|۴۰ ÷ ۱۰ = ۴.',
'm|در هدف تیر شانس برخورد با کدام قسمت بیشتر است؟|قسمتی که بیشتر است|قسمتی که کمتر است|هیچ‌کدام|یکسان|قسمت بزرگ‌تر شانس بیشتری دارد.',
't|برای عدد ۶ چوب‌خط بکش|6|پنج خط یک دسته است و یک خط اضافه.']],
['بازی ویژه',[
'g|نمودار را بخوان|ستون بلندتر>تعداد بیشتر;ستون کوتاه‌تر>تعداد کمتر;ستون هم‌اندازه>تعداد برابر;بدون ستون>صفر|نمودار را بخوان.',
'b|بادکنک بزن! در کیسه ۳ مهره‌ی قرمز و ۱ مهره‌ی آبی است. احتمال کدام بیشتر است؟|قرمز|آبی|برابر|هیچ‌کدام|مهره‌ی بیشتر شانس بیشتری دارد.',
'o|نمودار ستونی تعداد را نشان می‌دهد|با «نمودار» شروع کن.',
'x|وصل کن|۱ خانه>۱۰ کتاب;۲ خانه>۲۰ کتاب;۳ خانه>۳۰ کتاب;۵ خانه>۵۰ کتاب|هر خانه ۱۰ کتاب.']]]
};
const EXTRA={
m1:[['ردیف‌کن و جور کن',[
'o|۹ ۳۳ ۴۹ ۵۶ ۷۱ ۸۱|عدد کوچک‌تر اول بیاید.|عددها را از کم به زیاد بزن',
'o|۹۸ ۸۰ ۶۶ ۳۷ ۲۲ ۱۵|عدد بزرگ‌تر اول بیاید.|عددها را از زیاد به کم بزن',
's|عددها را جور کن|کمتر از ۵۰:۱۲,۳۳,۴۹;۵۰ و بیشتر:۵۶,۷۱,۹۰|دهگان را نگاه کن.',
'x|الگو را به عدد بعدی وصل کن|۲ ، ۴ ، ۶>۸;۵ ، ۱۰ ، ۱۵>۲۰;۱۰ ، ۲۰ ، ۳۰>۴۰;۳ ، ۶ ، ۹>۱۲|ببین هر بار چند تا اضافه می‌شود.']],
['ساعت و چوب‌خط',[
't|عدد ۱۲ را با چوب‌خط بکش|12|دو دسته‌ی ۵تایی و ۲ خط.',
'c|از ۲۰ خانه، یک ده‌تایی (۱۰ خانه) را رنگ کن|20|10|ده خانه رنگ کن.',
'k|ساعت ۳ را نشان بده|3:00|عقربه‌ی بلند روی ۱۲ و کوتاه روی ۳.',
'k|ساعت ۹ و نیم را نشان بده|9:30|عقربه‌ی بلند روی ۶.']],
['حافظه‌ی عددها',[
'g|ده‌تایی و یکی را جفت کن|۳ ده‌تایی و ۷ یکی>۳۷;۵ ده‌تایی و ۲ یکی>۵۲;۸ ده‌تایی و ۴ یکی>۸۴;۱ ده‌تایی و ۹ یکی>۱۹|ده‌تایی ها را بشمار.',
'g|عدد و حرف را جفت کن|۴۰>چهل;۵۰>پنجاه;۶۰>شصت;۷۰>هفتاد|عدد را بخوان.',
'b|بادکنک بزن! عدد قبل از ۴۰ کدام است؟|۳۹|۴۱|۳۰|۴۹|یکی کم کن.',
'b|بادکنک بزن! عدد بعد از ۶۹ کدام است؟|۷۰|۶۸|۶۰|۷۱|یکی اضافه کن.']]],
m2:[['ماشین‌حساب ذهنی',[
'w|۲۳ + ۱۴ = ؟|37|یکان‌ها را جمع کن: ۳ + ۴.',
'w|۵۶ − ۲۱ = ؟|35|یکان‌ها: ۶ − ۱.',
'x|حاصل را وصل کن|۳۲ + ۱۵>۴۷;۶۸ − ۲۴>۴۴;۴۱ + ۲۶>۶۷;۷۸ − ۳۵>۴۳|جدا جدا حساب کن.',
'b|بادکنک بزن! ۲۸ + ۱۹ = ؟|۴۷|۳۷|۴۶|۵۷|یکان: ۸ + ۹ = ۱۷.']],
['تقریب و ساعت',[
'x|هر عدد را به نزدیک‌ترین ده‌تایی وصل کن|۵۲>۵۰;۵۸>۶۰;۱۷>۲۰;۴۳>۴۰|اگر یکان ۵ یا بیشتر بود، به بالا گرد کن.',
'k|ساعت ۹ و ۲۰ دقیقه را نشان بده|9:20|عقربه‌ی بلند روی ۴.',
'k|ساعت ۲ و ۴۵ دقیقه را نشان بده|2:45|عقربه‌ی بلند روی ۹.',
'w|عدد ۵۸ به کدام ده‌تایی نزدیک‌تر است؟|60|یکان ۸ است؛ به بالا گرد کن.']],
['حافظه‌ی جمع و تفریق',[
'g|جفت کن|۲۵ + ۲۵>۵۰;۴۰ + ۳۰>۷۰;۹۰ − ۳۰>۶۰;۶۰ − ۱۵>۴۵|ده‌تایی‌ها را جداگانه حساب کن.',
'g|جفت کن|۱۲ + ۱۳>۲۵;۳۵ + ۱۵>۵۰;۸۰ − ۲۵>۵۵;۹۰ − ۲۱>۶۹|یکان و دهگان را جدا حساب کن.',
'b|بادکنک بزن! ۶۰ − ۲۵ = ؟|۳۵|۴۵|۳۰|۸۵|یک ده‌تایی قرض بگیر.',
'b|بادکنک بزن! ۳۷ + ۴۵ = ؟|۸۲|۷۲|۸۱|۹۲|یکان: ۷ + ۵ = ۱۲.']]],
f1:[['غلط‌یاب',[
'x|کلمه‌ی غلط را به شکل درستش وصل کن|کاغز>کاغذ;پرنده‌گان>پرندگان;نضم>نظم;سپاسگذارم>سپاسگزارم|حرف‌های درست را به خاطر بیاور.',
'b|بادکنک بزن! کدام کلمه درست است؟|مهربان|محربان|مهرابان|مهربام|مهر + بان.',
'b|بادکنک بزن! کدام کلمه درست است؟|کتابخانه|کتاب‌خونه|کتابخانا|کتابخانی|کتاب + خانه.',
'w|کلمه‌ی درست را بنویس: کا..ذ (کاغذ یا کاقذ)|کاغذ|کاغذ با «غ» و «ذ» نوشته می‌شود.']],
['حرف و کلمه',[
's|کلمه‌ها را به حرف اولشان جور کن|حرف س:سنگ,سرسبز;حرف ش:شادی,شاخه;حرف ع:عزیز,علی;حرف م:مهربانی,ماه|اول کلمه را بلند بگو.',
'g|کلمه و حرف اول را جفت کن|سنگ>حرف س;شادی>حرف ش;عزیز>حرف ع;ماه>حرف م|حرف اول را پیدا کن.',
'o|من به کتابخانه‌ی کلاس می‌روم|با «من» شروع کن.',
'o|کتابخانه‌ی کوچک ما کتاب زیادی دارد|با «کتابخانه‌ی» شروع کن.']],
['واژه‌ساز',[
'w|هم + گروه = ؟|همگروه/هم‌گروه|«هم» را به اول بچسبان.',
'w|رایانه + ای = ؟|رایانه‌ای|«ای» را به آخر بچسبان.',
'g|جفت کن|هم + کلاس>همکلاس;هم + فکر>همفکر;هم + کار>همکار;هم + بازی>همبازی|«هم» را به اول بچسبان.',
'b|بادکنک بزن! به آخر کدام کلمه می‌توانیم «ای» اضافه کنیم؟|مجله|بی|هم|با|مجله + ای = مجله‌ای.']]],
f2:[['نویسنده‌ی کوچک',[
'w|با + سواد = ؟|باسواد/با‌سواد|«با» یعنی دارا بودن.',
'w|با + ادب = ؟|بادب/با‌ادب|«با» را به اول بچسبان.',
'w|با + ارزش = ؟|باارزش/با‌ارزش|«با» را به اول بچسبان.',
'o|ما در مسجد محله‌ی خود نماز می‌خوانیم|با «ما» شروع کن.']],
['بادکنک و حافظه',[
'b|بادکنک بزن! صدای «و» در «خورشید» چیست؟|اُ|او|و|بی‌صدا|خورشید را بلند بخوان.',
'b|بادکنک بزن! صدای «و» در «روز» چیست؟|او|اُ|و|بی‌صدا|روز را بلند بخوان.',
'g|کلمه و صدای «و» را جفت کن|توت>او;وارد>و;دو>اُ;خواستن>بی‌صدا|کلمه را بلند بخوان.',
'b|بادکنک بزن! «با + ارزش» می‌شود …|باارزش|بی‌ارزش|ارزشی|ارزش‌ها|«با» یعنی داشتن.']]]
};
Object.keys(EXTRA).forEach(k=>{BANKS[k]=(BANKS[k]||[]).concat(EXTRA[k])});
function gameify(q,i,s){
 if(!q.o||q.o.some(o=>o.h.includes('<')))return q;
 const ok=q.o.find(o=>o.ok),num=/^[0-9]+$/.test(nz(ok.h)),m=(i+s)%3;
 if(m===0&&num)return Object.assign({},q,{t:'w',ans:[ok.h]});
 if(m===1)return Object.assign({},q,{t:'b'});
 return q;
}
const NOTES={
m1:['عدد و رقم','#عدد و شمارش','• شمارش از ۱ تا ۹۹؛ عدد بعد را با «یکی بیشتر» و عدد قبل را با «یکی کمتر» پیدا می‌کنیم.','#ده‌تایی و یکی','• هر ۱۰ تا یک ده‌تایی است. عدد ۳۷ یعنی ۳ ده‌تایی و ۷ یکی.','• رقم سمت چپ دهگان و رقم سمت راست یکان است.','#شمارش چندتا‌چندتا','• ۲تا‌۲تا: ۲، ۴، ۶ ... ۵تا‌۵تا: ۵، ۱۰، ۱۵ ... ۱۰تا‌۱۰تا: ۱۰، ۲۰، ۳۰ ...','#رسم شکل','• با چوب‌خط می‌شمریم: هر ۵ خط یک دسته است.'],
m2:['جمع و تفریق دو رقمی','• اول یکان‌ها، بعد دهگان‌ها را جمع یا تفریق می‌کنیم.','• اگر جمع یکان‌ها ۱۰ یا بیشتر شد، یک ده‌تایی به دهگان می‌رود (رقم نقلی).','• اگر یکان کوچک‌تر بود، از دهگان یک ده‌تایی قرض می‌گیریم.','• تقریب: عدد را به نزدیک‌ترین ده‌تایی گرد می‌کنیم؛ ۳۷ به ۴۰ نزدیک‌تر است.'],
m3:['شکل‌های هندسی','• ضلع خط‌های دور شکل و گوشه جای برخورد ضلع‌ها است.','• مربع ۴ ضلع و ۴ گوشه دارد؛ مثلث ۳ ضلع و ۳ گوشه؛ پنج‌ضلعی ۵ ضلع و ۵ گوشه.','• خط تقارن: اگر شکل را روی آن خط تا کنیم، دو نیمه کاملاً روی هم می‌افتند.','• ساعت: عقربه‌ی کوتاه ساعت و عقربه‌ی بلند دقیقه را نشان می‌دهد.'],
m4:['عددهای سه‌رقمی','• عدد سه‌رقمی: صدگان، دهگان و یکان دارد. ۴۷۱ = ۴۰۰ + ۷۰ + ۱.','• برای مقایسه اول صدگان‌ها را مقایسه می‌کنیم؛ اگر برابر بود دهگان‌ها و بعد یکان‌ها.','• تقریب: یکان را حذف می‌کنیم؛ ۷۳۱ تقریباً ۷۳۰ است.','• پول: سکه‌های ۱۰۰ ریالی، ۱۰ ریالی و ۱ ریالی را جمع می‌کنیم.'],
m5:['جمع و تفریق سه‌رقمی','• از یکان شروع می‌کنیم، بعد دهگان و بعد صدگان.','• جمع: اگر یک ستون ۱۰ یا بیشتر شد، یک واحد به ستون بعدی می‌رود.','• تفریق: اگر رقم بالا کوچک‌تر بود، از ستون بعدی قرض می‌گیریم.','• با عددهای تقریبی می‌توانیم جواب را حدس بزنیم؛ ۴۲۳ − ۱۲۷ تقریباً ۳۰۰ است.'],
m6:['اندازه‌گیری و زمان','• ۱ سانتی‌متر = ۱۰ میلی‌متر. برای تبدیل سانتی‌متر به میلی‌متر در ۱۰ ضرب می‌کنیم.','• با خط‌کش از صفر شروع به اندازه‌گیری می‌کنیم.','• یک ربع = ۱۵ دقیقه و نیم ساعت = ۳۰ دقیقه.','• ۱۵ دقیقه بعد از ۶:۰۰ می‌شود ۶:۱۵.'],
m7:['کسر و پول','• کسر یعنی چند قسمت از چند قسمت مساوی؛ ۳ خانه رنگی از ۸ خانه می‌شود «سه هشتم».','• نصف یعنی دو قسمت مساوی و یک چهارم یعنی چهار قسمت مساوی.','• ۱۰۰ ریال = ۲ سکه‌ی ۵۰ ریالی؛ ۴۰۰ ریال = ۴۰ سکه‌ی ۱۰ ریالی.'],
m8:['آمار و احتمال','• در نمودار ستونی، ستون بلندتر یعنی تعداد بیشتر.','• اگر هر خانه ۱۰ تا باشد، ۴ خانه یعنی ۴۰ تا.','• احتمال: شانس رخ دادن یک اتفاق. هر چه قسمت بیشتری داشته باشد شانس بیشتری دارد.'],
f1:['ستایش و کتابخانه‌ی کلاس ما','#واژه‌سازی با «هم»','• هم + کلاس = همکلاس | هم + فکر = هم‌فکر | هم + گروه = هم‌گروه','#اضافه کردن «ای»','• به آخر کلمه‌ها می‌توانیم «ای» اضافه کنیم: روزنامه‌ای، رایانه‌ای، ستاره‌ای.','#سایه‌ی کتاب خوب','• کتاب خوب را مثل دوست خوب، با مشورت بزرگ‌ترها انتخاب می‌کنیم.'],
f2:['مسجد محله‌ی ما','#با + واژه','• «با» یعنی داشتن یک ویژگی: با + سواد = باسواد، با + ادب = بادب، با + ارزش = باارزش.','#نشانه‌ی «و»','• صدای «او»: گروه، رود، روز، توت.','• صدای «و»: ورزش، وحشی، وارد، روان.','• صدای «اُ»: موز، خورشید، خود، دو.','• بی‌صدا: خواهر، خواستن، خواب.'],
f3:['بی و علامت‌های نگارشی','#بی + واژه','• «بی» یعنی نداشتن: بی‌سواد، بی‌سلیقه، بی‌ارزش.','#علامت‌های نگارشی','• نقطه (.) پایان جمله‌ی خبری است: علی به سفر رفت.','• علامت پرسش (؟) پایان جمله‌ی پرسشی است: چرا دیروز به مدرسه نیامدی؟'],
f4:['مدرسه‌ی خرگوش‌ها','#هم‌معنی (مترادف)','• کلمه‌هایی که معنی یکسان دارند: آهسته = آرام = یواش، تمیز = پاکیزه، خوشحال = شاد، مراقبت = مواظبت، آغاز = شروع.','#علامت «ـً»','• آخر بعضی کلمه‌ها «ـً» می‌آید و «ـَن» خوانده می‌شود: معمولاً، مثلاً، حتماً، لطفاً.'],
f5:['چوپان درست‌کار','#مخالف (متضاد)','• کلمه‌هایی که معنی برعکس دارند: زیاد ≠ کم، روز ≠ شب، خوشحال ≠ غمگین، تمیز ≠ کثیف.','• مخالف‌ها را به جای هم نمی‌نویسیم چون معنی جمله برعکس می‌شود.','#«ها» و جمع','• «ها» یعنی بیشتر از یکی: مرد‌ها، گل‌ها، خیابان‌ها، خانه‌ها.'],
f6:['کوشا و نوشا','#واژه‌ی مشترک','• خوش + مزه = خوش‌مزه، با + مزه = بامزه، بد + مزه = بدمزه (مزه مشترک است).','• خوش + خنده = خوش‌خنده، خنده + رو = خنده‌رو، خنده + دار = خنده‌دار (خنده مشترک است).','#صدای آخر کلمه','• «ـه» آخر بعضی کلمه‌ها صدای «ـِ» می‌دهد: خانه. در بعضی صدای «ه» می‌دهد: کوه.'],
f7:['دوستان ما','#شغل‌ها','• شیرینی‌فروش شیرینی می‌فروشد؛ آهنگ‌ساز آهنگ می‌سازد.','#اسم‌های اشاره','• نزدیک: این، همین (این کتاب، همین کتاب).','• دور: آن، همان (آن درخت، همان درخت).'],
f8:['از همه مهربان‌تر','#خانواده','• پدر و مادر بابا و مامان: پدربزرگ و مادربزرگ.','• بستگان پدری: عمو (برادر بابا)، عمه (خواهر بابا)، زن‌عمو، شوهرعمه، دخترعمو، پسرعمه ...','• بستگان مادری: دایی (برادر مادر)، خاله (خواهر مادر)، زن‌دایی، شوهرخاله، دختردایی، پسرخاله ...','#«ی» با صدای «آ»','• عیسی، موسی، حتی، مجتبی.'],
f10:['هنرمند','#کلمه‌های هم‌موضوع','• نقاش: رنگ، قلم‌مو، بوم. سفالگر: گِل، کوزه، چرخ سفالگری.','#زمان انجام کار','• گذشته: من به سفر رفتم. آینده: من به سفر خواهم رفت.','• برای آینده از «خواهم، خواهی، خواهد، خواهیم، خواهید، خواهند» استفاده می‌کنیم.'],
f12:['فردوسی','#مقایسه','• شیر قوی است. (درباره‌ی یک چیز)','• شیر از پلنگ قوی‌تر است. (دو چیز را مقایسه کردیم؛ «تر»)','• شیر قوی‌ترین حیوان جنگل است. (با همه مقایسه شد؛ «ترین»)','#شاهنامه','• فردوسی شاعر بزرگ ایرانی است و شاهنامه را سروده است؛ رستم و سهراب از داستان‌های آن هستند.'],
f13:['ایران زیبا','#«گاه»','• زیارت + گاه = زیارت‌گاه (محل زیارت)، نمایش + گاه = نمایش‌گاه (محل نمایش).','#جمع بستن','• به آخر کلمه «ها» اضافه می‌کنیم: درخت‌ها؛ گاهی «ان» هم می‌آید: درختان.'],
f14:['پرچم','#هم‌نویسه','• کلمه‌هایی که یکسان نوشته می‌شوند اما معنی متفاوت دارند: شیر (حیوان)، شیر (آب)، شیر (نوشیدنی).','#«ی» نسبت','• چوب + ی = چوبی (از جنس چوب)، یزد + ی = یزدی (اهل یزد).','#پرچم ایران','• سه رنگ دارد: سبز، سفید و سرخ.'],
f15:['نوروز','#کار','• نیکو + کار = نیکوکار، درست + کار = درست‌کار، ستم + کار = ستم‌کار.','#جمع با «ان»','• اگر آخر کلمه «ـه» با صدای «ـِ» باشد، «ه» را حذف و «گان» اضافه می‌کنیم: تشنه ← تشنگان، گرسنه ← گرسنگان، دیده ← دیدگان.'],
f16:['پرواز قطره','#«نا»','• «نا» معنی کلمه را برعکس می‌کند: نا + مناسب = نامناسب، نا + بینا = نابینا، نا + راحت = ناراحت.','#چگونگی کار','• بعضی کلمه‌ها نشان می‌دهند کاری چگونه انجام می‌شود: آرام آرام، نم نم.'],
f17:['فصل‌ها','• یک سال چهار فصل دارد؛ هر فصل سه ماه و هر ماه حدود سی روز است.','• با شنیدن نام هر فصل، چیزهای مربوط به آن را به یاد می‌آوریم: تابستان ← گرما، شنا، هندوانه، گیلاس، زردآلو، مسافرت.','• بعضی کلمه‌ها جمله را زیبا می‌کنند: شُرشُر (صدای آب).']
};

/* ---------- question types ---------- */
const nz=s=>String(s).replace(/[\u200c\s]/g,'').replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
function parseQ(s){
 const a=s.split('|'),t=a[0],pr=x=>x.split(';').map(p=>p.split('>'));
 if(t==='m'||t==='b')return{t,p:a[1],o:shuf([{h:a[2],ok:true}].concat(a.slice(3,a.length-1).map(h=>({h,ok:false})))),hint:a[a.length-1],x:'پاسخ درست: '+a[2]};
 if(t==='x'||t==='g'){const p=pr(a[2]);return{t,p:a[1],pr:p,hint:a[3],x:p.map(q=>q[0]+' ← '+q[1]).join('، ')}}
 if(t==='s'){const cats=[],it=[];a[2].split(';').forEach((c,k)=>{const i=c.indexOf(':');cats.push(c.slice(0,i));c.slice(i+1).split(',').forEach(x=>it.push({t:x,k}))});return{t,p:a[1],cats,it,hint:a[3],x:a[2].split(';').join(' | ').split(':').join(' ← ')}}
 if(t==='o')return{t,p:a[3]||'کلمه‌ها را به ترتیب بزن تا جمله بسازی',w:a[1].split(' '),hint:a[2],x:'جمله‌ی درست: '+a[1]};
 if(t==='w')return{t,p:a[1],ans:a[2].split('/'),hint:a[3],x:'پاسخ درست: '+a[2].split('/')[0]};
 if(t==='t')return{t,p:a[1],n:+a[2],hint:a[3],x:'تعداد درست: '+fa(a[2])};
 if(t==='c')return{t,p:a[1],tot:+a[2],k:+a[3],hint:a[4],x:'باید '+fa(a[3])+' خانه از '+fa(a[2])+' خانه را رنگ می‌کردی.'};
 if(t==='k'){const hm=a[2].split(':').map(Number);return{t,p:a[1],h:hm[0],m:hm[1],hint:a[3],x:'ساعت درست: '+fa(hm[0])+':'+fa(String(hm[1]).padStart(2,'0'))}}
 return{t:'m',p:s,o:[{h:'؟',ok:true}],hint:'',x:''};
}
const H=()=>$('opts');
const TY={};
TY.x=(q,done)=>{
 const L=q.pr.map((p,i)=>({t:p[0],i})),R=shuf(q.pr.map((p,i)=>({t:p[1],i})));let sel=null,w=0,n=0;
 H().innerHTML=`<div class="mt"><div class="mc">${L.map(o=>`<button class="mb" data-s="l" data-i="${o.i}">${o.t}</button>`).join('')}</div><div class="mc">${R.map(o=>`<button class="mb" data-s="r" data-i="${o.i}">${o.t}</button>`).join('')}</div></div>`;
 H().querySelectorAll('.mb').forEach(b=>b.onclick=()=>{
  if(lock||b.classList.contains('dn'))return;
  if(b.dataset.s==='l'){H().querySelectorAll('.mb').forEach(x=>x.classList.remove('sl'));b.classList.add('sl');sel=b;return}
  if(!sel)return;
  if(sel.dataset.i===b.dataset.i){sel.classList.remove('sl');sel.classList.add('dn','c'+(n%5));b.classList.add('dn','c'+(n%5));n++;sel=null;sfx('tap');if(n===q.pr.length)setTimeout(()=>done(w<=1),300)}
  else{w++;sfx('bad');b.classList.add('no');setTimeout(()=>b.classList.remove('no'),400)}
 });
};
TY.g=(q,done)=>{
 const cs=shuf(q.pr.reduce((a,p,i)=>a.concat([{t:p[0],i},{t:p[1],i}]),[]));let a1=null,w=0,n=0,busy=false;
 H().innerHTML='<div class="mem">'+cs.map((c,k)=>`<button class="cd" data-k="${k}">؟</button>`).join('')+'</div>';
 H().querySelectorAll('.cd').forEach(b=>b.onclick=()=>{
  if(lock||busy||b.classList.contains('up')||b.classList.contains('ok'))return;
  const c=cs[+b.dataset.k];b.textContent=c.t;b.classList.add('up');sfx('tap');
  if(!a1){a1=b;return}
  const ca=cs[+a1.dataset.k];
  if(ca.i===c.i){a1.classList.remove('up');b.classList.remove('up');a1.classList.add('ok');b.classList.add('ok');a1=null;n++;sfx('ok');if(n===q.pr.length)setTimeout(()=>done(w<=q.pr.length+1),400)}
  else{w++;busy=true;const x1=a1;a1=null;setTimeout(()=>{x1.classList.remove('up');x1.textContent='؟';b.classList.remove('up');b.textContent='؟';busy=false},800)}
 });
};
TY.b=(q,done)=>{
 const cols=['#ef4444','#3b82f6','#10b981','#f59e0b','#a855f7'];
 H().innerHTML='<div class="bls">'+q.o.map((o,i)=>`<button class="bl" data-i="${i}" style="background:${cols[i%5]};animation-delay:${i*.35}s">${o.h}</button>`).join('')+'</div>';
 H().querySelectorAll('.bl').forEach(b=>b.onclick=()=>{if(lock)return;const g=q.o[+b.dataset.i].ok;b.style.visibility='hidden';done(g)});
};
TY.s=(q,done)=>{
 let sel=null,w=0,left=q.it.length;const its=shuf(q.it.slice());
 H().innerHTML=`<div class="chipsr">${its.map((x,i)=>`<button class="ch" data-i="${i}">${x.t}</button>`).join('')}</div><div class="bks">${q.cats.map((c,k)=>`<button class="bk" data-k="${k}"><b>${c}</b><span></span></button>`).join('')}</div>`;
 H().querySelectorAll('.ch').forEach(b=>b.onclick=()=>{if(lock)return;H().querySelectorAll('.ch').forEach(x=>x.classList.remove('sl'));b.classList.add('sl');sel=b});
 H().querySelectorAll('.bk').forEach(b=>b.onclick=()=>{
  if(lock||!sel)return;const it=its[+sel.dataset.i];
  if(it.k===+b.dataset.k){b.querySelector('span').textContent+=it.t+' · ';sel.remove();sel=null;left--;sfx('tap');if(!left)setTimeout(()=>done(w<=1),300)}
  else{w++;sfx('bad');const s2=sel;s2.classList.add('no');setTimeout(()=>s2.classList.remove('no'),400)}
 });
};
TY.o=(q,done)=>{
 let pos=0,w=0;let ws=shuf(q.w.map((t,i)=>({t,i})));if(ws.every((x,i)=>x.i===i))ws=ws.reverse();
 H().innerHTML=`<div class="ans" id="an"></div><div class="chipsr">${ws.map(x=>`<button class="ch" data-i="${x.i}">${x.t}</button>`).join('')}</div>`;
 H().querySelectorAll('.ch').forEach(b=>b.onclick=()=>{
  if(lock)return;const i=+b.dataset.i;
  if(q.w[pos]===q.w[i]){$('an').textContent+=(pos?' ':'')+q.w[i];b.remove();pos++;sfx('tap');if(pos===q.w.length)setTimeout(()=>done(w<=2),300)}
  else{w++;sfx('bad');b.classList.add('no');setTimeout(()=>b.classList.remove('no'),400)}
 });
};
TY.w=(q,done)=>{
 let tr=0;
 H().innerHTML='<div class="wi2"><input id="wv" class="inp" autocomplete="off" placeholder="پاسخ را بنویس"><button class="act go" id="wb">بررسی</button></div><div class="note" id="wm"></div>';
 const chk=()=>{if(lock)return;const v=nz($('wv').value);if(!v)return;if(q.ans.some(a=>nz(a)===v))done(true);else{tr++;sfx('bad');if(tr>=2)done(false);else $('wm').textContent='نزدیک بود! یک بار دیگر امتحان کن.'}};
 $('wb').onclick=chk;$('wv').onkeydown=e=>{if(e.key==='Enter')chk()};
};
TY.t=(q,done)=>{
 let n=0,tr=0;
 H().innerHTML='<div class="tly" id="ty"></div><div class="ctr"><button id="ta">＋ یک خط</button><button id="tb">− پاک کردن</button><b id="tn">۰</b><button class="act go" id="tc">بررسی</button></div><div class="note" id="tm"></div>';
 const dr=()=>{let h='';const g=Math.floor(n/5),r=n%5;for(let i=0;i<g;i++)h+='<span class="tg5 f">'+'<i class="tl"></i>'.repeat(4)+'</span>';if(r)h+='<span class="tg5">'+'<i class="tl"></i>'.repeat(r)+'</span>';$('ty').innerHTML=h||'<small>هنوز خطی نکشیده‌ای</small>';$('tn').textContent=fa(n)};
 dr();
 $('ta').onclick=()=>{if(lock)return;n++;sfx('tap');dr()};$('tb').onclick=()=>{if(lock)return;n=Math.max(0,n-1);dr()};
 $('tc').onclick=()=>{if(lock)return;if(n===q.n)done(true);else{tr++;sfx('bad');if(tr>=2)done(false);else $('tm').textContent='دوباره بشمار و درست کن.'}};
};
TY.c=(q,done)=>{
 let tr=0;
 H().innerHTML='<div class="cells">'+Array.from({length:q.tot},(x,i)=>`<button class="cell" data-i="${i}"></button>`).join('')+'</div><div class="ctr"><button class="act go" id="cb">بررسی</button></div><div class="note" id="cm"></div>';
 H().querySelectorAll('.cell').forEach(b=>b.onclick=()=>{if(!lock){b.classList.toggle('on');sfx('tap')}});
 $('cb').onclick=()=>{if(lock)return;const n=H().querySelectorAll('.cell.on').length;if(n===q.k)done(true);else{tr++;sfx('bad');if(tr>=2)done(false);else $('cm').textContent='دوباره بشمار و رنگ کن.'}};
};
function clk(h,m){
 const P=(r,d)=>{const t=d*Math.PI/180;return [100+r*Math.sin(t),100-r*Math.cos(t)]};
 const a=P(46,(h%12+m/60)*30),b=P(70,m*6);let n='';
 for(let i=1;i<=12;i++){const p=P(78,i*30);n+=`<text x="${p[0]}" y="${p[1]+5}" text-anchor="middle" font-size="15" font-weight="900" fill="#1c2a55">${fa(i)}</text>`}
 return `<svg viewBox="0 0 200 200" class="clk"><circle cx="100" cy="100" r="94" fill="#fff" stroke="#1c2a55" stroke-width="5"/>${n}<line x1="100" y1="100" x2="${a[0]}" y2="${a[1]}" stroke="#1c2a55" stroke-width="7" stroke-linecap="round"/><line x1="100" y1="100" x2="${b[0]}" y2="${b[1]}" stroke="#e11d48" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="100" r="6" fill="#1c2a55"/></svg>`;
}
TY.k=(q,done)=>{
 let h=12,m=0,tr=0;
 const dr=()=>{$('ck').innerHTML=clk(h,m)+'<div class="ans">'+fa(h)+':'+fa(String(m).padStart(2,'0'))+'</div>'};
 H().innerHTML='<div id="ck"></div><div class="ctr"><button data-a="h1">ساعت ＋</button><button data-a="h-1">ساعت −</button><button data-a="m5">دقیقه ＋۵</button><button data-a="m-5">دقیقه −۵</button></div><div class="ctr"><button class="act go" id="kb">بررسی</button></div><div class="note" id="km"></div>';
 dr();
 H().querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{if(lock)return;const a=b.dataset.a,d=+a.slice(1);if(a[0]==='h')h=(h+d+11)%12+1;else m=(m+d+60)%60;dr()});
 $('kb').onclick=()=>{if(lock)return;if(m===q.m&&h%12===q.h%12)done(true);else{tr++;sfx('bad');if(tr>=2)done(false);else $('km').textContent='عقربه‌ها را دوباره تنظیم کن (کوتاه = ساعت، بلند = دقیقه).'}};
};
/* ---------- notes & symbols ---------- */
const noteOf=c=>{const t=(BANK.notes||{})[c.id];return t?t.split('\n').filter(x=>x.trim()):NOTES[c.id]};
const noteHtml=a=>`<h2 class="nt2">📖 درس‌نامه: ${esc(a[0])}</h2>`+a.slice(1).map(l=>l[0]==='#'?`<div class="nh">${esc(l.slice(1))}</div>`:`<div class="nl">${esc(l)}</div>`).join('');
const FLAG=w=>`<svg viewBox="0 0 90 60" width="${w}" style="border-radius:4px;box-shadow:0 2px 6px #0006"><rect width="90" height="20" fill="#239f40"/><rect y="20" width="90" height="20" fill="#fff"/><rect y="40" width="90" height="20" fill="#da0000"/><circle cx="45" cy="30" r="7" fill="none" stroke="#da0000" stroke-width="3"/><path d="M45 21v18M38 30h14" stroke="#da0000" stroke-width="2.4"/></svg>`;
const BOT=`<svg viewBox="0 0 40 50" width="38"><path d="M20 3C32 3 38 15 33 28 29 38 19 46 10 44 3 42 3 33 9 29 14 26 19 28 19 31 19 24 12 20 14 12 15 6 18 3 20 3Z" fill="#ffd44d"/></svg>`;
const SYM=[
 {ic:FLAG(46),n:'پرچم ایران',x:'پرچم ایران سه رنگ دارد: سبز، سفید و سرخ. سبز نشانه‌ی رویش و زندگی، سفید نشانه‌ی صلح و پاکی و سرخ نشانه‌ی دلاوری است.'},
 {ic:'⚔️🐎',n:'رستم و سهراب',x:'رستم پهلوان بزرگ شاهنامه است و اسبش «رخش» نام دارد. سهراب پسر رستم است. فردوسی، شاعر بزرگ ایرانی، این داستان‌ها را به شعر سروده است.'},
 {ic:'📜',n:'حافظ',x:'حافظ شاعر بزرگ ایرانی و اهل شیراز است. بیش از هفتصد سال پیش زندگی می‌کرد و هنوز شعرهایش را در سراسر ایران دوست دارند.'},
 {ic:BOT,n:'بته‌جقه',x:'بته‌جقه نقشی سنتی و زیبا در هنر ایران است. آن را روی فرش، ترمه و پارچه‌ها می‌بینیم.'}];
function symOpen(i){const s=SYM[i],m=$('md');m.innerHTML=`<div class="fbc g2"><div style="font-size:46px">${s.ic}</div><h2 style="font-size:24px">${s.n}</h2><div style="line-height:2;font-size:15px">${s.x}</div><button class="tool" id="rcx">بستن</button></div>`;m.classList.remove('hide');$('rcx').onclick=()=>m.classList.add('hide');sfx('unlock')}
document.querySelectorAll('[data-flag]').forEach(e=>{e.innerHTML=FLAG(+e.dataset.flag)});

/* ---------- structure ---------- */
function mkSecs(pre,kind,n,known){const a=[];for(let i=1;i<=n;i++)a.push(Object.assign({id:pre+i,name:kind+' '+fa(i),t:''},known[i]||{}));return a}
const EXTRA2={
s1:[['تمرین',[
'm|پنج حس ما کدام است؟|بینایی، شنوایی، بویایی، چشایی، لامسه|بینایی، شنوایی، ترس، خنده، لامسه|بینایی، دویدن، بویایی، چشایی، لامسه|بینایی، شنوایی، بویایی، خواب، لامسه|پنج حس: چشم، گوش، بینی، زبان و پوست.',
'x|هر حس را به کارش وصل کن|بینایی>دیدن با چشم;شنوایی>شنیدن با گوش;بویایی>بوییدن با بینی;چشایی>چشیدن با زبان;لامسه>لمس کردن با پوست|هر حس یک عضو دارد.',
'm|برای اینکه مشاهده‌هایمان را فراموش نکنیم چه کار می‌کنیم؟|یادداشت می‌کنیم|فراموش می‌کنیم|فقط می‌بوییم|می‌خوابیم|یادداشت کردن کمک می‌کند دقیق بگوییم.',
'm|کدام کار ممکن است برای ما ضرر داشته باشد؟|بوییدن و چشیدن بعضی چیزها|نگاه کردن با دقت|گوش دادن|یادداشت کردن|هر چیزی را نباید بچشیم یا ببوییم.']],
['بازی ویژه',[
's|هر کار با کدام حس انجام می‌شود؟|بینایی:خواندن کتاب,دیدن رنگین‌کمان;شنوایی:شنیدن زنگ مدرسه,گوش دادن به لالایی;بویایی:بوییدن گل,بوی نان تازه|اول فکر کن با چه عضوی کار می‌کنی.',
'g|عضو و حس را جفت کن|چشم>بینایی;گوش>شنوایی;بینی>بویایی;زبان>چشایی|هر حس یک عضو دارد.',
'b|بادکنک بزن! با کدام حس بوی گل را می‌فهمیم؟|بویایی|بینایی|شنوایی|چشایی|با بینی می‌بوییم.',
'o|ما با پنج حس دنیا را مشاهده می‌کنیم|با «ما» شروع کن.']]],
s2:[['تمرین',[
'm|کدام کار هوا را آلوده می‌کند؟|دود کارخانه و ماشین|کاشتن درخت|سوار شدن مترو|پیاده‌روی|دود هوا را آلوده می‌کند.',
'm|برای کم شدن آلودگی هوا چه کار کنیم؟|درخت بکاریم|ماشین‌های بیشتر روشن کنیم|کارخانه را وسط شهر بسازیم|زباله بسوزانیم|درخت و وسایل عمومی کمک می‌کنند.',
'm|اگر زباله را در رودخانه بریزیم چه می‌شود؟|آب آلوده می‌شود|آب پاک‌تر می‌شود|ماهی‌ها خوشحال می‌شوند|هیچ اتفاقی نمی‌افتد|آب آلوده جانوران را بیمار می‌کند.',
's|کار خوب یا کار بد؟|کار خوب:کاشتن درخت,سوار شدن مترو,ریختن زباله در سطل;کار بد:ریختن زباله در رود,باز گذاشتن شیر آب,دود کردن ماشین|به آب و هوای پاک فکر کن.']],
['بازی ویژه',[
'x|چه کسی از آب چه استفاده می‌کند؟|ماهی>در آب زندگی می‌کند;کشاورز>زمین را آبیاری می‌کند;مادر>غذا می‌پزد;کودک>تشنگی را برطرف می‌کند|هر کس از آب کاری می‌کند.',
'b|بادکنک بزن! در تصفیه‌خانه چه کار می‌کنند؟|آلودگی آب را جدا می‌کنند|آب را رنگی می‌کنند|به آب ماهی می‌ریزند|آب را گرم می‌کنند|تصفیه یعنی پاک کردن آب.',
'g|جفت کن|دود کارخانه>هوای آلوده;درخت>هوای پاک;آب آلوده>بیماری جانوران;تصفیه‌خانه>آب قابل آشامیدن|هر چیز اثری دارد.',
'o|ما آب را بیهوده باز نمی‌گذاریم|با «ما» شروع کن.']]],
s3:[['تمرین',[
'm|زمین شبیه چیست؟|توپ (کره)|میز|مکعب|مثلث|زمین گرد است.',
'm|روز و شب چرا به وجود می‌آیند؟|چرخش زمین به دور خودش|خاموش شدن خورشید|آمدن ابرها|گم شدن ماه|زمین مثل فرفره می‌چرخد.',
'm|یک شبانه‌روز چند ساعت است؟|۲۴ ساعت|۱۲ ساعت|۶ ساعت|۱۰۰ ساعت|یک بار چرخش کامل زمین.',
'w|وسیله‌ای که دمای هوا را اندازه می‌گیرد چه نام دارد؟|دماسنج|دما یعنی گرمی و سردی.']],
['بازی ویژه',[
'x|وصل کن|روز>قسمتی که رو به خورشید است;شب>قسمتی که پشت به خورشید است;دماسنج>اندازه‌ی گرمی و سردی;شبانه‌روز>۲۴ ساعت|به خورشید نگاه کن.',
's|چه کسی شب‌ها فعال است؟|شب‌ها فعال است:جغد,خفاش,گل‌شب‌بو;برای آرامش ما شب‌ها کار می‌کند:پزشک,پرستار,آتش‌نشان|به شب فکر کن.',
'b|بادکنک بزن! مایع قرمز داخل دماسنج چیست؟|الکل|جیوه|آب|شیر|مایع نقره‌ای جیوه و مایع قرمز الکل است.',
'o|گیاهان با نور خورشید غذا می‌سازند|با «گیاهان» شروع کن.']]],
s4:[['تمرین',[
'm|چرا تابستان گرم‌تر از زمستان است؟|نور خورشید راست می‌تابد|خورشید کوچک می‌شود|ابرها زیاد می‌شوند|زمین ثابت می‌ماند|نور راست گرمای بیشتری می‌دهد.',
'm|چهار فصل سال کدام است؟|بهار، تابستان، پاییز، زمستان|بهار، تابستان، شب، روز|صبح، ظهر، عصر، شب|برف، باران، گرما، باد|فصل‌ها را به ترتیب بگو.',
'm|به حرکت هوا چه می‌گویند؟|باد|دما|سایه|صدا|باد هوای در حال حرکت است.',
'm|جهت وزش باد را با چه می‌فهمیم؟|بادنما|دماسنج|خط‌کش|ترازو|بادنما جهت باد را نشان می‌دهد.']],
['بازی ویژه',[
'x|وسیله را به کارش وصل کن|بادنما>جهت وزش باد;فرفره>سرعت وزش باد;دماسنج>گرمی و سردی هوا;طوفان>باد شدید|هر وسیله یک کار دارد.',
'g|جفت کن|تابستان>نور راست و گرما;زمستان>نور مایل و سرما;باد>حرکت هوا;طوفان>باد بسیار شدید|به نور خورشید فکر کن.',
'b|بادکنک بزن! با کمک باد کدام کار انجام می‌شود؟|خشک شدن لباس‌ها|پختن غذا|روشن شدن لامپ|شنا کردن|لباس خیس در باد زود خشک می‌شود.',
'o|باد در بیابان تپه‌های ماسه‌ای می‌سازد|با «باد» شروع کن.']]],
s5:[['تمرین',[
'm|کدام دو حس در ارتباط با دیگران مهم هستند؟|بینایی و شنوایی|بویایی و چشایی|لامسه و چشایی|بویایی و لامسه|با نور و صدا پیام می‌دهیم.',
'm|آمبولانس با آژیر نزدیک می‌شود. رانندگان چه کار باید بکنند؟|راه را باز کنند|بوق بزنند|سرعت بگیرند|وسط خیابان بایستند|جان یک بیمار در خطر است.',
'm|صدا بر اثر چه چیزی ایجاد می‌شود؟|لرزش|سکوت|نور|گرما|هر وقت چیزی بلرزد صدا می‌آید.',
'm|وقتی حرف می‌زنیم چه چیزی در گلو می‌لرزد؟|تارهای صوتی|دندان‌ها|ناخن‌ها|موها|تارهای صوتی حنجره می‌لرزند.']],
['بازی ویژه',[
's|صدا را جور کن|پیام‌رسان:زنگ ساعت,زنگ در حیاط,اذان;لذت‌بخش:آواز پرندگان,لالایی مادر|ببین صدا چه حسی می‌دهد.',
'x|پیام را به وسیله‌اش وصل کن|آمبولانس>آژیر و نور;ماشین>بوق و چراغ;زنگ در>خبر آمدن مهمان;نقاره>طلوع و غروب خورشید در مشهد|از نور و صدا پیام می‌گیریم.',
'b|بادکنک بزن! کدام کار به گوش‌های ما آسیب می‌رساند؟|شنیدن صدای خیلی بلند|شنیدن لالایی|شنیدن آواز پرنده|گوش دادن به باران|صدای بلند به گوش آسیب می‌زند.',
'o|صدا بر اثر لرزش ایجاد می‌شود|با «صدا» شروع کن.']]],
s6:[['تمرین',[
'm|رنگ سبز چراغ راهنمای رانندگان یعنی …|حرکت|احتیاط|ایست|برگشت|سبز یعنی برو.',
'm|رنگ قرمز چراغ راهنما یعنی …|ایست|حرکت|احتیاط|سرعت بگیر|قرمز یعنی بایست.',
'm|رنگ زرد چراغ راهنما یعنی …|احتیاط|ایست|حرکت|خواب|زرد یعنی با احتیاط.',
'm|بزرگ‌ترین چشمه‌ی نوری که می‌شناسیم چیست؟|خورشید|شمع|لامپ|شب‌تاب|خورشید از همه بزرگ‌تر است.']],
['بازی ویژه',[
'x|چراغ را به معنایش وصل کن|🟢>حرکت;🟡>احتیاط;🔴>ایست;شمع روشن>چشمه‌ی نور|رنگ چراغ را به یاد بیاور.',
's|نور از کدام اجسام می‌گذرد؟|نور عبور می‌کند:شیشه,آب;نور عبور نمی‌کند:دیوار,چوب,کتاب|اجسام کدر سایه دارند.',
'g|جفت کن|شیشه>سایه ندارد;دیوار>سایه دارد;آب>نور را رد می‌کند;ساعت آفتابی>زمان را با سایه نشان می‌دهد|سایه را به یاد بیاور.',
'b|بادکنک بزن! شب‌تاب در تاریکی چه کار می‌کند؟|نور تولید می‌کند|خاموش می‌شود|صدا می‌دهد|می‌خوابد|شب‌تاب چشمه‌ی نور است.']]],
s7:[['تمرین',[
'm|بنزین و گازوییل را از چه به دست می‌آورند؟|نفت|آب|چوب|شن|نفت منبع طبیعی سوخت است.',
'm|کدام کار باعث مصرف کمتر سوخت می‌شود؟|خاموش کردن ماشین ایستاده|روشن گذاشتن ماشین|باز گذاشتن پنجره‌ها|سفر با ماشین شخصی|وقتی ایستاده‌ایم خاموش کنیم.',
'm|چرا نباید زیاد از چوب استفاده کنیم؟|جنگل‌ها نابود می‌شوند|چوب سنگین است|چوب رنگی است|چوب خوشمزه است|زغال از چوب درخت به دست می‌آید.',
's|سوخت یا نه؟|سوخت است:نفت,بنزین,گاز,گازوییل;سوخت نیست:آب,هوا,شن|سوخت می‌سوزد و گرما می‌دهد.']],
['بازی ویژه',[
's|مصرف سوخت را جور کن|مصرف کم:استفاده از اتوبوس,بستن در و پنجره,پوشیدن لباس گرم;مصرف زیاد:روشن ماندن ماشین ایستاده,باز گذاشتن پنجره در زمستان,رفتن تنها با ماشین شخصی|به صرفه‌جویی فکر کن.',
'x|وصل کن|خورشید>نور و گرمای فراوان و ارزان;نفت>بنزین و گازوییل;چوب>زغال;اتوبوس>خیابان کم‌شلوغ‌تر|هر چیز یک نتیجه دارد.',
'b|بادکنک بزن! کدام انرژی هوا را آلوده نمی‌کند؟|نور خورشید|بنزین|گازوییل|زغال|خورشید پاک و ارزان است.',
'o|با اتوبوس رفتن سوخت کمتری مصرف می‌کند|با «با» شروع کن.']]],
s8:[['تمرین',[
'm|به وسیله‌هایی که کار ما را راحت‌تر می‌کنند چه می‌گویند؟|ابزار|بازیافت|سوخت|سایه|ابزار کار را آسان می‌کند.',
'm|کدام ابزار پیچیده است؟|چرخ خیاطی|چاقو|پیچ‌گوشتی|قیچی|چرخ خیاطی و اتومبیل پیچیده هستند.',
'm|ابزارهای خطرناک را چگونه باید به کار ببریم؟|زیر نظر بزرگ‌ترها|تنها و بدون اجازه|با چشم بسته|با بازی|مراقب خودمان باشیم.',
'm|دوباره ساختن وسیله از مواد کهنه چه نام دارد؟|بازیافت|مشاهده|تصفیه|طوفان|بازیافت یعنی دوباره استفاده.']],
['بازی ویژه',[
's|کدام را بازیافت می‌کنیم؟|بازیافت می‌شود:کاغذ باطله,پلاستیک کهنه,قوطی کنسرو,شیشه‌ی شکسته;زباله‌ی تر:پوست موز,بقایای غذا|مواد کهنه را دوباره می‌سازیم.',
's|ابزارها را جور کن|ساده:چاقو,پیچ‌گوشتی;پیچیده:چرخ خیاطی,اتومبیل|ببین چند قسمت دارد.',
'g|جفت کن|کاغذ باطله>کاغذ نو;پلاستیک کهنه>وسیله‌ی تازه;شیشه‌ی شکسته>شیشه‌ی نو;ظرف پلاستیکی>ذوب و ساخت دوباره|بازیافت یعنی دوباره ساختن.',
'o|ما کاغذ استفاده شده را بازیافت می‌کنیم|با «ما» شروع کن.']]]
};
Object.keys(EXTRA2).forEach(k=>{BANKS[k]=EXTRA2[k]});
Object.assign(NOTES,{
s1:['زنگ علوم','• مشاهده یعنی از همه‌ی حس‌هایمان درست استفاده کنیم؛ با دقت نگاه کنیم و گوش بدهیم.','• پنج حس: بینایی، شنوایی، بویایی، چشایی، لامسه.','• مشاهده‌هایمان را یادداشت می‌کنیم تا فراموش نکنیم و دقیق بگوییم.','• بوییدن و چشیدن بعضی چیزها ضرر دارد؛ مراقب باشیم.'],
s2:['هوای سالم، آب سالم','#هوا','• دود کارخانه، دود ماشین و گرد و غبار هوا را آلوده می‌کنند و انسان، جانوران و گیاهان را بیمار می‌کنند.','• کم کردن آلودگی: کمتر ماشین شخصی، استفاده از اتوبوس و مترو، کاشتن درخت، دور کردن کارخانه از شهر.','#آب','• همه‌ی جانداران برای زنده ماندن به آب سالم نیاز دارند؛ زباله در رود و دریا آب را آلوده می‌کند.','• در تصفیه‌خانه آلودگی آب را جدا می‌کنند تا قابل آشامیدن شود؛ آب را بیهوده باز نگذاریم.'],
s3:['زندگی ما و گردش زمین ۱','• زمین مثل یک توپ (کره) است و خورشید آن را روشن و گرم می‌کند.','• قسمتی که رو به خورشید است روز و قسمتی که پشت به خورشید است شب است.','• زمین به دور خودش می‌چرخد؛ یک بار چرخش کامل ۲۴ ساعت (یک شبانه‌روز) طول می‌کشد.','• دمای هوا یعنی گرمی و سردی؛ با دماسنج اندازه می‌گیریم (جیوه نقره‌ای، الکل قرمز).','• گیاهان با نور خورشید غذا می‌سازند؛ جغد و خفاش شب‌ها شکار می‌کنند و پزشک و پرستار و آتش‌نشان شب‌ها برای آرامش ما کار می‌کنند.'],
s4:['زندگی ما و گردش زمین ۲','• وقتی نور خورشید راست می‌تابد هوا گرم‌تر است؛ در تابستان راست و در زمستان کج و مایل می‌تابد.','• چهار فصل: بهار، تابستان، پاییز، زمستان.','• حرکت هوا باد است؛ بادنما جهت باد و فرفره سرعت باد را نشان می‌دهد.','• باد آسیاب را می‌چرخاند، قایق بادبانی را می‌راند و لباس را خشک می‌کند؛ باد شدید طوفان است و خسارت می‌زند.'],
s5:['پیام رمز را پیدا کن ۱','• بینایی و شنوایی دو حس مهم ارتباط هستند؛ با نور و صدا پیام می‌دهیم (بوق، چراغ، آژیر).','• وقتی آمبولانس نزدیک می‌شود راه را باز می‌کنیم چون جان بیمار در خطر است.','• صدا بر اثر لرزش ایجاد می‌شود؛ وقتی حرف می‌زنیم تارهای صوتی می‌لرزند.','• صدای زنگ و اذان پیام‌رسان و آواز پرنده و لالایی لذت‌بخش است؛ صدای بلند به گوش آسیب می‌زند و از هدفون زیاد استفاده نکنیم.'],
s6:['پیام رمز را پیدا کن ۲','• چراغ راهنمای رانندگان: سبز = حرکت، زرد = احتیاط، قرمز = ایست. چراغ عابر پیاده دو رنگ دارد: سبز حرکت و قرمز ایست.','• هر جسمی که خودش نور بدهد چشمه‌ی نور است: خورشید (بزرگ‌ترین)، لامپ، شمع روشن، شب‌تاب.','• برای دیدن چیزی نور باید به آن بتابد و به چشم ما برسد.','• نور از جسم کدر نمی‌گذرد و سایه می‌سازد؛ از آب و شیشه می‌گذرد و سایه ندارند. ساعت آفتابی با سایه زمان را نشان می‌داد.'],
s7:['اگر تمام شود …','• به نفت، بنزین، گاز و گازوییل سوخت می‌گویند؛ می‌سوزند و گرما می‌دهند.','• بنزین و گازوییل از نفت به دست می‌آیند؛ زغال از چوب است و زیاد استفاده از چوب جنگل‌ها را نابود می‌کند.','• برای مصرف کمتر: وسایل عمومی، خاموش کردن ماشین ایستاده، لباس گرم پوشیدن، بستن در و پنجره.','• نور خورشید فراوان و ارزان است و هوا را آلوده نمی‌کند.'],
s8:['بسازیم و لذت ببریم!','• ابزار وسیله‌ای است که کار را راحت‌تر می‌کند: ساده (چاقو، پیچ‌گوشتی) و پیچیده (چرخ خیاطی، اتومبیل).','• از ابزارهای خطرناک فقط زیر نظر بزرگ‌ترها استفاده می‌کنیم.','• بازیافت یعنی دوباره استفاده از مواد: کاغذ، پلاستیک کهنه، شیشه‌ی شکسته و قوطی کنسرو.']
});
const SK={1:{t:'زنگ علوم'},2:{t:'هوای سالم، آب سالم'},3:{t:'زندگی ما و گردش زمین ۱'},4:{t:'زندگی ما و گردش زمین ۲'},5:{t:'پیام رمز را پیدا کن ۱'},6:{t:'پیام رمز را پیدا کن ۲'},7:{t:'اگر تمام شود …'},8:{t:'بسازیم و لذت ببریم'}};
const MT={3:'شکل‌های هندسی',4:'عددهای سه‌رقمی',5:'جمع و تفریق سه‌رقمی',6:'اندازه‌گیری و زمان',7:'کسر و پول',8:'آمار و احتمال'};
const FT={2:'مسجد محله‌ی ما',3:'بی و علامت‌های نگارشی',4:'مدرسه‌ی خرگوش‌ها',5:'چوپان درست‌کار',6:'کوشا و نوشا',7:'دوستان ما',8:'از همه مهربان‌تر',10:'هنرمند',12:'فردوسی',13:'ایران زیبا',14:'پرچم',15:'نوروز',16:'پرواز قطره',17:'فصل‌ها'};
const mk=(t,tp)=>({t,tops:tp});
const MK={};for(const k in MT)MK[k]={t:MT[k]};
MK[1]={t:'عدد و رقم',gen:W1,tops:['عدد و شمارش','دسته‌های ده‌تایی و یکی','رسم شکل','جمع و تفریق','شمارش چندتا‌چندتا']};
MK[2]={t:'جمع و تفریق دو رقمی',gen:W2,tops:['جمع بدون رقم نقلی','جمع با رقم نقلی','تفریق بدون قرض','تفریق با قرض','ترکیبی: جمع و تفریق']};
const FK={};for(const k in FT)FK[k]={t:FT[k]};
FK[1]={t:'ستایش و کتابخانه‌ی کلاس ما',gen:WF,tops:['املا و غلط‌یابی','واژه‌سازی','«ـ‌ای» بعد از کلمه','شعر «یار مهربان»','درک مطلب و واژگان']};
const SUBJ=[
 {id:'math',icon:'🔢',name:'دنیای ریاضی',sub:'هشت فصل ماجراجویی',secs:mkSecs('m','فصل',8,MK)},
 {id:'fa',icon:'📚',name:'دنیای فارسی',sub:'هفده درس زیبا',secs:mkSecs('f','درس',17,FK)},
 {id:'sci',icon:'🔬',name:'دنیای علوم',sub:'کشف و آزمایش',secs:mkSecs('s','فصل',8,SK)}];
const SECS={};SUBJ.forEach(su=>su.secs.forEach(c=>{c.su=su;SECS[c.id]=c}));
const secTitle=c=>BANK.titles[c.id]||c.t||'';
const secLabel=c=>c.name+(secTitle(c)?' · '+secTitle(c):'');
function stagesOf(c){const a=[];if(c.gen)c.tops.forEach((n,i)=>a.push({n,mk:j=>c.gen[i](j),cnt:6,si:i}));(BANKS[c.id]||[]).forEach(b=>a.push({n:b[0],dsl:b[1],cnt:b[1].length}));(BANK.stages[c.id]||[]).forEach(s=>{if(s.q&&s.q.length)a.push({n:s.n,cu:s,cnt:Math.min(10,s.q.length)})});return a}
function stageQs(st){if(st.mk)return [0,1,2,3,4,5].map(i=>gameify(st.mk(i),i,st.si));if(st.dsl)return st.dsl.map(parseQ);return shuf(st.cu.q).slice(0,10).map(c=>({p:c.p,v:'',o:shuf(c.o.map((h,k)=>({h:esc(h),ok:k===c.c}))),hint:c.h||'یک بار دیگر با دقت بخوان.',x:c.x||('پاسخ درست: '+esc(c.o[c.c]))}))}
const SCR=['home','login','teach','worlds','secs','note','stages','game','end','shop'];
function renderShop(){
 $('shc').textContent='🪙 '+fa(P.coins);
 $('shl').innerHTML=SHOP.map(cat=>`<div class="pt">${cat.t}</div><div class="shg">${cat.items.map(it=>{const own=P.shop.own.includes(it.id),on=P.shop.eq[cat.c]===it.id;
  const pv=cat.c==='wing'?`<i class="dot" style="background:linear-gradient(#fff,${WC[it.v]})"></i>`:cat.c==='halo'?`<i class="dot" style="background:${it.v}"></i>`:(it.v||'∅');
  return `<button class="si${on?' on':''}" data-c="${cat.c}" data-id="${it.id}"><span class="sv">${pv}</span><b>${it.n}</b><small>${on?'پوشیده ✓':own?'بپوش':fa(it.p)+' 🪙'}</small></button>`}).join('')}</div>`).join('');
 document.querySelectorAll('#shl .si').forEach(b=>b.onclick=()=>shopTap(b.dataset.c,b.dataset.id));
 refreshGw();show('shop');
}
function shopTap(c,id){
 const it=SHOP.find(x=>x.c===c).items.find(i=>i.id===id);
 if(P.shop.eq[c]===id)return;
 if(!P.shop.own.includes(id)){
  if(P.coins<it.p){toast('سکه‌ات کافی نیست! با جواب درست سکه جمع کن 🪙');sfx('bad');return}
  P.coins-=it.p;P.shop.own.push(id);sfx('unlock');
 }else sfx('tap');
 P.shop.eq[c]=id;save();renderShop();
}
const paintHb=()=>{
 $('coinp').textContent='🪙 '+fa(P.coins);
 $('hb').textContent=hints>0?'🪶 راهنمای سیمرغ ('+fa(hints)+')':'🪶 راهنما ('+fa(HC)+' 🪙)';
 const el=cur&&cur.o&&(!cur.t||cur.t==='m'||cur.t==='b')&&cur.o.length>2&&!cur.cut;
 $('ex').style.display=el?'':'none';$('ex').textContent='✂️ حذف گزینه ('+fa(EC)+' 🪙)';
};
function useHint(){
 if(!cur||lock||!$('hint').classList.contains('hide'))return;
 if(hints>0)hints--;
 else if(P.coins>=HC){P.coins-=HC;save()}
 else{toast('سکه‌ات کافی نیست! با جواب درست سکه جمع کن 🪙');sfx('bad');return}
 sfx('hint');paintHb();
 $('hint').innerHTML=cur.hint||'با دقت دوباره بخوان.';$('hint').classList.remove('hide');
}
function useCut(){
 if(!cur||lock||cur.cut||!cur.o||cur.o.length<3)return;
 if(P.coins<EC){toast('سکه‌ات کافی نیست! با جواب درست سکه جمع کن 🪙');sfx('bad');return}
 P.coins-=EC;cur.cut=1;save();sfx('hint');
 const wr=shuf(cur.o.map((o,i)=>i).filter(i=>!cur.o[i].ok)).slice(0,Math.min(2,cur.o.length-2));
 const els=document.querySelectorAll(cur.t==='b'?'.bl':'.opt');
 wr.forEach(i=>{els[i].style.visibility='hidden';els[i].disabled=true});
 paintHb();
}
$('hb').onclick=useHint;$('ex').onclick=useCut;$('shopb').onclick=renderShop;$('b6').onclick=renderWorlds;

const HL=3;
let SU,W,SI,S,Q,cur,hints,resetArm=false,qArm=false;
function show(id){SCR.forEach(s=>$(s).classList.toggle('hide',s!==id));window.scrollTo(0,0)}
const lvl=()=>Math.floor(P.xp/100)+1;
const starsOf=p=>Object.values(p||{}).reduce((a,r)=>a+(r||[]).reduce((x,y)=>x+(y||0),0),0);
function touchStreak(){const f=x=>x.getFullYear()+'-'+(x.getMonth()+1)+'-'+x.getDate(),d=new Date(),t=f(d);if(P.last===t)return;P.streak=(P.last===f(new Date(d.getTime()-864e5)))?(P.streak||0)+1:1;P.last=t}
/* ---------- home ---------- */
function renderHome(){
 $('hbox').innerHTML=`<button class="rb gold" id="hT"><span class="ri">🧑‍🏫</span><span class="rt"><b>من معلم هستم</b><small>ورود به پنل معلم</small></span><span class="rc">‹</span></button><button class="rb blue" id="hS"><span class="ri">🎓</span><span class="rt"><b>من دانش‌آموز هستم</b><small>${P.name?'ادامه، '+esc(P.name):'ورود و شروع ماجراجویی'}</small></span><span class="rc">‹</span></button>`;
 $('hT').onclick=()=>show('login');
 $('hS').onclick=()=>{P.name?renderWorlds():studentForm()};
 show('home');
}
function studentForm(){
 $('hbox').innerHTML=`<label class="lb" for="nm">اسمت چیه قهرمان؟</label><input id="nm" class="inp" maxlength="20" placeholder="اسمت را بنویس" autocomplete="off"><button class="btn gold" id="ent">ورود به ماجراجویی</button><button class="tool" id="bk">بازگشت</button>`;
 const go=()=>{const v=$('nm').value.trim();if(!v){$('nm').focus();return}P.name=v;save();sfx('unlock');renderWorlds()};
 $('ent').onclick=go;$('nm').onkeydown=e=>{if(e.key==='Enter')go()};$('bk').onclick=renderHome;
}
/* ---------- dashboard ---------- */
function nextMission(){for(const su of SUBJ)for(const c of su.secs){const st=stagesOf(c),pr=P.prog[c.id]||[];for(let i=0;i<st.length;i++){if((pr[i]||0)===0&&(i===0||(pr[i-1]||0)>0))return{su,c,i,st:st[i]}}}return null}
function renderWorlds(){
 $('wgreet').textContent='سلام '+P.name+'! 👋';
 const xp=P.xp%100;
 $('stat').innerHTML=`<div class="sc"><b>⭐ سطح ${fa(lvl())}</b><i class="wb"><u style="width:${xp}%"></u></i><small>${fa(xp)} / ${fa(100)} XP</small></div><div class="sc"><b>🪙 ${fa(P.coins)}</b><small>سکه</small></div><div class="sc"><b>🔥 ${fa(P.streak||0)}</b><small>روز متوالی</small></div>`;
 const m=nextMission();
 $('mis').innerHTML=m?`<div class="mtag">🎯 مأموریت امروز</div><h3>${m.su.icon} ${esc(secLabel(m.c))}</h3><div class="mdesc">${esc(m.st.n)}</div><div class="mrow"><span>📝 ${fa(m.st.cnt)} سؤال</span><span>✨ +${fa(m.st.cnt*10)} XP</span><button class="btn gold sm" id="mgo">شروع مأموریت</button></div>`:`<div class="mtag">🏆</div><h3>همه‌ی مرحله‌ها را گذراندی!</h3><div class="mdesc">منتظر درس‌های تازه باش.</div>`;
 if(m)$('mgo').onclick=()=>{SU=m.su;W=m.c;startStage(m.i)};
 $('wlist').innerHTML=SUBJ.map((su,i)=>{let d=0,s=0,tot=0;su.secs.forEach(c=>{const st=stagesOf(c),pr=P.prog[c.id]||[];tot+=st.length;st.forEach((x,k)=>{if((pr[k]||0)>0)d++;s+=pr[k]||0})});
  return `<button class="tile ${['tb','tg','to'][i]}" data-i="${i}"><span class="ti">${su.icon}</span><b>${su.name}</b><small>${su.sub}</small><i class="wb"><u style="width:${tot?d/tot*100:0}%"></u></i><span class="ts">⭐ ${fa(s)}</span></button>`}).join('');
 document.querySelectorAll('#wlist .tile').forEach(b=>b.onclick=()=>{SU=SUBJ[+b.dataset.i];renderSecs()});
 $('sy').innerHTML=SYM.map((s,i)=>`<button class="sym" data-i="${i}"><span>${s.ic}</span><small>${s.n}</small></button>`).join('');
 document.querySelectorAll('#sy .sym').forEach(b=>b.onclick=()=>symOpen(+b.dataset.i));
 $('rst').textContent='پاک کردن پیشرفت';resetArm=false;
 show('worlds');
}
function renderSecs(){
 $('ctitle').textContent=SU.icon+' '+SU.name;
 $('clist').innerHTML=SU.secs.map((c,i)=>{const st=stagesOf(c),pr=P.prog[c.id]||[],t=secTitle(c);
  if(!st.length)return `<div class="wc soon"><span class="num lk">${fa(i+1)}</span><span class="wt"><b>${c.name}${t?' · '+esc(t):''}</b><small>به‌زودی</small></span><span class="ws">🔒</span></div>`;
  const d=st.filter((x,k)=>(pr[k]||0)>0).length,s=pr.reduce((a,b)=>a+(b||0),0);
  return `<button class="wc" data-i="${i}"><span class="num">${fa(i+1)}</span><span class="wt"><b>${c.name}${t?' · '+esc(t):''}</b><small>${fa(st.length)} مرحله</small><i class="wb"><u style="width:${d/st.length*100}%"></u></i></span><span class="ws">⭐ ${fa(s)}/${fa(st.length*3)}</span></button>`}).join('');
 document.querySelectorAll('#clist button.wc').forEach(b=>b.onclick=()=>{W=SU.secs[+b.dataset.i];renderNote()});
 show('secs');
}
function renderStages(){
 const st=P.prog[W.id]||[],stg=stagesOf(W);
 $('stitle').textContent=SU.icon+' '+W.name;$('ssub').textContent=secTitle(W);
 $('slist').innerHTML=stg.map((x,s)=>{const open=s===0||(st[s-1]||0)>0,n=st[s]||0;
  return `<button class="sn${open?'':' lock'}" data-s="${s}"${open?'':' disabled'}><span class="num">${open?fa(s+1):'🔒'}</span><span class="nt"><b>${esc(x.n)}</b><small>${fa(x.cnt)} سؤال</small></span><span class="stt">${'⭐'.repeat(n)+'☆'.repeat(3-n)}</span></button>`}).join('');
 document.querySelectorAll('.sn:not(.lock)').forEach(b=>b.onclick=()=>startStage(+b.dataset.s));
 $('bn').style.display=noteOf(W)?'':'none';
 show('stages');
}
function renderNote(){const n=noteOf(W);if(!n)return renderStages();$('nb').innerHTML=noteHtml(n);show('note')}
/* ---------- game ---------- */
function startStage(s){
 SI=s;const stg=stagesOf(W)[s];Q=stageQs(stg);cur=null;
 S={q:0,hearts:HL,combo:0,xp:0,coins:0,ok:0,heal:0,n:stg.n};hints=2;lock=false;
 $('fb').classList.add('hide');show('game');next();
}
function head(){
 $('hearts').textContent='❤️'.repeat(S.hearts)+'🖤'.repeat(HL-S.hearts)+(S.hearts<HL&&S.hearts>0?' 🩹'+fa(S.heal)+'/'+fa(3):'');
 $('combo').textContent='کمبو ×'+fa(S.combo);$('coinp').textContent='🪙 '+fa(P.coins);
 $('stg').textContent='مرحله '+fa(SI+1)+' از '+fa(stagesOf(W).length);
 $('prog').style.width=(S.q/Q.length*100)+'%';
}
function next(){
 if(S.q>=Q.length||S.hearts<=0)return finish();
 cur=Q[S.q];S.q++;head();
 $('tp').textContent=SU.name+' · '+S.n;
 $('qn').textContent='سؤال '+fa(S.q)+' از '+fa(Q.length);
 $('qt').textContent=cur.p;$('vis').innerHTML=cur.v||'';$('hint').classList.add('hide');
 const mc=!cur.t||cur.t==='m';
 $('opts').className=mc?'opts':'free';
 if(mc){
  $('opts').innerHTML=cur.o.map((o,i)=>{const L=o.h.length,fs=L>14?'font-size:15px;line-height:1.6':L>6?'font-size:20px':'';return `<button class="opt" data-i="${i}"><b>${'ABCD'[i]}</b><span style="${fs}">${o.h}</span></button>`}).join('');
  document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>pick(b));
 }else TY[cur.t](cur,g=>resolve(g));
 paintHb();
}
function pick(b){if(lock)return;resolve(cur.o[+b.dataset.i].ok,b)}
function resolve(good,b){
 if(lock)return;lock=true;const fbc=$('fbc');
 if(good){
  let healed=false;if(S.hearts<HL){S.heal++;if(S.heal>=3){S.hearts++;S.heal=0;healed=true}}
  if(b)b.classList.add('ok');S.ok++;S.combo++;S.xp+=10;S.coins+=5;P.coins+=5;save();sfx('ok');if(healed)setTimeout(()=>sfx('unlock'),350);if(S.combo>=3)setTimeout(()=>sfx('combo'),300);
  fbc.className='fbc g';
  fbc.innerHTML=`${gwHTML(130)}<h2>عالی!</h2><div>آفرین ${esc(P.name)}، پاسخ درست است</div><div class="chips"><span class="chip">✨ +۱۰ XP</span><span class="chip">🪙 +۵</span></div>${S.combo>1?`<div class="combo">کمبو ×${fa(S.combo)} 🔥</div>`:''}${healed?'<div class="combo">❤️ یک جان پس گرفتی!</div>':(S.hearts<HL?`<div class="chip">🩹 ${fa(S.heal)} از ${fa(3)} برای جان بعدی</div>`:'')}<button class="btn green" id="nx">ادامه</button>`;
 }else{
  if(b)b.classList.add('no');S.hearts--;S.combo=0;sfx('bad');
  if(cur.o)document.querySelectorAll('.opt').forEach((o,k)=>{if(cur.o[k]&&cur.o[k].ok)o.classList.add('ok')});
  fbc.className='fbc r';
  fbc.innerHTML=`<div style="font-size:56px">💔</div><h2 style="font-size:34px">اشتباه شد!</h2><div style="text-align:right;background:#0005;border-radius:14px;padding:10px;font-size:14px;line-height:1.9">${cur.x}</div>${S.hearts>0?'<div class="chip">🩹 با ۳ پاسخ درست یک جان پس می‌گیری</div>':''}<button class="btn gold" id="nx">ادامه</button>`;
 }
 head();
 setTimeout(()=>{$('fb').classList.remove('hide');$('nx').onclick=()=>{$('fb').classList.add('hide');lock=false;next()}},450);
}
function report(){return{n:P.name,xp:P.xp,c:P.coins,p:P.prog,l:P.log.slice(-40),t:Date.now()}}
function syncUp(){if(DB&&UID&&P.name){try{DB.doc('results/'+UID).set({json:JSON.stringify(report())}).catch(()=>{})}catch(e){}}}
function finish(){
 const n=S.ok,r=n/Q.length,stars=r>=.99?3:r>=.7?2:r>=.5?1:0;
 const arr=P.prog[W.id]=P.prog[W.id]||[];
 if(stars>(arr[SI]||0))arr[SI]=stars;
 for(let k=0;k<SI;k++)arr[k]=arr[k]||0;
 P.xp+=S.xp;touchStreak();
 P.log.push({s:W.id,i:SI,k:n,t:Q.length,st:stars,d:Date.now()});if(P.log.length>60)P.log=P.log.slice(-60);
 save();syncUp();
 stars?sfx('win'):sfx('lose');
 $('stars').textContent='⭐'.repeat(stars)+'☆'.repeat(3-stars);
 $('et').textContent=stars?'مرحله را گذراندی!':S.hearts<=0?'جان‌هایت تمام شد':'یک بار دیگر تلاش کن';
 $('ec').textContent=fa(n)+' / '+fa(Q.length);
 $('er').textContent='✨ '+fa(S.xp)+'  🪙 '+fa(S.coins);
 const last=SI>=stagesOf(W).length-1;
 $('em').textContent=stars?(last?P.name+'، این بخش را کامل کردی! 🏆':'آفرین '+P.name+'! مرحله‌ی بعد باز شد 🔓'):P.name+'، ناامید نشو؛ دوباره امتحان کن 💪';
 $('nxt').classList.toggle('hide',!(stars>0&&!last));
 show('end');
}
$('nxt').onclick=()=>startStage(SI+1);
$('rty').onclick=()=>startStage(SI);
$('map').onclick=renderStages;
$('b5').onclick=renderSecs;$('bn').onclick=renderNote;$('ngo').onclick=renderStages;$('b1').onclick=renderHome;$('b4').onclick=renderWorlds;$('b2').onclick=renderSecs;
$('b3').onclick=()=>{if(S&&S.q>0&&!qArm){qArm=true;$('b3').textContent='مطمئنی؟ دوباره بزن';setTimeout(()=>{qArm=false;$('b3').textContent='خروج'},2500);return}qArm=false;$('b3').textContent='خروج';renderStages()};
$('rst').onclick=()=>{if(!resetArm){resetArm=true;$('rst').textContent='مطمئنی؟ دوباره بزن';return}P.prog={};P.xp=0;P.coins=0;P.log=[];P.streak=0;save();renderWorlds()};
$('chn').onclick=()=>{P.name='';save();renderHome();studentForm()};
/* ---------- report code ---------- */
const enc=o=>'R1.'+btoa(unescape(encodeURIComponent(JSON.stringify(o))));
const dec=s=>JSON.parse(decodeURIComponent(escape(atob(s.trim().replace(/^R1\./,'')))));
$('rep').onclick=()=>{
 const code=enc(report()),m=$('md');
 m.innerHTML=`<div class="fbc g2"><h2 style="font-size:24px">گزارش برای معلم</h2><div style="font-size:14px;line-height:1.8">این کد را برای معلمت بفرست تا نتیجه‌ی تو را ببیند.</div><textarea id="rc" readonly rows="4" class="inp ta">${code}</textarea><button class="btn gold" id="rcc">کپی کد</button><a class="btn green lnk" target="‌blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(code)}">ارسال با واتس‌اپ</a><a class="btn blue lnk" target="‌blank" rel="noopener" href="https://t.me/share/url?url=%20&text=${encodeURIComponent(code)}">ارسال با تلگرام</a><button class="tool" id="rcx">بستن</button></div>`;
 m.classList.remove('hide');
 $('rcx').onclick=()=>m.classList.add('hide');
 $('rcc').onclick=()=>{const t=$('rc');t.select();let ok=false;try{ok=document.execCommand('copy')}catch(e){}if(!ok&&navigator.clipboard)navigator.clipboard.writeText(code).catch(()=>{});$('rcc').textContent='کپی شد ✓'};
};
/* ---------- teacher ---------- */
async function hashStr(s){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){let h=5381;for(const c of s)h=((h<<5)+h+c.charCodeAt(0))|0;return 'd'+h}}
let tries=0,lockUntil=0,TT=1,E={sec:'m3',st:-1,q:-1};
$('lgo').onclick=async()=>{
 if(Date.now()<lockUntil){$('lerr').textContent='چند لحظه صبر کن و دوباره امتحان کن.';return}
 const h=await hashStr('tb|'+$('lu').value.trim()+'|'+$('lp').value);
 if(HASHES.includes(h)){tries=0;TEACH=true;$('lp').value='';$('lerr').textContent='';sfx('unlock');TT=1;renderTeach()}
 else{tries++;sfx('bad');$('lerr').textContent='نام کاربری یا رمز اشتباه است.';if(tries>=5){lockUntil=Date.now()+30000;tries=0}}
};
$('bl').onclick=renderHome;
$('tx').onclick=()=>{TEACH=false;renderHome()};
$('t1').onclick=()=>{TT=1;renderTeach()};$('t2').onclick=()=>{TT=2;E.st=-1;E.q=-1;renderTeach()};
function renderTeach(){if(!TEACH)return show('login');$('t1').classList.toggle('on',TT===1);$('t2').classList.toggle('on',TT===2);show('teach');TT===1?renderResults():renderEditor()}
const lsGet=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||d)}catch(e){return JSON.parse(d)}};
async function allStudents(){
 const rep=lsGet('adv-reports','{}'),L=Object.keys(rep).map(k=>({r:rep[k],imp:k}));
 if(DB){try{const s=await DB.collection('results').get();s.docs.forEach(d=>{try{const r=JSON.parse(d.data().json);if(r&&r.n)L.push({r,db:1})}catch(e){}})}catch(e){}}
 if(P.name)L.push({r:report(),me:1});
 return L.sort((a,b)=>(b.r.t||0)-(a.r.t||0));
}
async function renderResults(){
 const B=$('tbody');B.innerHTML='<div class="sub">در حال بارگذاری…</div>';
 const L=await allStudents();if(TT!==1)return;
 let tot=0;L.forEach(x=>{x.s=starsOf(x.r.p);tot+=x.s});
 const agg={};L.forEach(x=>(x.r.l||[]).forEach(e=>{const k=e.s+'|'+e.i,a=agg[k]=agg[k]||{k:0,t:0};a.k+=e.k;a.t+=e.t}));
 const weak=Object.keys(agg).filter(k=>agg[k].t>=6).sort((a,b)=>agg[a].k/agg[a].t-agg[b].k/agg[b].t).slice(0,3);
 let h=`<div class="stat"><div class="sc"><b>👥 ${fa(L.length)}</b><small>دانش‌آموز</small></div><div class="sc"><b>⭐ ${fa(L.length?Math.round(tot/L.length):0)}</b><small>میانگین ستاره</small></div><div class="sc"><b>📝 ${fa(L.reduce((a,x)=>a+(x.r.l||[]).length,0))}</b><small>مرحله انجام‌شده</small></div></div>`;
 if(weak.length)h+=`<div class="note">نیازمند تمرین بیشتر: ${weak.map(k=>{const [s,i]=k.split('|'),c=SECS[s];return c?esc(c.su.icon+' '+c.name+' · مرحله '+fa(+i+1)+' ('+fa(Math.round(agg[k].k/agg[k].t*100))+'٪)'):''}).join('، ')}</div>`;
 h+=L.length?L.map((x,i)=>{const r=x.r,rows=Object.keys(r.p||{}).filter(k=>SECS[k]).map(k=>`<div class="srw"><span>${esc(secLabel(SECS[k]))}</span><span>${(r.p[k]||[]).map(n=>n?'⭐'.repeat(n):'☆').join(' · ')}</span></div>`).join('');
  return `<div class="stu"><div class="sh"><b>${esc(r.n)}${x.me?' <small>(این دستگاه)</small>':''}</b><span>⭐ ${fa(x.s)} · ✨ ${fa(r.xp||0)} · سطح ${fa(Math.floor((r.xp||0)/100)+1)}</span></div><small>آخرین گزارش: ${r.t?new Date(r.t).toLocaleDateString('fa-IR'):'—'}</small>${rows||'<small>هنوز مرحله‌ای انجام نداده.</small>'}${x.imp?`<button class="minor" data-d="${esc(x.imp)}">حذف گزارش</button>`:''}</div>`}).join(''):'<div class="note">هنوز گزارشی نیست. دانش‌آموزان از صفحه‌ی «دنیاها» دکمه‌ی «ارسال گزارش به معلم» را بزنند و کد را برایت بفرستند؛ آن را همین پایین وارد کن.</div>';
 h+=`<div class="sub2">ورود کد گزارش دانش‌آموز</div><textarea id="imp" class="inp ta" rows="3" placeholder="کد را اینجا بچسبان"></textarea><button class="btn gold" id="impb">ثبت گزارش</button><div class="note" id="impm"></div>`;
 B.innerHTML=h;
 B.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const r=lsGet('adv-reports','{}');delete r[b.dataset.d];localStorage.setItem('adv-reports',JSON.stringify(r));renderResults()});
 $('impb').onclick=()=>{try{const r=dec($('imp').value);if(!r.n)throw 0;const a=lsGet('adv-reports','{}');a[r.n]=r;localStorage.setItem('adv-reports',JSON.stringify(a));renderResults()}catch(e){$('impm').textContent='کد معتبر نیست؛ دوباره کپی کن.'}};
}
function bankBox(){return `<div class="sub2">پشتیبان و انتقال بانک سؤال</div><textarea id="bx" class="inp ta" rows="3" readonly>${esc(JSON.stringify(BANK))}</textarea><div class="note">این کد را برای من بفرست تا سؤال‌هایت برای همه‌ی دانش‌آموزان ثابت شود.</div><textarea id="bi" class="inp ta" rows="2" placeholder="چسباندن کد بانک (اختیاری)"></textarea><button class="btn blue sm" id="bib">بارگذاری کد</button>`}
function renderEditor(){
 const B=$('tbody'),c=SECS[E.sec];
 if(E.st>=0&&(BANK.stages[c.id]||[])[E.st])return renderStageEd();
 E.st=-1;const cs=BANK.stages[c.id]||[];
 const opts=SUBJ.map(su=>su.secs.map(x=>`<option value="${x.id}"${x.id===E.sec?' selected':''}>${su.icon} ${esc(secLabel(x))}</option>`).join('')).join('');
 let h=`<label class="lb2">انتخاب ${c.su.id==='fa'?'درس':'فصل'}</label><select id="esec" class="inp">${opts}</select><label class="lb2">عنوان نمایشی</label><div class="rowf"><input id="etit" class="inp" value="${esc(secTitle(c))}" placeholder="مثلاً: شکل‌های هندسی"><button class="btn gold sm" id="etb">ذخیره</button></div>`;
 h+=`<label class="lb2">درس‌نامه (خط اول عنوان؛ خط‌های بعد: «#» برای تیتر و «•» برای نکته)</label><textarea id="enote" class="inp ta" rows="6">${esc((noteOf(c)||[]).join('\n'))}</textarea><button class="btn blue sm" id="enb">ذخیره‌ی درس‌نامه</button>`;
 if(c.gen)h+=`<div class="note">مرحله‌های خودکار (تغییر نمی‌کنند): ${c.tops.map(esc).join('، ')}</div>`;
 h+=`<div class="sub2">مرحله‌های معلم</div>`+(cs.length?cs.map((s,i)=>`<div class="ed"><b>${esc(s.n)}</b><small>${fa(s.q.length)} سؤال</small><span class="ea"><button data-a="up" data-i="${i}">↑</button><button data-a="dn" data-i="${i}">↓</button><button data-a="open" data-i="${i}">✏️</button><button data-a="del" data-i="${i}">🗑</button></span></div>`).join(''):'<div class="note">هنوز مرحله‌ای اضافه نشده.</div>');
 h+=`<div class="rowf"><input id="nsn" class="inp" placeholder="نام مرحله‌ی جدید"><button class="btn green sm" id="nsb">+ افزودن</button></div>`+bankBox();
 B.innerHTML=h;
 $('esec').onchange=()=>{E.sec=$('esec').value;renderEditor()};
 $('etb').onclick=()=>{const v=$('etit').value.trim();if(v)BANK.titles[c.id]=v;else delete BANK.titles[c.id];saveBank();renderEditor()};
 $('enb').onclick=()=>{const v=$('enote').value.trim();BANK.notes=BANK.notes||{};if(v)BANK.notes[c.id]=v;else delete BANK.notes[c.id];saveBank();renderEditor()};
 $('nsb').onclick=()=>{const v=$('nsn').value.trim();if(!v)return;(BANK.stages[c.id]=BANK.stages[c.id]||[]).push({n:v,q:[]});saveBank();E.st=BANK.stages[c.id].length-1;E.q=-1;renderEditor()};
 B.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,a=b.dataset.a,arr=BANK.stages[c.id];
  if(a==='open'){E.st=i;E.q=-1}else if(a==='del'){arr.splice(i,1)}else if(a==='up'&&i>0){[arr[i-1],arr[i]]=[arr[i],arr[i-1]]}else if(a==='dn'&&i<arr.length-1){[arr[i+1],arr[i]]=[arr[i],arr[i+1]]}
  saveBank();renderEditor()});
 $('bib').onclick=()=>{try{const b=JSON.parse($('bi').value);if(!b.stages)throw 0;BANK=b;BANK.titles=BANK.titles||{};saveBank();renderEditor()}catch(e){$('bi').value='';$('bi').placeholder='کد معتبر نیست'}};
}
function renderStageEd(){
 const B=$('tbody'),c=SECS[E.sec],s=BANK.stages[c.id][E.st];
 const q=E.q>=0&&s.q[E.q]?s.q[E.q]:{p:'',o:['','','',''],c:0,h:'',x:''};
 let h=`<button class="back" id="eb">بازگشت به مرحله‌ها</button><div class="sub2">${esc(s.n)} — ${fa(s.q.length)} سؤال</div>`+s.q.map((x,i)=>`<div class="ed"><b>${esc(x.p.slice(0,60))}</b><span class="ea"><button data-a="qe" data-i="${i}">✏️</button><button data-a="qd" data-i="${i}">🗑</button></span></div>`).join('');
 h+=`<div class="sub2">${E.q>=0?'ویرایش سؤال':'سؤال جدید'}</div><textarea id="qp" class="inp" rows="2" placeholder="متن سؤال">${esc(q.p)}</textarea>`+[0,1,2,3].map(k=>`<div class="rowf"><input type="radio" name="qc" value="${k}"${q.c===k?' checked':''}><input class="inp qo" placeholder="گزینه ${'ABCD'[k]}" value="${esc(q.o[k])}"></div>`).join('')+`<input id="qh" class="inp" placeholder="راهنما (اختیاری)" value="${esc(q.h||'')}"><input id="qx" class="inp" placeholder="توضیح پاسخ (اختیاری)" value="${esc(q.x||'')}"><div class="note">گزینه‌ی درست را با دکمه‌ی کنار آن مشخص کن.</div><div id="qm" class="note"></div><button class="btn gold" id="qsv">${E.q>=0?'ذخیره‌ی تغییرات':'افزودن سؤال'}</button>`;
 B.innerHTML=h;
 $('eb').onclick=()=>{E.st=-1;E.q=-1;renderEditor()};
 B.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(b.dataset.a==='qe')E.q=i;else{s.q.splice(i,1);E.q=-1;saveBank()}renderStageEd()});
 $('qsv').onclick=()=>{
  const o=[...B.querySelectorAll('.qo')].map(x=>x.value.trim()),p=$('qp').value.trim(),cr=B.querySelector('input[name=qc]:checked');
  if(!p||o.some(x=>!x)||!cr){$('qm').textContent='متن سؤال و هر چهار گزینه و گزینه‌ی درست را پر کن.';return}
  const it={p,o,c:+cr.value,h:$('qh').value.trim(),x:$('qx').value.trim()};
  if(E.q>=0)s.q[E.q]=it;else s.q.push(it);
  E.q=-1;saveBank();renderStageEd();
 };
}
paintSnd();renderHome();

