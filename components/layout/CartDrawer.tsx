import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { formatPrice } from '../../utils/helpers';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-70 transition-opacity" onClick={toggleCart} />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="h-full w-full bg-gray-900 shadow-xl flex flex-col border-l border-gray-800">
          {/* Header */}
          <div className="px-4 py-6 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <ShoppingBag size={20} />
              Your Cart ({cart.length})
            </h2>
            <button onClick={toggleCart} className="text-gray-400 hover:text-gray-200">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                  <ShoppingBag size={32} className="text-gray-500" />
                </div>
                <div>
                   <p className="text-lg font-medium text-white">Your cart is empty</p>
                   <p className="text-sm text-gray-500 mt-1">Looks like you haven't added anything yet.</p>
                </div>
                <Button onClick={toggleCart} variant="outline" className="text-gray-300 border-gray-600 hover:text-white">Start Shopping</Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex py-2 border-b border-gray-800 last:border-0 pb-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center opacity-90"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-white">
                        <h3 className="line-clamp-2 pr-4"><a href="#">{item.name}</a></h3>
                        <p className="ml-4 text-brand-gold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        {item.selectedSize && `Size: ${item.selectedSize}`} 
                        {item.selectedColor && ` | Color: ${item.selectedColor}`}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm mt-3">
                      <div className="flex items-center border border-gray-700 rounded bg-gray-800">
                        <button 
                          className="p-1 hover:bg-gray-700 text-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 font-medium text-white">{item.quantity}</span>
                        <button 
                          className="p-1 hover:bg-gray-700 text-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-500 hover:text-red-400 flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-800 p-4 space-y-4 bg-gray-900">
              <div className="flex justify-between text-base font-medium text-white">
                <p>Subtotal</p>
                <p>{formatPrice(cartTotal)}</p>
              </div>
              <p className="mt-0.5 text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Button 
                  fullWidth 
                  size="lg"
                  onClick={() => {
                    toggleCart();
                    navigate('/checkout');
                  }}
                >
                  Checkout
                </Button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="font-medium text-brand-gold hover:text-yellow-600"
                    onClick={toggleCart}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};