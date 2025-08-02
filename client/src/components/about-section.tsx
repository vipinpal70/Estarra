import { useEffect } from "react";
import photo1 from "@assets/photo1_1754162009575.jpg";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-animate>
          <h2 className="text-4xl font-poppins font-bold mb-4 text-dark-charcoal">
            About <span className="text-construction-orange">Estarra</span>
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With years of expertise in premium construction and innovative design, Estarra transforms residential and commercial spaces into architectural masterpieces.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div data-animate>
            <img 
              src={photo1} 
              alt="Interior room with custom design and decorative ceiling" 
              className="rounded-xl shadow-lg w-full h-auto"
              data-testid="about-image"
            />
          </div>
          <div data-animate>
            <h3 className="text-3xl font-poppins font-bold mb-6 text-dark-charcoal">
              Crafting Excellence Since Day One
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our commitment to quality and innovation drives every project we undertake. From modern residential homes to sophisticated commercial spaces, we deliver exceptional results that exceed expectations.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm" data-counter data-target="150">
                <div 
                  className="text-3xl font-bold text-construction-orange mb-2" 
                  data-counter-display
                  data-testid="counter-projects"
                >
                  0
                </div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm" data-counter data-target="15">
                <div 
                  className="text-3xl font-bold text-construction-orange mb-2" 
                  data-counter-display
                  data-testid="counter-experience"
                >
                  0
                </div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm" data-counter data-target="98">
                <div 
                  className="text-3xl font-bold text-construction-orange mb-2" 
                  data-counter-display
                  data-testid="counter-satisfaction"
                >
                  0
                </div>
                <div className="text-sm text-gray-600">Client Satisfaction %</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm" data-counter data-target="25">
                <div 
                  className="text-3xl font-bold text-construction-orange mb-2" 
                  data-counter-display
                  data-testid="counter-team"
                >
                  0
                </div>
                <div className="text-sm text-gray-600">Expert Team</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
