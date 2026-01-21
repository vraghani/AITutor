import React from 'react';
import { officeWear } from '../mockData';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const OfficeWear = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          OFFICE WEAR
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
          {officeWear.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/collections/office-wear"
            className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OfficeWear;
