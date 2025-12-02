"use client";

import { useState, useEffect } from "react";
import DocumentForm from "../components/DucumentForm";
import DocumentTable from "../components/DocumentTable";
import ProtectedLayout from "../components/ProtectedLayout";
import Loader from "../components/Loader";
import axios from "axios";

export default function Document() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const getAllDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/document/all", {
        withCredentials: true,
      });
      const { status, data, message } = response?.data;
      if (status) {
        setDocuments(data || []);
      } else {
        alert(message || "Failed to fetch documents");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching documents");
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <ProtectedLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
          >
            {showForm ? "Hide Form" : "Add Document"}
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <DocumentForm getAllDocuments={getAllDocuments} />
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader />
          </div>
        ) : (
          <DocumentTable documents={documents} getAllDocuments={getAllDocuments} />
        )}
      </div>
    </ProtectedLayout>
  );
}
