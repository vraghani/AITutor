import React from 'react';
import { collections } from '../mockData';
import { Link } from 'react-router-dom';

const Collections = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Collections
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={collection.link}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                  {collection.name}
                </h3>
                {collection.description && (
                  <p className="text-sm text-gray-200 line-clamp-2">
                    {collection.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
