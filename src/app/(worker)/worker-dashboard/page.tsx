"use client";
import withEmployeeAuth from "@/hoc/withEmployeeAuth";
import Image from "next/image";
import Logo from "../../../../public/logo-Photoroom.png";
import useEmployeeStore from "@/stores/useEmployeeStore";
import {
  ClipboardList,
  History,
  CalendarCheck,
  WashingMachine,
  Wind,
  Package,
} from "lucide-react";
import AttendancePage from "@/components/attendance/attendancePage";
import { useAttendanceStatus, useCheckIn, useCheckOut } from "@/features/attendance/hooks/useAttendance";
import EmployeeProfileLogout from "@/components/dashboard/EmployeeProfileLogout";
import { useState, useMemo } from "react";
import { useWorkerTasks, useWorkerHistory } from "@/features/order-worker/hooks/useWorkerTasks";
import { AvailableTaskCard } from "@/components/order-worker/AvailableTaskCard";
import { ProcessingCard } from "@/components/order-worker/ProcessingCard";
import { VerificationWizard } from "@/components/order-worker/VerificationWizard";
import Swal from "sweetalert2";

const mainTabs = [
  { key: "available", label: "Available Tasks", icon: ClipboardList },
  { key: "history", label: "Work History", icon: History },
  { key: "attendance", label: "Attendance", icon: CalendarCheck },
] as const;

const stationTabs = [
  { key: "washing", label: "Washing", icon: WashingMachine },
  { key: "ironing", label: "Ironing", icon: Wind },
  { key: "packing", label: "Packing", icon: Package },
] as const;

