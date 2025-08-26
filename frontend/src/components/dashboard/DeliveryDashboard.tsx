import React, { useEffect, useState } from 'react';
import {
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Navigation,
  Phone,
  Star,
  Truck,
  Route,
  DollarSign,
  Calendar,
  User,
  Timer,
  BarChart,
  Target,
  ArrowRight,
  RefreshCcw,
  Signal, // For online/offline status
  CircleDotDashed, // For pending
  ClipboardList // For order details
} from 'lucide-react';

// Mock API utility to simulate data fetching for the delivery agent
const mockFetchDeliveryData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        deliveryAgentInfo: {
          name: 'Ravi Sharma',
          id: 'DRV007',
          rating: 4.85,
          totalDeliveries: 1523,
          profilePic: 'https://placehold.co/100x100/ADD8E6/000080?text=RS' // Placeholder image
        },
        activeDeliveries: [
          {
            id: 'DEL001',
            patient: 'Sarah Wilson',
            address: 'Flat 302, Green Valley Apartments, Andheri West, Mumbai',
            phone: '+91 98765 43210',
            medicines: ['Lisinopril 10mg', 'Aspirin 75mg', 'Multivitamin'],
            priority: 'urgent',
            distance: '2.3 km',
            estimatedTime: '12 min',
            status: 'picked_up', // Changed from in_progress for better flow
            pickupFrom: 'Apollo Pharmacy, Bandra West',
            orderValue: 340,
            etaCustomer: '17:55 PM'
          },
          {
            id: 'DEL002',
            patient: 'Michael Brown',
            address: '45, Linking Road, Bandra West, Mumbai',
            phone: '+91 98765 43211',
            medicines: ['Metformin 500mg', 'Insulin Pen 100IU'],
            priority: 'normal',
            distance: '4.7 km',
            estimatedTime: '18 min',
            status: 'accepted', // Order just accepted, awaiting pickup
            pickupFrom: 'MedPlus Pharmacy, Andheri East',
            orderValue: 580,
            etaCustomer: '18:10 PM'
          },
          {
            id: 'DEL003',
            patient: 'Ananya Singh',
            address: 'Shop No. 5, Silver Square, Versova, Mumbai',
            phone: '+91 99887 66554',
            medicines: ['Paracetamol 650mg', 'Cough Syrup'],
            priority: 'normal',
            distance: '1.5 km',
            estimatedTime: '8 min',
            status: 'in_progress', // Just assigned, needs acceptance
            pickupFrom: 'Local Chemist, Versova',
            orderValue: 210,
            etaCustomer: '17:40 PM'
          }
        ],
        completedDeliveriesToday: [
          {
            id: 'COMP001',
            patient: 'Emma Davis',
            completedAt: '2:30 PM',
            rating: 5,
            earnings: 45,
            distance: 3.2,
            address: 'Juhu Lane, Juhu, Mumbai'
          },
          {
            id: 'COMP002',
            patient: 'James Miller',
            completedAt: '1:15 PM',
            rating: 4,
            earnings: 35,
            distance: 2.8,
            address: 'Hill Road, Bandra West, Mumbai'
          },
          {
            id: 'COMP003',
            patient: 'Lisa Garcia',
            completedAt: '11:45 AM',
            rating: 5,
            earnings: 85, // Includes bonus
            distance: 4.1,
            address: 'Lokhandwala Complex, Andheri West, Mumbai'
          },
          {
            id: 'COMP004',
            patient: 'Rohit Verma',
            completedAt: '10:00 AM',
            rating: 4.5,
            earnings: 60,
            distance: 5.5,
            address: 'Malad East, Mumbai'
          }
        ],
        urgentRequests: [
          {
            id: 'URG001',
            patient: 'Robert Chen',
            location: 'Juhu, Mumbai',
            distance: '5.2 km',
            bonus: 100,
            timeLeft: '8 min',
            medicines: ['Amoxicillin 500mg', 'Fever reducer'],
            pickupFrom: 'City Hospital Pharmacy'
          }
        ],
        weeklyStats: {
          deliveries: 47,
          earnings: 2340,
          distance: 142,
          avgRating: 4.9,
          onTimeRate: 96,
          onlineTime: '35h 20m'
        },
        earningsBreakdownToday: {
          base: 380,
          urgentBonus: 70,
          tips: 25
        }
      });
    }, 1500); // Simulate network delay
  });
};

