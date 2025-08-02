import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import photo7 from "@assets/photo-7_1754162009581.jpg";
import photo8 from "@assets/photo-8_1754162009582.jpg";
import photo9 from "@assets/photo-9_1754162009583.jpg";
import photo17 from "@assets/photo17_1754162198728.jpg";

const portfolioItems = [
  {
    id: 1,
    image: photo7,
    title: "Modern House Exterior",
    description: "Contemporary design with LED lighting",
    category: "exterior"
  },
  {
    id: 2,
    image: photo8,
    title: "House Exterior Night View",
    description: "Dramatic LED lighting showcase",
    category: "exterior"
  },
  {
    id: 3,
    image: photo9,
    title: "Kitchen Design",
    description: "Arched entrance with modern finishes",
    category: "interior"
  },
  {
    id: 4,
    image: photo17,
    title: "Glass Staircase",
    description: "Modern stainless steel and glass design",
    category: "interior"
  }
];

export default function PortfolioSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="portfolio" className="py-20 bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-animate>
          <h2 className="text-4xl font-poppins font-bold mb-4 text-dark-charcoal">
            Our <span className="text-construction-orange">Portfolio</span>
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our latest construction projects showcasing modern design, quality craftsmanship, and innovative solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id}
              className="portfolio-item group relative overflow-hidden rounded-xl shadow-lg cursor-pointer" 
              data-animate
              onClick={() => openLightbox(item.image)}
              data-testid={`portfolio-item-${item.id}`}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12" data-animate>
          <Button 
            size="lg"
            className="bg-construction-orange hover:bg-orange-600 text-white px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105"
            data-testid="view-all-projects"
          >
            View All Projects
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
          data-testid="lightbox"
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:text-construction-orange z-10"
              onClick={closeLightbox}
              data-testid="lightbox-close"
            >
              <X className="w-8 h-8" />
            </Button>
            <img 
              src={selectedImage} 
              alt="Portfolio item" 
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
