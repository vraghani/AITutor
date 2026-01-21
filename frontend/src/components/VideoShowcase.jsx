import React from 'react';
import { videoShowcase } from '../mockData';
import { Play } from 'lucide-react';

const VideoShowcase = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          SEE OUR SAREES IN MOTION
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {videoShowcase.map((video) => (
            <div 
              key={video.id} 
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[3/4] shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={video.thumbnail} 
                alt="Saree video thumbnail"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                  <Play size={24} className="text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            Discover our NEW ARRIVALS of premium products.
          </p>
          <button className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            SHOP THE LOOK
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
