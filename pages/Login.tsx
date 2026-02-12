import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Crown } from 'lucide-react';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-800 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
           <Crown className="w-10 h-10 text-brand-gold fill-brand-gold" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-white mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          {isLogin ? 'Login to access your orders & wishlist' : 'Join V&Me for a premium experience'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Full Name</label>
              <input type="text" className="w-full border border-gray-700 bg-gray-800 rounded px-3 py-2 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" required />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-700 bg-gray-800 rounded px-3 py-2 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-700 bg-gray-800 rounded px-3 py-2 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" 
              required 
            />
          </div>
          
          <Button fullWidth type="submit" size="lg">
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        <div className="mt-6 text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-brand-gold font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-500 mb-2">Or continue with</p>
          <div className="flex gap-2 justify-center">
             <button className="border border-gray-700 bg-gray-800 text-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-700 w-full transition-colors">Google</button>
             <button className="border border-gray-700 bg-gray-800 text-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-700 w-full transition-colors">Mobile OTP</button>
          </div>
        </div>
      </div>
    </div>
  );
};