import React, { useEffect, useState } from 'react';
import {
  User,
  Activity,
  AlertCircle,
  Heart,
  Thermometer,
  Phone,
  Video,
  FileText,
  Clock,
  MapPin,
  CheckCircle,
  MessageSquare,
  Calendar,
  Stethoscope, // Added for doctor-specific actions
  ClipboardList, // For prescriptions
  Truck, // For medicine delivery
  PlusCircle, // For adding new patient
  Settings // For settings
} from 'lucide-react';

// Mock API utility to simulate data fetching
const mockFetchDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        doctorInfo: {
          name: 'Dr. Jane Smith',
          specialization: 'Cardiologist',
          location: 'Udaipur, Rajasthan, India',
          imageUrl: 'https://placehold.co/100x100/A7F3D0/065F46?text=JS' // Placeholder image
        },
        patients: [
          {
            id: 'P001',
            name: 'Rajesh Kumar',
            age: 72,
            condition: 'Chronic Heart Disease',
            lastCheckup: '2025-08-15',
            vitals: {
              heartRate: { value: 92, risk: 'Red' }, // High heart rate
              spO2: { value: 95, risk: 'Green' },
              ecg: { value: 'Abnormal', risk: 'Yellow' },
              temperature: { value: 98.6, risk: 'Green' }
            },
            emergencyAlerts: [
              { type: 'Cardiac Alert', timestamp: '2025-08-22T17:20:00Z', status: 'Pending Doctor Review', location: 'Mumbai, Andheri', distance: '2.3 km' }
            ]
          },
          {
            id: 'P002',
            name: 'Priya Sharma',
            age: 65,
            condition: 'Type 2 Diabetes',
            lastCheckup: '2025-08-01',
            vitals: {
              heartRate: { value: 75, risk: 'Green' },
              spO2: { value: 88, risk: 'Red' }, // Low SpO2
              ecg: { value: 'Normal', risk: 'Green' },
              temperature: { value: 99.1, risk: 'Yellow' } // Slight fever
            },
            emergencyAlerts: [
              { type: 'Respiratory Distress', timestamp: '2025-08-22T17:28:00Z', status: 'Immediate Attention', location: 'Mumbai, Bandra', distance: '4.1 km' }
            ]
          },
          {
            id: 'P003',
            name: 'Suresh Menon',
            age: 80,
            condition: 'Hypertension',
            lastCheckup: '2025-08-10',
            vitals: {
              heartRate: { value: 88, risk: 'Yellow' },
              spO2: { value: 96, risk: 'Green' },
              ecg: { value: 'Normal', risk: 'Green' },
              temperature: { value: 98.2, risk: 'Green' }
            },
            emergencyAlerts: []
          },
          {
            id: 'P004',
            name: 'Anjali Singh',
            age: 58,
            condition: 'Asthma',
            lastCheckup: '2025-07-20',
            vitals: {
              heartRate: { value: 70, risk: 'Green' },
              spO2: { value: 97, risk: 'Green' },
              ecg: { value: 'Normal', risk: 'Green' },
              temperature: { value: 98.4, risk: 'Green' }
            },
            emergencyAlerts: []
          },
          {
            id: 'P005',
            name: 'Vikram Bose',
            age: 75,
            condition: 'Chronic Kidney Disease',
            lastCheckup: '2025-08-05',
            vitals: {
              heartRate: { value: 105, risk: 'Red' },
              spO2: { value: 94, risk: 'Yellow' },
              ecg: { value: 'Normal', risk: 'Green' },
              temperature: { value: 98.9, risk: 'Green' }
            },
            emergencyAlerts: [
              { type: 'Arrhythmia Detected', timestamp: '2025-08-22T17:35:00Z', status: 'Urgent Review', location: 'Mumbai, Juhu', distance: '7.8 km' }
            ]
          },
          {
            id: 'P006',
            name: 'Fatima Khan',
            age: 60,
            condition: 'Diabetes',
            lastCheckup: '2025-08-18',
            vitals: {
              heartRate: { value: 80, risk: 'Green' },
              spO2: { value: 98, risk: 'Green' },
              ecg: { value: 'Normal', risk: 'Green' },
              temperature: { value: 97.5, risk: 'Green' }
            },
            emergencyAlerts: []
          },
        ],
        scheduledAppointments: [
          { id: 1, name: 'Emma Davis', time: '10:30 AM', type: 'Follow-up', condition: 'Diabetes', isVideoCall: true },
          { id: 2, name: 'James Miller', time: '11:15 AM', type: 'Check-up', condition: 'Hypertension', isVideoCall: false },
          { id: 3, name: 'Lisa Garcia', time: '2:00 PM', type: 'Consultation', condition: 'Heart Disease', isVideoCall: true },
          { id: 4, name: 'Rohan Verma', time: '3:30 PM', type: 'New Patient', condition: 'General Checkup', isVideoCall: true },
          { id: 5, name: 'Shanti Devi', time: '4:00 PM', type: 'Follow-up', condition: 'Arthritis', isVideoCall: false },
        ],
        recentConsultations: [
          { id: 1, patient: 'John Smith', diagnosis: 'Mild Hypertension', prescription: 'Prescribed', time: '1 hour ago', type: 'Video' },
          { id: 2, patient: 'Anna Johnson', diagnosis: 'Chest Pain Assessment', prescription: 'Emergency Referral', time: '3 hours ago', type: 'Phone' },
          { id: 3, patient: 'Karan Singh', diagnosis: 'Seasonal Flu', prescription: 'Prescribed', time: 'Yesterday', type: 'Video' },
          { id: 4, patient: 'Deepa Patel', diagnosis: 'Diabetes Management', prescription: 'Reviewed Medication', time: '2 days ago', type: 'Phone' },
        ],
        medicineOrders: [
          {
            orderId: 'MED001',
            patientName: 'Rajesh Kumar',
            prescription: 'Amlodipine 5mg, Aspirin 75mg',
            status: 'Awaiting Dispatch',
            deliveryAddress: '123 Main St, Udaipur'
          },
          {
            orderId: 'MED002',
            patientName: 'Priya Sharma',
            prescription: 'Metformin 500mg',
            status: 'Delivered',
            deliveryAddress: '456 Oak Ave, Udaipur'
          },
          {
            orderId: 'MED003',
            patientName: 'Anjali Singh',
            prescription: 'Ventolin Inhaler',
            status: 'Processing',
            deliveryAddress: '789 Garden Rd, Udaipur'
          },
          {
            orderId: 'MED004',
            patientName: 'Suresh Menon',
            prescription: 'Lisinopril 10mg',
            status: 'Cancelled',
            deliveryAddress: '101 Park St, Udaipur'
          }
        ]
      });
    }, 1500); // Simulate network delay
  });
};

