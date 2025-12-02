"use client";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { 
      name: "Dashboard", 
      icon: <MdDashboard/>, 
      path: "/user/dashboard"
    }
  ];

  return (
    <>
      <aside className="fixed left-0 top-[75px] h-[calc(100vh-75px)] w-68 bg-blue-400 text-white z-50 hidden lg:block">
        <div className="flex flex-col h-full p-6">
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
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
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

