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
import { useUpdateAddress } from "@/features/address-customer/hooks/useUpdateAddress";
import { useGetIdAddress } from "@/features/address-customer/hooks/useGetIdAddress";
import { showConfirmDelete } from "@/utils/swal.utils";
import BackLink from "@/components/backLink";

export default function CustomerAddresses() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const { address, isLoading, isError, getAddress } = useGetAddress();

  const { isDeleting, deleteAddress } = useDeleteAddress();

  const handleDelete = (id: string) => {
    showConfirmDelete({
      title: "Delete Address",
      text: "Are you sure you want to delete this address? This action cannot be undone.",
      onConfirm: () => deleteAddress(id),
      onSuccess: () => getAddress(),
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    if (address === null || address?.length === 0) {
      // Biarin lolos ke bawah
    } else {
      return <PageError />;
    }
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
    <div className=" relative flex flex-col justify-center items-center mx-auto pt-28 pb-28 bg-[#f4e7d6]">
      <div className="w-full max-w-2xl px-4 mb-4">
        <BackLink link="/" page="Home" />
      </div>

      {/* Header */}
      <div className="w-full max-w-2xl px-4 flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#2C2826]">My Addresses</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="hover:scale-105 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4A90E2] text-white hover:bg-[#3A7BC8] transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add New</span>
        </button>
      </div>

      {!address || address.length === 0 ? (
        <div className="w-full max-w-2xl px-4 py-10 rounded-2xl text-center">
          <p className="text-gray-500">No addresses found. Please add a new address.</p>
        </div>
      ) : null}

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
                      <button
                        onClick={() => setShowUpdateForm(true)}
                        className="w-8 h-8 rounded-lg bg-[#FFF5F2] hover:bg-[#FFE5DD] flex items-center justify-center transition-all"
                      >
                        <Edit2 className="w-4 h-4 text-[#FF6B4A]" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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

                  {/* {!item.isPrimary && (
                    <button className="text-sm text-[#4A90E2] hover:text-[#3A7BC8] font-medium">
                      Set as default
                    </button>
                  )} */}
                </div>
              );
            })
          : null}
      </div>

      {/* Add Address Modal */}
      {showAddForm && (
        <FormNewAddress
          setShowAddForm={setShowAddForm}
          onSuccess={getAddress}
        />
      )}

      {showUpdateForm }
    </div>
  );
}
