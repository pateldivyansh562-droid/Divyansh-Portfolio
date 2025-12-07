/* JS - small app behaviors: typed text, AOS init, theme toggle, active nav highlight, notify */

document.addEventListener('DOMContentLoaded', ()=>{

  // 1. Typed.js for hero
  const typed = new Typed('#typed', {
    strings: ['CSE AI & ML Student', 'Web Developer', 'Programmer', 'Tech Enthusiast'],
    typeSpeed: 50,
    backSpeed: 40,
    loop: true
  });

  // 2. AOS init
  if(window.AOS) AOS.init({duration:700, once:true, easing:'ease-out-cubic'});

  // 3. Theme toggle (dark/light) persisted
  const themeToggle = document.getElementById('themeToggle');
  const setTheme = (t)=>{
    if(t === 'light'){
      document.documentElement.style.setProperty('--bg1','#f6f8ff');
      document.documentElement.style.setProperty('--bg2','#e9eefc');
      document.documentElement.style.setProperty('--muted','#333');
      document.body.classList.add('light-mode');
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme','light');
    } else {
      document.documentElement.style.setProperty('--bg1','#12001f');
      document.documentElement.style.setProperty('--bg2','#1b0033');
      document.documentElement.style.setProperty('--muted','#bfb3c7');
      document.body.classList.remove('light-mode');
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme','dark');
    }
  };
  const saved = localStorage.getItem('theme') || 'dark';
  setTheme(saved);
  themeToggle.addEventListener('click', ()=> setTheme(localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'));

  // 4. Active nav highlight (intersection observer)
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const id = entry.target.id;
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if(entry.isIntersecting){
        navLinks.forEach(n=>n.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    });
  }, {threshold: 0.45});
  sections.forEach(s=>io.observe(s));

  // 5. Notify for form (since no backend)
  window.notify = ()=> {
    const btn = document.querySelector('.contact-form .btn.primary');
    btn.textContent = 'Sent ✓';
    btn.disabled = true;
    setTimeout(()=>{ btn.textContent = 'Send Message'; btn.disabled = false; }, 1400);
  };

  // 6. Make nav links collapse on small screens (basic)
  // (Optional improvement: add mobile menu)
});
