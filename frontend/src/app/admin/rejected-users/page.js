"use client";
import { useState, useEffect } from "react";
import ProtectedLayout from "../components/ProtectedLayout";
import UserTable from "../components/UserTable";
import Loader from "../components/Loader";
import axios from "axios";

export default function RejectedUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/user/all/rejected",
        { withCredentials: true }
      );
      const { status, data, message } = response?.data;

      if (status) {
        setUsers(data || []);
      } else {
        alert(message || "Failed to fetch users");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <ProtectedLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Rejected Users</h1>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader />
          </div>
        ) : (
          <UserTable users={users} page={"Rejected"}/>
        )}
      </div>
    </ProtectedLayout>
  );
}
