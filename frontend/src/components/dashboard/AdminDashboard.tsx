import React, { useEffect, useState } from 'react';
import {
  ShieldCheck, // Admin/Overall System
  Users, // Users (general)
  User, // Patients
  Stethoscope, // Doctors
  Truck, // Delivery Agents
  Store, // Pharmacies
  AlertCircle, // System Alerts
  BarChart, // Analytics/Metrics
  DollarSign, // Revenue/Finance
  Activity, // System Activity
  Settings, // Settings/Configuration
  CheckCircle, // General success
  ClipboardList, // Reports/Logs
  MapPin, // Locations
  PlusCircle, // Add new
  RefreshCcw, // Sync
  MessageSquare, // Feedback
  ArrowRight, // Action arrow
  Calendar ,
  Clock
} from 'lucide-react';

// Mock API utility to simulate data fetching for the Admin dashboard
const mockFetchAdminData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        adminInfo: {
          name: 'Admin User',
          role: 'Super Administrator',
          lastLogin: '2025-08-22 17:00 IST'
        },
        platformMetrics: {
          totalPatients: 5240,
          totalDoctors: 310,
          totalDeliveryAgents: 185,
          totalPharmacies: 75,
          activeEmergencies: 3,
          totalConsultationsToday: 125,
          totalDeliveriesToday: 210,
          overallRevenueLastMonth: 850000, // In Rupees
          newUsersThisWeek: 150
        },
        systemAlerts: [
          {
            id: 'SYS001',
            type: 'Database Latency Spike',
            description: 'High latency detected in primary patient database. Investigating.',
            severity: 'critical',
            timestamp: '2025-08-22T17:10:00Z',
            status: 'Ongoing'
          },
          {
            id: 'SYS002',
            type: 'Delivery Agent App Offline',
            description: 'Several delivery agents reported app connectivity issues in South Mumbai.',
            severity: 'warning',
            timestamp: '2025-08-22T16:45:00Z',
            status: 'Acknowledged'
          },
          {
            id: 'SYS003',
            type: 'New Software Update Available',
            description: 'Version 2.1.0 of the patient app is ready for deployment.',
            severity: 'info',
            timestamp: '2025-08-21T09:00:00Z',
            status: 'Pending Rollout'
          }
        ],
        userManagementSummary: {
          pendingDoctorVerifications: 5,
          pendingPharmacyVerifications: 2,
          blockedUsers: 12,
          activeSupportTickets: 7
        },
        recentActivities: [
          { id: 'ACT001', type: 'Doctor Onboarded', detail: 'Dr. Neha Sharma (Cardiology) joined.', timestamp: '1 hour ago' },
          { id: 'ACT002', type: 'New Pharmacy Registered', detail: 'City Meds, Bandra West approved.', timestamp: '3 hours ago' },
          { id: 'ACT003', type: 'Critical Patient Alert Handled', detail: 'Patient P001 alert resolved by Dr. J. Smith.', timestamp: 'Yesterday' },
          { id: 'ACT004', type: 'Delivery Agent Performance Warning', detail: 'Agent DRV003 received low rating on 3 deliveries.', timestamp: 'Yesterday' }
        ],
        platformRevenueBreakdown: {
          consultationFees: 450000,
          medicineSalesCommission: 300000,
          deliveryFees: 100000,
          subscriptions: 50000
        }
      });
    }, 1500); // Simulate network delay
  });
};

