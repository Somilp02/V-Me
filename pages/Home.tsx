import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RefreshCcw, Star } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { PRODUCTS, CATEGORIES } from '../data/mockData';

export const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 z-10 text-center md:text-left pt-10 md:pt-0">
            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm">Welcome to V&Me</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
              Fashion For <br/>
              <span className="text-brand-gold">Every Vibe</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md mx-auto md:mx-0">
              Discover our premium collection of baby care, kids fashion, and maternity essentials crafted with love.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link to="/shop">
                <Button size="lg" className="rounded-full px-8">Shop Now</Button>
              </Link>
              <Link to="/shop?category=New">
                <Button variant="outline" size="lg" className="rounded-full px-8 text-white border-white hover:bg-white hover:text-gray-900">
                  New Arrivals
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 h-full absolute md:relative right-0 top-0 w-full opacity-40 md:opacity-100 pointer-events-none md:pointer-events-auto">
             {/* Abstract shape or image */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gray-800 blur-3xl opacity-60 -z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
               alt="Mother and Child" 
               className="object-cover w-full h-full object-top mask-image-gradient"
             />
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-gray-800 py-10">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 bg-gray-800 rounded-full text-brand-gold">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-100">Free Shipping</h3>
              <p className="text-sm text-gray-400">On all orders above ₹999</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 bg-gray-800 rounded-full text-brand-gold">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-100">Premium Quality</h3>
              <p className="text-sm text-gray-400">Certified organic materials</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 bg-gray-800 rounded-full text-brand-gold">
              <RefreshCcw size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-100">Easy Returns</h3>
              <p className="text-sm text-gray-400">30-day hassle-free policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-white">Shop by Category</h2>
          <p className="text-gray-400 mt-2">Everything you need for your little ones</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} to={`/shop?category=${cat.name}`} className="group cursor-pointer">
              <div className="aspect-square rounded-full overflow-hidden border-2 border-gray-800 group-hover:border-brand-gold transition-all duration-300">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
              </div>
              <h3 className="text-center mt-3 font-medium text-gray-300 group-hover:text-brand-gold">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white">Trending Now</h2>
              <p className="text-gray-400 mt-2">Most loved styles by moms</p>
            </div>
            <Link to="/shop" className="text-brand-gold font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4">
        <div className="rounded-2xl overflow-hidden relative h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1544126566-47a372132646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
            alt="Promotion" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center p-8 md:p-16">
            <div className="text-white max-w-lg space-y-4">
              <span className="bg-brand-gold text-white px-3 py-1 text-xs font-bold rounded uppercase">Limited Offer</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">The Summer Sale</h2>
              <p className="text-gray-300 text-lg">Up to 50% off on all kids wear and accessories. Grab your favorites before they are gone.</p>
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200 border-none font-bold">Shop Sale</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4">
         <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white">Best Sellers</h2>
              <p className="text-gray-400 mt-2">Top rated by our community</p>
            </div>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Instagram/Community Section */}
      <section className="bg-gray-900 py-16 text-center">
        <div className="container mx-auto px-4 space-y-6">
          <Star className="w-8 h-8 text-brand-gold mx-auto fill-brand-gold" />
          <h2 className="text-3xl font-serif font-bold text-white">Join the V&Me Family</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Share your little moments with us using <span className="font-bold text-brand-gold">#VandMeMoments</span> and get a chance to be featured on our page.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-800">
                 <img src={`https://picsum.photos/400/400?random=${i+50}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 opacity-90" alt="Community" />
               </div>
             ))}
          </div>
          <Button variant="outline" className="mt-8 border-gray-600 text-gray-300 hover:border-gray-500">Follow us on Instagram</Button>
        </div>
      </section>
    </div>
  );
};