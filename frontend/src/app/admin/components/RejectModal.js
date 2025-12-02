"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "./Loader";

const initialValues = {
  rejection_reason: "",
};

const formSchema = Yup.object().shape({
  rejection_reason: Yup.string().required("Please enter rejection_reason"),
});

export default function RejectModal({ id, getAllUsers ,setModel}) {
  const [formData, setFormData] = useState({ ...initialValues });

  const [loading, setLoading] = useState(false);

  const Formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...formData },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
          const response = await axios.put(`/api/user/status/reject/${id}`, values, {
            withCredentials: true,
          });
          const { status, data, message } = response?.data;

          if (status) {
            alert(message);
            resetForm();
            setLoading(false);
            getAllUsers();
            setModel(false);
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

  const clearForm = ()=>{
    setFormData({
      rejection_reason: "",
    });
    setModel(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Rejection Reason</h2>
          <button
            onClick={clearForm}
            className="text-2xl text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={Formik.handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Clinic Name */}
            <div>
              <label
                htmlFor="rejection_reason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reason for Rejection
              </label>
              <input
                type="text"
                id="rejection_reason"
                name="rejection_reason"
                value={Formik?.values.rejection_reason}
                onChange={Formik.handleChange}
                placeholder="Reason for Rejection"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
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
    </div>
  );
}
