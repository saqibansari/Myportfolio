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

  // nav splash transition for key sections
  const splashCopyByPath = {
    'work-experience.html': 'Building timeline...',
    'portfolio.html': 'Loading artwork...',
    'articles.html': 'Loading thoughts...'
  };

  const splashOverlay = document.createElement('div');
  splashOverlay.className = 'nav-splash-overlay';
  splashOverlay.setAttribute('aria-hidden', 'true');
  splashOverlay.innerHTML = '<p class="nav-splash-text"></p>';
  document.body.appendChild(splashOverlay);

  let isSplashNavigating = false;
  const showNavSplashThenGo = (href, message) => {
    if(isSplashNavigating) return;
    isSplashNavigating = true;
    const splashText = splashOverlay.querySelector('.nav-splash-text');
    if(splashText) splashText.textContent = message;
    splashOverlay.classList.add('active');
    splashOverlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      window.location.href = href;
    }, 500);
  };
  window.__showNavSplashThenGo = showNavSplashThenGo;

  document.addEventListener('click', e => {
    if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const link = e.target.closest('.top-nav a[href]');
    if(!link) return;
    if(link.target && link.target !== '_self') return;

    const rawHref = link.getAttribute('href');
    if(!rawHref) return;
    const normalized = rawHref.split('/').pop().split('#')[0];
    const splashMessage = splashCopyByPath[normalized];
    if(!splashMessage) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if(normalized === currentPage) return;

    e.preventDefault();
    showNavSplashThenGo(link.href, splashMessage);
  }, true);

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

  // portfolio scroll-to-top after 50% project scroll
  const portfolioPage = document.querySelector('.portfolio-page');
  const portfolioScrollTopBtn = document.querySelector('.portfolio-scroll-top');
  if(portfolioPage && portfolioScrollTopBtn){
    let ticking = false;

    const setScrollTopVisibility = ()=>{
      const activeProject = portfolioPage.querySelector('.article.active');
      if(!activeProject){
        portfolioScrollTopBtn.classList.remove('is-visible');
        return;
      }

      const projectTop = activeProject.getBoundingClientRect().top + window.scrollY;
      const headerOffset = 110;
      const progressStart = projectTop - headerOffset;
      const projectHeight = Math.max(activeProject.offsetHeight, 1);
      const progress = (window.scrollY - progressStart) / projectHeight;

      portfolioScrollTopBtn.classList.toggle('is-visible', progress >= 0.5);
    };

    const onScrollOrResize = ()=>{
      if(ticking) return;
      ticking = true;
      window.requestAnimationFrame(()=>{
        setScrollTopVisibility();
        ticking = false;
      });
    };

    portfolioScrollTopBtn.addEventListener('click', ()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('load', setScrollTopVisibility);
    setScrollTopVisibility();
  }

  // articles scroll-to-top after 50% article scroll
  const articlesPage = document.querySelector('body .container.articles');
  const articlesScrollTopBtn = document.querySelector('.articles-scroll-top');
  if(articlesPage && articlesScrollTopBtn && !document.querySelector('.portfolio-page')){
    let ticking = false;

    const setArticlesScrollTopVisibility = ()=>{
      const activeArticle = articlesPage.querySelector('.article.active');
      if(!activeArticle){
        articlesScrollTopBtn.classList.remove('is-visible');
        return;
      }

      const articleTop = activeArticle.getBoundingClientRect().top + window.scrollY;
      const headerOffset = 110;
      const progressStart = articleTop - headerOffset;
      const articleHeight = Math.max(activeArticle.offsetHeight, 1);
      const progress = (window.scrollY - progressStart) / articleHeight;

      articlesScrollTopBtn.classList.toggle('is-visible', progress >= 0.5);
    };

    const onArticlesScrollOrResize = ()=>{
      if(ticking) return;
      ticking = true;
      window.requestAnimationFrame(()=>{
        setArticlesScrollTopVisibility();
        ticking = false;
      });
    };

    articlesScrollTopBtn.addEventListener('click', ()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', onArticlesScrollOrResize, { passive: true });
    window.addEventListener('resize', onArticlesScrollOrResize);
    window.addEventListener('load', setArticlesScrollTopVisibility);
    setArticlesScrollTopVisibility();
  }

  // index scroll-to-top after 50% page scroll
  const homeMain = document.querySelector('.home-main');
  const indexScrollTopBtn = document.querySelector('.index-scroll-top');
  if(homeMain && indexScrollTopBtn){
    let ticking = false;

    const setIndexScrollTopVisibility = ()=>{
      const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = window.scrollY / scrollableHeight;
      indexScrollTopBtn.classList.toggle('is-visible', progress >= 0.5);
    };

    const onIndexScrollOrResize = ()=>{
      if(ticking) return;
      ticking = true;
      window.requestAnimationFrame(()=>{
        setIndexScrollTopVisibility();
        ticking = false;
      });
    };

    indexScrollTopBtn.addEventListener('click', ()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', onIndexScrollOrResize, { passive: true });
    window.addEventListener('resize', onIndexScrollOrResize);
    window.addEventListener('load', setIndexScrollTopVisibility);
    setIndexScrollTopVisibility();
  }

  // fullscreen image gallery overlay
  const galleryOverlay = document.querySelector('.gallery-overlay');
  const galleryImage = galleryOverlay?.querySelector('.gallery-image');
  const galleryVideo = galleryOverlay?.querySelector('.gallery-video');
  const galleryStrip = galleryOverlay?.querySelector('.gallery-strip');
  const galleryClose = galleryOverlay?.querySelector('.gallery-close');
  const galleryPrev = galleryOverlay?.querySelector('.gallery-prev');
  const galleryNext = galleryOverlay?.querySelector('.gallery-next');
  const galleryBackdrop = galleryOverlay?.querySelector('.gallery-backdrop');
  const galleryItemSelector = '.project-gallery img, .project-gallery video';
  let activeGalleryIndex = 0;
  let activeGalleryItems = [];

  const updateGallery = ()=>{
    if(!galleryImage || !galleryVideo || !galleryStrip || !activeGalleryItems.length) return;
    const source = activeGalleryItems[activeGalleryIndex];
    const isVideo = source.tagName === 'VIDEO';

    if(isVideo){
      galleryImage.hidden = true;
      galleryVideo.hidden = false;
      galleryVideo.src = source.currentSrc || source.src;
      galleryVideo.setAttribute('aria-label', source.getAttribute('alt') || 'Portfolio video');
      galleryVideo.load();
    } else {
      galleryVideo.pause();
      galleryVideo.hidden = true;
      galleryVideo.removeAttribute('src');
      galleryImage.hidden = false;
      galleryImage.src = source.currentSrc || source.src;
      galleryImage.alt = source.alt || 'Portfolio image';
    }

    galleryStrip.querySelectorAll('.gallery-thumb').forEach((thumb, index)=>{
      thumb.classList.toggle('active-thumb', index === activeGalleryIndex);
      if(index === activeGalleryIndex) thumb.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
    });
  };

  const buildGalleryThumb = (source, index)=>{
    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.className = 'gallery-thumb';
    thumb.setAttribute('aria-label', `Open media ${index + 1}`);

    if(source.tagName === 'VIDEO'){
      const label = document.createElement('span');
      label.className = 'gallery-thumb-label';
      label.textContent = 'Video';
      thumb.appendChild(label);
    } else {
      const thumbImage = source.cloneNode();
      thumbImage.removeAttribute('id');
      thumbImage.loading = 'lazy';
      thumb.appendChild(thumbImage);
    }

    thumb.addEventListener('click', ()=> showGalleryAt(index));
    return thumb;
  };

  const rebuildGalleryStrip = ()=>{
    if(!galleryStrip) return;
    galleryStrip.innerHTML = '';
    activeGalleryItems.forEach((source, index)=>{
      galleryStrip.appendChild(buildGalleryThumb(source, index));
    });
  };

  const closeGallery = ()=>{
    if(!galleryOverlay) return;
    if(galleryVideo){
      galleryVideo.pause();
      galleryVideo.removeAttribute('src');
      galleryVideo.load();
    }
    galleryOverlay.classList.remove('active');
    galleryOverlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onGalleryKeydown);
  };

  const showGalleryAt = index=>{
    if(!galleryOverlay || !galleryImage || !galleryVideo || !galleryStrip || !activeGalleryItems.length) return;
    activeGalleryIndex = (index + activeGalleryItems.length) % activeGalleryItems.length;
    updateGallery();
    galleryOverlay.classList.add('active');
    galleryOverlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onGalleryKeydown);
  };

  const openProjectGallery = (article, index)=>{
    if(!article) return;
    activeGalleryItems = Array.from(article.querySelectorAll(galleryItemSelector));
    if(!activeGalleryItems.length) return;
    rebuildGalleryStrip();
    showGalleryAt(index);
  };

  const onGalleryKeydown = e=>{
    if(!galleryOverlay?.classList.contains('active')) return;
    if(e.key === 'ArrowRight'){
      showGalleryAt(activeGalleryIndex + 1);
    } else if(e.key === 'ArrowLeft'){
      showGalleryAt(activeGalleryIndex - 1);
    } else if(e.key === 'Escape'){
      closeGallery();
    }
  };

  if(galleryOverlay && galleryImage && galleryVideo && galleryStrip){
    document.querySelectorAll('.project-gallery').forEach(gallery=>{
      const article = gallery.closest('.article');
      Array.from(gallery.querySelectorAll(galleryItemSelector)).forEach((mediaItem, index)=>{
        mediaItem.classList.add('gallery-launch');
        mediaItem.tabIndex = 0;
        mediaItem.setAttribute('role', 'button');
        mediaItem.setAttribute('aria-label', `${mediaItem.getAttribute('alt') || 'Portfolio media'} - open fullscreen`);
        mediaItem.addEventListener('click', ()=> openProjectGallery(article, index));
        mediaItem.addEventListener('keydown', event=>{
          if(event.key === 'Enter' || event.key === ' '){
            event.preventDefault();
            openProjectGallery(article, index);
          }
        });
      });
    });
    galleryClose?.addEventListener('click', closeGallery);
    galleryBackdrop?.addEventListener('click', closeGallery);
    galleryPrev?.addEventListener('click', ()=> showGalleryAt(activeGalleryIndex - 1));
    galleryNext?.addEventListener('click', ()=> showGalleryAt(activeGalleryIndex + 1));
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

  const certGrid = document.getElementById('cert-grid');
  const certShowAll = document.getElementById('cert-show-all');
  if(certGrid && certShowAll && !window.__certToggleBound){
    window.__certToggleBound = true;

    const setCertToggleState = expanded => {
      certGrid.classList.toggle('is-collapsed', !expanded);
      certShowAll.classList.toggle('is-expanded', expanded);
      certShowAll.textContent = expanded ? 'Show less' : 'Show all';
      certShowAll.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };

    setCertToggleState(!certGrid.classList.contains('is-collapsed'));

    certShowAll.addEventListener('click', () => {
      const isCollapsed = certGrid.classList.contains('is-collapsed');
      setCertToggleState(isCollapsed);
    });
  }

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
  document.querySelectorAll('h2, .card, .article, .about-image, .hero-content, .timeline li, .tile, .highlight-card, .quote-card, .detail-item, .contact-card').forEach(n=>{
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

  // 3D mouse-tracking tilt for cards
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.tile, .highlight-card, .contact-card, .quote-card').forEach(el=>{
      const deg = el.classList.contains('tile') ? 7 : 11;
      el.addEventListener('mousemove', e=>{
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(700px) rotateX(${(-y*deg).toFixed(2)}deg) rotateY(${(x*deg).toFixed(2)}deg) translateZ(8px) scale(1.018)`;
      });
      el.addEventListener('mouseleave', ()=>{ el.style.transform = ''; });
    });
  }
})();

// ── 3D immersive depth effects ────────────────────────────────────────────────
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const landing = document.querySelector('.landing');

  // 1. Canvas particle-constellation network in landing
  if (landing && !prefersReduced) {
    const canvas = document.createElement('canvas');
    canvas.className = 'landing-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    landing.insertBefore(canvas, landing.firstChild);

    const ctx = canvas.getContext('2d');
    const resize = function () {
      canvas.width = landing.offsetWidth;
      canvas.height = landing.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const PARTICLE_COUNT = 55;
    const MAX_DIST = 170;
    const pts = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r: Math.random() * 1.8 + 0.8,
        hue: Math.random() > 0.5 ? 265 : 192
      });
    }

    (function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + p.hue + ',80%,72%,0.75)';
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'hsla(' + ((p.hue + q.hue) / 2) + ',72%,68%,' + alpha.toFixed(3) + ')';
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(tick);
    })();

    // 2. Cursor spotlight
    const spotlight = document.createElement('div');
    spotlight.className = 'landing-spotlight';
    spotlight.setAttribute('aria-hidden', 'true');
    landing.appendChild(spotlight);

    if (!prefersReduced) {
      landing.addEventListener('mousemove', function (e) {
        const rect = landing.getBoundingClientRect();
        spotlight.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
        spotlight.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
      }, { passive: true });
    }
  }

  if (!prefersReduced) {
    // 3. Hero 3D depth parallax — tilts the entire hero on mouse move
    if (landing) {
      const heroContainer = landing.querySelector('.hero');
      if (heroContainer) {
        landing.addEventListener('mousemove', function (e) {
          const rect = landing.getBoundingClientRect();
          const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
          const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
          heroContainer.style.transform =
            'perspective(1200px) rotateY(' + (dx * 4).toFixed(2) + 'deg) rotateX(' + (-dy * 3).toFixed(2) + 'deg)';
        }, { passive: true });
        landing.addEventListener('mouseleave', function () {
          heroContainer.style.transform = '';
        });
      }
    }

    // 4. 3D tilt for cert cards
    document.querySelectorAll('.cert-card-clickable').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(600px) rotateX(' + (-y * 9).toFixed(2) + 'deg) rotateY(' + (x * 9).toFixed(2) + 'deg) translateZ(6px) scale(1.02)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });

    // 5. Radial glow that follows the cursor inside each highlight card
    document.querySelectorAll('.highlight-card').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
        const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
        el.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(124,92,255,0.22), rgba(255,255,255,0.02) 68%)';
        el.style.borderColor = 'rgba(124,92,255,0.32)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.background = '';
        el.style.borderColor = '';
      });
    });
  }
})();

// ── 2D park walk animation — Clients section (pencil sketch style) ──────────
(function () {
  var clientsSection = document.querySelector('.section.clients');
  if (!clientsSection) return;
  var marquee = clientsSection.querySelector('.clients-marquee');
  if (!marquee) return;

  var wrapper = document.createElement('div');
  wrapper.className = 'park-scene-wrapper';
  wrapper.setAttribute('role', 'img');
  wrapper.setAttribute('aria-label', 'Animated sketch park showing companies: Google, AstraZeneca, Monshaat, Reebok, Merck, Novartis, SABIC, GSK');
  var cvs = document.createElement('canvas');
  cvs.setAttribute('aria-hidden', 'true');
  wrapper.appendChild(cvs);
  marquee.replaceWith(wrapper);

  var ctx = cvs.getContext('2d');
  var W, H, GY;

  // pencil palette
  var INK      = 'rgba(238,236,228,0.90)'; // main strokes
  var INK_DIM  = 'rgba(200,198,190,0.45)'; // secondary / details
  var INK_FILL = 'rgba(255,255,255,0.04)'; // barely-visible fills

  function rrect(x, y, w, h, r) {
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
    else               { ctx.beginPath(); ctx.rect(x, y, w, h); }
  }

  // ── stop definitions ───────────────────────────────────────────────────────
  var DEFS = [
    { name: 'Google'      }, { name: 'AstraZeneca', bench: true },
    { name: 'Monshaat'    }, { name: 'Reebok',      bench: true },
    { name: 'Merck'       }, { name: 'Novartis',    bench: true },
    { name: 'SABIC'       }, { name: 'GSK',         bench: true },
  ];

  var stops = [];
  function layout() {
    W = cvs.width  = wrapper.clientWidth || 960;
    H = cvs.height = 300;
    GY = Math.round(H * 0.72);
    var gap = W / (DEFS.length + 1);
    // all landmarks pre-placed; only labels are revealed when boy arrives
    stops = DEFS.map(function (d, i) {
      return { name: d.name, bench: !!d.bench,
               x: Math.round(gap * (i + 1)),
               labeled: false, lblA: 0 };
    });
  }

  var boy = { x: 0, ph: 0, state: 'walk', idx: 0, timer: 0, speed: 2 };
  function resetBoy() {
    boy.x = -20; boy.ph = 0; boy.state = 'walk'; boy.idx = 0; boy.timer = 0;
    stops.forEach(function (s) { s.labeled = false; s.lblA = 0; });
  }

  // ── scene: background ──────────────────────────────────────────────────────
  function drawBg() {
    ctx.fillStyle = '#06090f';
    ctx.fillRect(0, 0, W, H);

    // faint horizontal ground hatching
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 0.6;
    for (var hy = GY + 5; hy < H; hy += 7) {
      ctx.beginPath(); ctx.moveTo(0, hy); ctx.lineTo(W, hy); ctx.stroke();
    }

    // horizon line
    ctx.strokeStyle = INK_DIM; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, GY); ctx.lineTo(W, GY); ctx.stroke();

    // stars
    ctx.fillStyle = 'rgba(255,255,255,0.72)';
    for (var i = 0; i < 38; i++) {
      ctx.beginPath();
      ctx.arc((i * 173 + 29) % W, (i * 107 + 13) % Math.round(GY * 0.6),
              i % 5 === 0 ? 1.3 : 0.65, 0, Math.PI * 2);
      ctx.fill();
    }

    // moon — two arcs (crescent silhouette)
    ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(W - 76, 34, 18, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = INK_DIM; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(W - 67, 31, 14, 0, Math.PI * 2); ctx.stroke();

    // lamp posts (outline only)
    ctx.strokeStyle = INK_DIM; ctx.lineWidth = 1;
    [W * 0.12, W * 0.45, W * 0.78].forEach(function (lx) {
      ctx.beginPath();
      ctx.moveTo(lx, GY); ctx.lineTo(lx, GY - 52);
      // lamp head
      ctx.moveTo(lx - 6, GY - 52); ctx.lineTo(lx + 6, GY - 52);
      ctx.stroke();
      // bulb circle
      ctx.beginPath();
      ctx.arc(lx, GY - 56, 4, 0, Math.PI * 2); ctx.stroke();
    });
  }

  // ── scene: tree (filled + pencil outline) ───────────────────────────────────
  function drawTree(x) {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';

    // trunk fill
    ctx.fillStyle = 'rgba(48,28,8,0.92)';
    ctx.beginPath();
    ctx.moveTo(x - 5, GY);
    ctx.lineTo(x - 5, GY - 44); ctx.lineTo(x + 5, GY - 44); ctx.lineTo(x + 5, GY);
    ctx.closePath(); ctx.fill();

    // foliage fills (back-to-front)
    ctx.fillStyle = 'rgba(12,42,12,0.88)';
    ctx.beginPath(); ctx.arc(x - 12, GY - 50, 16, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 12, GY - 50, 16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(16,52,16,0.92)';
    ctx.beginPath(); ctx.arc(x, GY - 58, 22, 0, Math.PI * 2); ctx.fill();

    // trunk outline
    ctx.strokeStyle = INK; ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x - 4, GY); ctx.lineTo(x - 4, GY - 44);
    ctx.moveTo(x + 4, GY); ctx.lineTo(x + 4, GY - 44);
    ctx.moveTo(x - 7, GY); ctx.bezierCurveTo(x - 4, GY - 6, x - 4, GY - 8, x - 4, GY - 14);
    ctx.moveTo(x + 7, GY); ctx.bezierCurveTo(x + 4, GY - 6, x + 4, GY - 8, x + 4, GY - 14);
    ctx.stroke();

    // foliage outlines
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x,      GY - 58, 22, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(x - 12, GY - 50, 16, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(x + 12, GY - 50, 16, 0, Math.PI * 2); ctx.stroke();

    // leaf texture strokes
    ctx.strokeStyle = INK_DIM; ctx.lineWidth = 0.8;
    var texPts = [[-8,-64],[6,-68],[-14,-52],[14,-54],[2,-72],[-6,-46],[10,-47]];
    texPts.forEach(function (p) {
      ctx.beginPath();
      ctx.moveTo(x + p[0], GY + p[1]);
      ctx.lineTo(x + p[0] + 6, GY + p[1] - 4);
      ctx.stroke();
    });
  }

  // ── scene: bench (filled + pencil outline) ──────────────────────────────────
  function drawBench(x) {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';

    var sw = 42, sh = 7, legH = 14;
    var sy = GY - legH - sh;

    // leg fills
    ctx.fillStyle = 'rgba(52,30,8,0.90)';
    [x - sw * 0.3, x + sw * 0.3].forEach(function (lx) {
      ctx.fillRect(lx - 2.5, sy, 5, legH);
    });

    // seat fill
    ctx.fillStyle = 'rgba(78,48,16,0.92)';
    ctx.fillRect(x - sw / 2, sy, sw, sh);

    // backrest fill
    ctx.fillStyle = 'rgba(68,42,14,0.88)';
    ctx.fillRect(x - sw / 2, sy - sh * 2, sw, sh);

    // backrest post fills
    ctx.fillStyle = 'rgba(52,30,8,0.90)';
    [x - sw * 0.3, x + sw * 0.3].forEach(function (lx) {
      ctx.fillRect(lx - 2, sy - sh * 2, 4, sh * 2);
    });

    // outlines
    ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x - sw * 0.3, GY); ctx.lineTo(x - sw * 0.3, sy);
    ctx.moveTo(x + sw * 0.3, GY); ctx.lineTo(x + sw * 0.3, sy);
    ctx.moveTo(x - sw * 0.3, GY - legH * 0.55); ctx.lineTo(x + sw * 0.3, GY - legH * 0.55);
    ctx.moveTo(x - sw / 2, sy);             ctx.lineTo(x + sw / 2, sy);
    ctx.moveTo(x - sw / 2, sy + sh * 0.55); ctx.lineTo(x + sw / 2, sy + sh * 0.55);
    ctx.moveTo(x - sw / 2, sy - sh * 1.4);  ctx.lineTo(x + sw / 2, sy - sh * 1.4);
    ctx.moveTo(x - sw / 2, sy - sh * 2);    ctx.lineTo(x + sw / 2, sy - sh * 2);
    ctx.moveTo(x - sw * 0.3, sy); ctx.lineTo(x - sw * 0.3, sy - sh * 2);
    ctx.moveTo(x + sw * 0.3, sy); ctx.lineTo(x + sw * 0.3, sy - sh * 2);
    ctx.stroke();
  }

  // ── scene: boy (pencil outline) ───────────────────────────────────────────
  function drawBoy(x, ph, walking) {
    var legL = 20, bodyH = 20, hw = 9;
    var bTop = GY - legL - bodyH;
    var hcY  = bTop - hw;
    var sw   = walking ? Math.sin(ph) * 0.33 : 0;
    var bob  = walking ? Math.sin(ph * 2) * 1.2 : 0;

    ctx.strokeStyle = INK;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';

    // ground shadow (faint ellipse)
    ctx.save(); ctx.globalAlpha = 0.18;
    ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.ellipse(x, GY, 13, 3, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();

    // legs
    ctx.lineWidth = 2;
    [[-sw, 7], [sw, -7]].forEach(function (a) {
      ctx.save(); ctx.translate(x, GY - legL); ctx.rotate(a[0]);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, legL); ctx.lineTo(a[1], legL);
      ctx.stroke(); ctx.restore();
    });

    // body outline
    ctx.lineWidth = 1.8;
    rrect(x - 8, bTop, 16, bodyH, 3); ctx.stroke();
    // shirt collar seam
    ctx.strokeStyle = INK_DIM; ctx.lineWidth = 0.7;
    ctx.beginPath(); ctx.moveTo(x - 8, bTop + 5); ctx.lineTo(x + 8, bTop + 5); ctx.stroke();
    ctx.strokeStyle = INK;

    // arms
    ctx.lineWidth = 1.8;
    [[-8, sw * 0.8, -1], [8, -sw * 0.8, 1]].forEach(function (a) {
      ctx.save(); ctx.translate(x + a[0], bTop + 5); ctx.rotate(a[1]);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(a[2] * 9, 12); ctx.stroke();
      ctx.restore();
    });

    // backpack (outline)
    ctx.lineWidth = 1.4;
    rrect(x + 5, bTop + 2, 9, 14, 2); ctx.stroke();
    ctx.strokeStyle = INK_DIM; ctx.lineWidth = 0.7;
    ctx.beginPath(); ctx.moveTo(x + 7, bTop + 6); ctx.lineTo(x + 12, bTop + 6); ctx.stroke();
    ctx.strokeStyle = INK;

    // head (outline)
    ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.arc(x, hcY + bob, hw, 0, Math.PI * 2); ctx.stroke();

    // hair arc
    ctx.lineWidth = 1.3;
    ctx.beginPath(); ctx.arc(x - 1, hcY - 1 + bob, hw * 0.9, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();

    // eyes — tiny filled dots
    ctx.fillStyle = INK;
    var ey = hcY + hw * 0.2 + bob;
    [x + 3, x - 3].forEach(function (ex) {
      ctx.beginPath(); ctx.arc(ex, ey, 1.4, 0, Math.PI * 2); ctx.fill();
    });

    // smile
    ctx.strokeStyle = INK_DIM; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(x, ey + 1.5, 3, 0.15, Math.PI - 0.15); ctx.stroke();
    ctx.strokeStyle = INK;
  }

  // ── label ──────────────────────────────────────────────────────────────────
  function drawLabel(text, lx, alpha) {
    if (alpha <= 0) return;
    var ly = GY - 106;
    ctx.save(); ctx.globalAlpha = alpha;

    ctx.font = '600 13px "Space Grotesk", "Manrope", system-ui, sans-serif';
    var tw = ctx.measureText(text).width;
    var bw = tw + 26, bh = 28;
    var bx = Math.max(bw / 2 + 6, Math.min(W - bw / 2 - 6, lx));

    // bubble fill + outline
    ctx.fillStyle = 'rgba(6,9,15,0.88)';
    rrect(bx - bw / 2, ly - bh / 2, bw, bh, 6); ctx.fill();
    ctx.strokeStyle = INK; ctx.lineWidth = 1.2;
    rrect(bx - bw / 2, ly - bh / 2, bw, bh, 6); ctx.stroke();

    // dashed stem
    ctx.setLineDash([3, 4]); ctx.strokeStyle = INK_DIM; ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.moveTo(lx, ly + bh / 2); ctx.lineTo(lx, GY - 82); ctx.stroke();
    ctx.setLineDash([]);

    // text
    ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, bx, ly);
    ctx.restore();
  }

  // ── main tick ──────────────────────────────────────────────────────────────
  function tick() {
    ctx.clearRect(0, 0, W, H);
    drawBg();

    // draw all landmarks (always visible); label fades in only after boy arrives
    stops.forEach(function (st) {
      if (st.bench) drawBench(st.x); else drawTree(st.x);
      if (st.labeled) st.lblA = Math.min(st.lblA + 0.042, 1);
      drawLabel(st.name, st.x, st.lblA);
    });

    if (boy.state === 'walk') {
      boy.x += boy.speed; boy.ph += 0.18;
      var nxt = stops[boy.idx];
      if (nxt && boy.x >= nxt.x - 34) {
        boy.x = nxt.x - 34; boy.state = 'show'; boy.timer = 0; nxt.labeled = true;
      } else if (!nxt) {
        if (++boy.timer > 70) resetBoy();
      }
    } else {
      boy.ph += 0.055;
      if (++boy.timer >= 105) { boy.idx++; boy.state = 'walk'; }
    }

    drawBoy(boy.x, boy.ph, boy.state === 'walk');
    requestAnimationFrame(tick);
  }

  var started = false;
  function startAnim() {
    if (started) return;
    started = true; layout(); resetBoy();
    boy.speed = Math.max(1.8, W / 500);
    tick();
  }
  new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) startAnim();
  }, { threshold: 0 }).observe(wrapper);
  // fallback: start after page load if section is already in view
  window.addEventListener('load', function () {
    var r = wrapper.getBoundingClientRect();
    if (r.top < window.innerHeight) startAnim();
  });

  window.addEventListener('resize', function () {
    if (!started) return;
    layout(); boy.speed = Math.max(1.8, W / 500);
  }, { passive: true });
})();
