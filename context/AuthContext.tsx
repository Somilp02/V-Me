import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    // Mock login logic
    const isAdmin = email.includes('admin');
    const mockUser: User = {
      id: 'u_123',
      name: email.split('@')[0],
      email,
      isAdmin
    };
    setUser(mockUser);
    localStorage.setItem('v_and_me_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('v_and_me_user');
  };

  // Check for stored user on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('v_and_me_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  return context;
};