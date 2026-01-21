import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Search, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 px-4 text-sm">
        <div className="flex items-center justify-center gap-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <Facebook size={16} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <Instagram size={16} />
          </a>
        </div>
        <p className="mt-1">AVAIL 150 OFF ON FIRST ORDER - USE CODE "FIRST"</p>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-gray-900">
              LimeRoots
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/collections/all" className="text-gray-700 hover:text-gray-900 transition-colors">
                All Sarees
              </Link>
              <Link to="/collections/new-arrivals" className="text-gray-700 hover:text-gray-900 transition-colors">
                New Arrivals
              </Link>
              <Link to="/collections/tissue" className="text-gray-700 hover:text-gray-900 transition-colors">
                Tissue Sarees
              </Link>
              <Link to="/collections/office-wear" className="text-gray-700 hover:text-gray-900 transition-colors">
                Office Wear
              </Link>
              <Link to="/collections/sale" className="text-gray-700 hover:text-gray-900 transition-colors">
                Sale
              </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t">
            <nav className="px-4 py-4 space-y-3">
              <Link to="/collections/all" className="block text-gray-700 hover:text-gray-900 py-2">
                All Sarees
              </Link>
              <Link to="/collections/new-arrivals" className="block text-gray-700 hover:text-gray-900 py-2">
                New Arrivals
              </Link>
              <Link to="/collections/tissue" className="block text-gray-700 hover:text-gray-900 py-2">
                Tissue Sarees
              </Link>
              <Link to="/collections/office-wear" className="block text-gray-700 hover:text-gray-900 py-2">
                Office Wear
              </Link>
              <Link to="/collections/sale" className="block text-gray-700 hover:text-gray-900 py-2">
                Sale
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
