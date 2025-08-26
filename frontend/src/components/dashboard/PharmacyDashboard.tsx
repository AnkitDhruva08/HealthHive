import React, { useEffect, useState } from 'react';
import {
  Store, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Calendar, 
  FlaskConical, 
  Users,
  MessageSquare, 
  ClipboardList, 
  Bell, 
  CheckCircle, 
  Hourglass, 
  Box,
  ArrowRight, 
  Clock, 
  RefreshCcw, 
  Truck, 
  Home,
  UserCheck, 
  BarChart, 
  Zap,
  User,
  Star
} from 'lucide-react';

// Mock API utility to simulate data fetching for the pharmacy
const mockFetchPharmacyData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pharmacyInfo: {
          name: 'Mediasl Pharmacy',
          location: '123 Health Ave, Udaipur, Rajasthan',
          contact: '+91 0294 1234567',
          status: 'Open', // Open/Closed
          openingHours: '09:00 AM - 09:00 PM'
        },
        dailySummary: {
          newOrders: 15,
          processingOrders: 8,
          readyForPickup: 5,
          readyForDelivery: 3,
          revenueToday: 12500, // In Rupees
          itemsSold: 98,
          prescriptionsDispensed: 22
        },
        orders: [
          {
            id: 'ORD001',
            patient: 'Suresh Kumar',
            type: 'Pickup',
            status: 'New',
            medicines: ['Paracetamol 650mg (x2)', 'Amoxicillin 250mg'],
            timeReceived: '10:05 AM',
            value: 450,
            isPrescription: true
          },
          {
            id: 'ORD002',
            patient: 'Priya Mehta',
            type: 'Delivery',
            status: 'New',
            medicines: ['Insulin Pen (x1)', 'Syringes'],
            timeReceived: '10:15 AM',
            value: 1200,
            isPrescription: true
          },
          {
            id: 'ORD003',
            patient: 'Rohan Sharma',
            type: 'Pickup',
            status: 'Processing',
            medicines: ['Antacid (x1)', 'Pain Balm'],
            timeReceived: '09:40 AM',
            value: 180,
            isPrescription: false
          },
          {
            id: 'ORD004',
            patient: 'Deepa Singh',
            type: 'Delivery',
            status: 'Processing',
            medicines: ['Cough Syrup (x1)', 'Vitamin C'],
            timeReceived: '09:55 AM',
            value: 320,
            isPrescription: false
          },
          {
            id: 'ORD005',
            patient: 'Anil Gupta',
            type: 'Pickup',
            status: 'Ready for Pickup',
            medicines: ['Blood Pressure Meds (x1)', 'Cholesterol Meds'],
            timeReceived: '09:00 AM',
            value: 800,
            isPrescription: true
          },
          {
            id: 'ORD006',
            patient: 'Kiran Reddy',
            type: 'Delivery',
            status: 'Ready for Delivery',
            medicines: ['Antibiotics (x1)', 'Bandages'],
            timeReceived: '09:10 AM',
            value: 650,
            isPrescription: true
          },
        ],
        inventoryAlerts: [
          { item: 'Insulin Pen', currentStock: 5, threshold: 10, status: 'Low Stock' },
          { item: 'Covid-19 Rapid Test', currentStock: 0, threshold: 50, status: 'Out of Stock' },
          { item: 'Vitamin D3 (60K IU)', currentStock: 12, threshold: 20, status: 'Low Stock' },
        ],
        popularItems: [
          { item: 'Paracetamol 650mg', salesLastWeek: 150 },
          { item: 'Hand Sanitizer 500ml', salesLastWeek: 120 },
          { item: 'Glucometer Strips', salesLastWeek: 90 }
        ],
        staffOnDuty: [
          { name: 'Amit Patel', role: 'Pharmacist' },
          { name: 'Pooja Devi', role: 'Pharmacy Tech' },
          { name: 'Rahul Sharma', role: 'Delivery Agent' }
        ],
        recentFeedback: [
          { customer: 'Rina D.', rating: 5, comment: 'Quick service!', timestamp: '1 hour ago' },
          { customer: 'Jayant V.', rating: 4, comment: 'Medicine delivered on time.', timestamp: '3 hours ago' }
        ]
      });
    }, 1500); // Simulate network delay
  });
};

