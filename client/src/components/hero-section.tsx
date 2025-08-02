import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen hero-bg construction-pattern flex items-center relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 
              className="text-5xl lg:text-6xl font-poppins font-bold mb-6 leading-tight" 
              data-hero-title
              data-testid="hero-title"
            >
              Building Your <span className="text-construction-orange">Dreams</span> Into Reality
            </h1>
            <p 
              className="text-xl mb-8 opacity-90" 
              data-hero-subtitle
              data-testid="hero-subtitle"
            >
              Premium construction and design services that transform visions into exceptional living spaces. Quality craftsmanship, innovative design, modern solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-construction-orange hover:bg-orange-600 text-white px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => scrollToSection('portfolio')}
                data-testid="hero-view-work"
              >
                View Our Work
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-dark-charcoal px-8 py-4 font-semibold transition-all duration-300"
                onClick={() => scrollToSection('contact')}
                data-testid="hero-get-quote"
              >
                Get Quote
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="construction-blueprint" id="blueprint-animation">
              <Home className="w-36 h-36 text-construction-orange opacity-20 animate-float mx-auto" />
              <div className="absolute top-4 left-4 w-4 h-4 bg-construction-blue rounded-full animate-ping"></div>
              <div className="absolute bottom-8 right-8 w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
}
