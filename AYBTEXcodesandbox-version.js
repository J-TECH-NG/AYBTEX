// AYB Textiles - CodeSandbox Version
// Copy this entire file to App.js in CodeSandbox
// Dependencies needed: lucide-react

import React, { useState } from 'react';
import { 
  ShoppingCart, Package, BarChart3, Users, Globe, UserCircle,
  Plus, Search, Edit, Trash2, Eye, Phone, MapPin, Mail,
  Calendar, Save, X, TrendingUp, UserCheck, ShoppingBag
} from 'lucide-react';

// Mock Data
const mockProducts = [
  { 
    id: 1, 
    name: 'Premium Lace Cotton Fabric', 
    brand: 'Excelsior', 
    category: 'Cotton', 
    price: 2500, 
    stock: 150, 
    image: '/api/placeholder/150/150',
    description: 'High-quality cotton fabric with intricate lace patterns.',
    colors: ['White', 'Blue', 'Black'],
    patterns: 'Lace with embroidered details',
    material: '100% Cotton',
    width: '45 inches',
    length: '5 yards'
  },
  { 
    id: 2, 
    name: 'Geometric Pattern Lace', 
    brand: 'Getzner', 
    category: 'Lace', 
    price: 4500, 
    stock: 75, 
    image: '/api/placeholder/150/150',
    description: 'Elegant lace material with geometric hexagonal patterns.',
    colors: ['Light Blue', 'Cream'],
    patterns: 'Hexagonal geometric lace',
    material: 'Cotton-Polyester blend',
    width: '44 inches',
    length: '6 yards'
  },
];

const mockOrders = [
  { id: 1, customer: 'Fatima Ahmed', total: 12500, status: 'Completed', date: '2024-01-27', items: 3 },
  { id: 2, customer: 'Ibrahim Musa', total: 8900, status: 'Processing', date: '2024-01-27', items: 2 },
];

const mockCustomers = [
  { 
    id: 1, 
    name: 'Fatima Ahmed', 
    email: 'fatima.ahmed@email.com',
    phone: '+234 801 234 5678', 
    address: '123 Lagos Street, Victoria Island, Lagos',
    totalOrders: 15,
    totalSpent: 187500,
    joinDate: '2023-06-15',
    status: 'Active',
    type: 'Retail'
  },
  { 
    id: 2, 
    name: 'Ibrahim Musa', 
    email: 'ibrahim.musa@email.com',
    phone: '+234 802 345 6789', 
    address: '456 Kano Road, Wuse 2, Abuja',
    totalOrders: 8,
    totalSpent: 95200,
    joinDate: '2023-09-22',
    status: 'Active',
    type: 'Wholesale'
  },
];

// Header Component
const Header = ({ cart = [] }) => {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">AYB TEXTILES NG</h1>
              <p className="text-xs text-gray-600">Since 2018</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                +234 703 646 6660
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Dashboard Component
const Dashboard = ({ products, orders, customers }) => {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockItems = products.filter(product => product.stock < 50).length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalCustomers = customers.length;
  const vipCustomers = customers.filter(c => c.status === 'VIP').length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-blue-600">{totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-green-600">{totalCustomers}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">VIP Customers</p>
              <p className="text-2xl font-bold text-purple-600">{vipCustomers}</p>
            </div>
            <UserCheck className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-orange-600">₦{totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₦{order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Top Customers</h3>
          <div className="space-y-3">
            {customers.slice(0, 5).map(customer => (
              <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-gray-600">{customer.type} Customer</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₦{customer.totalSpent.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Customer</h3>
              <button onClick={() => setShowAddCustomer(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                className="w-full p-2 border rounded-lg"
                value={customerForm.name}
                onChange={(e) => setCustomerForm({...customerForm, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email Address *"
                className="w-full p-2 border rounded-lg"
                value={customerForm.email}
                onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                className="w-full p-2 border rounded-lg"
                value={customerForm.phone}
                onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})}
              />
              <textarea
                placeholder="Address"
                rows="2"
                className="w-full p-2 border rounded-lg"
                value={customerForm.address}
                onChange={(e) => setCustomerForm({...customerForm, address: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="w-full p-2 border rounded-lg"
                  value={customerForm.type}
                  onChange={(e) => setCustomerForm({...customerForm, type: e.target.value})}
                >
                  <option value="Retail">Retail</option>
                  <option value="Wholesale">Wholesale</option>
                </select>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={customerForm.status}
                  onChange={(e) => setCustomerForm({...customerForm, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
              <button
                onClick={handleAddCustomer}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simplified Inventory Component
const Inventory = ({ products, setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-blue-600">₦{product.price.toLocaleString()}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  product.stock > 50 ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.stock} in stock
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
                  Edit
                </button>
                <button className="bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [customers, setCustomers] = useState(mockCustomers);
  const [cart, setCart] = useState([]);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'customers', name: 'Customers', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cart={cart} />
      
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard products={products} orders={orders} customers={customers} />
        )}
        {activeTab === 'inventory' && (
          <Inventory products={products} setProducts={setProducts} />
        )}
        {activeTab === 'customers' && (
          <Customers customers={customers} setCustomers={setCustomers} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">AYB TEXTILES NG</h3>
            <p className="text-gray-300">Dealers in all kinds of textile materials</p>
            <p className="text-sm text-gray-400 mt-4">&copy; 2024 AYB Textiles NG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}.status === 'VIP' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Customers Component (Simplified)
const Customers = ({ customers, setCustomers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'Retail',
    status: 'Active'
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    if (!customerForm.name || !customerForm.email || !customerForm.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const newCustomer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      ...customerForm,
      totalOrders: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setCustomers([...customers, newCustomer]);
    setCustomerForm({ name: '', email: '', phone: '', address: '', type: 'Retail', status: 'Active' });
    setShowAddCustomer(false);
    alert('Customer added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Management</h2>
        <button 
          onClick={() => setShowAddCustomer(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-medium">{customer.name}</p>
                  <p className="text-xs text-gray-500">Since {customer.joinDate}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm">{customer.email}</p>
                  <p className="text-sm text-gray-500">{customer.phone}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {customer.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  ₦{customer.totalSpent.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    customer