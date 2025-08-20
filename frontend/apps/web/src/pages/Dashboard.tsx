import React, { useState, useEffect } from 'react';

// Define types for better readability and type safety
interface Vital {
  name: string;
  value: string;
  unit: string;
  grade: 'Green' | 'Yellow' | 'Red';
  icon: string; // Placeholder for icon (e.g., Lucide icon name or emoji)
}

interface Alert {
  id: string;
  timestamp: string;
  type: string;
  severity: 'Warning' | 'Critical';
  message: string;
}

// Main App component
const Dashboard = () => {
  // Dummy data for vitals
  const [vitals, setVitals] = useState<Vital[]>([
    { name: 'Heart Rate', value: '72', unit: 'bpm', grade: 'Green', icon: '❤️' },
    { name: 'SpO2', value: '98', unit: '%', grade: 'Green', icon: '💨' },
    { name: 'ECG', value: 'Normal', unit: '', grade: 'Green', icon: '⚡' },
    { name: 'Temperature', value: '98.6', unit: '°F', grade: 'Green', icon: '🌡️' },
    { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', grade: 'Green', icon: '🩸' },
  ]);

  // Dummy data for alerts
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', timestamp: '2025-08-11 10:30 AM', type: 'Slight Irregularity', severity: 'Warning', message: 'Mild heart rate fluctuation detected. Monitoring closely.' },
    { id: '2', timestamp: '2025-08-11 09:15 AM', type: 'Oxygen Dip', severity: 'Warning', message: 'Temporary SpO2 drop observed. Patient stable now.' },
    { id: '3', timestamp: '2025-08-10 03:00 PM', type: 'Temperature Spike', severity: 'Warning', message: 'Slight increase in body temperature. Fever not confirmed.' },
  ]);

  // Function to determine color based on grade
  const getGradeColor = (grade: 'Green' | 'Yellow' | 'Red') => {
    switch (grade) {
      case 'Green':
        return 'bg-green-100 text-green-800';
      case 'Yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'Red':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to determine alert severity color
  const getSeverityColor = (severity: 'Warning' | 'Critical') => {
    switch (severity) {
      case 'Warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'Critical':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter text-gray-800 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 drop-shadow-lg mb-2">HealthHive</h1>
        <p className="text-lg sm:text-xl text-blue-600 font-medium">Real-time AI Health Monitoring & Emergency Response</p>
      </header>

      {/* Patient Overview Section */}
      <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-blue-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 flex items-center">
          <span className="mr-3">👤</span> Patient Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl flex items-center justify-between shadow-sm border border-blue-100">
            <span className="text-lg font-semibold text-blue-900">Patient Name:</span>
            <span className="text-xl font-bold text-blue-800">John Doe</span>
          </div>
          <div className="bg-green-50 p-4 rounded-xl flex items-center justify-between shadow-sm border border-green-100">
            <span className="text-lg font-semibold text-green-900">Current Status:</span>
            <span className="text-xl font-bold text-green-800 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span> Stable
            </span>
          </div>
        </div>
      </section>

      {/* AI Vitals Monitoring Section */}
      <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-blue-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 flex items-center">
          <span className="mr-3">📈</span> AI Vitals Monitoring
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vitals.map((vital) => (
            <div key={vital.name} className="bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="text-2xl mr-2">{vital.icon}</span> {vital.name}
                </h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getGradeColor(vital.grade)}`}>
                  {vital.grade}
                </span>
              </div>
              <p className="text-4xl font-extrabold text-blue-800 mb-2">{vital.value}<span className="text-xl font-medium ml-1 text-gray-600">{vital.unit}</span></p>
              <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Alerts Section */}
      <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-blue-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 flex items-center">
          <span className="mr-3">🚨</span> Recent Alerts
        </h2>
        {alerts.length === 0 ? (
          <p className="text-lg text-gray-600 text-center py-4">No recent alerts. All clear!</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-xl shadow-sm border ${getSeverityColor(alert.severity)}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-md font-semibold text-gray-900">{alert.type}</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-gray-700 mb-1">{alert.message}</p>
                <p className="text-sm text-gray-500">Time: {alert.timestamp}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions (Conceptual for MVP) */}
      <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-blue-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 flex items-center">
          <span className="mr-3">⚡</span> Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <button className="bg-blue-600 text-white p-4 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 text-lg font-semibold flex items-center justify-center">
            <span className="mr-2">📞</span> Contact Doctor
          </button>
          <button className="bg-green-600 text-white p-4 rounded-xl shadow-md hover:bg-green-700 transition-all duration-300 text-lg font-semibold flex items-center justify-center">
            <span className="mr-2">💊</span> Order Medicine
          </button>
          <button className="bg-red-600 text-white p-4 rounded-xl shadow-md hover:bg-red-700 transition-all duration-300 text-lg font-semibold flex items-center justify-center">
            <span className="mr-2">🚑</span> Emergency Help
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} HealthHive. All rights reserved.</p>
        <p>Ensuring your well-being, always.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
