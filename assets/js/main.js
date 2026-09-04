/* =============================================================
   Ad Aircond Solution — interface behaviour
   ============================================================= */
(() => {
  'use strict';

  const WHATSAPP = '60178570744';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const observe = (els, opts, fn) => {
    const io = new IntersectionObserver(es => es.forEach(e => fn(e, io)), opts);
    els.forEach(el => io.observe(el));
  };

  /* ---------- header shadow on scroll ---------- */
  const header = $('#siteHeader');
  const onScroll = () => header?.classList.toggle('is-stuck', scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile navigation ---------- */
  const nav = $('#primaryNav'), burger = $('#burger'), scrim = $('#navScrim');

  const setMenu = open => {
    if (!nav || !burger) return;
    nav.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (scrim) scrim.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  };

  burger?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  scrim?.addEventListener('click', () => setMenu(false));
  /* close the panel after tapping a link */
  nav?.addEventListener('click', e => e.target.closest('a[href^="#"]') && setMenu(false));

  /* ---------- services submenu ---------- */
  const subItems = $$('.has-sub');

  const closeSubmenus = except => subItems.forEach(item => {
    if (item === except) return;
    item.classList.remove('is-open');
    $('.nav__toggle', item)?.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    setMenu(false);
    closeSubmenus();
  });

  subItems.forEach(item => {
    const toggle = $('.nav__toggle', item);
    /* The toggle is a real link to the services page. On desktop the submenu
       opens on hover, so the link just works. Inside the mobile drawer there
       is no hover, so the first tap opens the submenu and a second tap
       follows the link. */
    toggle?.addEventListener('click', e => {
      if (!matchMedia('(max-width:1180px)').matches || item.classList.contains('is-open')) return;
      e.preventDefault();
      e.stopPropagation();
      closeSubmenus(item);
      item.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    });
  });

  document.addEventListener('click', e => e.target.closest('.has-sub') || closeSubmenus());

  /* ---------- reveal on scroll ---------- */
  const revealables = $$('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealables.forEach(el => el.classList.add('is-in'));
  } else {
    observe(revealables, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }, (entry, io) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }

  /* ---------- active navigation link ---------- */
  const navLinks = $$('.nav__link[href^="#"]');
  const sections = navLinks
    .map(link => link.getAttribute('href'))
    .filter(href => href && href.length > 1)
    .map(href => $(href))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    observe(sections, { rootMargin: '-45% 0px -50% 0px' }, entry => {
      if (!entry.isIntersecting) return;
      const id = '#' + entry.target.id;
      navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === id));
    });
  }

  /* ---------- enquiry forms -> WhatsApp ---------- */
  /* Both the hero request card and the booking form at the foot of the page use
     this. Neither has a backend: the details are composed into a WhatsApp
     message and nothing is stored by the page. */
  const FIELDS = { name: 'Name', phone: 'Contact', service: 'Service', area: 'Area', message: 'Details' };
  const REQUIRED = ['name', 'phone'];

  $$('[data-wa-form]').forEach(form => {
    const errorBox = $('[role="alert"]', form);

    form.addEventListener('submit', e => {
      e.preventDefault();

      const missing = REQUIRED.map(key => form.elements[key]).filter(field => {
        if (!field) return false;
        const empty = !field.value.trim();
        field.classList.toggle('is-invalid', empty);
        return empty;
      });

      if (errorBox) errorBox.hidden = !missing.length;
      if (missing.length) return missing[0].focus();

      const lines = ['Hi Ad Aircond Solution, I would like to book a service.', ''];
      for (const [key, label] of Object.entries(FIELDS)) {
        const value = form.elements[key]?.value.trim();
        if (value) lines.push(`${label}: ${value}`);
      }

      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`,
                  '_blank', 'noopener');
    });

    form.addEventListener('input', e => {
      if (e.target.value.trim()) e.target.classList.remove('is-invalid');
    });
  });

  /* ---------- footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
