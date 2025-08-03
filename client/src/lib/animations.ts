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
    duration: 0.6,
    y: 30,
    opacity: 0,
    ease: "power2.out"
  });
  
  gsap.from("[data-hero-subtitle]", {
    duration: 0.6,
    y: 20,
    opacity: 0,
    delay: 0.1,
    ease: "power2.out"
  });

  // Animate elements on scroll - faster and more responsive
  gsap.utils.toArray('[data-animate]').forEach((element: any, index: number) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 95%",  // Start animation sooner
        end: "bottom 30%",
        toggleActions: "play none none none"  // Don't reverse animations
      },
      duration: 0.5,  // Faster animation
      y: 30,  // Less movement for quicker animation
      opacity: 0,
      delay: Math.min(index * 0.05, 0.2),  // Much shorter delays between elements
      ease: "power2.out"  // Smoother easing
    });
  });

  // Counter animations - faster and more responsive
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach((counter: Element) => {
    const target = parseInt(counter.getAttribute('data-target') || '0');
    const display = counter.querySelector('[data-counter-display]') as HTMLElement;
    
    if (display) {
      gsap.to(display, {
        scrollTrigger: {
          trigger: counter,
          start: "top 90%",  // Start animation sooner
          end: "bottom 30%",
          toggleActions: "play none none none"  // Don't reverse animations
        },
        duration: 1.2,  // Faster animation (but not too fast for counters)
        textContent: target,
        roundProps: "textContent",
        ease: "power1.out"  // Smoother, faster easing
      });
    }
  });
};

export const initNavbarAnimation = () => {
  if (typeof window === 'undefined') return;
  
  let lastScrollY = window.scrollY;
  
  const navbar = document.querySelector('[data-navbar]') as HTMLElement;
  if (!navbar) return;

  // Set dark background immediately
  navbar.style.background = 'rgb(26, 26, 26)';
  navbar.style.backdropFilter = 'blur(10px)';
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Always maintain dark background regardless of scroll position
    navbar.style.background = 'rgb(26, 26, 26)';
    navbar.style.backdropFilter = 'blur(10px)';
    
    lastScrollY = currentScrollY;
  });
};

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}
