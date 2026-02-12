import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // Baby
  {
    id: '1',
    name: 'Organic Cotton Onesie Set',
    price: 899,
    originalPrice: 1299,
    category: 'Baby',
    subCategory: 'Clothing',
    image: 'https://picsum.photos/400/500?random=1',
    rating: 4.8,
    reviews: 124,
    isBestSeller: true,
    sizes: ['0-3M', '3-6M', '6-12M'],
    colors: ['White', 'Pink', 'Blue'],
    description: "Ultra-soft organic cotton bodysuits perfect for your baby's delicate skin."
  },
  {
    id: '2',
    name: 'Soft Plush Teddy Bear',
    price: 599,
    originalPrice: 799,
    category: 'Baby',
    subCategory: 'Toys',
    image: 'https://picsum.photos/400/500?random=2',
    rating: 4.5,
    reviews: 89,
    isNew: true,
    description: "A cuddly companion for your little one, made with child-safe materials."
  },
  {
    id: '3',
    name: 'Ergonomic Baby Carrier',
    price: 2499,
    originalPrice: 3599,
    category: 'Baby',
    subCategory: 'Gear',
    image: 'https://picsum.photos/400/500?random=3',
    rating: 4.9,
    reviews: 210,
    colors: ['Grey', 'Navy'],
    description: "Designed for comfort and support, allowing you to carry your baby effortlessly."
  },
  // Kids
  {
    id: '4',
    name: 'Denim Dungarees',
    price: 1199,
    originalPrice: 1599,
    category: 'Kids',
    subCategory: 'Clothing',
    image: 'https://picsum.photos/400/500?random=4',
    rating: 4.6,
    reviews: 56,
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    description: "Stylish and durable denim dungarees for active kids."
  },
  {
    id: '5',
    name: 'Educational Building Blocks',
    price: 1499,
    category: 'Kids',
    subCategory: 'Toys',
    image: 'https://picsum.photos/400/500?random=5',
    rating: 4.7,
    reviews: 142,
    isBestSeller: true,
    description: "Spark creativity and motor skills with this colorful building block set."
  },
  {
    id: '6',
    name: 'Party Wear Frock',
    price: 1899,
    originalPrice: 2499,
    category: 'Kids',
    subCategory: 'Clothing',
    image: 'https://picsum.photos/400/500?random=6',
    rating: 4.5,
    reviews: 78,
    sizes: ['3-4Y', '5-6Y', '7-8Y'],
    colors: ['Red', 'Pink'],
    description: "A beautiful dress for special occasions, featuring delicate embroidery."
  },
  // Moms
  {
    id: '7',
    name: 'Maternity Maxi Dress',
    price: 1699,
    originalPrice: 2299,
    category: 'Moms',
    subCategory: 'Clothing',
    image: 'https://picsum.photos/400/500?random=7',
    rating: 4.8,
    reviews: 312,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Floral', 'Solid Blue'],
    description: "Elegant and comfortable, designed to fit through all stages of pregnancy."
  },
  {
    id: '8',
    name: 'Diaper Bag Backpack',
    price: 2199,
    originalPrice: 2999,
    category: 'Moms',
    subCategory: 'Gear',
    image: 'https://picsum.photos/400/500?random=8',
    rating: 4.9,
    reviews: 520,
    isBestSeller: true,
    colors: ['Grey', 'Black'],
    description: "Spacious and organized, keeping all your baby essentials handy."
  },
  {
    id: '9',
    name: 'Post-Partum Support Belt',
    price: 899,
    category: 'Moms',
    subCategory: 'Wellness',
    image: 'https://picsum.photos/400/500?random=9',
    rating: 4.4,
    reviews: 98,
    sizes: ['M', 'L', 'XL'],
    description: "Gentle support for postpartum recovery and comfort."
  },
   // More
  {
    id: '10',
    name: 'Wooden Rocking Horse',
    price: 3499,
    category: 'Kids',
    subCategory: 'Toys',
    image: 'https://picsum.photos/400/500?random=10',
    rating: 4.8,
    reviews: 45,
    isNew: true,
    description: "Classic wooden toy that provides hours of fun."
  },
  {
    id: '11',
    name: 'Nursing Pillow',
    price: 1299,
    category: 'Baby',
    subCategory: 'Feeding',
    image: 'https://picsum.photos/400/500?random=11',
    rating: 4.7,
    reviews: 156,
    description: "Supportive pillow for easier breastfeeding sessions."
  },
  {
    id: '12',
    name: 'Remote Control Car',
    price: 1999,
    category: 'Kids',
    subCategory: 'Toys',
    image: 'https://picsum.photos/400/500?random=12',
    rating: 4.6,
    reviews: 203,
    colors: ['Red', 'Blue'],
    description: "High-speed remote control car for thrill-seeking kids."
  }
];

export const CATEGORIES = [
  { name: 'Baby', image: 'https://picsum.photos/200/200?random=20' },
  { name: 'Kids', image: 'https://picsum.photos/200/200?random=21' },
  { name: 'Moms', image: 'https://picsum.photos/200/200?random=22' },
  { name: 'Gear', image: 'https://picsum.photos/200/200?random=23' },
  { name: 'Toys', image: 'https://picsum.photos/200/200?random=24' },
  { name: 'Feeding', image: 'https://picsum.photos/200/200?random=25' },
];