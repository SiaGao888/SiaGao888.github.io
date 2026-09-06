const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => { if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; } });
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('shown'); observer.unobserve(entry.target); }}), {threshold:.14});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const toggle = document.querySelector('.menu-toggle'), nav = document.querySelector('.nav nav');
if(toggle && nav) toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); });
document.querySelectorAll('.nav nav a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));
document.querySelectorAll('.copy').forEach(button => button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(button.dataset.copy); button.textContent = '已複製'; setTimeout(() => button.textContent = '複製', 1500); } catch { button.textContent = '請手動複製'; }}));
const links = [...document.querySelectorAll('.guide-aside a')]; const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if(sections.length) { const guideObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-25% 0px -65%'}); sections.forEach(s=>guideObserver.observe(s)); }

const dictionary = {
  navAbout:['關於我','About'], navSkills:['探索領域','Fields'], navNow:['現在進行式','Now'], navGuide:['WLOC 教學','WLOC Guide'], meet:['認識我','Meet me'], viewGuide:['查看 WLOC 教學','View WLOC guide'],
  heroTitle:['我把好奇心<br>做成<span>現實。</span>','I turn curiosity<br>into <span>real things.</span>'],
  heroLead:['嗨，我是 Batista，一位 17 歲的高職資訊科學生。<br>從數位安全到機械手臂，我熱衷理解系統，然後讓它動起來。','Hi, I’m Batista — a 17-year-old vocational IT student.<br>From digital security to robotics, I learn systems and bring them to life.'],
  aboutTitle:['不只是學習，<br>而是<span>不停地拆解與重組。</span>','More than learning —<br><span>taking things apart to build anew.</span>'],
  aboutP1:['我是高職資訊科學生，也是一位喜歡把問題拆開、親手做出答案的自學者。無論是研究一段程式、調校一台裝置，還是追蹤系統裡的一個漏洞，每個「為什麼」都值得被好好追到底。','I am a vocational IT student and a self-taught builder who likes to take problems apart. Whether it is code, hardware, or a system vulnerability, every “why” is worth following through.'],
  aboutP2:['現在的我仍在探索，也正享受這段沒有標準答案的旅程。','I am still exploring — and enjoying a journey with no standard answers.'], badge:['資訊科 · 自學者 · 創作者','IT Student · Self-taught · Creator'], explore:['看看我正在探索什麼','Explore what I build'],
  skillsTitle:['我正在建構的<br><span>技能宇宙。</span>','My expanding<br><span>skill universe.</span>'], skillsLead:['每一個領域都像一扇門，<br>通往更多值得解決的問題。','Every field opens a door<br>to a new problem worth solving.'], back:['← 回到首頁','← Back to home'],
  guideTitle:['WLOC<span>.</span><br>定位設定指南','WLOC<span>.</span><br>Setup guide'], guideLead:['使用 Shadowrocket 與快捷指令，<br>完成免越獄的定位設定流程。','Use Shadowrocket and Shortcuts<br>to complete the location setup flow.']
};
let isEnglish = false;
function applyLanguage() {
  document.documentElement.lang = isEnglish ? 'en' : 'zh-Hant';
  document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.dataset.i18n; if (dictionary[key]) el.textContent = dictionary[key][isEnglish ? 1 : 0]; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { const key = el.dataset.i18nHtml; if (dictionary[key]) el.innerHTML = dictionary[key][isEnglish ? 1 : 0]; });
  document.querySelectorAll('.lang-switch').forEach(button => button.textContent = isEnglish ? '中文' : 'EN');
}
document.querySelectorAll('.lang-switch').forEach(button => button.addEventListener('click', () => { isEnglish = !isEnglish; applyLanguage(); }));
