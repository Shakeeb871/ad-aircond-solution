/* =============================================================
   Ad Aircond Solution — interface behaviour
   ============================================================= */
(function () {
  'use strict';

  var doc = document;
  var WHATSAPP = '60178570744';

  /* ---------- header shadow on scroll ---------- */
  var header = doc.getElementById('siteHeader');
  var onScroll = function () {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile navigation ---------- */
  var nav = doc.getElementById('primaryNav');
  var burger = doc.getElementById('burger');
  var scrim = doc.getElementById('navScrim');

  function setMenu(open) {
    if (!nav || !burger) return;
    nav.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (scrim) scrim.hidden = !open;
    doc.body.style.overflow = open ? 'hidden' : '';
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
  }
  if (scrim) scrim.addEventListener('click', function () { setMenu(false); });

  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setMenu(false);
      closeSubmenus();
    }
  });

  /* close the panel after tapping a link */
  if (nav) {
    nav.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (link) setMenu(false);
    });
  }

  /* ---------- services submenu ---------- */
  var subItems = Array.prototype.slice.call(doc.querySelectorAll('.has-sub'));

  function closeSubmenus(except) {
    subItems.forEach(function (item) {
      if (item === except) return;
      item.classList.remove('is-open');
      var t = item.querySelector('.nav__toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  subItems.forEach(function (item) {
    var toggle = item.querySelector('.nav__toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function (e) {
      /* The toggle is a real link to the services page. On desktop the submenu
         opens on hover, so the link just works. Inside the mobile drawer there
         is no hover, so the first tap opens the submenu and a second tap
         follows the link. */
      var inDrawer = window.matchMedia('(max-width:1180px)').matches;
      if (inDrawer && !item.classList.contains('is-open')) {
        e.preventDefault();
        e.stopPropagation();
        closeSubmenus(item);
        item.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  doc.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) closeSubmenus();
  });

  /* ---------- reveal on scroll ---------- */
  var revealables = Array.prototype.slice.call(doc.querySelectorAll('.reveal'));
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduced) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- active navigation link ---------- */
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll('.nav__link[href^="#"]'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.length > 1 ? doc.querySelector(id) : null;
    })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- enquiry forms -> WhatsApp ---------- */
  /* Both the hero request card and the booking form at the foot of the page use
     this. Neither has a backend: the details are composed into a WhatsApp
     message and nothing is stored by the page. */
  var LABELS = {
    service: 'Service',
    area: 'Area',
    message: 'Details'
  };

  Array.prototype.slice.call(doc.querySelectorAll('[data-wa-form]')).forEach(function (form) {
    var errorBox = form.querySelector('[role="alert"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var missing = [];
      ['name', 'phone'].forEach(function (key) {
        var field = form.elements[key];
        if (!field) return;
        var empty = !field.value.trim();
        field.classList.toggle('is-invalid', empty);
        if (empty) missing.push(field);
      });

      if (missing.length) {
        if (errorBox) errorBox.hidden = false;
        missing[0].focus();
        return;
      }
      if (errorBox) errorBox.hidden = true;

      var lines = ['Hi Ad Aircond Solution, I would like to book a service.', ''];

      if (form.elements.name) lines.push('Name: ' + form.elements.name.value.trim());
      if (form.elements.phone) lines.push('Contact: ' + form.elements.phone.value.trim());

      Object.keys(LABELS).forEach(function (key) {
        var field = form.elements[key];
        if (!field) return;
        var value = field.value.trim();
        if (value) lines.push(LABELS[key] + ': ' + value);
      });

      window.open(
        'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n')),
        '_blank',
        'noopener'
      );
    });

    form.addEventListener('input', function (e) {
      if (e.target.classList.contains('is-invalid') && e.target.value.trim()) {
        e.target.classList.remove('is-invalid');
      }
    });
  });

  /* ---------- footer year ---------- */
  var year = doc.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
