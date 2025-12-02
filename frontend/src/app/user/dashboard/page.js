"use client";
import { useState , useEffect} from "react";
import axios from "axios";
import ProtectedLayout from "../components/ProtectedLayout";

export default function Dashboard() {
  const [userDocuments, setUserDocuments] = useState([])

  const fetchUserDocuments = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/document/get-user-documents", {
        withCredentials: true,
      });
      const { status, data } = response?.data;
      if (status) {
        setUserDocuments(data);
      }
    } catch (error) {
      alert("Error fetching dashboard data");
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchUserDocuments();
  },[]);
  
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("approved") || statusLower.includes("complete")) {
      return "bg-green-100 text-green-800";
    } else if (statusLower.includes("pending") || statusLower.includes("review")) {
      return "bg-yellow-100 text-yellow-800";
    } else if (statusLower.includes("rejected") || statusLower.includes("denied")) {
      return "bg-red-100 text-red-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  return (
    <ProtectedLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Documnets</h1>
        {userDocuments.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">No documents found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userDocuments.map((document, index) => (
              <div
                key={document._id || index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {document.document_name || document.documentName || "Untitled Document"}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      document.status
                    )}`}
                  >
                    {document.status || "Unknown"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
}

