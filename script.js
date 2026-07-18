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
    'work-experience.html': 'Building timeline',
    'portfolio.html': 'Loading artwork',
    'articles.html': 'Loading thoughts'
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
