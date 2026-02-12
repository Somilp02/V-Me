import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-gray-900/50 hover:border-brand-gold/30 transition-all duration-300">
      <div className="aspect-[4/5] bg-gray-800 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-brand-gold text-white text-[10px] font-bold px-2 py-1 rounded">NEW</span>
          )}
          {product.isBestSeller && (
            <span className="bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded border border-gray-700">BESTSELLER</span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-gray-800 p-2 rounded-full shadow-md text-gray-300 hover:text-red-500 transition-colors border border-gray-700">
            <Heart size={18} />
          </button>
        </div>

        {/* Quick Add Button (Desktop) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            fullWidth 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-100 group-hover:text-brand-gold truncate">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mt-1 space-x-1">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-100">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
};