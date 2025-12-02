"use client";
import { MdDashboard } from "react-icons/md";
import { FaClinicMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserNurse } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard/>, path: "#" },
    { name: "Clinic", icon: <FaClinicMedical/>, path: "/clinic-dashboard", active: true },
    { name: "Doctors", icon: <FaUserDoctor/>, path: "#" },
    { name: "Nurse", icon: <FaUserNurse/>, path: "#" },
    { name: "Patient", icon: <FaUser/>, path: "#" },
    { name: "Program Coach", icon: <FaUserTie/>, path: "#" },
    { name: "Programs", icon: <FaFileAlt/>, path: "#" },
    { name: "Appointment slot", icon: <FaCar/>, path: "#" },
    { name: "Appointment", icon: <FaCalendarAlt/>, path: "#" },
  ];

  return (
    <>
      <aside className=" fixed left-0 top-[75px] h-[calc(100vh-75px)] w-64 bg-blue-400 text-white z-50 hidden lg:block">
        <div className="flex flex-col h-full p-6">
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      item.active
                        ? "bg-blue-500 text-white"
                        : "text-blue-50 hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

