/* Pratik Gaikwad — Portfolio interactions (Vanilla JS) */
(function () {
  'use strict';

  // ----- Page load -----
  window.addEventListener('load', function () {
    document.body.classList.add('page-loaded');
  });

  // ----- Sticky nav state -----
  var nav = document.querySelector('.nav');
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 16) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Mobile nav -----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // ----- Reveal on scroll (Intersection Observer) -----
  var revealEls = document.querySelectorAll('.reveal, .stagger');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // ----- Magnetic CTA buttons -----
  var magnets = document.querySelectorAll('[data-magnetic]');
  magnets.forEach(function (btn) {
    var strength = 18;
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var x = e.clientX - r.left - r.width / 2;
      var y = e.clientY - r.top - r.height / 2;
      btn.style.transform = 'translate(' + (x / r.width) * strength + 'px,' + (y / r.height) * strength + 'px)';
    });
    btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
  });

  // ----- Card spotlight hover -----
  document.querySelectorAll('.card-x').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });

  // ----- Animated counters -----
  var counters = document.querySelectorAll('[data-count]');
  var animateCounter = function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var dur = 1400;
    var start = performance.now();
    var step = function (t) {
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCounter(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(animateCounter);
  }

  // ----- Smooth scroll for in-page anchors -----
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          var top = t.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  // ----- Year -----
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear().toString();
})();
