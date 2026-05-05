import {
  Briefcase,
  Check,
  ChevronRight,
  Home,
  MapPin,
  MapPinned,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import PickUpAddressModal from "./pickUpAddressModal";
import DeliveryAddressModal from "./deliveryAddressModal";
import { useCreateOrder } from "@/features/order-customer/hooks/useCreateOrder";
import SubmitButton from "@/components/button";
import { useGetAddress } from "@/features/address-customer/hooks/useGetAddress";
import { AddressCustomerDTO } from "@/types/addressCustomer";
import ErrorMessage from "@/components/errorMessage";
import { useScheduleOrder } from "@/features/order-customer/hooks/useScheduleOrder";
import NoOutletModal from "./noOutletModal";

interface FormRequestPickupDTO {
  setShowRequestForm: (value: boolean) => void;
  getOrder: () => void;
}

export default function RequestPickupForm({
  setShowRequestForm,
  getOrder,
}: FormRequestPickupDTO) {
  const {
    address: addresses,
    isLoading: isFetching,
    isError,
    
  } = useGetAddress();

  const {errorType, formik, isLoading } = useCreateOrder({
    setShowRequestForm,
    getOrder,
  });

  const {errorType: scheduledErrorType, formik: scheduleFormik, isLoading: isScheduledLoading } =
    useScheduleOrder({
      setShowRequestForm,
      getOrder,
    });

  const defaultAddress =
    addresses.find((addr) => addr.isPrimary) || addresses[0];

  const [pickupAddress, setPickupAddress] =
    useState<AddressCustomerDTO>(defaultAddress);

  const handlePickup = async (addr: AddressCustomerDTO) => {
    setPickupAddress(addr);
    await formik.setFieldValue("pickupAddressId", addr.id);
    await scheduleFormik.setFieldValue("pickupAddressId", addr.id);
  };

  const [deliveryAddress, setDeliveryAddress] =
    useState<AddressCustomerDTO>(defaultAddress);

  const handleDelivery = async (addr: AddressCustomerDTO) => {
    setDeliveryAddress(addr);
    await formik.setFieldValue("deliveryAddressId", addr.id);
    await scheduleFormik.setFieldValue("deliveryAddressId", addr.id);
  };

  const [showPickupAddressModal, setShowPickupAddressModal] = useState(false);
  const [showDeliveryAddressModal, setShowDeliveryAddressModal] =
    useState(false);

  const [scheduleTomorrow, setScheduleTomorrow] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const getAddressDisplay = (address: AddressCustomerDTO) => {
    if (!address) return "Select an address";
    return `${address.address}, ${address.districtName}, ${address.cityName}, ${address.provinceName} ${address.postalCode}`;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const [noOutlet, setNoOutlet] = useState(false)

  useEffect(() => {
    if (errorType) {
      setNoOutlet(true);
    }
  }, [errorType]);

  useEffect(() => {
    if (scheduledErrorType) {
      setNoOutlet(true);
    }
  }, [scheduledErrorType]); 

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-t-3xl md:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}

        <div className="sticky top-0 bg-white border-b border-[#E5DDD3] p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-[#2C2826]">Request Pickup</h2>

          <button
            type="button"
            onClick={() => setShowRequestForm(false)}
            className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#E5DDD3] flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4 text-[#6B6662]" />
          </button>
        </div>

        {/* Modal Content */}
        <form
          onSubmit={
            scheduleTomorrow ? scheduleFormik.handleSubmit : formik.handleSubmit
          }
          className="p-6 space-y-6"
        >
          {/* Pickup Address */}
          <div>
            <label className="text-sm font-medium text-[#6B6662] mb-2 block">
              Pickup Address
            </label>
            <button
              type="button"
              name="pickupAddressId"
              onClick={() => setShowPickupAddressModal(true)}
              className="w-full p-4 rounded-xl border-2 border-[#E5DDD3] flex items-center gap-3 hover:border-[#FF6B4A] transition-all"
            >
              <MapPin className="w-5 h-5 text-[#FF6B4A]" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-[#2C2826]">
                  {pickupAddress
                    ? pickupAddress.label.charAt(0).toUpperCase() +
                      pickupAddress.label.slice(1).toLowerCase()
                    : "Select address"}
                </p>
                <p className="text-xs text-[#6B6662]">
                  {pickupAddress
                    ? getAddressDisplay(pickupAddress)
                    : "Tap to select address"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6B6662]" />
            </button>
            {formik.touched.pickupAddressId && formik.errors.pickupAddressId ? (
              <ErrorMessage error={formik.errors.pickupAddressId} />
            ) : null}
          </div>

          {/* Delivery Address */}
          <div>
            <label className="text-sm font-medium text-[#6B6662] mb-2 block">
              Delivery Address
            </label>
            <button
              type="button"
              name="deliveryAddressId"
              onClick={() => setShowDeliveryAddressModal(true)}
              className="w-full p-4 rounded-xl border-2 border-[#E5DDD3] flex items-center gap-3 hover:border-[#FF6B4A] transition-all"
            >
              <MapPin className="w-5 h-5 text-[#4A90E2]" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-[#2C2826]">
                  {deliveryAddress
                    ? deliveryAddress.label.charAt(0).toUpperCase() +
                      deliveryAddress.label.slice(1).toLowerCase()
                    : "Select address"}
                </p>
                <p className="text-xs text-[#6B6662]">
                  {deliveryAddress
                    ? getAddressDisplay(deliveryAddress)
                    : "Tap to select address"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6B6662]" />
            </button>
            {formik.touched.deliveryAddressId &&
            formik.errors.deliveryAddressId ? (
              <ErrorMessage error={formik.errors.deliveryAddressId} />
            ) : null}

            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="sameAddress"
                checked={pickupAddress?.id === deliveryAddress?.id}
                onChange={(e) => {
                  if (e.target.checked && pickupAddress) {
                    setDeliveryAddress(pickupAddress);
                    scheduleFormik.setFieldValue(
                      "deliveryAddressId",
                      pickupAddress.id,
                    );
                  }
                }}
                className="w-4 h-4 accent-[#FF6B4A]"
              />
              <label htmlFor="sameAddress" className="text-xs text-[#6B6662]">
                Same as pickup address
              </label>
            </div>
          </div>

          {/* Schedule Tomorrow Switcher */}
          <div className="bg-[#FFF5F2] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2C2826] mb-1">
                  Schedule for Tomorrow
                </p>
                <p className="text-xs text-[#6B6662]">
                  Pickup will be scheduled for {getTomorrowDate()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setScheduleTomorrow(!scheduleTomorrow);
                  setSelectedTime("");
                  formik.setFieldValue("scheduleTime", "");
                  scheduleFormik.setFieldValue("scheduleTime", "");

                  // sinkron alamat pas toggle nyala
                  if (!scheduleTomorrow) {
                    scheduleFormik.setFieldValue(
                      "pickupAddressId",
                      pickupAddress?.id,
                    );
                    scheduleFormik.setFieldValue(
                      "deliveryAddressId",
                      deliveryAddress?.id,
                    );
                  }
                }}
                className={`relative w-14 h-8 rounded-full transition-all ${
                  scheduleTomorrow ? "bg-[#FF6B4A]" : "bg-[#E5DDD3]"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                    scheduleTomorrow ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <label className="text-sm font-medium text-[#6B6662] mb-2 block">
              Pickup Time
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"].map((time) => (
                <button
                  name="scheduleTime"
                  type="button"
                  key={time}
                  onClick={ async () => {
                    const date = new Date();
                    if (scheduleTomorrow) {
                      date.setDate(date.getDate() + 1);
                    }

                    if (time === "09:00 AM") date.setHours(9, 0, 0, 0);
                    else if (time === "12:00 PM") date.setHours(12, 0, 0, 0);
                    else if (time === "03:00 PM") date.setHours(15, 0, 0, 0);
                    else if (time === "06:00 PM") date.setHours(18, 0, 0, 0);

                    setSelectedTime(time);

                    if (scheduleTomorrow) {
                      await scheduleFormik.setFieldValue("scheduleTime", date);
                      scheduleFormik.setFieldTouched("scheduleTime", true);
                    } else {
                      await formik.setFieldValue("scheduleTime", date);
                      formik.setFieldTouched("scheduleTime", true);
                    }
                  }}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    selectedTime === time
                      ? "border-[#FF6B4A] bg-[#FFF5F2] text-[#FF6B4A]"
                      : "border-[#E5DDD3] text-[#6B6662] hover:border-[#FF6B4A]"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            {formik.touched.scheduleTime && formik.errors.scheduleTime ? (
              <ErrorMessage error={formik.errors.scheduleTime as string} />
            ) : null}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowRequestForm(false)}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-[#E5DDD3] text-[#6B6662] hover:border-[#FF6B4A] transition-all"
            >
              Cancel
            </button>
            <SubmitButton
              isLoading={scheduleTomorrow ? isScheduledLoading : isLoading}
              isValid={
                scheduleTomorrow ? scheduleFormik.isValid : formik.isValid
              }
              cta={scheduleTomorrow ? "Schedule Pickup" : "Create Pickup"}
              ctaLoading={
                scheduleTomorrow
                  ? "Scheduling your Pickup"
                  : "Creating your Pickup"
              }
            />
          </div>
        </form>
      </div>

      {/* Pickup Address Selection Modal */}
      {showPickupAddressModal && (
        <PickUpAddressModal
          setShowPickupAddressModal={setShowPickupAddressModal}
          pickupAddress={pickupAddress}
          addresses={addresses}
          handlePickup={handlePickup}
          isFetching={isFetching}
          isError={isError}
        />
      )}

      {/* Delivery Address Selection Modal */}
      {showDeliveryAddressModal && (
        <DeliveryAddressModal
          setShowDeliveryAddressModal={setShowDeliveryAddressModal}
          deliveryAddress={deliveryAddress}
          addresses={addresses}
          handleDelivery={handleDelivery}
          isFetching={isFetching}
          isError={isError}
        />
      )}

      {/* No Outlet Modal */}
      {noOutlet && (
        <NoOutletModal
        onClose={setNoOutlet}
        type={scheduleTomorrow ? scheduledErrorType : errorType}
        />
      )}
    </div>
  );
}
