(function(){
  var hdr=document.querySelector('header.site'), body=document.body;
  function onScroll(){ if(hdr) hdr.classList.toggle('scrolled', window.scrollY>40); }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  var burger=document.querySelector('.burger');
  if(burger){ burger.addEventListener('click', function(){
    var open=body.classList.toggle('nav-open'); burger.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.menu a').forEach(function(a){ a.addEventListener('click', function(){ body.classList.remove('nav-open'); }); }); }

  // reveal on scroll
  var els=document.querySelectorAll('.reveal,.steps');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{threshold:.14, rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add('in'); }); }

  // count up
  var nums=document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window){
    var co=new IntersectionObserver(function(es){ es.forEach(function(e){
      if(!e.isIntersecting) return; co.unobserve(e.target);
      var el=e.target, end=+el.dataset.count, suf=el.dataset.suffix||'', t0=null;
      function step(ts){ if(!t0) t0=ts; var p=Math.min((ts-t0)/1400,1), v=Math.round(end*(1-Math.pow(1-p,3))); el.textContent=v+suf; if(p<1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    }); },{threshold:.5});
    nums.forEach(function(n){ co.observe(n); });
  }

  // film
  document.querySelectorAll('.film').forEach(function(f){
    var v=f.querySelector('video'), b=f.querySelector('.play');
    b.addEventListener('click', function(){ v.setAttribute('controls',''); v.muted=false; v.play(); f.classList.add('playing'); });
    v.addEventListener('ended', function(){ f.classList.remove('playing'); v.removeAttribute('controls'); v.currentTime=0; });
  });

  // quote form: opens an email to the office with the details filled in
  var qf=document.querySelector('.quote-form');
  if(qf){ qf.addEventListener('submit', function(ev){
    ev.preventDefault();
    var d=new FormData(qf), lines=[];
    ['Name','Company','Email','Phone','Project type','Location','Timeline','Details'].forEach(function(k){ var v=(d.get(k)||'').toString().trim(); if(v) lines.push(k+': '+v); });
    var subj='Quote request'+(d.get('Company')?' from '+d.get('Company'):'');
    window.location.href='mailto:info@y-bsolutions.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(lines.join('\n'));
  }); }

  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
})();
