// Alpine stores for theme and search
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
// Init Alpine stores
document.addEventListener('alpine:init', () => {
  Alpine.store('theme', {
    mode: localStorage.getItem('theme') || 'dark',
    init() { this.apply(); },
    toggle() { this.mode = this.mode === 'dark' ? 'cupcake' : 'dark'; this.apply(); },
    apply() { document.documentElement.setAttribute('data-theme', this.mode); localStorage.setItem('theme', this.mode); }
  Alpine.store('search', { query: '' });
// DOM ready scripts
document.addEventListener('DOMContentLoaded', () => {
  // AOS fade-up
  if (window.AOS) AOS.init({ once: true });

  // GSAP parallax stars
  if (window.gsap) {
    gsap.to('#stars', { backgroundPosition: '0 200%', duration: 40, ease: 'none', repeat: -1 });
    gsap.utils.toArray('section').forEach(sec => {
      ScrollTrigger.create({ trigger: sec, start: 'top 80%', onEnter: () => gsap.to(sec, { opacity: 1, y: 0, duration: 0.5 }), once: true, scrub: true });
    });
  }

  // Fade transition
  document.querySelectorAll('a[href$=".html"]').forEach(a => {
    a.addEventListener('click', e => {
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      gsap.to('body', { opacity: 0, duration: 0.4, onComplete: () => { window.location = a.href; } });
    });
// Plausible custom event helper
function trackRun(tool) {
  if (window.plausible) plausible('tool_run', { props: { tool } });

// Expose decorate function for tool pages
function decorateToolPage() {}
    card.addEventListener('mouseenter',()=>gsap.to(arrow,{x:6,opacity:1,duration:0.3}));
    card.addEventListener('mouseleave',()=>gsap.to(arrow,{x:0,opacity:0,duration:0.3}));
  });
  document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.classList.add('btn','btn-primary','mt-2');
  });
  document.querySelectorAll('main > div:first-of-type').forEach(el=>{
    el.classList.add('card','p-4','shadow','mt-4','animate__animated','animate__zoomIn');
    el.setAttribute('data-aos','zoom-in');
  });
});

function decorateToolPage(){
  // placeholder to inject shared nav/footer in future
}



