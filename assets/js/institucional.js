/* ==========================================================================
   INSTITUCIONAL — Juliana Moraes
   JavaScript para página institucional
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Mobile Nav Toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Fechar menu ao clicar em um link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Smooth scroll para âncoras ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Fade-in ao scroll (IntersectionObserver) ---------- */
  var faders = document.querySelectorAll('.fade-in');
  if (faders.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    faders.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Header show/hide on scroll ---------- */
  var header = document.querySelector('.header--inst');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var current = window.pageYOffset;
      if (current <= 0) {
        header.style.transform = 'translateY(0)';
        return;
      }
      if (current > lastScroll && current > 100) {
        header.style.transform = 'translateY(-100%)';
        // Fechar menu mobile se aberto
        if (nav && nav.classList.contains('active')) {
          toggle.classList.remove('active');
          nav.classList.remove('active');
          document.body.style.overflow = '';
        }
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScroll = current;
    });
  }
})();
