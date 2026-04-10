"use client";

import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import useGetEmployees from "@/features/super-admin/employees/hooks/useGetEmployees";
import useDeleteEmployee from "@/features/super-admin/employees/hooks/useDeleteEmployee";

export default function EmployeesPage() {
  const { employees, loading, fetchEmployees } = useGetEmployees();
  const { handleDelete } = useDeleteEmployee(() => {
    fetchEmployees();
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Manage Employees</h1>
        <Link 
          href="/super-admin/employees/create"
          className="bg-[#ff7143] hover:bg-[#e05e32] text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-sm"
        >
          <FiPlus /> Add Employee
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading employees...</div>
        ) : employees.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No employees found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="p-4 font-semibold text-gray-600">Employee Name</th>
                <th className="p-4 font-semibold text-gray-600">Contact</th>
                <th className="p-4 font-semibold text-gray-600">Identity / Bank</th>
                <th className="p-4 font-semibold text-gray-600">Role & Outlet</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="text-gray-800 font-medium">{`${emp.firstName} ${emp.lastName}`}</div>
                    <div className="text-xs text-gray-400 font-mono mt-1">{emp.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-800">{emp.email}</div>
                    <div className="text-sm text-gray-500 mt-1">{emp.phoneNumber || "-"}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-800"><span className="font-medium">KTP:</span> {emp.identityNumber || "-"}</div>
                    <div className="text-sm text-gray-800 mt-1"><span className="font-medium">Bank:</span> {emp.bankAccountNumber || "-"}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold capitalize mb-1">
                      {emp.role.replace("_", " ")}
                    </span>
                    <div className="text-xs text-gray-500 font-medium">{emp.outletName || (emp.role === 'super_admin' ? 'All Outlets' : '-')}</div>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Link
                      href={`/super-admin/employees/${emp.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FiEdit2 />
                    </Link>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
