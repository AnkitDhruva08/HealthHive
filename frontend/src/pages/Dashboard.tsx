import React, { useEffect } from "react";
import { fetchDashboardData } from "../utils/api";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import DoctorDashboard from "../components/dashboard/DoctorDashboard";
import PatientDashboard from "../components/dashboard/PatientDashboard";
import PharmacyDashboard from "../components/dashboard/PharmacyDashboard";
import DeliveryDashboard from "../components/dashboard/DeliveryDashboard";
const Dashboard: React.FC = () => {
  const authToken = localStorage.getItem("auth_token") || ""; 

  const roleId = localStorage.getItem("role") || null; 
  console.log('roleId ==<<<<<>>', roleId);


  const loadDashboardData = async () => {
    try {
      if (!authToken) {
        console.warn("⚠️ No auth token found. Redirecting to login...");
        window.location.href = "/login";
        return;
      }

      const data = await fetchDashboardData(authToken);
      console.log("Dashboard data ==<<<>>", data);
    } catch (e) {
      console.error("Error while fetching dashboard:", e);
    }
  };

  // ✅ load data on mount
  useEffect(() => {
    loadDashboardData();
  }, [authToken, roleId]);

  return (
    <div>
     {Number(roleId) === 1 && <AdminDashboard />}
     {Number(roleId) === 2 && <DoctorDashboard />}
     {Number(roleId) === 3 && <PatientDashboard />}
     {Number(roleId) === 4 && <PharmacyDashboard />}
     {Number(roleId) === 5 && <DeliveryDashboard />}

    </div>
  );
};

export default Dashboard;
