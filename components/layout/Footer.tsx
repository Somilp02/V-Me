import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, Crown } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
                 <Crown className="w-6 h-6 text-brand-gold fill-brand-gold" />
                 <h2 className="text-2xl font-serif font-bold text-brand-gold">V&Me</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop premium destination for baby, kids, and maternity essentials. We bring you the best in fashion and care. Fashion For Every Vibe.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-brand-gold"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-gold"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-gold"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-gold">About Us</a></li>
              <li><a href="#" className="hover:text-brand-gold">Careers</a></li>
              <li><a href="#" className="hover:text-brand-gold">Store Locator</a></li>
              <li><a href="#" className="hover:text-brand-gold">Blog & Parenting Tips</a></li>
              <li><a href="#" className="hover:text-brand-gold">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Care</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-gold">Track Order</a></li>
              <li><a href="#" className="hover:text-brand-gold">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-brand-gold">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-brand-gold">FAQs</a></li>
              <li><a href="#" className="hover:text-brand-gold">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-brand-gold" />
                <span>Potdar Brother's, Bhaiya Kapoor Chand Potdar Marg, Jawahar Chowk, Tikamgarh, Madhya Pradesh, India, 472001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold" />
                <span>+91 62327 95005</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-gold" />
                <span>vnmeindia@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} V&Me Retail Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span>Privacy Policy</span>
             <span>Terms of Use</span>
             <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};