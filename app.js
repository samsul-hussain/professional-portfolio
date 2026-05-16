document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a, .logo');
  const sections = document.querySelectorAll('.page-section');

  // Simple Router based on hash
  function navigate() {
    let hash = window.location.hash || '#home';
    
    // Remove # from hash to get id
    const targetId = hash.substring(1);
    
    // Hide all sections
    sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Remove active class from links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      }
    });

    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo(0, 0);
    } else {
      // Fallback to home if section not found
      document.getElementById('home').classList.add('active');
    }
  }

  // Listen for hash changes
  window.addEventListener('hashchange', navigate);

  // Initial navigation
  navigate();
  
  // Custom navigation for buttons that aren't in navbar
  const internalLinks = document.querySelectorAll('[data-link]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-link');
      window.location.hash = target;
    });
  });

  // Mobile Menu Toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const icon = mobileMenu.querySelector('i');
      if (navLinksContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close mobile menu when a link is clicked
  const navLinkItems = document.querySelectorAll('.nav-links a');
  navLinkItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
});
