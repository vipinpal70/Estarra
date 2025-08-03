import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@assets/hero-main.jpg";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen hero-bg construction-pattern flex flex-col justify-center relative overflow-hidden py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-white md: mt-[3.0rem] sm:mt-[4.0rem]">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold mb-4 sm:mb-6 leading-tight text-dark-charcoal" 
              data-hero-title
              data-testid="hero-title"
              style={{textShadow: '3px 3px 6px rgba(34,197,94,0.9)'}}
            >
              Building Your <span className="text-construction-orange">Dreams</span> Into Reality
            </h1>
            <p 
              className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-600" 
              data-hero-subtitle
              data-testid="hero-subtitle"
            >
              Premium construction and design services that transform visions into exceptional living spaces. Quality craftsmanship, innovative design, modern solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg"
                className="bg-construction-orange hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => scrollToSection('portfolio')}
                data-testid="hero-view-work"
              >
                View Our Work
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 bg-construction-orange border-white text-white hover:bg-white hover:text-dark-charcoal px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => scrollToSection('contact')}
                data-testid="hero-get-quote"
              >
                Get Quote
              </Button>
            </div>
          </div>
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
            <div className="construction-blueprint" id="blueprint-animation">
              <img 
                src={heroImage} 
                alt="Estarra Construction - Modern House Design" 
                className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] object-cover rounded-lg shadow-2xl mx-auto animate-float border-4 border-construction-orange"
              />
              <div className="absolute top-4 left-4 w-4 h-4 bg-construction-blue rounded-full animate-ping hidden sm:block"></div>
              <div className="absolute bottom-8 right-8 w-3 h-3 bg-white rounded-full animate-pulse hidden sm:block"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>
    </section>
  );
}
