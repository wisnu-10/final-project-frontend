"use client";
import withEmployeeAuth from "@/hoc/withEmployeeAuth";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../../../public/logo-Photoroom.png";
import useEmployeeStore from "@/stores/useEmployeeStore";
import {
  Truck,
  History,
  CalendarCheck,
  ClipboardList,
  MapPin,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import AttendancePage from "@/components/attendance/attendancePage";
import { useDriverTasks, useDriverHistory } from "@/features/order-driver/hooks/useDriverTasks";
import { useAttendanceStatus, useCheckIn, useCheckOut } from "@/features/attendance/hooks/useAttendance";
import EmployeeProfileLogout from "@/components/dashboard/EmployeeProfileLogout";

const tabList = [
  { key: "pickup", label: "Pickup Tasks", icon: Truck },
  { key: "history", label: "Delivery History", icon: History },
  { key: "attendance", label: "Attendance", icon: CalendarCheck },
] as const;

type TabKey = (typeof tabList)[number]["key"];

function DriverDashboard() {
  const { employee } = useEmployeeStore();
  const [activeTab, setActiveTab] = useState<TabKey>("attendance");

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Top Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B4A] to-[#FF8E72] rounded-xl flex items-center justify-center shadow-md">
              <Image src={Logo} alt="Logo" className="w-7 h-auto" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2C2826]">Delivery Station</h1>
              <p className="text-xs text-[#6B6662]">Driver Dashboard</p>
            </div>
          </div>
          <EmployeeProfileLogout color="from-[#10b981] to-[#34d399]" />
        </div>

        {/* Tab Navigation */}
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <div className="flex gap-2">
            {tabList.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 flex flex-col items-center gap-1"
                style={{
                  background: activeTab === tab.key ? "#4A90D9" : "#F8F8F8",
                  color: activeTab === tab.key ? "#fff" : "#6B6662",
                  boxShadow: activeTab === tab.key ? "0 4px 12px rgba(74,144,217,0.2)" : "none",
                }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Attendance Action */}
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <QuickAttendance />
      </div>

      {/* Tab Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {activeTab === "attendance" && <AttendancePage roleLabel="Driver" />}
        {activeTab === "pickup" && <PickupTasksView />}
        {activeTab === "history" && <DeliveryHistoryView />}
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
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E2DA] flex items-center justify-between">
      <div>
        <h3 className="text-sm font-bold text-[#2C2826]">Quick Status</h3>
        <p className="text-xs text-[#6B6662]">
          {!isCheckedIn ? "Anda belum check-in" : "Anda sedang bertugas"}
        </p>
      </div>
      {!isCheckedIn ? (
        <button
          onClick={() => handleCheckIn(refetch)}
          disabled={cILoading}
          className="px-6 py-2 rounded-xl bg-[#4A90D9] text-white text-sm font-bold shadow-md hover:bg-[#3A80C9] transition-colors flex items-center gap-2"
        >
          {cILoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Check In
        </button>
      ) : (
        <button
          onClick={() => handleCheckOut(refetch)}
          disabled={cOLoading}
          className="px-6 py-2 rounded-xl bg-[#FF6B4A] text-white text-sm font-bold shadow-md hover:bg-[#EF5B3A] transition-colors flex items-center gap-2"
        >
          {cOLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Check Out
        </button>
      )}
    </div>
  );
}

function PickupTasksView() {
  const { available, myTasks, isLoading, handleAcceptPickup, handleCompletePickup, handleAcceptDelivery, handleCompleteDelivery } = useDriverTasks();

  if (isLoading) return <LoadingState />;

  const allAvailable = [...available.pickups, ...available.deliveries];

  return (
    <div className="flex flex-col gap-6">
      {/* Active Tasks */}
      {myTasks.length > 0 && (
        <section>
          <h3 className="text-base font-bold text-[#2C2826] mb-3 px-1">Tugas Aktif</h3>
          <div className="flex flex-col gap-3">
            {myTasks.map((task) => {
              const isOnDelivery = task.statusLogs?.some(log => log.status === "delivering" && !log.finishedAt);
              return (
                <div key={task.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#4A90D9]">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${isOnDelivery ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                      {isOnDelivery ? "SEDANG MENGIRIM" : "SEDANG DIJEMPUT"}
                    </span>
                    <span className="text-xs text-[#6B6662] font-medium">#{task.id.slice(0, 8)}</span>
                  </div>
                  <h4 className="font-bold text-[#2C2826] mb-4">{task.customer?.firstName} {task.customer?.lastName}</h4>
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-[#6B6662] mt-0.5" />
                    <p className="text-xs text-[#6B6662]">{isOnDelivery ? task.deliveryAddress?.address : task.pickupAddress?.address}</p>
                  </div>
                  <button
                    onClick={() => isOnDelivery ? handleCompleteDelivery(task.id) : handleCompletePickup(task.id)}
                    className="w-full py-3 rounded-xl bg-[#10b981] text-white text-sm font-bold shadow-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Selesaikan {isOnDelivery ? "Pengiriman" : "Penjemputan"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Available for Pickup */}
      <section>
        <h3 className="text-base font-bold text-[#2C2826] mb-3 px-1">Tugas Tersedia</h3>
        {allAvailable.length === 0 ? (
          <EmptyTasks label="Belum ada tugas tersedia" />
        ) : (
          <div className="flex flex-col gap-3">
            {available.pickups.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E2DA]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green-50 text-green-700">PENJEMPUTAN</span>
                  <span className="text-xs text-[#6B6662] font-medium">#{task.id.slice(0, 8)}</span>
                </div>
                <h4 className="font-bold text-[#2C2826] mb-2">{task.customer?.firstName} {task.customer?.lastName}</h4>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#6B6662]" />
                  <p className="text-xs text-[#6B6662] truncate">{task.pickupAddress?.address}</p>
                </div>
                <button
                  onClick={() => handleAcceptPickup(task.id)}
                  className="w-full py-3 rounded-xl border border-[#4A90D9] text-[#4A90D9] text-sm font-bold hover:bg-[#4A90D9] hover:text-white transition-all"
                >
                  Ambil Tugas
                </button>
              </div>
            ))}
            {available.deliveries.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E2DA]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-50 text-amber-700">PENGIRIMAN</span>
                  <span className="text-xs text-[#6B6662] font-medium">#{task.id.slice(0, 8)}</span>
                </div>
                <h4 className="font-bold text-[#2C2826] mb-2">{task.customer?.firstName} {task.customer?.lastName}</h4>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#6B6662]" />
                  <p className="text-xs text-[#6B6662] truncate">{task.deliveryAddress?.address}</p>
                </div>
                <button
                  onClick={() => handleAcceptDelivery(task.id)}
                  className="w-full py-3 rounded-xl border border-[#F59E0B] text-[#F59E0B] text-sm font-bold hover:bg-[#F59E0B] hover:text-white transition-all"
                >
                  Ambil Tugas
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function DeliveryHistoryView() {
  const { history, isLoading } = useDriverHistory();

  if (isLoading) return <LoadingState />;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-bold text-[#2C2826] px-1">Riwayat Tugas</h3>
      {history.length === 0 ? (
        <EmptyTasks label="Belum ada riwayat tugas" />
      ) : (
        <div className="divide-y divide-[#F0EBE6] bg-white rounded-2xl shadow-sm border border-[#E8E2DA] overflow-hidden">
          {history.map((item) => (
            <div key={item.id} className="p-4 hover:bg-[#FAFAFA] transition-colors">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-sm text-[#2C2826]">{item.customer?.firstName} {item.customer?.lastName}</h4>
                <span className="text-[10px] text-[#6B6662]">{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-[#6B6662] mb-2">#{item.id.slice(0, 8)}</p>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-[#10b981]" />
                <span className="text-xs font-bold text-[#10b981]">Selesai</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="py-20 flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 text-[#4A90D9] animate-spin" />
      <p className="text-sm text-[#6B6662]">Memuat data...</p>
    </div>
  );
}

function EmptyTasks({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl p-12 shadow-sm border border-dashed border-[#E8E2DA] text-center">
      <ClipboardList className="w-10 h-10 text-[#CBD5E0] mx-auto mb-3" />
      <p className="text-sm text-[#6B6662]">{label}</p>
    </div>
  );
}

export default withEmployeeAuth(DriverDashboard, ["driver"]);
