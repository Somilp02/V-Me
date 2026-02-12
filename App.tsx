import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';

// Placeholder components for routes not fully implemented
const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-[50vh] flex items-center justify-center text-2xl text-gray-400 font-serif">
    {title} - Coming Soon
  </div>
);

// ScrollToTop implementation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <CartDrawer />
    <main className="flex-grow pt-0">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* Other pages */}
              <Route path="/account" element={<Placeholder title="My Account" />} />
              <Route path="/wishlist" element={<Placeholder title="Wishlist" />} />
              <Route path="/contact" element={<Placeholder title="Contact Us" />} />
              <Route path="/track-order" element={<Placeholder title="Track Order" />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;