// Utility to get alert severity color
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'info':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setLoading(true);
        const data = await mockFetchAdminData();
        setDashboardData(data);
        console.log("Admin dashboard data:", data);
      } catch (e: any) {
        console.error("Error while fetching admin dashboard:", e);
        setError("Failed to load admin dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">Loading Mediasl Admin Dashboard...</div>
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

  const { adminInfo, platformMetrics, systemAlerts, userManagementSummary, recentActivities, platformRevenueBreakdown } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center space-x-4">
            <ShieldCheck className="w-16 h-16 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mediasl Admin Dashboard</h1>
              <p className="text-lg text-gray-600">Welcome, {adminInfo.name} ({adminInfo.role})</p>
              <p className="text-sm text-gray-500">Last Login: {adminInfo.lastLogin}</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-3">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              <span className="flex items-center"><Settings className="w-5 h-5 mr-2" />Platform Settings</span>
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl shadow-md hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
              <span className="flex items-center"><RefreshCcw className="w-5 h-5 mr-2" />Refresh Data</span>
            </button>
          </div>
        </header>

        {/* Platform Metrics Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm">Total Patients</p>
              <h2 className="text-3xl font-bold text-gray-900">{platformMetrics.totalPatients.toLocaleString()}</h2>
            </div>
            <User className="h-10 w-10 text-blue-500" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm">Total Doctors</p>
              <h2 className="text-3xl font-bold text-gray-900">{platformMetrics.totalDoctors}</h2>
            </div>
            <Stethoscope className="h-10 w-10 text-green-500" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm">Total Pharmacies</p>
              <h2 className="text-3xl font-bold text-gray-900">{platformMetrics.totalPharmacies}</h2>
            </div>
            <Store className="h-10 w-10 text-indigo-500" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm">Total Delivery Agents</p>
              <h2 className="text-3xl font-bold text-gray-900">{platformMetrics.totalDeliveryAgents}</h2>
            </div>
            <Truck className="h-10 w-10 text-orange-500" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm">Active Emergencies</p>
              <h2 className="text-3xl font-bold text-red-600">{platformMetrics.activeEmergencies}</h2>
            </div>
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: System Alerts & User Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Alerts */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <AlertCircle className="h-6 w-6 mr-3 text-red-500" />System Alerts
              </h2>
              {systemAlerts.length > 0 ? (
                <div className="space-y-4">
                  {systemAlerts.map((alert: any) => (
                    <div key={alert.id} className={`p-4 rounded-xl border ${getSeverityColor(alert.severity).includes('red') ? 'border-red-300 bg-red-50' : getSeverityColor(alert.severity).includes('yellow') ? 'border-yellow-300 bg-yellow-50' : 'border-blue-300 bg-blue-50'} hover:shadow-md transition-shadow duration-300`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-semibold ${getSeverityColor(alert.severity).includes('red') ? 'text-red-800' : getSeverityColor(alert.severity).includes('yellow') ? 'text-yellow-800' : 'text-blue-800'}`}>
                          {alert.type}
                        </h3>
                        <span className="text-sm text-gray-600 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />{new Date(alert.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{alert.description}</p>
                      <div className="mt-3 flex justify-end space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.status}
                        </span>
                        <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md shadow-sm hover:bg-indigo-700 transition-colors">
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No active system alerts. All systems operational! <CheckCircle className="inline h-5 w-5 ml-1 text-green-500" /></p>
              )}
            </section>

            {/* User Management Summary */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Users className="h-6 w-6 mr-3 text-blue-500" />User & Entity Management
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-yellow-800">Doctor Verifications</p>
                    <p className="text-3xl font-bold text-yellow-600">{userManagementSummary.pendingDoctorVerifications}</p>
                  </div>
                  <Stethoscope className="h-10 w-10 text-yellow-500" />
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-orange-800">Pharmacy Verifications</p>
                    <p className="text-3xl font-bold text-orange-600">{userManagementSummary.pendingPharmacyVerifications}</p>
                  </div>
                  <Store className="h-10 w-10 text-orange-500" />
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-200 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-red-800">Blocked Users</p>
                    <p className="text-3xl font-bold text-red-600">{userManagementSummary.blockedUsers}</p>
                  </div>
                  <User className="h-10 w-10 text-red-500" />
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-blue-800">Active Support Tickets</p>
                    <p className="text-3xl font-bold text-blue-600">{userManagementSummary.activeSupportTickets}</p>
                  </div>
                  <MessageSquare className="h-10 w-10 text-blue-500" />
                </div>
              </div>
              <div className="mt-6 text-center">
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-colors duration-300">
                  <span className="flex items-center"><Users className="w-5 h-5 mr-2" />Go to User Management</span>
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Operational Metrics & Revenue & Recent Activity */}
          <div className="lg:col-span-1 space-y-6">
            {/* Operational Metrics Today */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <BarChart className="h-6 w-6 mr-3 text-teal-500" />Operational Snapshot
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-teal-50 rounded-xl">
                  <p className="font-medium text-teal-800">Consultations Today</p>
                  <p className="text-3xl font-bold text-teal-600">{platformMetrics.totalConsultationsToday}</p>
                </div>
                <div className="flex items-center justify-between p-4 bg-lime-50 rounded-xl">
                  <p className="font-medium text-lime-800">Deliveries Today</p>
                  <p className="text-3xl font-bold text-lime-600">{platformMetrics.totalDeliveriesToday}</p>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                  <p className="font-medium text-purple-800">New Users (This Week)</p>
                  <p className="text-3xl font-bold text-purple-600">{platformMetrics.newUsersThisWeek}</p>
                </div>
              </div>
            </section>

            {/* Platform Revenue */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <DollarSign className="h-6 w-6 mr-3 text-green-500" />Platform Revenue (Last Month)
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <p className="font-medium text-green-800">Overall Revenue</p>
                  <p className="text-3xl font-bold text-green-600">₹{platformMetrics.overallRevenueLastMonth.toLocaleString()}</p>
                </div>
                <div className="space-y-3 pt-3 border-t border-gray-100 mt-4">
                  <h3 className="text-lg font-semibold text-gray-700">Breakdown:</h3>
                  <div className="flex items-center justify-between text-gray-700 text-md">
                    <span>Consultation Fees</span>
                    <span className="font-semibold">₹{platformRevenueBreakdown.consultationFees.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700 text-md">
                    <span>Medicine Sales Commission</span>
                    <span className="font-semibold">₹{platformRevenueBreakdown.medicineSalesCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700 text-md">
                    <span>Delivery Fees</span>
                    <span className="font-semibold">₹{platformRevenueBreakdown.deliveryFees.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700 text-md">
                    <span>Subscriptions</span>
                    <span className="font-semibold">₹{platformRevenueBreakdown.subscriptions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Platform Activity */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Activity className="h-6 w-6 mr-3 text-pink-500" />Recent Platform Activity
              </h2>
              {recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.map((activity: any) => (
                    <div key={activity.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{activity.type}</h3>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />{activity.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-700">{activity.detail}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No recent platform activities.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
