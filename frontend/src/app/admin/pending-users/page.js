"use client";
import { useState,useEffect } from "react";
import ProtectedLayout from "../components/ProtectedLayout";
import UserTable from "../components/UserTable";
import Loader from "../components/Loader";
import RejectModal from "../components/RejectModal";

import axios from "axios";

export default function PendingUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [model, setModel] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);


  const handleApproveUser = async (id) => {
    try {
      const response = await axios.put(
        `/api/user/status/approve/${id}`,
        {},
        { withCredentials: true }
      );
      const { status, data, message } = response?.data;

      if (status) {
        alert(message || "User approved successfully");
        getAllUsers(); // Fixed: removed parameter
      } else {
        alert(message || "Failed to approve user");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error approving user");
      console.error("Error approving user:", error);
    }
  };

  const handleRejectUser = (id) => {
    setSelectedUserId(id);
    setModel(true);
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "/api/user/all/pending",
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
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Pending Users</h1>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader />
          </div>
        ) : (
          <UserTable users={users} onApprove={handleApproveUser} onReject={handleRejectUser}/>
        )}
      </div>
      {
        model && (<RejectModal id={selectedUserId} getAllUsers={getAllUsers} setModel={setModel}/>)
      }
    </ProtectedLayout>
  );
}

