// This file handles GSAP and animation utilities
export const initScrollAnimations = () => {
  if (typeof window === 'undefined') return;
  
  // Check if GSAP is available
  if (!window.gsap) {
    console.warn('GSAP not loaded');
    return;
  }

  const gsap = window.gsap;
  
  // Register ScrollTrigger plugin
  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  // Hero animations
  gsap.from("[data-hero-title]", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out"
  });
  
  gsap.from("[data-hero-subtitle]", {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: "power3.out"
  });

  // Animate elements on scroll
  gsap.utils.toArray('[data-animate]').forEach((element: any, index: number) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      delay: index * 0.1,
      ease: "power3.out"
    });
  });

  // Counter animations
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach((counter: Element) => {
    const target = parseInt(counter.getAttribute('data-target') || '0');
    const display = counter.querySelector('[data-counter-display]') as HTMLElement;
    
    if (display) {
      gsap.to(display, {
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        duration: 2,
        textContent: target,
        roundProps: "textContent",
        ease: "power2.out"
      });
    }
  });
};

export const initNavbarAnimation = () => {
  if (typeof window === 'undefined') return;
  
  let lastScrollY = window.scrollY;
  
  const navbar = document.querySelector('[data-navbar]') as HTMLElement;
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.style.background = 'rgba(26, 26, 26, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.1)';
      navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollY = currentScrollY;
  });
};

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}