// Utility to get status color for deliveries
const getStatusColor = (status: string) => {
  switch (status) {
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'accepted':
      return 'bg-yellow-100 text-yellow-800';
    case 'picked_up':
      return 'bg-orange-100 text-orange-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'urgent':
      return 'bg-red-100 text-red-800';
    case 'normal':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const DeliveryDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true); // Agent's online status

  useEffect(() => {
    const loadDeliveryData = async () => {
      try {
        setLoading(true);
        const data = await mockFetchDeliveryData();

        // Calculate today's stats from completedDeliveriesToday and earningsBreakdownToday
        const totalDeliveriesToday = data.completedDeliveriesToday.length;
        const totalEarningsToday = data.earningsBreakdownToday.base + data.earningsBreakdownToday.urgentBonus + data.earningsBreakdownToday.tips;
        const totalDistanceToday = data.completedDeliveriesToday.reduce((sum: number, d: any) => sum + d.distance, 0).toFixed(1);
        const avgRatingToday = (data.completedDeliveriesToday.reduce((sum: number, d: any) => sum + d.rating, 0) / totalDeliveriesToday).toFixed(1);

        setDashboardData({
          ...data,
          todayStats: {
            deliveries: totalDeliveriesToday,
            earnings: `₹${totalEarningsToday}`,
            distance: `${totalDistanceToday} km`,
            rating: avgRatingToday,
            onlineTime: '6h 45m' // This would typically be calculated in backend
          }
        });
      } catch (e: any) {
        console.error("Error while fetching delivery dashboard:", e);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDeliveryData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">Loading Delivery Dashboard...</div>
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

  const { deliveryAgentInfo, activeDeliveries, completedDeliveriesToday, urgentRequests, todayStats, weeklyStats, earningsBreakdownToday } = dashboardData;

  // Placeholder for simulating acceptance/pickup/delivery status changes
  const handleOrderStatusChange = (orderId: string, newStatus: string) => {
    console.log(`Order ${orderId} status updated to: ${newStatus}`);
    // In a real app, you would send this update to your backend and refetch data.
    // For this mock, we'll just log it.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-8xl mx-auto">
        {/* Header and Agent Info */}
        <header className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={deliveryAgentInfo.profilePic}
              alt="Agent Avatar"
              className="w-20 h-20 rounded-full border-4 border-orange-200 shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Hello, {deliveryAgentInfo.name}!</h1>
              <p className="text-lg text-gray-600">Delivering health, one step at a time.</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-3">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors duration-300 shadow-md ${
                isOnline
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              <Signal className={`w-5 h-5 ${isOnline ? 'text-white' : 'text-gray-300'}`} />
              <span>Go {isOnline ? 'Offline' : 'Online'}</span>
            </button>
            <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">{deliveryAgentInfo.rating} Rating</span>
            </div>
          </div>
        </header>

        {/* Today's Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg flex items-center p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Package className="h-7 w-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Deliveries Today</p>
              <h2 className="text-3xl font-bold text-gray-900">{todayStats.deliveries}</h2>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg flex items-center p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 rounded-full bg-green-100 text-green-600 mr-4">
              <DollarSign className="h-7 w-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Earnings Today</p>
              <h2 className="text-3xl font-bold text-gray-900">{todayStats.earnings}</h2>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg flex items-center p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Route className="h-7 w-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Distance Today</p>
              <h2 className="text-3xl font-bold text-gray-900">{todayStats.distance}</h2>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg flex items-center p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <Star className="h-7 w-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Avg. Rating Today</p>
              <h2 className="text-3xl font-bold text-gray-900">{todayStats.rating}</h2>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg flex items-center p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 rounded-full bg-teal-100 text-teal-600 mr-4">
              <Clock className="h-7 w-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Online Time</p>
              <h2 className="text-3xl font-bold text-gray-900">{todayStats.onlineTime}</h2>
            </div>
          </div>
        </section>

        {/* Urgent Requests Alert */}
        {urgentRequests.length > 0 && (
          <section className="bg-red-600 text-white rounded-xl p-6 mb-8 shadow-lg animate-pulse-once">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <AlertCircle className="h-6 w-6 mr-3" />
                Urgent Delivery Request!
              </h3>
              <RefreshCcw className="h-5 w-5 cursor-pointer hover:rotate-45 transition-transform" title="Refresh Requests" />
            </div>
            <div className="space-y-4">
              {urgentRequests.map((request: any) => (
                <div key={request.id} className="bg-red-700 p-5 rounded-lg border border-red-500">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-lg font-bold">{request.patient} @ {request.location}</p>
                      <p className="text-sm opacity-90 flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-2" /> {request.distance} Away
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{request.timeLeft}</p>
                      <p className="text-xs opacity-90">to accept</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-md opacity-90 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" /> Bonus: ₹{request.bonus}
                    </p>
                    <p className="text-md opacity-90 flex items-center">
                      <ClipboardList className="h-4 w-4 mr-1" /> {request.medicines.length} Medicines
                    </p>
                  </div>
                  <button className="w-full flex items-center justify-center px-6 py-3 bg-white text-red-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-md">
                    <CheckCircle className="h-5 w-5 mr-2" /> Accept Order
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Active Deliveries */}
          <div className="lg:col-span-1 space-y-6">
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Truck className="h-6 w-6 mr-3 text-orange-500" />Active Deliveries
                </h2>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {activeDeliveries.length} Live
                </span>
              </div>
              {activeDeliveries.length > 0 ? (
                <div className="space-y-4">
                  {activeDeliveries.map((delivery: any) => (
                    <div key={delivery.id} className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{delivery.patient}</h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            {delivery.address}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.priority)}`}>
                          {delivery.priority.toUpperCase()}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4 text-gray-700 text-sm">
                        <div className="flex items-center space-x-2">
                          <ClipboardList className="h-4 w-4 text-purple-500" />
                          <span>{delivery.medicines.length} Medicines</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Truck className="h-4 w-4 text-teal-500" />
                          <span>Pickup: {delivery.pickupFrom}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span>Value: ₹{delivery.orderValue}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Timer className="h-4 w-4 text-orange-500" />
                          <span>ETA: {delivery.etaCustomer}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm font-medium text-gray-600">
                          <span className="flex items-center">
                            <Route className="h-4 w-4 mr-1 text-gray-500" />
                            {delivery.distance}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            {delivery.estimatedTime}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors text-sm">
                            <Navigation className="h-4 w-4 mr-2" />Navigate
                          </button>
                          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-colors text-sm">
                            <Phone className="h-4 w-4 mr-2" />Call
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(delivery.status)}`}>
                          {delivery.status === 'in_progress' && <CircleDotDashed className="inline h-4 w-4 mr-1" />}
                          {delivery.status === 'accepted' && <CheckCircle className="inline h-4 w-4 mr-1" />}
                          {delivery.status === 'picked_up' && <Truck className="inline h-4 w-4 mr-1" />}
                          {delivery.status.replace(/_/g, ' ').toUpperCase()}
                        </span>
                        {delivery.status === 'accepted' && (
                          <button
                            onClick={() => handleOrderStatusChange(delivery.id, 'picked_up')}
                            className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition-colors"
                          >
                            Mark as Picked Up
                          </button>
                        )}
                        {delivery.status === 'picked_up' && (
                          <button
                            onClick={() => handleOrderStatusChange(delivery.id, 'delivered')}
                            className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
                          >
                            Mark as Delivered
                          </button>
                        )}
                         {delivery.status === 'in_progress' && (
                          <button
                            onClick={() => handleOrderStatusChange(delivery.id, 'accepted')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                          >
                            Accept Order
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No active deliveries at the moment. Take a break! <CheckCircle className="inline h-5 w-5 ml-1 text-green-500" /></p>
              )}
            </section>
          </div>

          {/* Right Column: Recent Completions & Performance */}
          <div className="lg:col-span-1 space-y-6">
            {/* Today's Completed Deliveries */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <CheckCircle className="h-6 w-6 mr-3 text-green-500" />Today's Completed
              </h2>
              {completedDeliveriesToday.length > 0 ? (
                <div className="space-y-4">
                  {completedDeliveriesToday.map((delivery: any) => (
                    <div key={delivery.id} className="p-4 border border-gray-200 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">Delivered to {delivery.patient}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />{delivery.address}
                          </p>
                        </div>
                        <span className="text-md font-bold text-green-700">₹{delivery.earnings}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{delivery.completedAt}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{delivery.rating}</span>
                          <span className="mx-1">•</span>
                          <Route className="h-4 w-4 mr-1" />
                          <span>{delivery.distance} km</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No deliveries completed yet today. Get going! <Truck className="inline h-5 w-5 ml-1 text-gray-500" /></p>
              )}
            </section>

            {/* Performance Metrics (Weekly) */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <BarChart className="h-6 w-6 mr-3 text-blue-500" />Your Weekly Performance
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <span className="font-medium text-blue-800">Total Deliveries</span>
                  <span className="font-bold text-blue-600 text-xl">{weeklyStats.deliveries}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <span className="font-medium text-green-800">Total Earnings</span>
                  <span className="font-bold text-green-600 text-xl">₹{weeklyStats.earnings}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <span className="font-medium text-purple-800">Total Distance</span>
                  <span className="font-bold text-purple-600 text-xl">{weeklyStats.distance} km</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                  <span className="font-medium text-yellow-800">Average Rating</span>
                  <span className="font-bold text-yellow-600 text-xl">{weeklyStats.avgRating} <Star className="inline h-5 w-5 -mt-1" /></span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                  <span className="font-medium text-red-800">On-time Rate</span>
                  <span className="font-bold text-red-600 text-xl">{weeklyStats.onTimeRate}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl">
                  <span className="font-medium text-indigo-800">Online Hours</span>
                  <span className="font-bold text-indigo-600 text-xl">{weeklyStats.onlineTime}</span>
                </div>
              </div>
            </section>

            {/* Earnings Breakdown */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <DollarSign className="h-6 w-6 mr-3 text-green-500" />Earnings Breakdown (Today)
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-lime-50 rounded-xl">
                  <p className="font-medium text-lime-800">Base Earnings</p>
                  <p className="text-xl font-bold text-lime-600">₹{earningsBreakdownToday.base}</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                  <p className="font-medium text-orange-800">Urgent Bonus</p>
                  <p className="text-xl font-bold text-orange-600">₹{earningsBreakdownToday.urgentBonus}</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-sky-50 rounded-xl">
                  <p className="font-medium text-sky-800">Tips</p>
                  <p className="text-xl font-bold text-sky-600">₹{earningsBreakdownToday.tips}</p>
                </div>

                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-gray-900">Total Today</p>
                    <p className="text-2xl font-bold text-gray-900">₹{todayStats.earnings}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions for Delivery Agent */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Target className="h-6 w-6 mr-3 text-red-500" />Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition-colors duration-300">
                  <AlertCircle className="h-5 w-5 mr-2" />Report Issue
                </button>
                <button className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition-colors duration-300">
                  <Calendar className="h-5 w-5 mr-2" />View Schedule
                </button>
                <button className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-xl shadow-md hover:bg-orange-700 transition-colors duration-300">
                  <DollarSign className="h-5 w-5 mr-2" />Withdraw Earnings
                </button>
                <button className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-xl shadow-md hover:bg-gray-700 transition-colors duration-300">
                  <User className="h-5 w-5 mr-2" />Profile
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
