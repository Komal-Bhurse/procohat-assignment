"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ClinicTable from "./components/ClinicTable";
import AddUserModal from "./components/AddUserModal";
import axios from "axios";

export default function ClinicDashboard() {
  const [clinics, setClinics] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);

  const handleAddUser = () => {
    setEditingClinic(null);
    setIsModalOpen(true);
  };

  const handleEdit = (clinic) => {
    setEditingClinic(clinic);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + "/api/clinic/delete/" + id,
        {},
        { withCredentials: true }
      );
      const { status, message } = response?.data;

      if (status) {
        getAllClinics();
      } else {
        console.log("Error fetching clinics:", message);
      }
    } catch (error) {
      console.log("Error fetching clinics:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClinic(null);
  };

  const getAllClinics = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/clinic/all",
        {},
        { withCredentials: true }
      );
      const { status, message } = response?.data;

      if (status) {
        setClinics(data);
      } else {
        console.log("Error fetching clinics:", message);
      }
    } catch (error) {
      console.log("Error fetching clinics:", error);
    }
  };

  useEffect(() => {
    getAllClinics();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-x-auto lg:ml-64">
          <ClinicTable
            onAddUser={handleAddUser}
            clinics={clinics}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>
      {isModalOpen && (
        <AddUserModal
          getAllClinics={getAllClinics}
          clinic={editingClinic}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