function WorkerDashboard() {
  const { employee } = useEmployeeStore();
  const [activeTab, setActiveTab] = useState<typeof mainTabs[number]["key"]>("available");
  const [activeStation, setActiveStation] = useState<typeof stationTabs[number]["key"]>("washing");
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    available,
    myTasks,
    isLoading,
    handleAcceptTask,
    handleCompleteTask,
    handleBypassRequest,
  } = useWorkerTasks();

  const { history, isLoading: isHistoryLoading } = useWorkerHistory();

  // Filter available tasks by selected station
  const filteredAvailable = useMemo(() => {
    return available.filter((order) => {
      const status = order.statusLogs?.[0]?.status;
      // Map arrived_outlet to washing as it's the first step
      if (activeStation === "washing") return status === "arrived_outlet" || status === "washing";
      return status === activeStation;
    });
  }, [available, activeStation]);

  // Current active task for the worker that matches the active station
  const filteredMyTasks = useMemo(() => {
    return myTasks.filter((order) => {
      const status = order.statusLogs?.find(log => log.finishedAt === null)?.status;
      // Map arrived_outlet to washing as it's the first step
      if (activeStation === "washing") return status === "arrived_outlet" || status === "washing";
      return status === activeStation;
    });
  }, [myTasks, activeStation]);

  const currentTask = filteredMyTasks.length > 0 ? filteredMyTasks[0] : null;

  return (
    <div className="min-h-screen bg-[#FAF6F1] pb-20">
      {/* Header Section */}
      <div className="bg-white shadow-sm sticky top-0 z-20 pt-4 pb-2">
        <div className="max-w-3xl mx-auto px-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-[#FF6B4A]/20">
                <Image src={Logo} alt="Logo" className="w-8 h-auto" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#2C2826] capitalize">
                  {activeStation} Station
                </h1>
                <p className="text-xs text-[#6B6662] font-medium">Worker Dashboard</p>
              </div>
            </div>
            <EmployeeProfileLogout color="from-[#FF6B4A] to-[#FF8E72]" />
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="max-w-3xl mx-auto px-4 mb-4">
          <div className="flex bg-[#F3F0EC] p-1.5 rounded-[20px] gap-1">
            {mainTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[14px] text-xs font-bold transition-all ${activeTab === tab.key
                  ? "bg-white text-[#4A90D9] shadow-sm"
                  : "text-[#6B6662] hover:text-[#4A90D9]"
                  }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.key ? "text-[#4A90D9]" : ""}`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Station Tabs */}
        <div className="max-w-3xl mx-auto px-4 mb-8">
          <div className="flex bg-[#F3F0EC] p-1.5 rounded-[20px] gap-1">
            {stationTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveStation(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[14px] text-xs font-bold transition-all ${activeStation === tab.key
                  ? "bg-white text-[#FF6B4A] shadow-sm"
                  : "text-[#6B6662] hover:text-[#FF6B4A]"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Available Tasks Tab */}
        {activeTab === "available" && (
          <div>
            <h2 className="text-xl font-bold text-[#2C2826] mb-6">Available Tasks</h2>

            {/* If has active task, show processing view */}
            {currentTask ? (
              isVerifying ? (
                <VerificationWizard
                  order={currentTask}
                  onSubmit={(counts) => {
                    handleCompleteTask(currentTask.id);
                    setIsVerifying(false);
                  }}
                  onBypass={(counts, list) => {
                    handleBypassRequest(currentTask.id, {
                      notes: list.join(", "),
                      expectedQuantity: currentTask.orderItems?.reduce((sum, i) => sum + i.quantity, 0) || 0,
                      actualQuantity: Object.values(counts).reduce((sum, v) => sum + v, 0),
                      station: activeStation,
                    }).then((success) => {
                      if (success) {
                        Swal.fire({
                          title: "Berhasil!",
                          text: "Bypass request sent to admin for approval",
                          icon: "success",
                          width: '380px',
                          confirmButtonColor: "#4A90D9",
                          customClass: {
                            popup: "rounded-[28px]",
                            confirmButton: "rounded-xl px-10 py-3 text-sm font-bold",
                            title: "text-lg font-bold text-[#2C2826]",
                          },
                        });
                        setIsVerifying(false);
                      }
                    });
                  }}
                  onCancel={() => setIsVerifying(false)}
                />
              ) : (
                <ProcessingCard
                  order={currentTask}
                  onComplete={() => setIsVerifying(true)}
                />
              )
            ) : (
              /* If no active task, show available list */
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 opacity-50">
                    <div className="w-10 h-10 border-4 border-[#FF6B4A]/30 border-t-[#FF6B4A] rounded-full animate-spin mb-4" />
                    <p className="text-sm font-medium text-[#6B6662]">Loading tasks...</p>
                  </div>
                ) : filteredAvailable.length > 0 ? (
                  filteredAvailable.map((order) => (
                    <AvailableTaskCard
                      key={order.id}
                      order={order}
                      onAccept={handleAcceptTask}
                      isAccepting={isLoading}
                    />
                  ))
                ) : (
                  <div className="bg-white rounded-[32px] p-12 text-center border border-dashed border-[#E8E2DA]">
                    <p className="text-[#6B6662] font-medium">No tasks available in {activeStation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div>
            <h2 className="text-xl font-bold text-[#2C2826] mb-6">Work History</h2>
            <div className="space-y-4">
              {isHistoryLoading ? (
                <p>Loading history...</p>
              ) : history.length > 0 ? (
                history.map((order) => (
                  <div key={order.id} className="bg-white rounded-[24px] p-6 border border-[#E8E2DA] shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold text-[#2C2826]">#{order.invoiceNumber || order.id.slice(0, 4)}</p>
                      <span className="bg-[#EEF9F2] text-[#4CAF50] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        Completed
                      </span>
                    </div>
                    <p className="text-sm text-[#6B6662]">
                      {order.customer?.firstName} {order.customer?.lastName}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-[#6B6662] py-20">No history yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div className="space-y-6">
            <QuickAttendance />
            <AttendancePage roleLabel="Worker" />
          </div>
        )}
      </div>
    </div>
  );
}

function QuickAttendance() {
  const { status, refetch } = useAttendanceStatus();
  const { handleCheckIn, isLoading: cILoading } = useCheckIn();
  const { handleCheckOut, isLoading: cOLoading } = useCheckOut();

  const isCheckedIn = status?.isCheckedIn;
  const isCheckedOut = status?.isCheckedOut;

  if (isCheckedOut) return null;

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#E8E2DA] flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-[#2C2826]">Quick Attendance</h3>
        <p className="text-sm text-[#6B6662]">
          {!isCheckedIn ? "You haven't checked in yet" : "You are currently on duty"}
        </p>
      </div>
      {!isCheckedIn ? (
        <button
          onClick={() => handleCheckIn(refetch)}
          disabled={cILoading}
          className="px-8 py-3 rounded-2xl bg-[#4A90D9] text-white text-sm font-bold shadow-lg shadow-[#4A90D9]/20 transition-all active:scale-95"
        >
          Check In
        </button>
      ) : (
        <button
          onClick={() => handleCheckOut(refetch)}
          disabled={cOLoading}
          className="px-8 py-3 rounded-2xl bg-[#FF6B4A] text-white text-sm font-bold shadow-lg shadow-[#FF6B4A]/20 transition-all active:scale-95"
        >
          Check Out
        </button>
      )}
    </div>
  );
}

export default withEmployeeAuth(WorkerDashboard, ["worker"], "/auth-employee");
