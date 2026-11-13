(() => {
  'use strict';
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('#nav');
  const closeMenu = () => {
    if (!menu || !nav) return;
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('open');
  };
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
        menu.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
    });
  }
  const photo = document.querySelector('#portrait-photo');
  const fallback = document.querySelector('#portrait-fallback');
  if (photo && fallback) {
    photo.addEventListener('load', () => {
      if (photo.naturalWidth > 0) { photo.hidden = false; fallback.hidden = true; }
    });
    photo.addEventListener('error', () => {
      photo.hidden = true;
      fallback.hidden = false;
    });
    if (photo.complete && photo.naturalWidth > 0) {
      photo.hidden = false;
      fallback.hidden = true;
    }
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();