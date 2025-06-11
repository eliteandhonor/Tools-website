// Search filter
const searchInput = document.getElementById('search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll('.tool-card').forEach(card => {
      const name = card.dataset.name.toLowerCase();
      card.style.display = name.includes(q) ? '' : 'none';
    });
  });
}

// Intersection animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, {threshold:0.1});
document.querySelectorAll('.tool-card').forEach(el => observer.observe(el));

// Smooth scroll
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    if (nav.classList.contains('open')) nav.classList.remove('open');
  });
});

// Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

// Parallax hero
const hero = document.getElementById('hero');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (hero && !prefersReduced) {
  hero.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  });
}

// Service worker via blob
if ('serviceWorker' in navigator) {
  const sw = `const CACHE='mtu-v1';self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['index.html','style.css','app.js'])))});self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})`;
  const blob = new Blob([sw], {type:'text/javascript'});
  const url = URL.createObjectURL(blob);
  navigator.serviceWorker.register(url);
}

// Initialize AOS animations if library is present
if (window.AOS) {
  AOS.init();
}
