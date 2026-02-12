import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Heart, Share2, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../utils/helpers';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || '');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!product) {
    return <div className="p-20 text-center text-white">Product not found</div>;
  }

  const checkPincode = () => {
    if (pincode.length === 6) {
      setPincodeStatus('success');
    } else {
      setPincodeStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Images */}
        <div className="lg:w-1/2 space-y-4">
          <div className="aspect-[4/5] bg-gray-800 rounded-lg overflow-hidden border border-gray-800">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-800 rounded-md overflow-hidden cursor-pointer hover:ring-2 ring-brand-gold border border-gray-800">
                <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <span className="text-sm text-brand-gold font-bold tracking-wider uppercase">{product.category} / {product.subCategory}</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">{product.name}</h1>
            <div className="flex items-center gap-4 mt-4">
               <div className="flex text-yellow-500">
                 {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />)}
               </div>
               <span className="text-sm text-gray-400">{product.reviews} Reviews</span>
            </div>
            <div className="flex items-end gap-3 mt-6">
              <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through mb-1">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm text-green-500 font-bold mb-1.5">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-1">Inclusive of all taxes</p>
          </div>

          <div className="border-t border-gray-800 pt-6 space-y-6">
            {/* Options */}
            {product.sizes && (
              <div>
                <h3 className="font-medium text-gray-200 mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                        selectedSize === size 
                        ? 'border-brand-gold bg-gray-800 text-brand-gold' 
                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && (
              <div>
                <h3 className="font-medium text-gray-200 mb-3">Select Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                        selectedColor === color 
                        ? 'border-brand-gold bg-gray-800 text-brand-gold' 
                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1 text-base py-4"
                onClick={() => addToCart(product, 1, selectedSize, selectedColor)}
              >
                Add to Cart
              </Button>
              <button className="p-4 border border-gray-700 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white">
                <Heart size={24} />
              </button>
               <button className="p-4 border border-gray-700 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white">
                <Share2 size={24} />
              </button>
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="font-bold text-gray-200 flex items-center gap-2">
              <Truck size={18} /> Delivery Options
            </h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter Pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g,''))}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-brand-gold text-white"
              />
              <Button onClick={checkPincode} variant="secondary">Check</Button>
            </div>
            {pincodeStatus === 'success' && <p className="text-green-500 text-sm">Delivery available by {new Date(Date.now() + 3*24*60*60*1000).toDateString()}</p>}
            {pincodeStatus === 'error' && <p className="text-red-500 text-sm">Invalid Pincode</p>}
          </div>

          {/* Info Tabs */}
          <div className="space-y-4">
             <div className="flex gap-4 border-b border-gray-800">
               <button className="pb-2 border-b-2 border-brand-gold font-bold text-white">Description</button>
               <button className="pb-2 text-gray-500 hover:text-gray-300">Details</button>
               <button className="pb-2 text-gray-500 hover:text-gray-300">Reviews</button>
             </div>
             <div className="text-gray-400 leading-relaxed text-sm">
               <p>{product.description}</p>
               <p className="mt-2">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               </p>
             </div>
          </div>
        </div>
      </div>
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
};