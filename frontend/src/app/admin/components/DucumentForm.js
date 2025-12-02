"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "./Loader";

const initialValues = {
  document_name: "",
  users: [],
};

const formSchema = Yup.object().shape({
  document_name: Yup.string().required("Please enter document name"),
  users: Yup.array().min(1, "Please select at least one user").required("Please select at least one user"),
});

export default function DocumentForm({ getAllDocuments }) {
  const [formData, setFormData] = useState({ ...initialValues });

  const [approvedUsers, setApprovedUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const Formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...formData },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        // Transform users array to required format: {user_id, username, email, role}
        const formattedUsers = values.users.map((user) => ({
          user_id: user._id || user.user_id,
          username: user.username,
          email: user.email,
          role: user.role,
        }));

        const payload = {
          document_name: values.document_name,
          users: formattedUsers,
        };

        const response = await axios.post(`/api/document/add/multiple`, payload, {
          withCredentials: true,
        });
        const { status, data, message } = response?.data;

        if (status) {
          alert(message);
          resetForm();
          setIsDropdownOpen(false);
          setLoading(false);
          getAllDocuments();
        } else {
          alert(message);
          setLoading(false);
        }
      } catch (error) {
        alert("Something went wrong");
        setLoading(false);
      }
    },
  });

  const clearForm = () => {
    setFormData({
      document_name: "",
      users: [],
    });
    Formik.resetForm();
    setIsDropdownOpen(false);
  };

  const getApprovedAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/all/approved", {
        withCredentials: true,
      });
      const { status, data, message } = response?.data;

      if (status) {
        setApprovedUsers(data || []);
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
    getApprovedAllUsers();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".relative")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      {/* Modal Body */}
      <form onSubmit={Formik.handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Clinic Name */}
          <div>
            <label
              htmlFor="document_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Document Name
            </label>
            <input
              type="text"
              id="document_name"
              name="document_name"
              value={Formik?.values.document_name}
              onChange={Formik.handleChange}
              placeholder="Document Name"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="users"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Users
            </label>
            {loading ? (
              <Loader />
            ) : approvedUsers.length > 0 ? (
              <div className="relative">
                {/* Selected Users Display */}
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="min-h-[42px] w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer bg-white flex items-center flex-wrap gap-2"
                >
                  {Formik?.values.users && Formik.values.users.length > 0 ? (
                    <>
                      {Formik.values.users.map((selectedUser, index) => {
                        return (
                          <span
                            key={selectedUser._id || index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {selectedUser.username}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const newUsers = Formik.values.users.filter(
                                  (u) => (u._id || u.user_id) !== (selectedUser._id || selectedUser.user_id)
                                );
                                Formik.setFieldValue("users", newUsers);
                              }}
                              className="ml-1 hover:text-blue-900"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })}
                      <span className="text-gray-400 text-sm ml-auto">
                        {Formik.values.users.length} selected
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-400">Select users...</span>
                  )}
                  <span className="ml-auto text-gray-400">
                    {isDropdownOpen ? "▲" : "▼"}
                  </span>
                </div>

                {/* Dropdown Options */}
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {approvedUsers.map((user) => {
                      const isSelected = Formik.values.users?.some(
                        (u) => (u._id || u.user_id) === user._id
                      );
                      return (
                        <div
                          key={user._id}
                          onClick={() => {
                            const currentUsers = Formik.values.users || [];
                            if (isSelected) {
                              // Remove from selection
                              const newUsers = currentUsers.filter(
                                (u) => (u._id || u.user_id) !== user._id
                              );
                              Formik.setFieldValue("users", newUsers);
                            } else {
                              // Add to selection - store full user object
                              Formik.setFieldValue("users", [...currentUsers, user]);
                            }
                          }}
                          className={`px-4 py-2 cursor-pointer hover:bg-blue-50 flex items-center gap-2 ${
                            isSelected ? "bg-blue-100" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}} // Handled by parent onClick
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-900">{user.username}</span>
                          <span className="text-xs text-gray-500 ml-auto">
                            {user.email}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No approved users available</p>
            )}
            {Formik.errors.users && Formik.touched.users && (
              <p className="mt-1 text-sm text-red-600">{Formik.errors.users}</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={clearForm}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
