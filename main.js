/* =========================================================
   main.js — Tanishka Portfolio
   Sections: Theme toggle | Mobile nav | Scroll reveal |
             Skill bars animation | Active nav link | Year
   ========================================================= */

(function () {
  'use strict';

  /* ── 1. Theme toggle ───────────────────────────────────── */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Restore saved preference
  const savedTheme = localStorage.getItem('ta-theme');
  if (savedTheme) body.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('ta-theme', next);
  });


  /* ── 2. Mobile hamburger nav ───────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    body.classList.toggle('nav-open');   // prevent scroll behind overlay
  });

  // Close nav when a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      body.classList.remove('nav-open');
    });
  });


  /* ── 3. Navbar shrink on scroll ────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });


  /* ── 4. Scroll-reveal animation ────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything for older browsers
    revealEls.forEach(el => el.classList.add('visible'));
  }




  /* ── 6. Active nav link on scroll ─────────────────────── */
  const sections   = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.classList.toggle(
              'active',
              a.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => sectionObserver.observe(s));


  /* ── 7. Footer year ────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
