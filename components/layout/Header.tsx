import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, User, Heart, X, Crown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../data/mockData';
import { formatPrice } from '../../utils/helpers';

export const Header: React.FC = () => {
  const { cartCount, toggleCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof PRODUCTS>([]);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      const results = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const menuItems = [
    { label: 'Baby', path: '/shop?category=Baby' },
    { label: 'Kids', path: '/shop?category=Kids' },
    { label: 'Moms', path: '/shop?category=Moms' },
    { label: 'Toys', path: '/shop?category=Baby&sub=Toys' },
    { label: 'Gear', path: '/shop?category=Baby&sub=Gear' },
    { label: 'Sale', path: '/shop?sort=price_asc', special: true },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white text-xs py-2 text-center hidden sm:block border-b border-gray-800">
        <p>Free Shipping on orders above ₹999 | Use code <span className="font-bold text-brand-gold">WELCOME10</span> for 10% off</p>
      </div>

      <header className="sticky top-0 z-50 bg-gray-900 shadow-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-400"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-center group">
              <div className="flex items-center gap-2">
                 <Crown className="w-8 h-8 text-brand-gold fill-brand-gold" />
                 <h1 className="text-3xl font-serif font-bold text-brand-gold tracking-tight">V&Me</h1>
              </div>
              <span className="text-[10px] tracking-widest text-gray-400 font-medium uppercase mt-[-4px] hidden sm:block">Fashion For Every Vibe</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-brand-gold ${item.special ? 'text-red-500 font-bold' : 'text-gray-300'}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block group">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-48 pl-8 pr-4 py-1.5 text-sm bg-gray-800 border border-gray-700 text-white rounded-full focus:outline-none focus:border-brand-gold focus:w-64 transition-all placeholder-gray-500"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <Search className="absolute left-2.5 top-2 text-gray-500 w-4 h-4" />
                
                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full right-0 w-80 bg-gray-800 shadow-xl rounded-lg mt-2 p-2 border border-gray-700 max-h-96 overflow-y-auto">
                    {searchResults.map(product => (
                      <Link 
                        key={product.id} 
                        to={`/product/${product.id}`}
                        className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
                        onClick={() => {
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                      >
                        <img src={product.image} alt="" className="w-10 h-10 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-100 truncate">{product.name}</p>
                          <p className="text-xs text-gray-400">{formatPrice(product.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {isAuthenticated ? (
                <div className="relative group">
                  <Link to="/account" className="p-2 text-gray-300 hover:text-brand-gold transition-colors">
                    <User size={22} />
                  </Link>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 shadow-lg rounded-lg py-2 hidden group-hover:block border border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-bold text-gray-100">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    {user?.isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-brand-gold">
                        Admin Dashboard
                      </Link>
                    )}
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-brand-gold">
                      My Orders
                    </Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="p-2 text-gray-300 hover:text-brand-gold transition-colors">
                  <User size={22} />
                </Link>
              )}

              <Link to="/wishlist" className="p-2 text-gray-300 hover:text-brand-gold transition-colors hidden sm:block">
                <Heart size={22} />
              </Link>

              <button 
                onClick={toggleCart}
                className="p-2 text-gray-300 hover:text-brand-gold transition-colors relative"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-gold rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-70" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-gray-900 shadow-xl z-50 flex flex-col border-r border-gray-800">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <span className="font-serif text-xl font-bold text-brand-gold">V&Me</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
               {/* Mobile Search */}
               <div className="relative mb-6">
                 <input 
                   type="text" 
                   placeholder="Search..." 
                   className="w-full pl-8 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-brand-gold"
                   onKeyPress={(e) => {
                     if(e.key === 'Enter') {
                        setIsMobileMenuOpen(false);
                        navigate('/shop');
                     }
                   }}
                 />
                 <Search className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
               </div>

              {menuItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path}
                  className="block text-lg font-medium text-gray-300 py-2 border-b border-gray-800 hover:text-brand-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/track-order" className="block text-lg font-medium text-gray-300 py-2 border-b border-gray-800 hover:text-brand-gold" onClick={() => setIsMobileMenuOpen(false)}>
                Track Order
              </Link>
              <Link to="/contact" className="block text-lg font-medium text-gray-300 py-2 border-b border-gray-800 hover:text-brand-gold" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};