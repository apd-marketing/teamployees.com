document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Mobile Navigation Menu ---
  const burgerButtons = document.querySelectorAll('[data-burger-button="true"]');
  const mobileHeader = document.querySelector('.header--mobile_1lv');

  function toggleMenu(open) {
    if (!mobileHeader) return;
    const shouldOpen = typeof open === 'boolean'
      ? open
      : !mobileHeader.classList.contains('header--opened_1Ys');

    mobileHeader.classList.toggle('header--opened_1Ys', shouldOpen);

    burgerButtons.forEach(btn => {
      btn.classList.toggle('w-burger--active', shouldOpen);
      btn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    });

    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  burgerButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });
  });

  // Close menu when a link inside it is clicked
  if (mobileHeader) {
    const navLinks = mobileHeader.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        toggleMenu(false);
      });
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileHeader && mobileHeader.classList.contains('header--opened_1Ys')) {
      toggleMenu(false);
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (
      mobileHeader &&
      mobileHeader.classList.contains('header--opened_1Ys') &&
      !mobileHeader.contains(e.target) &&
      !Array.from(burgerButtons).some(btn => btn.contains(e.target))
    ) {
      toggleMenu(false);
    }
  });

  // --- Smooth Scroll for in-page anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

