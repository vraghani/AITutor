import React from 'react';
import { heroData } from '../mockData';

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroData.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 drop-shadow-lg">
            {heroData.title}
          </h1>
          <button className="bg-white text-black px-8 py-3 text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            {heroData.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
