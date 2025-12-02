"use client";
import AddUser from "../components/AddUser";

import ProtectedLayout from "../components/ProtectedLayout";

export default function NewUser() {
  return (
    <ProtectedLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">New User</h1>
        <div className="flex items-center justify-center">
        <AddUser/>
        </div>
      </div>
    </ProtectedLayout>
  );
}