// Utility to get status color for orders
const getOrderStatusColor = (status: string) => {
  switch (status) {
    case 'New':
      return 'bg-blue-100 text-blue-800';
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'Ready for Pickup':
      return 'bg-teal-100 text-teal-800';
    case 'Ready for Delivery':
      return 'bg-purple-100 text-purple-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Utility to get stock alert color
const getStockAlertColor = (status: string) => {
  switch (status) {
    case 'Low Stock':
      return 'bg-yellow-100 text-yellow-800';
    case 'Out of Stock':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const PharmacyDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeOrderTab, setActiveOrderTab] = useState('New'); // New, Processing, Ready for Pickup, Ready for Delivery

  useEffect(() => {
    const loadPharmacyData = async () => {
      try {
        setLoading(true);
        const data = await mockFetchPharmacyData();
        setDashboardData(data);
        console.log("Pharmacy dashboard data:", data);
      } catch (e: any) {
        console.error("Error while fetching pharmacy dashboard:", e);
        setError("Failed to load pharmacy dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPharmacyData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">Loading Mediasl Pharmacy Dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-700">
        <div className="p-6 rounded-lg shadow-md bg-white">
          <p className="text-lg font-semibold mb-2">Error:</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600">
        <p>No dashboard data available.</p>
      </div>
    );
  }

  const { pharmacyInfo, dailySummary, orders, inventoryAlerts, popularItems, staffOnDuty, recentFeedback } = dashboardData;

  const filteredOrders = orders.filter((order: any) => order.status === activeOrderTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center space-x-4">
            <Store className="w-16 h-16 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{pharmacyInfo.name}</h1>
              <p className="text-lg text-gray-600">{pharmacyInfo.location}</p>
              <p className="text-sm text-gray-500">{pharmacyInfo.contact}</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${pharmacyInfo.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-lg font-semibold text-gray-700">{pharmacyInfo.status}</span>
            <span className="text-sm text-gray-500">({pharmacyInfo.openingHours})</span>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
              <span className="flex items-center"><RefreshCcw className="w-5 h-5 mr-2" />Sync Data</span>
            </button>
          </div>
        </header>

        {/* Daily Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm">New Orders</p>
              <h2 className="text-3xl font-bold text-gray-900">{dailySummary.newOrders}</h2>
            </div>
            <Package className="h-10 w-10 text-blue-500" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm">Processing Orders</p>
              <h2 className="text-3xl font-bold text-gray-900">{dailySummary.processingOrders}</h2>
            </div>
            <Hourglass className="h-10 w-10 text-yellow-500" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm">Ready for Pickup</p>
              <h2 className="text-3xl font-bold text-gray-900">{dailySummary.readyForPickup}</h2>
            </div>
            <Home className="h-10 w-10 text-teal-500" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm">Ready for Delivery</p>
              <h2 className="text-3xl font-bold text-gray-900">{dailySummary.readyForDelivery}</h2>
            </div>
            <Truck className="h-10 w-10 text-purple-500" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm">Revenue Today</p>
              <h2 className="text-3xl font-bold text-green-600">₹{dailySummary.revenueToday.toLocaleString()}</h2>
            </div>
            <DollarSign className="h-10 w-10 text-green-500" />
          </div>
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Order Management */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Package className="h-6 w-6 mr-3 text-indigo-500" />Order Management
                </h2>
                <div className="flex space-x-2">
                  {['New', 'Processing', 'Ready for Pickup', 'Ready for Delivery'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveOrderTab(tab)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        activeOrderTab === tab
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tab} ({orders.filter((o: any) => o.status === tab).length})
                    </button>
                  ))}
                </div>
              </div>
              {filteredOrders.length > 0 ? (
                <div className="space-y-4">
                  {filteredOrders.map((order: any) => (
                    <div key={order.id} className="p-5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Order #{order.id} for {order.patient}</h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            Received: {order.timeReceived}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                          {order.status}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4 text-gray-700 text-sm">
                        <div className="flex items-center space-x-2">
                          {order.type === 'Pickup' ? <Home className="h-4 w-4 text-blue-500" /> : <Truck className="h-4 w-4 text-purple-500" />}
                          <span>{order.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ClipboardList className="h-4 w-4 text-orange-500" />
                          <span>{order.medicines.length} Items</span>
                        </div>
                        <div className="flex items-center space-x-2 col-span-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span>Value: ₹{order.value.toLocaleString()}</span>
                        </div>
                        {order.isPrescription && (
                          <div className="flex items-center space-x-2 col-span-2">
                            <UserCheck className="h-4 w-4 text-green-600" />
                            <span>Prescription Required</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors text-sm">
                          View Details
                        </button>
                        {order.status === 'New' && (
                          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 transition-colors text-sm">
                            Process Order
                          </button>
                        )}
                        {order.status === 'Processing' && (
                          <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors text-sm">
                            Mark as Ready
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No {activeOrderTab} orders found. </p>
              )}
            </section>
          </div>

          {/* Right Column: Inventory & Staff & Feedback */}
          <div className="lg:col-span-1 space-y-6">
            {/* Inventory Alerts */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Bell className="h-6 w-6 mr-3 text-red-500" />Inventory Alerts
              </h2>
              {inventoryAlerts.length > 0 ? (
                <div className="space-y-4">
                  {inventoryAlerts.map((alert: any, index: number) => (
                    <div key={index} className={`p-4 rounded-xl border ${getStockAlertColor(alert.status).includes('red') ? 'border-red-300 bg-red-50' : 'border-yellow-300 bg-yellow-50'} hover:shadow-md transition-shadow duration-300`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{alert.item}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStockAlertColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-gray-700">Current Stock: {alert.currentStock}</p>
                      <p className="text-sm text-gray-500">Threshold: {alert.threshold}</p>
                      <div className="mt-3 flex justify-end">
                        <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md shadow-sm hover:bg-indigo-700 transition-colors">
                          Order More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">All inventory levels are optimal. <CheckCircle className="inline h-5 w-5 ml-1 text-green-500" /></p>
              )}
            </section>

            {/* Popular Items */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <BarChart className="h-6 w-6 mr-3 text-green-500" />Popular Items
              </h2>
              {popularItems.length > 0 ? (
                <div className="space-y-3">
                  {popularItems.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                      <div>
                        <p className="font-semibold text-gray-900">{item.item}</p>
                        <p className="text-sm text-gray-600">Sales Last Week: {item.salesLastWeek}</p>
                      </div>
                      <ShoppingCart className="h-6 w-6 text-gray-500" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No popular items data.</p>
              )}
            </section>

            {/* Staff On Duty */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Users className="h-6 w-6 mr-3 text-purple-500" />Staff On Duty
              </h2>
              {staffOnDuty.length > 0 ? (
                <div className="space-y-3">
                  {staffOnDuty.map((staff: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                      <div>
                        <p className="font-semibold text-gray-900">{staff.name}</p>
                        <p className="text-sm text-gray-600">{staff.role}</p>
                      </div>
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No staff currently logged in.</p>
              )}
            </section>

            {/* Recent Customer Feedback */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <MessageSquare className="h-6 w-6 mr-3 text-blue-500" />Recent Feedback
              </h2>
              {recentFeedback.length > 0 ? (
                <div className="space-y-4">
                  {recentFeedback.map((feedback: any, index: number) => (
                    <div key={index} className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{feedback.customer}</h3>
                        <div className="flex items-center">
                          {[...Array(feedback.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                          {[...Array(5 - feedback.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">"{feedback.comment}"</p>
                      <p className="text-sm text-gray-500 text-right">{feedback.timestamp}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No recent feedback.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
