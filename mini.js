/* global Alpine AOS gsap ScrollTrigger */
// Registers service worker and handles page animations

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js');
}

document.addEventListener('DOMContentLoaded',()=>{
  if(window.AOS) AOS.init({once:true});
  if(window.gsap){
    gsap.to('#stars',{backgroundPosition:'0 200%',duration:40,ease:'none',repeat:-1});
    gsap.utils.toArray('section').forEach(sec=>{
      ScrollTrigger.create({trigger:sec,start:'top 80%',onEnter:()=>gsap.to(sec,{opacity:1,y:0,duration:0.5}),once:true,scrub:true});
    });
  }
  document.querySelectorAll('a[href$=".html"]').forEach(a=>{
    a.addEventListener('click',e=>{if(e.ctrlKey||e.metaKey)return;e.preventDefault();gsap.to('body',{opacity:0,duration:0.4,onComplete:()=>{window.location=a.href;}});});
  });
  document.querySelectorAll('.tool-card').forEach(card=>{
    const arrow=card.querySelector('.fa-arrow-right');
    if(!arrow)return;
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

