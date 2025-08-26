import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Eye, EyeOff, LogIn, Sparkles, User } from "lucide-react";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: "identifier" | "password") =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
      };

  const handleLogin = async () => {
    if (!formData.identifier || !formData.password) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please enter your email, phone, or username along with your password.",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      const data = await response.json();

      console.log('data Ankit  ==<<<>>', data);

      if (!response.ok) {
        Swal.fire(
          "❌ Registration Failed",
          data.detail || "Something went wrong!",
          "error"
        );
        return;
      }

      // 🔹 Save user data & tokens to localStorage (or context)
      console.log('user role ==<<>>', data.user?.role)
      localStorage.setItem("auth_token", data.tokens.access_token);
      localStorage.setItem("refresh_token", data.tokens.refresh_token);
      localStorage.setItem("role", data.user?.role);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user?.id,
          username: data.user?.username,
          email: data.user?.email,
          role: data.user?.role,
        })
      );

      // 🔹 Success message + redirect
      Swal.fire({
        title: "🎉 Login Successful!",
        html: `
                <b>Welcome aboard, ${data.user?.username || "User"
          }! 🚀</b><br><br>
                Your  has been login successfully.<br>
                You can now explore all features .
              `,
        icon: "success",
        confirmButtonText: "Let's Go 🚀",
        confirmButtonColor: "#4CAF50",
      }).then(() => {
        window.location.href = "/dashboard";
      });

    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 font-['Inter'] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/10 to-orange-400/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Sign in with your email, phone, or username
              </p>
            </div>

            {/* Login Inputs */}
            <div className="space-y-6">
              <div className="group relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                <input
                  type="text"
                  placeholder="Email, Phone, or Username"
                  value={formData.identifier}
                  onChange={handleChange("identifier")}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg transition-all placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg transition-all placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                ) : (
                  <LogIn className="w-5 h-5 mr-2" />
                )}
                {loading ? "Logging In..." : "Log In"}
              </button>
            </div>

            <div className="text-center mt-6 space-y-3">
              <p className="text-sm text-gray-500">
                <button className="text-blue-600 hover:text-blue-700 font-semibold">
                  Forgot password?
                </button>
              </p>
              <p className="text-sm text-gray-500">
                Don’t have an account?
                <Link to="/register" className="text-blue-600 ml-1 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
