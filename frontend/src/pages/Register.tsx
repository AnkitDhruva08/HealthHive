import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  FileText,
  Building2,
  Truck,
  Eye,
  EyeOff,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import Swal from "sweetalert2";
import { fetchRoles } from "../utils/api";
import { Role } from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [roles, setRoles] = useState<Role[]>([]);

  const loadRoles = async () => {
    try {
      const roleData: Role[] = await fetchRoles();
      console.log("roleData ==<<<>>", roleData);
      setRoles(roleData);
    } catch (e) {
      console.error("Error while fetching roles :::", e);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phone: "",
    role: 3, // default: Patient (id=3)
    location: "",
    licenseNumber: "",
    specialization: "",
    pharmacyName: "",
    vehicleNumber: "",
  });

  const steps = ["Account", "Personal", "Role Details"];

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  // ✅ Registration Handler
  const handleSubmit = async () => {
    // 🔹 Basic validations
    if (!formData.email || !formData.password || !formData.username) {
      Swal.fire("⚠️ Missing Info", "Please fill in all required fields.", "warning");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire("❌ Password Mismatch", "Passwords do not match!", "error");
      return;
    }

    if (formData.password.length < 6) {
      Swal.fire("⚠️ Weak Password", "Password must be at least 6 characters long.", "warning");
      return;
    }

    try {
      setLoading(true);

      // 🔹 Prepare payload
      const payload: any = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        phone: formData.phone,
        role: formData.role,
        location: formData.location,
      };

      if (formData.role === 2) {
        payload.license_number = formData.licenseNumber;
        payload.specialization = formData.specialization;
      } else if (formData.role === 4) {
        payload.pharmacy_name = formData.pharmacyName;
      } else if (formData.role === 5) {
        payload.vehicle_number = formData.vehicleNumber;
      }

      console.log("📤 Sending registration payload:", payload);

      // 🔹 API call
      const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("📥 Server response:", data);

      if (!response.ok) {
        Swal.fire("❌ Registration Failed", data.detail || "Something went wrong!", "error");
        return;
      }

      // 🔹 Save user data & tokens to localStorage (or context)
      localStorage.setItem("auth_token", data.tokens.access_token);
      localStorage.setItem("refresh_token", data.tokens.refresh_token)
      localStorage.setItem("role", data.user?.role);
      localStorage.setItem("user", JSON.stringify({
        id: data.user?.id,
        username: data.user?.username,
        email: data.user?.email,
        role: data.user?.role,
      }));

      // 🔹 Success message + redirect
      Swal.fire({
        title: "🎉 Registration Successful!",
        html: `
          <b>Welcome aboard, ${data.user?.username || "User"}! 🚀</b><br><br>
          Your account has been created successfully.<br>
          You can now explore all features without logging in again.
        `,
        icon: "success",
        confirmButtonText: "Let's Go 🚀",
        confirmButtonColor: "#4CAF50",
      
      }).then(() => {
        // 🔹 Redirect to Dashboard/Home after clicking OK
        window.location.href = "/dashboard";
      });

    } catch (error: any) {
      console.error("🔥 Registration error:", error);
      Swal.fire("❌ Registration Failed", error.message || "An unknown error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case 2:
        return (
          <div className="space-y-4">
            <div className="group relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={handleChange("licenseNumber")}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl"
              />
            </div>
            <div className="group relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange("specialization")}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="group relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pharmacy Name"
              value={formData.pharmacyName}
              onChange={handleChange("pharmacyName")}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl"
            />
          </div>
        );
      case 5:
        return (
          <div className="group relative">
            <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Vehicle Number"
              value={formData.vehicleNumber}
              onChange={handleChange("vehicleNumber")}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const canProceedToNext = () => {
    switch (activeStep) {
      case 0:
        return formData.email && formData.password && formData.confirmPassword;
      case 1:
        return formData.username && formData.phone && formData.location;
      case 2:
        if (formData.role === 2)
          return formData.licenseNumber && formData.specialization;
        if (formData.role === 4) return formData.pharmacyName;
        if (formData.role === 5) return formData.vehicleNumber;
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = (step: number) => {
    const inputClass =
      "w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-xl";
    const iconClass =
      "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5";

    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="group relative">
              <Mail className={iconClass} />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange("email")}
                className={inputClass}
              />
            </div>
            <div className="group relative">
              <Lock className={iconClass} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange("password")}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <div className="group relative">
              <Lock className={iconClass} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="group relative">
              <User className={iconClass} />
              <input
                type="text"
                placeholder="User name"
                value={formData.username}
                onChange={handleChange("username")}
                className={inputClass}
              />
            </div>
            <div className="group relative">
              <Phone className={iconClass} />
              <input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange("phone")}
                className={inputClass}
              />
            </div>
            <div className="group relative">
              <MapPin className={iconClass} />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange("location")}
                className={inputClass}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <p className="text-sm font-medium text-gray-700 mb-4">
              Choose your role
            </p>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, role: role.id })
                  }
                  className={`p-4 rounded-xl border-2 ${
                    formData.role === role.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="text-sm font-medium text-gray-700">
                    {role.role_name}
                  </div>
                </button>
              ))}
            </div>
            {renderRoleSpecificFields()}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/80 rounded-2xl shadow-2xl p-8 relative">
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Join Us Today</h1>
              <p className="text-gray-500 text-sm mt-2">
                Create your account in just a few steps
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-center mb-8 space-x-2">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`relative ${
                      index <= activeStep ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                        index <= activeStep
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">
                      {step}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-1 rounded-full ${
                        index < activeStep
                          ? "bg-gradient-to-r from-blue-500 to-purple-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mb-8 mt-12">{renderStepContent(activeStep)}</div>

            <div className="flex gap-3">
              {activeStep > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveStep((p) => p - 1)}
                  className="flex items-center px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
              )}

              <button
                type="button"
                disabled={!canProceedToNext() || loading}
                onClick={
                  activeStep === steps.length - 1
                    ? handleSubmit
                    : () => setActiveStep((p) => p + 1)
                }
                className={`flex-1 px-6 py-4 rounded-xl font-semibold ${
                  activeStep === steps.length - 1
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                }`}
              >
                {loading
                  ? "Creating Account..."
                  : activeStep === steps.length - 1
                  ? "Create Account"
                  : "Continue"}
              </button>
            </div>

            <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Already have an account?
              <Link to="/login" className="text-blue-600 ml-1 hover:underline">
                Sign in
              </Link>
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
