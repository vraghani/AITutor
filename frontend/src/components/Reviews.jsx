import React, { useState, useEffect } from 'react';
import { reviews } from '../mockData';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerPage);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-6 h-6"
            />
            <h2 className="text-2xl font-bold">LimeRoots</h2>
          </div>
          <p className="text-lg font-semibold">19 Google Reviews</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#FFC107" color="#FFC107" />
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          {currentIndex < maxIndex && (
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleReviews.map((review) => (
              <div 
                key={review.id} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#FFC107" color="#FFC107" />
                  ))}
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(maxIndex + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-gray-900 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
