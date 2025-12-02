"use client";

export default function UserTable({ users, page, onApprove, onReject }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                ID
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                User Name
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                Email
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                Role
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                status
              </th>
              {page === "Rejected" && (
                <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                  Rejection Reason
                </th>
              )}
              {(onApprove || onReject) && (
                <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-medium whitespace-nowrap">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    {user._id}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    {user.role}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-xs md:text-sm whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : user.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.status || "pending"}
                    </span>
                  </td>
                  {page === "Rejected" && (
                    <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                      {user.rejection_reason || "N/A"}
                    </td>
                  )}
                  {(onApprove || onReject) && (
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2 md:gap-3">
                        {onApprove && (
                          <button
                            onClick={() => onApprove(user._id)}
                            className="px-3 py-2 text-sm bg-green-100 text-green-700 rounded cursor-pointer hover:bg-green-200 transition-colors font-medium"
                            aria-label="Approve"
                          >
                            Approve
                          </button>
                        )}
                        {onReject && (
                          <button
                            onClick={() => onReject(user._id)}
                            className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded cursor-pointer hover:bg-red-200 transition-colors font-medium"
                            aria-label="Reject"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
