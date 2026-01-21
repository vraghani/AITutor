import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const discount = product.regularPrice && product.salePrice 
    ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
    : 0;

  return (
    <Link to={product.link} className="group">
      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded">
            {discount}% OFF
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-base font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-2 flex items-center gap-2">
          {product.regularPrice && product.salePrice ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                Rs. {product.salePrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through">
                Rs. {product.regularPrice.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              Rs. {product.regularPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
