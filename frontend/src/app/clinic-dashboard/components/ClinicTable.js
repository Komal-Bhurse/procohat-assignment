"use client";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";


export default function ClinicTable({
  onAddUser,
  clinics,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search name"
              className="text-black w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <IoSearchSharp size={20} />
            </span>
          </div>
        </div>
        {/* Add User Button */}
        <button
          onClick={onAddUser}
          className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
        >
          <span>
            <FaPlus />
          </span>
          <span className="hidden sm:inline">Add User</span>
        </button>
      </div>
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                ID
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                Clinic Name
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                Doctor Name
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                Clinic Number
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                Location
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                no of patient
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                revenue
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {clinics.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  No clinics found
                </td>
              </tr>
            ) : (
              clinics.map((clinic, index) => (
                <tr
                  key={clinic._id}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    {clinic._id}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    {clinic.clinic_name}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    {clinic.doctor_name}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    {clinic.clinic_number || "-"}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    {clinic.location}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    00
                  </td>
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    00
                  </td>
                  <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2 md:gap-3">
                      <button
                        onClick={() => onEdit(clinic)}
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                        aria-label="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(clinic._id)}
                        className=" text-red-500 hover:text-red-600 transition-colors"
                        aria-label="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
