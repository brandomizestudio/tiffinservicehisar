/**
 * Food 4 Mood Tiffin Service - Interactive Functionality
 * Pure Vanilla JavaScript (GitHub Pages compatible)
 */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const siteHeader = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menuToggleBtn');
  const mobileMenuWrapper = document.getElementById('mobileMenuWrapper');
  const navLinks = document.querySelectorAll('.main-nav a');
  const sections = document.querySelectorAll('main section[id], main .delivery-strip-wrap');

  /* --------------------------------------------------------------------------
     1. Mobile Navigation Toggle & Drawer
     -------------------------------------------------------------------------- */
  if (menuToggle && mobileMenuWrapper) {
    const toggleMenu = (open) => {
      const isCurrentlyOpen = body.classList.contains('nav-open');
      const shouldOpen = typeof open === 'boolean' ? open : !isCurrentlyOpen;
      
      body.classList.toggle('nav-open', shouldOpen);
      menuToggle.setAttribute('aria-expanded', String(shouldOpen));
      menuToggle.setAttribute('aria-label', shouldOpen ? 'Close menu' : 'Open menu');
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking outside mobile drawer
    document.addEventListener('click', (e) => {
      if (body.classList.contains('nav-open')) {
        if (!mobileMenuWrapper.contains(e.target) && !menuToggle.contains(e.target)) {
          toggleMenu(false);
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) {
        toggleMenu(false);
      }
    });

    // Close drawer when any nav link is tapped
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Sticky Header Scroll Shadow
     -------------------------------------------------------------------------- */
  const handleScrollEffects = () => {
    if (siteHeader) {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects();

  /* --------------------------------------------------------------------------
     3. Active Nav Link on Scroll (ScrollSpy)
     -------------------------------------------------------------------------- */
  const sectionElements = document.querySelectorAll('main section[id]');
  
  const updateActiveNavLink = () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sectionElements.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const targetId = href ? href.replace('#', '') : '';
      if (targetId && targetId === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* --------------------------------------------------------------------------
     4. Menu Zoom Modal Lightbox
     -------------------------------------------------------------------------- */
  const menuModal = document.getElementById('menuModal');
  const openMenuModalBtn = document.getElementById('openMenuModalBtn');
  const menuFrameTrigger = document.getElementById('menuFrameTrigger');
  const closeMenuModalBtn = document.getElementById('closeMenuModalBtn');

  const openModal = () => {
    if (menuModal && typeof menuModal.showModal === 'function') {
      menuModal.showModal();
      body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (menuModal && typeof menuModal.close === 'function') {
      menuModal.close();
      body.style.overflow = '';
    }
  };

  if (openMenuModalBtn) {
    openMenuModalBtn.addEventListener('click', openModal);
  }

  if (menuFrameTrigger) {
    menuFrameTrigger.addEventListener('click', openModal);
    menuFrameTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  }

  if (closeMenuModalBtn) {
    closeMenuModalBtn.addEventListener('click', closeModal);
  }

  if (menuModal) {
    // Close modal when clicking on the backdrop
    menuModal.addEventListener('click', (e) => {
      const rect = menuModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeModal();
      }
    });

    menuModal.addEventListener('close', () => {
      body.style.overflow = '';
    });
  }

  /* --------------------------------------------------------------------------
     5. FAQ Smooth Single-Accordion
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach((item) => {
    const summary = item.querySelector('summary');
    if (summary) {
      summary.addEventListener('click', () => {
        // Optional: close other open items for a neat accordion feel
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.hasAttribute('open')) {
            otherItem.removeAttribute('open');
          }
        });
      });
    }
  });
});
