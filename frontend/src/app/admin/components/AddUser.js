"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "./Loader";

const initialValues = {
  username: "",
  email: "",
  role: "",
  password: "",
};

const formSchema = Yup.object().shape({
  username: Yup.string().required("Please enter username"),
  email: Yup.string().required("Please enter email"),
  role: Yup.string().required("Please enter role"),
  password: Yup.string().required("Please enter password"),
});

export default function AddUser() {
  const [formData, setFormData] = useState({ ...initialValues });

  const [loading, setLoading] = useState(false);

  const Formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...formData },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

          const response = await axios.post("/api/user/add", values, {
            withCredentials: true,
          });
          const { status, data, message } = response?.data;

          if (status) {
            alert(message);
            resetForm();
            setLoading(false);
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
      username: "",
      email: "",
      role: "",
      password: "",
    });
  }

  return (
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={Formik.handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Clinic Name */}
            <div>
              <label
                htmlFor="clinic_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                user name
              </label>
              <input
                type="text"
                  id="username"
                name="username"
                value={Formik?.values.username}
                onChange={Formik.handleChange}
                placeholder="user name"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Doctor Name */}
            <div>
              <label
                  htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={Formik?.values.email}
                onChange={Formik.handleChange}
                placeholder="email"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

              {/* Role */}
            <div>
              <label  
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                role
              </label>
              <select
                id="role"
                name="role"
                value={Formik?.values.role}
                onChange={Formik.handleChange}
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"  
              >
                <option value="" disabled>
                  Select role
                </option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                password
              </label>
            
              <input
                type="password"
                id="password"
                name="password"
                value={Formik?.values.password}
                onChange={Formik.handleChange}
                placeholder="password"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />  
            </div>

            </div>
          
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
                Add
              </button>
            )}
          </div>
        </form>
      </div>
  );
}
