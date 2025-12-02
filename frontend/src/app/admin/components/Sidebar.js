"use client";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(true);

  const pathname = usePathname()

  const menuItems = [
    { 
      name: "Dashboard", 
      icon: <MdDashboard/>, 
      path: "/admin/dashboard",
      type: "link"
    },
    { 
      name: "User Management", 
      icon: <FaUsers/>, 
      type: "submenu",
      submenu: [
        { name: "New User", icon: <FaUserPlus/>, path: "/admin/new-user" },
        { name: "Pending Users", icon: <MdPendingActions/>, path: "/admin/pending-users" },
        { name: "Approved Users", icon: <FaCheckCircle/>, path: "/admin/approved-users" },
        { name: "Rejected Users", icon: <FaTimesCircle/>, path: "/admin/rejected-users" },
      ]
    },
    { 
      name: "Document", 
      icon: <FaFileAlt/>, 
      path: "/admin/document",
      type: "link"
    },
  ];

  return (
    <>
      <aside className="fixed left-0 top-[75px] h-[calc(100vh-75px)] w-68 bg-blue-400 text-white z-50 hidden lg:block">
        <div className="flex flex-col h-full p-6">
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  {item.type === "submenu" ? (
                    <div>
                      <button
                        onClick={() => setIsUserManagementOpen(!isUserManagementOpen)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors text-blue-50 hover:bg-blue-500 hover:text-white"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="text-sm">
                          {isUserManagementOpen ? <FaChevronDown /> : <FaChevronRight />}
                        </span>
                      </button>
                      {isUserManagementOpen && (
                        <ul className="mt-2 ml-4 space-y-1 border-l-2 border-blue-300 pl-4">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.path}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                  pathname === subItem.path
                                    ? "bg-blue-500 text-white font-semibold"
                                    : "text-blue-50 hover:bg-blue-500 hover:text-white"
                                }`}
                              >
                                <span className="text-lg">{subItem.icon}</span>
                                <span className="font-medium text-sm">{subItem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        pathname === item.path
                          ? "bg-blue-500 text-white font-semibold"
                          : "text-blue-50 hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

