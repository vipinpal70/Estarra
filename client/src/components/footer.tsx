import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-charcoal text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-poppins font-bold mb-4">
              <span className="text-construction-orange">E</span>starra
            </div>
            <p className="text-gray-400 mb-4">
              Building dreams into reality with premium construction and innovative design solutions.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-construction-orange">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-construction-orange">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-construction-orange">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-construction-orange transition-colors duration-300">Residential Construction</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-construction-orange transition-colors duration-300">Commercial Projects</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-construction-orange transition-colors duration-300">Interior Design</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-construction-orange transition-colors duration-300">Renovation</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-construction-orange transition-colors duration-300">About Us</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-construction-orange transition-colors duration-300">Portfolio</button></li>
              <li><button onClick={() => scrollToSection('gallery')} className="hover:text-construction-orange transition-colors duration-300">Gallery</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-construction-orange transition-colors duration-300">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>Buddheshwar Near Dubagga<br />Lucknow - 226003</p>
              <p>Phone: +91 7392861099</p>
              <p>Email: estarrabuilding@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Estarra Building. All rights reserved. | Designed with excellence.</p>
        </div>
      </div>
    </footer>
  );
}
