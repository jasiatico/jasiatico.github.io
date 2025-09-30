// Theme toggle and small UI helpers
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');

  // set year
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // load theme from localStorage
  const saved = localStorage.getItem('theme');
  if(saved === 'light') root.classList.add('light');

  // initialize theme toggle button text to reflect current theme
  function updateThemeToggleText(){
    if(!themeToggle) return;
    const isLight = root.classList.contains('light');
    // show sun for light mode, moon for dark mode
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  }
  updateThemeToggleText();

  themeToggle?.addEventListener('click', ()=>{
    root.classList.toggle('light');
    const isLight = root.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeToggleText();
  });

  navToggle?.addEventListener('click', ()=>{
    if(!nav) return;
    const vis = nav.style.display === 'flex';
    nav.style.display = vis ? '' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '0.5rem';
  });

  // NAV INDICATOR: move the .nav-indicator under the active section link
  const indicator = document.querySelector('.nav-indicator');
  const navLinks = Array.from(document.querySelectorAll('.nav a'));
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function updateIndicatorTo(index){
    if(!indicator) return;
    const link = navLinks[index];
    if(!link) return;
    const rect = link.getBoundingClientRect();
    const navRect = link.parentElement.getBoundingClientRect();
    const left = rect.left - navRect.left;
    indicator.style.width = rect.width + 'px';
    indicator.style.transform = `translateX(${left}px)`;
  }

  function findActiveSection(){
    const scrollY = window.scrollY + 120; // offset to trigger earlier
    for(let i = sections.length - 1; i >= 0; i--){
      const s = sections[i];
      if(!s) continue;
      const top = s.offsetTop;
      if(scrollY >= top) return i;
    }
    return 0;
  }

  function onScrollIndicator(){
    const idx = findActiveSection();
    updateIndicatorTo(idx);
  }

  window.addEventListener('scroll', onScrollIndicator);
  window.addEventListener('resize', onScrollIndicator);
  // init after a short timeout so layout settles
  setTimeout(onScrollIndicator, 120);
})();
