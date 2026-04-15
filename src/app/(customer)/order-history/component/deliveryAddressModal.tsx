import { AddressSkeleton } from "@/components/addressSkeleton";
import PageError from "@/components/pageError";
import { AddressCustomerDTO } from "@/types/addressCustomer";
import { Briefcase, Check, Home, MapPinned, X } from "lucide-react";
import { useState } from "react";



interface DeliveryAddressModalDTO {
  setShowDeliveryAddressModal: (value: boolean) => void;
  deliveryAddress: AddressCustomerDTO
  addresses: AddressCustomerDTO[];
  handleDelivery: (value: AddressCustomerDTO) => void;
  isFetching: boolean
  isError: boolean
}

export default function DeliveryAddressModal({
  setShowDeliveryAddressModal,
  deliveryAddress,
  addresses,
  handleDelivery,
  isFetching,
  isError
}: DeliveryAddressModalDTO) {

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

  if(isFetching) 
      return <AddressSkeleton/>
  
    if(isError)
      return <PageError/>

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5DDD3] p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-[#2C2826]">
            Select Delivery Address
          </h2>
          <button
            onClick={() => setShowDeliveryAddressModal(false)}
            className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#E5DDD3] flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4 text-[#6B6662]" />
          </button>
        </div>

        {/* Address List */}
        <div className="p-6 space-y-3">
          {addresses.map((address) => {
            const Icon = getAddressIcon(address.label);
            const isSelected = deliveryAddress?.id === address.id;

            return (
              <button
                key={address.id}
                onClick={() => {
                  handleDelivery(address);
                  setShowDeliveryAddressModal(false);
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-[#4A90E2] bg-[#EFF6FF]"
                    : "border-[#E5DDD3] hover:border-[#4A90E2]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? "bg-[#4A90E2]" : "bg-[#FAF6F1]"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isSelected ? "text-white" : "text-[#4A90E2]"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[#2C2826]">
                        {address.label.charAt(0).toUpperCase() + address.label.slice(1).toLowerCase()}
                      </h3>
                      {address.isPrimary && (
                        <span className="px-2 py-0.5 rounded-full bg-[#4A90E2] text-white text-xs font-semibold">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#6B6662]">{address.address}</p>
                    <p className="text-sm text-[#6B6662]">
                      {address.districtName}, {address.cityName},{" "}
                      {address.districtName} {address.postalCode}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#4A90E2] flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
