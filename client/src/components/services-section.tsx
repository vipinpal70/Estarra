import { Home, Building, PaintBucket, Wrench, Compass, Leaf, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description: "Custom home building with modern design elements, smart home integration, and premium finishes.",
    features: ["Custom Home Design", "Smart Home Integration", "Premium Materials"]
  },
  {
    icon: Building,
    title: "Commercial Projects",
    description: "Professional commercial construction with focus on functionality, aesthetics, and business requirements.",
    features: ["Office Buildings", "Retail Spaces", "Industrial Facilities"]
  },
  {
    icon: PaintBucket,
    title: "Interior Design",
    description: "Complete interior transformation with contemporary design, premium materials, and attention to detail.",
    features: ["Modern Interiors", "Custom Furniture", "Lighting Design"]
  },
  {
    icon: Wrench,
    title: "Renovation & Remodeling",
    description: "Transform existing spaces with modern upgrades, structural improvements, and design enhancements.",
    features: ["Kitchen Remodeling", "Bathroom Upgrades", "Space Optimization"]
  },
  {
    icon: Compass,
    title: "Architecture & Planning",
    description: "Professional architectural services from concept to completion with 3D visualization and planning.",
    features: ["3D Visualization", "Structural Engineering", "Permit Assistance"]
  },
  {
    icon: Leaf,
    title: "Green Construction",
    description: "Sustainable building practices with eco-friendly materials and energy-efficient solutions.",
    features: ["Solar Integration", "Eco-friendly Materials", "Energy Efficiency"]
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-animate>
          <h2 className="text-4xl font-poppins font-bold mb-4 text-dark-charcoal">
            Our <span className="text-construction-orange">Services</span>
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive construction and design solutions tailored to bring your vision to life with precision and quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card bg-light-gray p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" 
              data-animate
              data-testid={`service-${index}`}
            >
              <div className="text-construction-orange text-4xl mb-6">
                <service.icon className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-poppins font-bold mb-4 text-dark-charcoal">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-construction-orange mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
