"use client";

import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

export default function DocumentTable({ documents, getAllDocuments }) {
  const [activeTab, setActiveTab] = useState("Pending");
  const [loading, setLoading] = useState(false);

  // Filter documents by status
  const filteredDocuments = documents.filter((doc) => {
    if (activeTab === "Pending") return doc.status === "Pending" || doc.status === "pending";
    if (activeTab === "Approved") return doc.status === "Approved" || doc.status === "approved";
    if (activeTab === "Rejected") return doc.status === "Rejected" || doc.status === "rejected";
    return false;
  });

  const handleApprove = async (documentId) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `/api/document/status/approve/${documentId}`,
        {},
        { withCredentials: true }
      );
      const { status, message } = response?.data;

      if (status) {
        alert(message || "Document approved successfully");
        getAllDocuments();
      } else {
        alert(message || "Failed to approve document");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error approving document");
      console.error("Error approving document:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (documentId) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `/api/document/status/reject/${documentId}`,
        {},
        { withCredentials: true }
      );
      const { status, message } = response?.data;

      if (status) {
        alert(message || "Document rejected successfully");
        getAllDocuments();
      } else {
        alert(message || "Failed to reject document");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error rejecting document");
      console.error("Error rejecting document:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if approve/reject buttons should be disabled
  // Sequential approval: Only enable buttons for the lowest pending order
  const isActionDisabled = (document) => {
    // If document status is not pending, disable buttons
    if (document.status !== "Pending" && document.status !== "pending") {
      return true;
    }

    // Get the order value
    const order = document.order;

    // If no order field exists, allow actions (assuming it's first)
    if (order === undefined || order === null) {
      return false;
    }

    // Find the minimum pending order from all pending documents
    const pendingDocuments = documents.filter(
      (doc) => doc.status === "Pending" || doc.status === "pending"
    );

    if (pendingDocuments.length === 0) {
      return true; // No pending documents
    }

    // Get all orders from pending documents
    const pendingOrders = pendingDocuments
      .map((doc) => doc.order)
      .filter((o) => o !== undefined && o !== null)
      .sort((a, b) => a - b); // Sort ascending

    if (pendingOrders.length === 0) {
      return false; // No orders defined, allow all
    }

    // Get the minimum (first) pending order
    const minPendingOrder = pendingOrders[0];

    // Only enable buttons for documents with the minimum pending order
    // Disable all others
    return order !== minPendingOrder;
  };

  const tabs = ["Pending", "Approved", "Rejected"];

  console.log(filteredDocuments);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                {
                  documents.filter((doc) => {
                    if (tab === "Pending")
                      return doc.status === "Pending" || doc.status === "pending";
                    if (tab === "Approved")
                      return doc.status === "Approved" || doc.status === "approved";
                    if (tab === "Rejected")
                      return doc.status === "Rejected" || doc.status === "rejected";
                    return false;
                  }).length
                }
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                Document ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                Document Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                Approval Order
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                User Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                Document Status
              </th>
              {activeTab === "Pending" && (
                <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.length === 0 ? (
              <tr>
                <td
                  colSpan={activeTab === "Pending" ? 8 : 7}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No {activeTab.toLowerCase()} documents found
                </td>
              </tr>
            ) : (
              filteredDocuments.flatMap((document, docIndex) => {
                const disabled = isActionDisabled(document);
                const users = document.users || [];
                const order = document.order || document.approval_order || document.pending_approval_order || "N/A";

                // If document has users, create a row for each user
                if (users.length > 0) {
                  return users.map((user, userIndex) => (
                    <tr
                      key={`${document._id || document.id}-${user.user_id || user._id || userIndex}`}
                      className={`border-b border-gray-100 ${
                        (docIndex + userIndex) % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      {/* Document ID - only show on first user row */}
                      {userIndex === 0 && (
                        <td
                          rowSpan={users.length}
                          className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap align-top"
                        >
                          {document._id?.slice(-8) || document.id || "N/A"}
                        </td>
                      )}
                      {/* Document Name - only show on first user row */}
                      {userIndex === 0 && (
                        <td
                          rowSpan={users.length}
                          className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap align-top"
                        >
                          {document.document_name || document.name || "N/A"}
                        </td>
                      )}
                      {/* Approval Order - only show on first user row */}
                      {userIndex === 0 && (
                        <td
                          rowSpan={users.length}
                          className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap align-top"
                        >
                          {order}
                        </td>
                      )}
                      {/* User Name */}
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {user.username || "N/A"}
                      </td>
                      {/* Email */}
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {user.email || "N/A"}
                      </td>
                      {/* Role */}
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {user.role || "N/A"}
                      </td>
                      {/* Document Status - only show on first user row */}
                      {userIndex === 0 && (
                        <td
                          rowSpan={users.length}
                          className="px-4 py-3 text-sm whitespace-nowrap align-top"
                        >
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              document.status === "Approved" || document.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : document.status === "Rejected" || document.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {document.status || "Pending"}
                          </span>
                        </td>
                      )}
                      {/* Action - only show on first user row and only for Pending tab */}
                      {activeTab === "Pending" && userIndex === 0 && (
                        <td
                          rowSpan={users.length}
                          className="px-4 py-3 whitespace-nowrap align-top"
                        >
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApprove(document._id || document.id)}
                              disabled={disabled || loading}
                              className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors flex items-center gap-1 ${
                                disabled || loading
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer"
                              }`}
                              aria-label="Approve"
                            >
                              <FaCheckCircle />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(document._id || document.id)}
                              disabled={disabled || loading}
                              className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors flex items-center gap-1 ${
                                disabled || loading
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer"
                              }`}
                              aria-label="Reject"
                            >
                              <FaTimesCircle />
                              Reject
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ));
                } else {
                  // If document has no users, show a single row
                  return (
                    <tr
                      key={document._id || document.id}
                      className={`border-b border-gray-100 ${
                        docIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {document._id?.slice(-8) || document.id || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {document.document_name || document.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {order}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{document?.user?.username || "N/A"}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{document?.user?.email || "N/A"}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{document?.user?.role || "N/A"}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            document.status === "Approved" || document.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : document.status === "Rejected" || document.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {document.status || "Pending"}
                        </span>
                      </td>
                      {activeTab === "Pending" && (
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApprove(document._id || document.id)}
                              disabled={disabled || loading}
                              className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors flex items-center gap-1 ${
                                disabled || loading
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer"
                              }`}
                              aria-label="Approve"
                            >
                              <FaCheckCircle />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(document._id || document.id)}
                              disabled={disabled || loading}
                              className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors flex items-center gap-1 ${
                                disabled || loading
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer"
                              }`}
                              aria-label="Reject"
                            >
                              <FaTimesCircle />
                              Reject
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                }
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

