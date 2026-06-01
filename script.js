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

  // article tabs
  document.querySelectorAll('.article-tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.article-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      document.querySelectorAll('.article').forEach(a=>a.classList.remove('active'));
      const el = document.getElementById(target);
      if(el) el.classList.add('active');
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
