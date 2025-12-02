"use client";
import { useState , useEffect} from "react";
import axios from "axios";

import ProtectedLayout from "../components/ProtectedLayout";

export default function Dashboard() {
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [pendingUsersCount, setPendingUsersCount] = useState(0);

  const fetchTotalUsersCount = async () => {
    try {
      const response = await axios.get("/api/user/count/all", {
        withCredentials: true,
      });
      const { status, data, message } = response?.data; 
      if (status) {
        setTotalUsersCount(data || 0);
      }
    } catch (error) {
      alert("Error fetching dashboard data");
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchPendingUsersCount = async () => {
    try {
      const response = await axios.get("/api/user/count/pending", {
        withCredentials: true,
      });
      const { status, data, message } = response?.data;
      if (status) {
        setPendingUsersCount(data || 0);
      }
    } catch (error) {
      alert("Error fetching dashboard data");
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchTotalUsersCount();
    fetchPendingUsersCount();
  },[]);
  
  return (
    <ProtectedLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <div className="flex items-center justify-center">
          <div className="bg-blue-100 text-blue-800 rounded-lg p-6 m-4 w-48 text-center">
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold">{totalUsersCount}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 rounded-lg p-6 m-4 w-48 text-center">
            <h2 className="text-lg font-semibold mb-2">Pending Users</h2>
            <p className="text-3xl font-bold">{pendingUsersCount}</p>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}

