import { AddressSkeleton } from "@/components/addressSkeleton";
import PageError from "@/components/pageError";
import { AddressCustomerDTO } from "@/types/addressCustomer";
import { Briefcase, Check, Home, MapPinned, X } from "lucide-react";
import { useState } from "react";

interface PickUpAddressMidalDTO {
  setShowPickupAddressModal: (value: boolean) => void;
  pickupAddress: AddressCustomerDTO;
  addresses: AddressCustomerDTO[];
  handlePickup: (value: AddressCustomerDTO) => void;
  isFetching: boolean;
  isError: boolean;
}

export default function PickUpAddressModal({
  setShowPickupAddressModal,
  pickupAddress,
  addresses,
  handlePickup,
  isFetching,
  isError,
}: PickUpAddressMidalDTO) {
  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return Home;
      case "work":
        return Briefcase;
      default:
        return MapPinned;
    }
  };

  if (isFetching) return <AddressSkeleton />;

  if (isError) return <PageError />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5DDD3] p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-[#2C2826]">
            Select Pickup Address
          </h2>
          <button
            onClick={() => setShowPickupAddressModal(false)}
            className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#E5DDD3] flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4 text-[#6B6662]" />
          </button>
        </div>

        {/* Address List */}
        <div className="p-6 space-y-3">
          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-16 h-16 bg-[#FAF6F1] rounded-full flex items-center justify-center mb-4">
                <MapPinned className="w-8 h-8 text-[#6B6662] opacity-50" />
              </div>
              <p className="text-[#2C2826] font-bold mb-1">
                You haven't set an address yet
              </p>
              <p className="text-[#6B6662] text-sm mb-6">
                Please create an address first to continue.
              </p>

              <button
                onClick={() => (window.location.href = "/address")}
                className="text-[#FF6B4A] font-bold hover:underline"
              >
                Create Address Now
              </button>
            </div>
          ) : (
            addresses.map((address) => {
              const Icon = getAddressIcon(address.label);
              const isSelected = pickupAddress?.id === address.id;

              return (
                <button
                  key={address.id}
                  type="button"
                  onClick={() => {
                    handlePickup(address);
                    setShowPickupAddressModal(false);
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? "border-[#FF6B4A] bg-[#FFF5F2]"
                      : "border-[#E5DDD3] hover:border-[#FF6B4A]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-[#FF6B4A]" : "bg-[#FAF6F1]"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${isSelected ? "text-white" : "text-[#FF6B4A]"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-[#2C2826]">
                          {address.label.charAt(0).toUpperCase() +
                            address.label.slice(1).toLowerCase()}
                        </h3>
                        {address.isPrimary && (
                          <span className="px-2 py-0.5 rounded-full bg-[#4A90E2] text-white text-xs font-semibold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#6B6662]">
                        {address.address}
                      </p>
                      <p className="text-sm text-[#6B6662]">
                        {address.districtName}, {address.cityName},{" "}
                        {address.provinceName} {address.postalCode}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#FF6B4A] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
