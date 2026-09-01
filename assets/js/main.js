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
      e.stopPropagation();
      var open = !item.classList.contains('is-open');
      closeSubmenus(item);
      item.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
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

  /* ---------- booking form -> WhatsApp ---------- */
  var form = doc.getElementById('bookingForm');
  var formError = doc.getElementById('bookingError');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.elements.name;
      var phone = form.elements.phone;
      var service = form.elements.service;
      var area = form.elements.area;
      var message = form.elements.message;

      var missing = [];
      [name, phone].forEach(function (field) {
        var empty = !field.value.trim();
        field.classList.toggle('is-invalid', empty);
        if (empty) missing.push(field);
      });

      if (missing.length) {
        if (formError) formError.hidden = false;
        missing[0].focus();
        return;
      }
      if (formError) formError.hidden = true;

      var lines = [
        'Hi Ad Aircond Solution, I would like to book a service.',
        '',
        'Name: ' + name.value.trim(),
        'Contact: ' + phone.value.trim(),
        'Service: ' + service.value
      ];
      if (area.value.trim()) lines.push('Area: ' + area.value.trim());
      if (message.value.trim()) lines.push('Details: ' + message.value.trim());

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
  }

  /* ---------- footer year ---------- */
  var year = doc.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
