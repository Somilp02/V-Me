import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../utils/helpers';
import { Lock, CreditCard, Banknote } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pincode: '',
    city: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (cart.length === 0) {
    return <div className="text-center py-20 text-white">Cart is empty</div>;
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    const orderData = {
      ...formData,
      productName: cart.map(item => `${item.name} (x${item.quantity})`).join(', '),
      totalAmount: cartTotal,
      dateTime: new Date().toLocaleString()
    };

    try {
      // Using no-cors to avoid CORS errors with Google Apps Script Web Apps
      // Note: In no-cors mode, the response is opaque, so we can't check response.ok
      await fetch('https://script.google.com/macros/s/AKfycbxC1RzqoOzp4Eog-RjkL-I_v_rA5srtKiLBAdlfbDQ88XXKErcmh5uQGMsrROact_Yeiw/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      // Assuming success if fetch didn't throw (standard for no-cors fire-and-forget)
      clearCart();
      alert("Order Placed Successfully! Redirecting to orders...");
      navigate('/');
      
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an issue placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-950 min-h-screen">
      <h1 className="text-2xl font-serif font-bold text-white mb-8 text-center">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Main Flow */}
        <div className="flex-1 space-y-6">
          
          {/* Address Section */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-800">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <span className="bg-brand-gold text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
              Shipping Address
            </h2>
            {step === 1 ? (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <input 
                  required 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleInputChange} 
                  type="text" 
                  placeholder="First Name" 
                  className="border border-gray-700 bg-gray-800 p-2 rounded w-full text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none" 
                />
                <input 
                  required 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleInputChange} 
                  type="text" 
                  placeholder="Last Name" 
                  className="border border-gray-700 bg-gray-800 p-2 rounded w-full text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none" 
                />
                <input 
                  required 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  type="email" 
                  placeholder="Email Address" 
                  className="border border-gray-700 bg-gray-800 p-2 rounded w-full md:col-span-2 text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none" 
                />
                <input 
                  required 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="border border-gray-700 bg-gray-800 p-2 rounded w-full text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none" 
                />
                <input 
                  required 
                  name="pincode" 
                  value={formData.pincode} 
                  onChange={handleInputChange} 
                  type="text" 
                  placeholder="Pincode" 
                  className="border border-gray-700 bg-gray-800 p-2 rounded w-full text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none" 
                />
                <input 
                  required 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                  type="text" 
                  placeholder="City" 
                  className="border border-gray-700 bg-gray-800 p-2 rounded w-full md:col-span-2 text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none" 
                />
                <textarea 
                  required 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  placeholder="Address (House No, Street, Area)" 
                  className="border border-gray-700 bg-gray-800 p-2 rounded w-full md:col-span-2 text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none" 
                  rows={3}
                ></textarea>
                <Button type="submit" className="md:col-span-2">Save & Continue</Button>
              </form>
            ) : (
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div>
                  <p className="font-bold text-gray-200">{formData.firstName} {formData.lastName}</p>
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                  <p>{formData.address}, {formData.city} - {formData.pincode}</p>
                </div>
                <button onClick={() => setStep(1)} className="text-brand-gold font-medium hover:text-yellow-400">Change</button>
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div className={`bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-800 ${step < 2 ? 'opacity-50 pointer-events-none' : ''}`}>
             <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <span className="bg-brand-gold text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
              Payment Method
            </h2>
             <div className="space-y-3">
               <label className="flex items-center gap-3 border border-gray-700 bg-gray-800 p-4 rounded cursor-pointer hover:border-brand-gold transition-colors">
                 <input type="radio" name="payment" defaultChecked className="text-brand-gold focus:ring-brand-gold bg-gray-700 border-gray-600" />
                 <CreditCard className="text-gray-400" />
                 <div>
                   <p className="font-bold text-sm text-white">Credit/Debit Card / UPI</p>
                   <p className="text-xs text-gray-400">Secure transaction via Razorpay</p>
                 </div>
               </label>
               <label className="flex items-center gap-3 border border-gray-700 bg-gray-800 p-4 rounded cursor-pointer hover:border-brand-gold transition-colors">
                 <input type="radio" name="payment" className="text-brand-gold focus:ring-brand-gold bg-gray-700 border-gray-600" />
                 <Banknote className="text-gray-400" />
                 <div>
                   <p className="font-bold text-sm text-white">Cash on Delivery</p>
                   <p className="text-xs text-gray-400">Pay when you receive the order</p>
                 </div>
               </label>
             </div>
          </div>

          <Button 
            disabled={step < 2 || loading} 
            fullWidth 
            size="lg"
            onClick={handlePlaceOrder}
          >
            {loading ? 'Processing...' : `Pay ${formatPrice(cartTotal)}`}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Lock size={12} /> Secure Checkout
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96">
          <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-800 sticky top-24">
            <h2 className="font-bold mb-4 text-white">Order Summary</h2>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <div className="w-12 h-12 bg-gray-800 rounded flex-shrink-0 border border-gray-700">
                    <img src={item.image} className="w-full h-full object-cover rounded opacity-90" alt="" />
                  </div>
                  <div className="flex-1">
                    <p className="truncate font-medium text-gray-200">{item.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-white">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-gray-700 my-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-gray-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-700 text-white">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500 mb-2">Have a coupon?</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter code" className="border border-gray-700 bg-gray-800 rounded px-3 py-1.5 w-full text-sm text-white focus:outline-none focus:border-brand-gold placeholder-gray-500" />
                <Button variant="secondary" size="sm" className="bg-gray-700 text-gray-300 hover:bg-gray-600">Apply</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};