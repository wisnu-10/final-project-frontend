"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Home, Briefcase, MapPinned } from "lucide-react";
import FormNewAddress from "./component/formNewAddress";
import { useGetAddress } from "@/features/address-customer/hooks/useGetAddress";
import Loading from "@/components/loading";
import PageError from "@/components/pageError";
import { AddressCustomerDTO } from "@/types/addressCustomer";
import Link from "next/link";
import { useDeleteAddress } from "@/features/address-customer/hooks/useDeleteAddress";
import { FiLoader } from "react-icons/fi";

export default function CustomerAddresses() {
  // Gw sisain state buat modal aja biar UI-nya masih bisa interaktif dikit
  const [showAddForm, setShowAddForm] = useState(false);

  const { address, isLoading, isError } = useGetAddress();

  const { isDeleting, deleteAddress } = useDeleteAddress();

  if (isLoading) {
    <Loading />;
    return;
  }

  if (isError) {
    <PageError />;
    return;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "home":
        return Home;
      case "work":
        return Briefcase;
      default:
        return MapPinned;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto pt-28 pb-28 bg-[#f4e7d6]">
      {/* Header */}
      <div className="w-full max-w-2xl px-4 flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#2C2826]">My Addresses</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4A90E2] text-white hover:bg-[#3A7BC8] transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add New</span>
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-4 w-full px-4 max-w-2xl">
        {Array.isArray(address)
          ? address.map((item: any) => {
              const Icon = getIcon(item.label);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm p-6 border-2 border-transparent hover:border-[#4A90E2] transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[#4A90E2]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-[#2C2826]">
                            {item.label.charAt(0).toUpperCase() +
                              item.label.slice(1).toLowerCase()}
                          </h3>
                          {item.isPrimary && (
                            <span className="px-2 py-0.5 rounded-full bg-[#FF6B4A] text-white text-xs font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="space-y-1 mt-1">
                          <p className="text-sm font-semibold text-[#2C2826]">
                            {item.recipientName}{" "}
                            <span className="mx-1 text-[#E5DDD3]">|</span>{" "}
                            {item.recipientPhoneNumber}
                          </p>

                          <p className="text-sm text-[#6B6662] leading-relaxed">
                            {item.address}
                          </p>

                          <p className="text-xs text-[#8E8A86] uppercase tracking-wide">
                            {item.districtName}, {item.cityName},{" "}
                            {item.provinceName}, {item.postalCode}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/address/${item.id}`}
                        className="w-8 h-8 rounded-lg bg-[#FFF5F2] hover:bg-[#FFE5DD] flex items-center justify-center transition-all"
                      >
                        <Edit2 className="w-4 h-4 text-[#FF6B4A]" />
                      </Link>
                      <button
                        onClick={() => deleteAddress(item.id)}
                        className="w-8 h-8 rounded-lg bg-[#FEF2F2] hover:bg-[#FEE2E2] flex items-center justify-center transition-all"
                      >
                        {isDeleting ? (
                          <FiLoader className="w-4 h-4 animate-spin text-red-500" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-red-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {!item.isPrimary && (
                    <button className="text-sm text-[#4A90E2] hover:text-[#3A7BC8] font-medium">
                      Set as default
                    </button>
                  )}
                </div>
              );
            })
          : null}
      </div>

      {/* Add Address Modal */}
      {showAddForm && <FormNewAddress setShowAddForm={setShowAddForm} />}
    </div>
  );
}
