import React from 'react';
import { careSection } from '../mockData';

const SareeCare = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {careSection.title}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {careSection.description}
            </p>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src={careSection.image} 
                alt="Saree care and storage"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SareeCare;