// Utility to get risk color for vitals
const getRiskColor = (risk: string) => {
  switch (risk) {
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

const DoctorDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await mockFetchDashboardData();

        // Calculate summary stats dynamically from the fetched data
        const totalPatients = data.patients.length;
        const patientsWithAlerts = data.patients.filter((p: any) => p.emergencyAlerts.length > 0).length;
        const consultationsToday = data.scheduledAppointments.filter((a: any) =>
          // Assuming 'Today' logic is based on current date. For mock, just use all.
          true
        ).length;
        const pendingReports = data.medicineOrders.filter((o: any) => o.status === 'Processing' || o.status === 'Awaiting Dispatch').length;

        // Calculate vitals risk distribution
        let normalPatients = 0;
        let warningPatients = 0;
        let criticalPatients = 0;

        data.patients.forEach((p: any) => {
          if (p.vitals.heartRate.risk === 'Red' || p.vitals.spO2.risk === 'Red' || p.vitals.ecg.risk === 'Red' || p.vitals.temperature.risk === 'Red') {
            criticalPatients++;
          } else if (p.vitals.heartRate.risk === 'Yellow' || p.vitals.spO2.risk === 'Yellow' || p.vitals.ecg.risk === 'Yellow' || p.vitals.temperature.risk === 'Yellow') {
            warningPatients++;
          } else {
            normalPatients++;
          }
        });


        setDashboardData({
          ...data,
          summaryStats: [
            { title: 'Total Patients', value: totalPatients, icon: User, color: 'bg-blue-500' },
            { title: 'Emergency Alerts', value: patientsWithAlerts, icon: AlertCircle, color: 'bg-red-500' },
            { title: "Today's Consults", value: consultationsToday, icon: Video, color: 'bg-green-500' },
            { title: 'Pending Orders', value: pendingReports, icon: FileText, color: 'bg-yellow-500' }
          ],
          vitalsSummary: {
            normal: normalPatients,
            warning: warningPatients,
            critical: criticalPatients
          }
        });
      } catch (e: any) {
        console.error("Error while fetching dashboard:", e);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">Loading Dashboard...</div>
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

  const { doctorInfo, patients, scheduledAppointments, recentConsultations, medicineOrders, summaryStats, vitalsSummary } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={doctorInfo.imageUrl}
              alt="Doctor Avatar"
              className="w-20 h-20 rounded-full border-4 border-blue-200 shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {doctorInfo.name}!</h1>
              <p className="text-lg text-gray-600">{doctorInfo.specialization} | {doctorInfo.location}</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-3">
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              <PlusCircle className="w-5 h-5 mr-2" />Add New Patient
            </button>
            <button className="flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-xl shadow-md hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
              <Settings className="w-5 h-5 mr-2" />Settings
            </button>
             <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Available</span>
              </div>
          </div>
        </header>

        {/* Summary Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryStats.map((stat: any, index: number) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg flex items-center p-6 hover:shadow-xl transition-shadow duration-300">
              <div className={`p-4 rounded-full ${stat.color} text-white mr-4`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h2 className="text-3xl font-bold text-gray-900">{stat.value}</h2>
              </div>
            </div>
          ))}
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Patient Monitoring & Emergency Alerts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency Alerts */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <AlertCircle className="h-6 w-6 mr-3 text-red-500" />Emergency Alerts
                </h2>
                {patients.filter((p: any) => p.emergencyAlerts.length > 0).length > 0 && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {patients.filter((p: any) => p.emergencyAlerts.length > 0).reduce((acc: number, p: any) => acc + p.emergencyAlerts.length, 0)} Active Alerts
                  </span>
                )}
              </div>
              {patients.filter((p: any) => p.emergencyAlerts.length > 0).length > 0 ? (
                <div className="space-y-4">
                  {patients.filter((p: any) => p.emergencyAlerts.length > 0).map((patient: any) => (
                    patient.emergencyAlerts.map((alert: any, idx: number) => (
                      <div key={`${patient.id}-${idx}`} className="border border-red-200 rounded-xl p-5 bg-red-50 hover:bg-red-100 transition-colors duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-red-800">{alert.type} for {patient.name}</h3>
                            <p className="text-sm text-red-600 font-medium">{patient.age}y, {patient.condition}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.status === 'Pending Doctor Review' ? 'warning' : 'critical')}`}>
                            {alert.status.toUpperCase().replace(/ /g, '_')}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-2 gap-x-4 mb-4 text-gray-700 text-sm">
                          <div className="flex items-center space-x-2">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>{patient.vitals.heartRate.value} BPM</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-blue-500" />
                            <span>{patient.vitals.spO2.value}% SpO2</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Thermometer className="h-4 w-4 text-orange-500" />
                            <span>{patient.vitals.temperature.value}°F</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                            <MapPin className="h-4 w-4 text-purple-500" />
                            <span>{alert.location} ({alert.distance})</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-end">
                          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-colors text-sm">
                            <Phone className="h-4 w-4 mr-2" />Call Patient
                          </button>
                          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors text-sm">
                            <Video className="h-4 w-4 mr-2" />Start Video
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 transition-colors text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No active emergency alerts at this moment. All clear! <CheckCircle className="inline h-5 w-5 ml-1 text-green-500" /></p>
              )}
            </section>

            {/* Patient Monitoring Table */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Vitals Monitoring</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Patient</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HR (bpm)</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SpO2 (%)</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ECG</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Temp (°F)</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.map((patient: any) => (
                      <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.age} yrs</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {patient.condition}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(patient.vitals.heartRate.risk)}`}>
                            {patient.vitals.heartRate.value}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(patient.vitals.spO2.risk)}`}>
                            {patient.vitals.spO2.value}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(patient.vitals.ecg.risk)}`}>
                            {patient.vitals.ecg.value}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(patient.vitals.temperature.risk)}`}>
                            {patient.vitals.temperature.value}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          <button className="text-green-600 hover:text-green-900">Consult</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Patient Vitals Summary */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Vitals Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div>
                    <p className="font-semibold text-green-800">Normal Range Patients</p>
                    <p className="text-3xl font-bold text-green-600">{vitalsSummary.normal}</p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div>
                    <p className="font-semibold text-yellow-800">Warning Patients</p>
                    <p className="text-3xl font-bold text-yellow-600">{vitalsSummary.warning}</p>
                  </div>
                  <AlertCircle className="h-10 w-10 text-yellow-500" />
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                  <div>
                    <p className="font-semibold text-red-800">Critical Patients</p>
                    <p className="text-3xl font-bold text-red-600">{vitalsSummary.critical}</p>
                  </div>
                  <AlertCircle className="h-10 w-10 text-red-500" />
                </div>
              </div>
            </section>

            {/* Today's Schedule */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Calendar className="h-6 w-6 mr-3 text-blue-500" />Today's Schedule
              </h2>
              {scheduledAppointments.length > 0 ? (
                <div className="space-y-4">
                  {scheduledAppointments.map((patient: any) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-600">{patient.type} - {patient.condition}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 flex items-center justify-end">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />{patient.time}
                        </p>
                        <button className="text-sm text-blue-600 hover:underline flex items-center justify-end mt-1">
                          {patient.isVideoCall ? <Video className="h-4 w-4 mr-1" /> : <Phone className="h-4 w-4 mr-1" />}Join Call
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No appointments scheduled for today.</p>
              )}
            </section>

            {/* Recent Consultations */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Stethoscope className="h-6 w-6 mr-3 text-purple-500" />Recent Consultations
              </h2>
              {recentConsultations.length > 0 ? (
                <div className="space-y-4">
                  {recentConsultations.map((consultation: any) => (
                    <div key={consultation.id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900 flex items-center">
                          {consultation.type === 'Video' ? <Video className="h-5 w-5 mr-2 text-blue-500" /> : <Phone className="h-5 w-5 mr-2 text-green-500" />}
                          {consultation.patient}
                        </p>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />{consultation.time}
                        </span>
                      </div>
                      <p className="text-md text-gray-700 mb-2">{consultation.diagnosis}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          consultation.prescription === 'Prescribed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {consultation.prescription}
                        </span>
                        <button className="text-sm text-blue-600 hover:underline">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No recent consultations found.</p>
              )}
            </section>

            {/* Medicine Delivery Orders */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Truck className="h-6 w-6 mr-3 text-teal-500" />Medicine Delivery Orders
              </h2>
              {medicineOrders.length > 0 ? (
                <div className="space-y-4">
                  {medicineOrders.map((order: any) => (
                    <div key={order.orderId} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                      <p className="text-lg font-semibold text-gray-900">Order ID: {order.orderId}</p>
                      <p className="text-gray-700">Patient: {order.patientName}</p>
                      <p className="text-gray-700 font-medium">Rx: {order.prescription}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        Status: <span className={`font-semibold ml-2 ${
                          order.status === 'Delivered' ? 'text-green-600' : order.status === 'Cancelled' ? 'text-red-600' : 'text-blue-600'
                        }`}>{order.status}</span>
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />{order.deliveryAddress}
                      </p>
                      <div className="flex justify-end space-x-3 mt-3">
                        {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                          <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Update Status
                          </button>
                        )}
                        <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No medicine orders to display.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
