// Alpine stores for theme and search
function filesToCache(){
  const links=[ './','tools.css','mini.js'];
  const links=['./','style.min.css','dark.min.css','mini.js','app.min.js','tools.css'];
  document.querySelectorAll('a[href$=".html"]').forEach(a=>links.push(a.getAttribute('href')));
  return links;
}

if('serviceWorker' in navigator){
  const sw=`const C='mtu-v2';self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(${JSON.stringify(['./','tools.css','mini.js'])})))) ;self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));`;
  const files=filesToCache();
  const sw=`const C='mtu-v2';self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(${JSON.stringify(files)}))));self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));`;
  navigator.serviceWorker.register(URL.createObjectURL(new Blob([sw],{type:'text/javascript'})));
}

document.addEventListener('alpine:init',()=>{
  Alpine.store('theme',{
    mode:localStorage.getItem('theme')||'dark',
    init(){this.apply();},
    toggle(){this.mode=this.mode==='dark'?'light':'dark';this.apply();},
    apply(){document.documentElement.classList.toggle('light',this.mode==='light');localStorage.setItem('theme',this.mode);}
  });
  Alpine.store('search',{query:''});
});

document.addEventListener('DOMContentLoaded',()=>{
  AOS.init();
  gsap.to('#stars',{backgroundPosition:'0 200%',duration:40,ease:'none',repeat:-1});
  document.querySelectorAll('a[href$=".html"]').forEach(a=>{
    a.addEventListener('click',e=>{if(e.ctrlKey||e.metaKey)return;e.preventDefault();gsap.to('body',{opacity:0,duration:0.4,onComplete:()=>{window.location=a.href;}});});
  });
  document.querySelectorAll('.tool-card').forEach(card=>{
    const arrow=card.querySelector('.fa-arrow-right');
    if(!arrow)return;
    card.addEventListener('mouseenter',()=>gsap.to(arrow,{x:6,opacity:1,duration:0.3}));
    card.addEventListener('mouseleave',()=>gsap.to(arrow,{x:0,opacity:0,duration:0.3}));
  });
});

function decorateToolPage(){
  // placeholder to inject shared nav/footer in future
}


