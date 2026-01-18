// Components loader for Care for Life website
(function () {
  // Get current page name from URL
  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop().replace(".html", "");
    return page || "index";
  }

  // Highlight active nav link
  function highlightActiveLink() {
    const currentPage = getCurrentPage();

    // Desktop nav links
    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.dataset.page === currentPage) {
        link.classList.add("font-semibold", "text-brand-blueDark", "underline", "underline-offset-4", "decoration-2", "active-link");
      }
    });

    // Mobile nav links
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      if (link.dataset.page === currentPage) {
        link.classList.remove("text-text");
        link.classList.add("font-semibold", "text-brand-blueDark", "underline", "underline-offset-4", "decoration-2");
      }
    });
  }

  // Initialize mobile menu toggle
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  }

  // Initialize slide-in panel
  function initSlideInPanel() {
    const getStartedBtn = document.getElementById("get-started-btn");
    const mobileGetStartedBtn = document.getElementById("mobile-get-started-btn");
    const floatingGetStartedBtn = document.getElementById("floating-get-started");
    const slideInPanel = document.getElementById("slidein-panel");
    const slideInOverlay = document.getElementById("slidein-overlay");
    const slideInClose = document.getElementById("slidein-close");
    const slideInForm = document.getElementById("slidein-form");
    const slideInSuccess = document.getElementById("slidein-success");
    const mobileMenu = document.getElementById("mobile-menu");

    function openPanel() {
      slideInPanel.classList.remove("translate-x-full");
      slideInOverlay.classList.remove("opacity-0", "pointer-events-none");
      slideInOverlay.classList.add("opacity-100");
      document.body.style.overflow = "hidden";
      // Close mobile menu if open
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    }

    function closePanel() {
      slideInPanel.classList.add("translate-x-full");
      slideInOverlay.classList.add("opacity-0", "pointer-events-none");
      slideInOverlay.classList.remove("opacity-100");
      document.body.style.overflow = "";
    }

    if (getStartedBtn) {
      getStartedBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openPanel();
      });
    }

    if (mobileGetStartedBtn) {
      mobileGetStartedBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openPanel();
      });
    }

    if (floatingGetStartedBtn) {
      floatingGetStartedBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openPanel();
      });
    }

    if (slideInClose) {
      slideInClose.addEventListener("click", closePanel);
    }

    if (slideInOverlay) {
      slideInOverlay.addEventListener("click", closePanel);
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !slideInPanel.classList.contains("translate-x-full")) {
        closePanel();
      }
    });

    // Handle form submission
    if (slideInForm) {
      slideInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        slideInForm.classList.add("hidden");
        slideInSuccess.classList.remove("hidden");
        // Reset form after delay
        setTimeout(() => {
          slideInForm.reset();
          slideInForm.classList.remove("hidden");
          slideInSuccess.classList.add("hidden");
          closePanel();
        }, 3000);
      });
    }
  }

  // Initialize dropdown menu
  function initDropdown() {
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const dropdownArrow = document.getElementById("dropdown-arrow");
    const dropdownContainer = document.getElementById("dropdown-container");

    if (dropdownBtn && dropdownMenu) {
      // Toggle on click
      dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("hidden");
        dropdownArrow.classList.toggle("rotate-180");
      });

      // Close when clicking outside
      document.addEventListener("click", (e) => {
        if (!dropdownContainer.contains(e.target)) {
          dropdownMenu.classList.add("hidden");
          dropdownArrow.classList.remove("rotate-180");
        }
      });

      // Close on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          dropdownMenu.classList.add("hidden");
          dropdownArrow.classList.remove("rotate-180");
        }
      });
    }
  }

  // Initialize navbar scroll effect
  function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    const navbarLogo = document.getElementById("navbar-logo");
    const navLinks = document.querySelectorAll(".nav-link:not(#dropdown-menu .nav-link)");
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownArrow = document.getElementById("dropdown-arrow");
    const mobileMenuBtn = document.querySelector("#mobile-menu-btn svg");

    // Set initial white text (except active link)
    navLinks.forEach((link) => {
      if (!link.classList.contains("active-link")) {
        link.classList.remove("text-brand-blueDark");
        link.classList.add("text-white");
      }
    });
    if (dropdownBtn) {
      dropdownBtn.classList.remove("text-brand-blueDark");
      dropdownBtn.classList.add("text-white");
    }
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove("text-brand-blueDark");
      mobileMenuBtn.classList.add("text-white");
    }

    if (navbar) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
          navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
          navbar.style.backdropFilter = "blur(10px)";
          navbar.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
          // Change to blue text (except active link which stays blue)
          navLinks.forEach((link) => {
            if (!link.classList.contains("active-link")) {
              link.classList.remove("text-white");
              link.classList.add("text-brand-blueDark",);
            }
          });
          if (dropdownBtn) {
            dropdownBtn.classList.remove("text-white");
            dropdownBtn.classList.add("text-brand-blueDark",);
          }
          if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove("text-white");
            mobileMenuBtn.classList.add("text-brand-blueDark",);
          }
          if (navbarLogo) {
            navbarLogo.classList.remove("h-24", "mt-2");
            navbarLogo.classList.add("h-14");
          }
        } else {
          navbar.style.backgroundColor = "transparent";
          navbar.style.backdropFilter = "none";
          navbar.style.boxShadow = "none";
          // Change to white text (except active link which stays blue)
          navLinks.forEach((link) => {
            if (!link.classList.contains("active-link")) {
              link.classList.remove("text-brand-blueDark");
              link.classList.add("text-white");
            }
          });
          if (dropdownBtn) {
            dropdownBtn.classList.remove("text-brand-blueDark");
            dropdownBtn.classList.add("text-white");
          }
          if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove("text-brand-blueDark");
            mobileMenuBtn.classList.add("text-white");
          }
          if (navbarLogo) {
            navbarLogo.classList.remove("h-14");
            navbarLogo.classList.add("h-24", "mt-2");
          }
        }
      });
    }
  }

  // Load component HTML
  async function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      const response = await fetch(componentPath);
      if (response.ok) {
        const html = await response.text();
        element.innerHTML = html;
        return true;
      }
    } catch (error) {
      console.error(`Error loading component ${componentPath}:`, error);
    }
    return false;
  }

  // Initialize all components
  async function init() {
    // Create form placeholder dynamically (appended to body)
    const formPlaceholder = document.createElement("div");
    formPlaceholder.id = "form-placeholder";
    document.body.appendChild(formPlaceholder);

    // Load nav, footer, and form
    await Promise.all([
      loadComponent("nav-placeholder", "components/nav.html"),
      loadComponent("footer-placeholder", "components/footer.html"),
      loadComponent("form-placeholder", "components/form.html"),
    ]);

    // Initialize functionality after components are loaded
    highlightActiveLink();
    initMobileMenu();
    initDropdown();
    initSlideInPanel();
    initNavbarScroll();
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
