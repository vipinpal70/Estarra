import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import photo22 from "@assets/gallery-01.jpg";
import photo23 from "@assets/gallery-02.jpg";
import photo24 from "@assets/gallery-03.jpg";
import photo25 from "@assets/gallery-04.jpg";
import photo26 from "@assets/gallery-05.jpg";
import photo27 from "@assets/gallery-06.jpg";
import photo28 from "@assets/gallery-07.jpg";
import photo29 from "@assets/gallery-08.jpg";
import photo30 from "@assets/gallery-09.jpg";
import photo31 from "@assets/gallery-10.jpg";
import photo32 from "@assets/gallery-11.jpg";

const galleryItems = [
  {
    id: 1,
    image: photo22,
    title: "Designer Kitchen Backsplash",
    description: "Artistic tile work featuring decorative teapot and kitchenware patterns",
    category: "kitchen"
  },
  {
    id: 2,
    image: photo23,
    title: "Checkered Floor Pattern",
    description: "Classic black and white geometric flooring design in hallway",
    category: "flooring"
  },
  {
    id: 3,
    image: photo24,
    title: "Modern Bathroom Design",
    description: "Contemporary bathroom with designer wall tiles and premium finishes",
    category: "bathroom"
  },
  {
    id: 4,
    image: photo25,
    title: "Luxury Interior Doors",
    description: "Premium dark wood doors with marble flooring throughout",
    category: "interior"
  },
  {
    id: 5,
    image: photo26,
    title: "Kitchen Design Layout",
    description: "Complete kitchen area with decorative backsplash and granite countertops",
    category: "kitchen"
  },
  {
    id: 6,
    image: photo27,
    title: "Vibrant Room Design",
    description: "Bold yellow accent walls with modern architectural elements",
    category: "interior"
  },
  {
    id: 7,
    image: photo28,
    title: "Artistic Ceiling Design",
    description: "Contemporary yellow and white curved ceiling pattern with integrated lighting",
    category: "ceiling"
  },
  {
    id: 8,
    image: photo29,
    title: "Modern Living Space",
    description: "Open plan room with decorative ceiling and premium marble flooring",
    category: "interior"
  },
  {
    id: 9,
    image: photo30,
    title: "Geometric Ceiling Art",
    description: "Sophisticated brown and white geometric ceiling design with strategic lighting",
    category: "ceiling"
  },
  {
    id: 10,
    image: photo31,
    title: "Carved Wooden Door",
    description: "Handcrafted dark wood door with intricate decorative patterns",
    category: "doors"
  },
  {
    id: 11,
    image: photo32,
    title: "Accent Wall Design",
    description: "Bright yellow feature wall with security grille windows and marble flooring",
    category: "interior"
  }
];

export default function GallerySection() {
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
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-animate>
          <h2 className="text-4xl font-poppins font-bold mb-4 text-dark-charcoal">
            Project <span className="text-construction-orange">Gallery</span>
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our detailed construction work featuring premium finishes, modern designs, and quality craftsmanship in every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id}
              className="gallery-item group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105" 
              data-animate
              onClick={() => openLightbox(item.image)}
              data-testid={`gallery-item-${item.id}`}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs opacity-90">{item.description}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-construction-orange text-white px-2 py-1 rounded text-xs font-medium capitalize">
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12" data-animate>
          <Button 
            size="lg"
            className="bg-construction-orange hover:bg-orange-600 text-white px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105"
            data-testid="view-more-gallery"
          >
            View More Work
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
          data-testid="gallery-lightbox"
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:text-construction-orange z-10"
              onClick={closeLightbox}
              data-testid="gallery-lightbox-close"
            >
              <X className="w-8 h-8" />
            </Button>
            <img 
              src={selectedImage} 
              alt="Gallery item" 
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}