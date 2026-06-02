// Parallax scroll, article tabs, reveal on scroll, mobile menu
(function(){
  // smooth parallax with Rellax
  if(window.Rellax){
    new Rellax('.rellax', {
      center: true,
      round: true,
      vertical: true,
    });
  }

  if('scrollRestoration' in history){
    history.scrollRestoration = 'manual';
  }

  // const resetPageScroll = ()=>{
  //   window.scrollTo(0, 0);
  //   const activeArticle = document.querySelector('.article.active');
  //   if(activeArticle){
  //     activeArticle.scrollIntoView({behavior:'auto', block:'start'});
  //   }
  // };

  // window.addEventListener('DOMContentLoaded', resetPageScroll);
  // window.addEventListener('load', resetPageScroll);
  // window.addEventListener('pageshow', (event)=>{
  //   if(event.persisted){
  //     resetPageScroll();
  //   }
  // });

  // window.addEventListener('beforeunload', ()=>{
  //   window.scrollTo(0, 0);
  // });

  // article tabs
  document.querySelectorAll('.article-tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.article-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      document.querySelectorAll('.article').forEach(a=>a.classList.remove('active'));
      const el = document.getElementById(target);
      if(el){
        el.classList.add('active');
        el.classList.add('visible');
        el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // fullscreen image gallery overlay
  const galleryOverlay = document.querySelector('.gallery-overlay');
  const galleryImage = galleryOverlay?.querySelector('.gallery-image');
  const galleryStrip = galleryOverlay?.querySelector('.gallery-strip');
  const galleryClose = galleryOverlay?.querySelector('.gallery-close');
  const galleryPrev = galleryOverlay?.querySelector('.gallery-prev');
  const galleryNext = galleryOverlay?.querySelector('.gallery-next');
  const galleryBackdrop = galleryOverlay?.querySelector('.gallery-backdrop');
  const galleryItems = Array.from(document.querySelectorAll('.project-gallery img'));
  let activeGalleryIndex = 0;
  const GALLERY_ENABLED = false; // set to true to enable overlay gallery

  const updateGallery = ()=>{
    if(!galleryImage || !galleryStrip) return;
    const source = galleryItems[activeGalleryIndex];
    galleryImage.src = source.src;
    galleryImage.alt = source.alt || 'Portfolio image';
    galleryStrip.querySelectorAll('img').forEach((thumb, index)=>{
      thumb.classList.toggle('active-thumb', index === activeGalleryIndex);
      if(index === activeGalleryIndex) thumb.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
    });
  };

  const closeGallery = ()=>{
    if(!galleryOverlay) return;
    galleryOverlay.classList.remove('active');
    galleryOverlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onGalleryKeydown);
  };

  const showGalleryAt = index=>{
    if(!galleryOverlay || !galleryImage || !galleryStrip) return;
    activeGalleryIndex = Math.max(0, Math.min(index, galleryItems.length - 1));
    updateGallery();
    galleryOverlay.classList.add('active');
    galleryOverlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onGalleryKeydown);
  };

  const onGalleryKeydown = e=>{
    if(!galleryOverlay?.classList.contains('active')) return;
    if(e.key === 'ArrowRight'){
      showGalleryAt((activeGalleryIndex + 1) % galleryItems.length);
    } else if(e.key === 'ArrowLeft'){
      showGalleryAt((activeGalleryIndex - 1 + galleryItems.length) % galleryItems.length);
    } else if(e.key === 'Escape'){
      closeGallery();
    }
  };

  if(GALLERY_ENABLED && galleryOverlay && galleryImage && galleryStrip && galleryItems.length){
    galleryItems.forEach((img, index)=>{
      img.addEventListener('click', ()=> showGalleryAt(index));
    });
    galleryItems.forEach((img, index)=>{
      const thumb = img.cloneNode(true);
      thumb.classList.add('gallery-thumb');
      thumb.dataset.index = String(index);
      thumb.addEventListener('click', ()=> showGalleryAt(index));
      galleryStrip.appendChild(thumb);
    });
    galleryClose?.addEventListener('click', closeGallery);
    galleryBackdrop?.addEventListener('click', closeGallery);
    galleryPrev?.addEventListener('click', ()=> showGalleryAt((activeGalleryIndex - 1 + galleryItems.length) % galleryItems.length));
    galleryNext?.addEventListener('click', ()=> showGalleryAt((activeGalleryIndex + 1) % galleryItems.length));
  }
  const certCard1 = document.getElementById('cert-card-1');
  const certCard2 = document.getElementById('cert-card-2');
  const certCard3 = document.getElementById('cert-card-3');
  const certCard4 = document.getElementById('cert-card-4');
  const certCard5 = document.getElementById('cert-card-5');
  const certCard6 = document.getElementById('cert-card-6');
  const certCard7 = document.getElementById('cert-card-7');
  const certCard8 = document.getElementById('cert-card-8');
  const certCard9 = document.getElementById('cert-card-9');
  const certCard10 = document.getElementById('cert-card-10');
  const certCard11 = document.getElementById('cert-card-11');
  const certCard12 = document.getElementById('cert-card-12');
  const certCard13 = document.getElementById('cert-card-13');
  const certCard14 = document.getElementById('cert-card-14');
  const certCard15 = document.getElementById('cert-card-15');
  const certCard16 = document.getElementById('cert-card-16');
  const certCard17 = document.getElementById('cert-card-17');
  const certCard18 = document.getElementById('cert-card-18');
  const certCard19 = document.getElementById('cert-card-19');
  const certCard20 = document.getElementById('cert-card-20');
  const certCard21 = document.getElementById('cert-card-21');
  const certCard22 = document.getElementById('cert-card-22');
  const certCard23 = document.getElementById('cert-card-23');
  const certCard24 = document.getElementById('cert-card-24');
  const certCard25 = document.getElementById('cert-card-25');

  const certOverlay = document.querySelector('.cert-overlay');
  const certImage = certOverlay?.querySelector('.cert-image');
  const certClose = certOverlay?.querySelector('.cert-close');
  const certBackdrop = certOverlay?.querySelector('.cert-backdrop');

  const onCertKeydown = e => {
    if(!certOverlay?.classList.contains('active')) return;
    if(e.key === 'Escape') closeCertOverlay();
  };

  const closeCertOverlay = () => {
    if(!certOverlay) return;
    certOverlay.classList.remove('active');
    certOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onCertKeydown);
  };

  const openCertOverlay = (src, title) => {
    if(!certOverlay || !certImage) return;
    certImage.src = src;
    certImage.alt = title || 'Certificate preview';
    certOverlay.classList.add('active');
    certOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onCertKeydown);
  };

  certCard1?.addEventListener('click', () => {
    const src = certCard1.dataset.certSrc;
    const title = certCard1.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
  certCard2?.addEventListener('click', () => {
    const src = certCard2.dataset.certSrc;
    const title = certCard2.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard3?.addEventListener('click', () => {
    const src = certCard3.dataset.certSrc;
    const title = certCard3.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard4?.addEventListener('click', () => {
    const src = certCard4.dataset.certSrc;
    const title = certCard4.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard5?.addEventListener('click', () => {
    const src = certCard5.dataset.certSrc;
    const title = certCard5.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard6?.addEventListener('click', () => {
    const src = certCard6.dataset.certSrc;
    const title = certCard6.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard7?.addEventListener('click', () => {
    const src = certCard7.dataset.certSrc;
    const title = certCard7.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard8?.addEventListener('click', () => {
    const src = certCard8.dataset.certSrc;
    const title = certCard8.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard9?.addEventListener('click', () => {
    const src = certCard9.dataset.certSrc;
    const title = certCard9.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard10?.addEventListener('click', () => {
    const src = certCard10.dataset.certSrc;
    const title = certCard10.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard11?.addEventListener('click', () => {
    const src = certCard11.dataset.certSrc;
    const title = certCard11.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard12?.addEventListener('click', () => {
    const src = certCard12.dataset.certSrc;
    const title = certCard12.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard13?.addEventListener('click', () => {
    const src = certCard13.dataset.certSrc;
    const title = certCard13.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard14?.addEventListener('click', () => {
    const src = certCard14.dataset.certSrc;
    const title = certCard14.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard15?.addEventListener('click', () => {
    const src = certCard15.dataset.certSrc;
    const title = certCard15.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard16?.addEventListener('click', () => {
    const src = certCard16.dataset.certSrc;
    const title = certCard16.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard17?.addEventListener('click', () => {
    const src = certCard17.dataset.certSrc;
    const title = certCard17.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard18?.addEventListener('click', () => {
    const src = certCard18.dataset.certSrc;
    const title = certCard18.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard19?.addEventListener('click', () => {
    const src = certCard19.dataset.certSrc;
    const title = certCard19.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard20?.addEventListener('click', () => {
    const src = certCard20.dataset.certSrc;
    const title = certCard20.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard21?.addEventListener('click', () => {
    const src = certCard21.dataset.certSrc;
    const title = certCard2.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard22?.addEventListener('click', () => {
    const src = certCard22.dataset.certSrc;
    const title = certCard22.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard23?.addEventListener('click', () => {
    const src = certCard23.dataset.certSrc;
    const title = certCard23.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard24?.addEventListener('click', () => {
    const src = certCard24.dataset.certSrc;
    const title = certCard24.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });
   certCard25?.addEventListener('click', () => {
    const src = certCard25.dataset.certSrc;
    const title = certCard25.dataset.certTitle;
    if(src) openCertOverlay(src, title);
  });

  certCard1?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard1.dataset.certSrc;
      const title = certCard1.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });

  certCard2?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard2.dataset.certSrc;
      const title = certCard2.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard3?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard3.dataset.certSrc;
      const title = certCard3.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard4?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard4.dataset.certSrc;
      const title = certCard4.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard5?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard5.dataset.certSrc;
      const title = certCard5.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard6?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard6.dataset.certSrc;
      const title = certCard6.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard7?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard7.dataset.certSrc;
      const title = certCard7.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard8?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard8.dataset.certSrc;
      const title = certCard8.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard9?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard9.dataset.certSrc;
      const title = certCard9.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard10?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard10.dataset.certSrc;
      const title = certCard10.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard11?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard11.dataset.certSrc;
      const title = certCard11.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard12?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard12.dataset.certSrc;
      const title = certCard12.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard13?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard13.dataset.certSrc;
      const title = certCard13.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard14?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard14.dataset.certSrc;
      const title = certCard14.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard15?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard15.dataset.certSrc;
      const title = certCard15.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard16?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard16.dataset.certSrc;
      const title = certCard16.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard17?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard17.dataset.certSrc;
      const title = certCard17.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard18?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard18.dataset.certSrc;
      const title = certCard18.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard19?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard19.dataset.certSrc;
      const title = certCard19.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard20?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard20.dataset.certSrc;
      const title = certCard20.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard21?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard21.dataset.certSrc;
      const title = certCard21.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard22?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard22.dataset.certSrc;
      const title = certCard22.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard23?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard23.dataset.certSrc;
      const title = certCard23.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard24?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard24.dataset.certSrc;
      const title = certCard24.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });
  certCard25?.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const src = certCard25.dataset.certSrc;
      const title = certCard25.dataset.certTitle;
      if(src) openCertOverlay(src, title);
    }
  });

  certClose?.addEventListener('click', closeCertOverlay);
  certBackdrop?.addEventListener('click', closeCertOverlay);
  // reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        // if this is a timeline item, mark the timeline as drawn
        const tl = e.target.closest('.timeline');
        if(tl) tl.classList.add('drawn');
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('h2, .card, .article, .about-image, .hero-content, .timeline li').forEach(n=>{
    n.classList.add('reveal'); io.observe(n);
  });

  const activeArticle = document.querySelector('.article.active');
  if(activeArticle){
    activeArticle.classList.add('visible');
  }

  // smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.top-nav');
  toggle && toggle.addEventListener('click', ()=>{
    if(nav.style.display === 'flex') nav.style.display = '';
    else nav.style.display = 'flex';
  });
})();
