export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Baby' | 'Kids' | 'Moms' | 'Gear';
  subCategory: string;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  colors?: string[];
  sizes?: string[];
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  address: Address;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}