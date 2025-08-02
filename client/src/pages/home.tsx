import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import PortfolioSection from "@/components/portfolio-section";
import GallerySection from "@/components/gallery-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { initScrollAnimations, initNavbarAnimation } from "@/lib/animations";

export default function Home() {
  useEffect(() => {
    // Load GSAP and ScrollTrigger
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    gsapScript.onload = () => {
      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollTriggerScript.onload = () => {
        // Initialize animations after GSAP is loaded
        initScrollAnimations();
        initNavbarAnimation();
      };
      document.head.appendChild(scrollTriggerScript);
    };
    document.head.appendChild(gsapScript);

    // Load Anime.js
    const animeScript = document.createElement('script');
    animeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    document.head.appendChild(animeScript);

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(gsapScript);
      document.head.removeChild(animeScript);
      const scrollTriggerScript = document.querySelector('script[src*="ScrollTrigger"]');
      if (scrollTriggerScript) {
        document.head.removeChild(scrollTriggerScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
