/* ===== NEXUS COWORK — SHARED SCRIPT ===== */

/* --- Dynamic Navbar & Footer Builder --- */
(function buildNavAndFooter() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.innerHTML = `
      <a href="index.html" class="nav-brand">
        <div class="brand-icon">⚡</div>
        Nexus<span>Cowork</span>
      </a>
      <div class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </div>
      <ul class="nav-links" id="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="membership.html">Membership</a></li>
        <li><a href="meetingrooms.html">Meeting Rooms</a></li>
        <li><a href="virtualoffice.html">Virtual Office</a></li>
        <li><a href="events.html">Events</a></li>
        <li><a href="availability.html">Availability</a></li>
        <li><a href="booking.html" class="nav-cta">Book Now</a></li>
      </ul>
    `;
  }

  const footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="nav-brand" style="margin-bottom:0">
            <div class="brand-icon">⚡</div> Nexus<span>Cowork</span>
          </div>
          <p>A premium modern coworking hub designed for innovators, startup creators, and agile teams. Work better. Connect more.</p>
        </div>
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="membership.html">Membership</a></li>
            <li><a href="meetingrooms.html">Meeting Rooms</a></li>
            <li><a href="virtualoffice.html">Virtual Office</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="availability.html">Availability</a></li>
            <li><a href="booking.html">Book Now</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="#">📍 123 Innovation Street</a></li>
            <li><a href="#">📞 +1 (555) 000-0000</a></li>
            <li><a href="mailto:hello@nexuscowork.com">✉️ hello@nexuscowork.com</a></li>
            <li><span>🕐 Mon–Sat, 8am–10pm</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 NexusCowork. All rights reserved.</p>
        <div class="social-links">
          <a href="https://x.com" target="_blank" class="social-link" aria-label="Twitter">𝕏</a>
          <a href="https://linkedin.com" target="_blank" class="social-link" aria-label="LinkedIn">in</a>
          <a href="https://instagram.com" target="_blank" class="social-link" aria-label="Instagram">📸</a>
        </div>
      </div>
    `;
  }
})();

/* --- Page Loader --- */
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 400);
  }
});

/* --- Navbar: Scroll Effect & Hamburger --- */
(function initNav() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run immediately on load in case page was refreshed at a scrolled position
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Active link highlight
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* --- Scroll Reveal --- */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  // Automate staggered delays and reveal direction vectors for children of grid containers
  const grids = document.querySelectorAll('.cards-grid, [style*="grid-template-columns"], .stats-bar, .time-grid, .avail-grid, .dash-grid');
  grids.forEach(grid => {
    const revealKids = grid.querySelectorAll(':scope > .reveal, :scope > * > .reveal');
    revealKids.forEach((kid, idx) => {
      if (!kid.style.transitionDelay && !kid.className.includes('delay-')) {
        kid.style.transitionDelay = `${Math.min(idx * 100, 500)}ms`;
      }
      if (!['reveal-up', 'reveal-down', 'reveal-left', 'reveal-right', 'reveal-scale'].some(c => kid.classList.contains(c))) {
        kid.classList.add('reveal-up');
      }
    });
  });

  // Assign standard reveal-up vector to standalone elements if none are set
  items.forEach(el => {
    if (!['reveal-up', 'reveal-down', 'reveal-left', 'reveal-right', 'reveal-scale'].some(c => el.classList.contains(c))) {
      el.classList.add('reveal-up');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => observer.observe(el));
})();

/* --- Tabs --- */
function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector || '[data-tabs]');
  if (!container) return;
  const buttons = container.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.tab-panel');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}
document.addEventListener('DOMContentLoaded', () => initTabs());

/* --- Toast Notification --- */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || '💬'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* --- Modal --- */
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('open');
}
function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('open');
}
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
  if (e.target.classList.contains('modal-close')) {
    e.target.closest('.modal-overlay')?.classList.remove('open');
  }
});

/* --- Animated Counter --- */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
  }, 16);
}
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', initCounters);

/* --- Smooth Scroll for Anchors --- */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = document.querySelector(anchor.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* --- Availability Slot Toggle --- */
function initAvailability() {
  document.querySelectorAll('.avail-slot.free').forEach(slot => {
    slot.addEventListener('click', () => {
      slot.classList.toggle('selected');
    });
  });
}
document.addEventListener('DOMContentLoaded', initAvailability);

/* --- Simple Form Validation --- */
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#ef4444';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });
  return valid;
}

/* --- LocalStorage helpers (for demo bookings/auth) --- */
const Store = {
  get: (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  remove: (key) => localStorage.removeItem(key),
};
window.Store = Store;

/* --- Demo Auth State --- */
function checkAuth() {
  return Store.get('cowork_user');
}
window.checkAuth = checkAuth;

function setAuthUI() {
  const user = checkAuth();
  const loginLinks = document.querySelectorAll('[data-auth="login"]');
  const dashLinks  = document.querySelectorAll('[data-auth="dash"]');
  loginLinks.forEach(el => el.style.display = user ? 'none' : '');
  dashLinks.forEach(el  => el.style.display = user ? '' : 'none');
}
document.addEventListener('DOMContentLoaded', setAuthUI);

/* --- Booking Form Submit (demo) --- */
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm('booking-form')) {
      showToast('Please fill all required fields.', 'error'); return;
    }
    showToast('Booking confirmed! Check your email for details.', 'success');
    bookingForm.reset();
  });
}

/* --- Contact / Enquiry Form (demo) --- */
const enquiryForm = document.getElementById('enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm('enquiry-form')) {
      showToast('Please fill all required fields.', 'error'); return;
    }
    showToast('Message sent! We\'ll get back to you shortly.', 'success');
    enquiryForm.reset();
  });
}

/* --- Dynamic Profile Dropdown Creator --- */
window.handleLogout = function(e) {
  if (e) e.preventDefault();
  Store.remove('cowork_user');
  showToast('Logged out successfully!', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
};

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  if (navbar && hamburger) {
    const user = checkAuth();
    const wrapper = document.createElement('div');
    wrapper.className = 'nav-profile-wrapper';
    
    let dropdownContent = '';
    if (user) {
      const isAdmin = user.email.toLowerCase() === 'admin@nexuscowork.com';
      dropdownContent = `
        <div class="profile-dropdown-user" style="padding: 10px 16px; border-bottom: 1px solid var(--border); font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
          Signed in as <strong style="color: var(--text-dark); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${user.name}</strong>
        </div>
        <a href="dashboard.html">Member Dashboard</a>
        ${isAdmin ? '<a href="admin.html">Admin Dashboard</a>' : ''}
        <a href="#" onclick="handleLogout(event)" style="color: #ef4444; border-top: 1px solid var(--border);">Sign Out</a>
      `;
    } else {
      dropdownContent = `
        <a href="login.html">Sign In / Register</a>
        <a href="dashboard.html">Member Dashboard</a>
        <a href="admin.html">Admin Dashboard</a>
      `;
    }

    wrapper.innerHTML = `
      <div class="nav-profile-trigger" id="profileDropdownBtn" aria-label="Account Menu" style="padding: 6px; cursor: pointer;">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <div class="nav-profile-dropdown" id="profileDropdownMenu">
        ${dropdownContent}
      </div>
    `;
    navbar.insertBefore(wrapper, hamburger);

    const trigger = wrapper.querySelector('#profileDropdownBtn');
    const menu = wrapper.querySelector('#profileDropdownMenu');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        menu.classList.remove('open');
      }
    });
  }
});

