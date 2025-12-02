"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "./Loader";

const initialValues = {
  clinic_name: "",
  doctor_name: "",
  clinic_email: "",
  clinic_number: "",
  establishment_date: "",
  location: "",
  panchakrma: "",
};

const formSchema = Yup.object().shape({
  clinic_name: Yup.string().required("Please enter clinic_name"),
  doctor_name: "",
  clinic_email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Please enter email"),
  clinic_number: "",
  establishment_date: "",
  location: "",
  panchakrma: "",
});

export default function AddUserModal({ clinic, getAllClinics, onClose }) {
  const [formData, setFormData] = useState({ ...initialValues });

  const [loading, setLoading] = useState(false);

  function changeValues(initialValue, currentValue) {
    const changes = {};
    let hasChanges = false;

    // Only compare keys that exist in the initial object
    for (const key in initialValue) {
      const initial = initialValue[key];
      const current = currentValue[key];

      // If values are objects (deep check), you can extend this logic.
      if (initial !== current) {
        hasChanges = true;
        changes[key] = current; // store the changed value
      }
    }

    return {
      hasChanges,
      changes,
    };
  }

  const Formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...formData },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        if (!clinic) {
          const response = await axios.post("/api/clinic/add", values, {
            withCredentials: true,
          });
          const { status, data, message } = response?.data;

          if (status) {
            alert(message);
            resetForm();
            setLoading(false);
            getAllClinics();
            onClose();
          } else {
            alert(message);
            setLoading(false);
          }
        } else {
          const { hasChanges, changes } = changeValues(formData, values);
          if (!hasChanges) {
            alert("No changes made");
            setLoading(false);
            return;
          }
          const response = await axios.put(
            "/api/clinic/update/" + clinic._id,
            changes,
            {
              withCredentials: true,
            }
          );
          const { status, data, message } = response?.data;

          if (status) {
            alert(message);
            setLoading(false);
            getAllClinics();
            onClose();
          } else {
            alert(message);
            setLoading(false);
          }
        }
      } catch (error) {
        alert("Something went wrong");
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (clinic) {
      setFormData({
        clinic_name: clinic.clinic_name || "",
        doctor_name: clinic.doctor_name || "",
        clinic_email: clinic.clinic_email || "",
        clinic_number: clinic.clinic_number || "",
        establishment_date: clinic.establishment_date || "",
        location: clinic.location || "",
        panchakrma: clinic.panchakrma || "",
      });
    } else {
      setFormData({
        clinic_name: "",
        doctor_name: "",
        clinic_email: "",
        clinic_number: "",
        establishment_date: "",
        location: "",
        panchakrma: "",
      });
    }
  }, [clinic]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add User</h2>
          <button
            onClick={onClose}
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
                htmlFor="clinic_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                clinic name
              </label>
              <input
                type="text"
                id="clinic_name"
                name="clinic_name"
                value={Formik?.values.clinic_name}
                onChange={Formik.handleChange}
                placeholder="clinic name"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Doctor Name */}
            <div>
              <label
                htmlFor="doctor_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                doctor name
              </label>
              <input
                type="text"
                id="doctor_name"
                name="doctor_name"
                value={Formik?.values.doctor_name}
                onChange={Formik.handleChange}
                placeholder="doctor name"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Clinic Mail */}
            <div>
              <label
                htmlFor="clinic_email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                clinic mail
              </label>
              <input
                type="email"
                id="clinic_email"
                name="clinic_email"
                value={Formik?.values.clinic_email}
                onChange={Formik.handleChange}
                placeholder="clinic mail"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Clinic Number */}
            <div>
              <label
                htmlFor="clinic_number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                clinic number
              </label>
              <input
                type="text"
                id="clinic_number"
                name="clinic_number"
                value={Formik?.values.clinic_number}
                onChange={Formik.handleChange}
                placeholder="clinic number"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Establishment Date */}
            <div>
              <label
                htmlFor="establishment_date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                establishment date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="establishment_date"
                  name="establishment_date"
                  value={Formik?.values.establishment_date}
                  onChange={Formik.handleChange}
                  placeholder="dd/mm/yy"
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={Formik?.values.location}
                onChange={Formik.handleChange}
                placeholder="location"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Panchakrma - Full Width */}
            <div className="md:col-span-2">
              <label
                htmlFor="panchakrma"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                panchakrma
              </label>
              <input
                type="text"
                id="panchakrma"
                name="panchakrma"
                value={Formik?.values.panchakrma}
                onChange={Formik.handleChange}
                placeholder="panchakrma"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
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
                {clinic ? " Update" : "Add"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
