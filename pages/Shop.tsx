import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/mockData';

export const Shop: React.FC = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initialCategory = queryParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const priceMatch = product.price <= priceRange;
      return categoryMatch && priceMatch;
    });
  }, [selectedCategory, priceRange]);

  const categories = ['All', 'Baby', 'Kids', 'Moms'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className={`md:w-64 flex-shrink-0 ${showMobileFilters ? 'fixed inset-0 z-40 bg-gray-900 p-6 overflow-y-auto' : 'hidden md:block'}`}>
          <div className="space-y-8">
            <div className="flex justify-between md:hidden mb-4">
              <h2 className="text-xl font-bold text-white">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="text-gray-400">Close</button>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category" 
                      className="text-brand-gold focus:ring-brand-gold bg-gray-700 border-gray-600"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    <span className="text-gray-300 hover:text-white transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-gold bg-gray-700"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>₹0</span>
                <span>₹{priceRange}</span>
              </div>
            </div>

            <div>
               <h3 className="font-bold text-white mb-4">Age</h3>
               <div className="space-y-2 text-sm text-gray-400">
                 <label className="flex items-center gap-2"><input type="checkbox" className="bg-gray-700 border-gray-600 text-brand-gold rounded"/> 0-2 Years</label>
                 <label className="flex items-center gap-2"><input type="checkbox" className="bg-gray-700 border-gray-600 text-brand-gold rounded"/> 2-4 Years</label>
                 <label className="flex items-center gap-2"><input type="checkbox" className="bg-gray-700 border-gray-600 text-brand-gold rounded"/> 4-8 Years</label>
                 <label className="flex items-center gap-2"><input type="checkbox" className="bg-gray-700 border-gray-600 text-brand-gold rounded"/> 8-12 Years</label>
               </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-serif font-bold text-white">
              {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Collection`}
            </h1>
            <button 
              className="md:hidden flex items-center gap-2 text-gray-300"
              onClick={() => setShowMobileFilters(true)}
            >
              <SlidersHorizontal size={20} /> Filters
            </button>
          </div>
          
          {filteredProducts.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredProducts.map(product => (
                 <ProductCard key={product.id} product={product} />
               ))}
             </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};