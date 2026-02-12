import React from 'react';
import { Package, Users, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import { PRODUCTS } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Sales', value: formatPrice(125000), icon: <DollarSign />, color: 'bg-green-900/30 text-green-400' },
    { label: 'Total Orders', value: '154', icon: <ShoppingCart />, color: 'bg-blue-900/30 text-blue-400' },
    { label: 'Total Products', value: PRODUCTS.length, icon: <Package />, color: 'bg-yellow-900/30 text-yellow-400' },
    { label: 'Customers', value: '1,205', icon: <Users />, color: 'bg-purple-900/30 text-purple-400' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-white mb-8">Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-500">
              <TrendingUp size={14} className="mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-800">
          <h2 className="font-bold text-white mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-gray-800 text-gray-400">
                <tr>
                  <th className="p-3 font-medium">Order ID</th>
                  <th className="p-3 font-medium">Customer</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td className="p-3">#ORD-{1000 + i}</td>
                    <td className="p-3">Customer {i}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${i % 2 === 0 ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                        {i % 2 === 0 ? 'Delivered' : 'Processing'}
                      </span>
                    </td>
                    <td className="p-3">{formatPrice(i * 1500)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Alert */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-800">
           <div className="flex justify-between items-center mb-4">
             <h2 className="font-bold text-white">Low Stock Alert</h2>
             <button className="text-brand-gold text-sm font-medium hover:text-yellow-400">Manage Inventory</button>
           </div>
           <div className="space-y-4">
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center gap-4 p-3 bg-red-900/10 rounded border border-red-900/30">
                 <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden">
                   <img src={`https://picsum.photos/100?random=${i}`} className="w-full h-full object-cover opacity-80" alt="" />
                 </div>
                 <div className="flex-1">
                   <p className="font-medium text-gray-200">Product Name {i}</p>
                   <p className="text-xs text-red-400">Only {i} units left</p>
                 </div>
                 <button className="text-xs border border-gray-700 rounded px-2 py-1 bg-gray-800 text-gray-300 hover:bg-gray-700">Restock</button>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};