/* ==========================================================================
   PARE DE PAGAR PARA TRABALHAR — JavaScript
   Juliana Moraes | DNA da Vitória
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Header: show/hide on scroll ---------- */
  var header = document.getElementById('header');
  var lastScroll = 0;
  var scrollThreshold = 300;

  function handleHeaderScroll() {
    var currentScroll = window.pageYOffset;
    if (currentScroll > scrollThreshold) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
    lastScroll = currentScroll;
  }

  /* ---------- Fade-in on scroll (IntersectionObserver) ---------- */
  function initFadeIn() {
    var elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- FAQ Accordion ---------- */
  function initFAQ() {
    var items = document.querySelectorAll('.faq-item');

    items.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');

      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('active');

        // Close all
        items.forEach(function (other) {
          other.classList.remove('active');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Open clicked (if was closed)
        if (!isOpen) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ---------- Floating CTA (mobile) ---------- */
  function initFloatingCTA() {
    var cta = document.getElementById('floating-cta');
    var priceSection = document.getElementById('preco');
    if (!cta || !priceSection) return;

    function updateFloatingCTA() {
      var scrollY = window.pageYOffset;
      var windowH = window.innerHeight;
      var priceTop = priceSection.offsetTop;
      var priceBottom = priceTop + priceSection.offsetHeight;
      var isMobile = window.innerWidth < 768;

      if (!isMobile) {
        cta.classList.remove('active');
        cta.classList.remove('hidden');
        return;
      }

      // Show after scrolling 400px, hide when in price section
      if (scrollY > 400) {
        cta.classList.add('active');
      } else {
        cta.classList.remove('active');
      }

      // Hide when price section is visible
      if (scrollY + windowH > priceTop && scrollY < priceBottom) {
        cta.classList.add('hidden');
      } else {
        cta.classList.remove('hidden');
      }
    }

    window.addEventListener('scroll', updateFloatingCTA, { passive: true });
    updateFloatingCTA();
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#checkout') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        var headerHeight = 70;
        var targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ---------- Init ---------- */
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  document.addEventListener('DOMContentLoaded', function () {
    initFadeIn();
    initFAQ();
    initFloatingCTA();
    initSmoothScroll();
  });

})();
