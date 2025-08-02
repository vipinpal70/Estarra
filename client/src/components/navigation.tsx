import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-dark-charcoal/95 backdrop-blur-lg' : 'glass-effect'
        }`}
        data-navbar
        data-testid="navigation"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-poppins font-bold text-white">
              <span className="text-construction-orange">E</span>starra
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-construction-orange transition-colors duration-300"
                data-testid="nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-construction-orange transition-colors duration-300"
                data-testid="nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-white hover:text-construction-orange transition-colors duration-300"
                data-testid="nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-white hover:text-construction-orange transition-colors duration-300"
                data-testid="nav-portfolio"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-white hover:text-construction-orange transition-colors duration-300"
                data-testid="nav-gallery"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-construction-orange transition-colors duration-300"
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-dark-charcoal transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-white text-xl hover:text-construction-orange transition-colors duration-300"
            data-testid="mobile-nav-home"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-white text-xl hover:text-construction-orange transition-colors duration-300"
            data-testid="mobile-nav-about"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="text-white text-xl hover:text-construction-orange transition-colors duration-300"
            data-testid="mobile-nav-services"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')}
            className="text-white text-xl hover:text-construction-orange transition-colors duration-300"
            data-testid="mobile-nav-portfolio"
          >
            Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('gallery')}
            className="text-white text-xl hover:text-construction-orange transition-colors duration-300"
            data-testid="mobile-nav-gallery"
          >
            Gallery
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-white text-xl hover:text-construction-orange transition-colors duration-300"
            data-testid="mobile-nav-contact"
          >
            Contact
          </button>
        </div>
      </div>
    </>
  );
}
