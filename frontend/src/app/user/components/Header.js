"use client";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useState } from "react";

export default function Header() {
  const { logout } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/user-logout",{},{withCredentials:true});
      const {status,data, message} = response.data;
      if (status) {
        await logout();
        alert("Logged out successfully.");
      }else {
        alert(message || "Logout failed. Please try again.");
      }
      
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b mb-5 border-gray-200">
      <div className="flex">
        {/* Logo Section - Same width and background as sidebar */}
        <div className="hidden lg:flex w-68 bg-blue-400 items-center px-6 py-4">
          <h1 className="text-xl font-bold text-white">LOGO</h1>
        </div>
        
        {/* Rest of header content */}
        <div className="flex-1 px-4 md:px-6 py-4">
          <div className="flex items-center justify-end gap-4">
            
            {/* Right side buttons and user profile */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Logout
              </button>
              
              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">User</p>
                  <p className="text-xs text-gray-500">user@gmail.com</p>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-semibold">
                       <FaUser />
                    </span>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


