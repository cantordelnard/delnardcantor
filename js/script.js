const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle menu
mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu on link click
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 50);
});


// Initialize modal functionality
function initCertificationModal() {
  const modal = document.getElementById('certificate-modal');
  const closeBtn = document.querySelector('.close-modal');
  const viewBtns = document.querySelectorAll('.view-certificate-btn');
  
  if (!modal || !closeBtn || viewBtns.length === 0) return;

  // Open modal
  viewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Get certificate image
      const certImg = this.closest('.certificate-image-container')
                         .querySelector('.certificate-image').src;
      
      // Set modal content from data attributes
      document.getElementById('modal-certificate-image').src = certImg;
      document.getElementById('modal-certificate-title').textContent = 
        this.getAttribute('data-title');
      document.getElementById('modal-certificate-issuer').textContent = 
        "Issued by: " + this.getAttribute('data-issuer');
      document.getElementById('modal-certificate-date').textContent = 
        "Issued: " + this.getAttribute('data-date');
      document.getElementById('modal-certificate-description').textContent = 
        this.getAttribute('data-description');
      document.querySelector('.verify-link').href = 
        this.getAttribute('data-verify');
      
      // Show modal and disable body scroll
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    });
  });

  // Close modal
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  });

  // Close when clicking outside modal
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCertificationModal);

// SEE MORE BUTTON FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.see-more-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = this.closest('.experience-card');
      const hiddenItems = card.querySelectorAll('.hidden-item');
      const isExpanded = this.classList.toggle('expanded');

      hiddenItems.forEach(item => {
        item.style.display = isExpanded ? 'list-item' : 'none';
      });

      this.textContent = isExpanded ? 'See Less' : 'See More';
    });
  });

  // INTERSECTION OBSERVER FOR ANIMATION
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
});