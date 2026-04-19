import SubmitButton from "@/components/button";
import ErrorMessage from "@/components/errorMessage";
import { useCreateAdress } from "@/features/address-customer/hooks/useCreateAddress";
import { Briefcase, Home, MapPinned } from "lucide-react";

interface FormAddressProps {
  setShowAddForm: (value: boolean) => void;
  onSuccess: () => void;
}

export default function FormNewAddress({ setShowAddForm, onSuccess }: FormAddressProps) {
  const {
    formik,
    isLoading,
    provinces,
    cities,
    districts,
    fetchCities,
    fetchDistricts,
  } = useCreateAdress({ setShowAddForm, onSuccess});
  
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-t-3xl md:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#E5DDD3] p-6 rounded-t-3xl">
          <h2 className="text-2xl font-bold text-[#2C2826]">Add New Address</h2>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
          {/* Address Type */}
          <div>
            <label className="block text-sm font-medium text-[#6B6662] mb-2">
              Address Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "home", label: "Home", icon: Home },
                { value: "work", label: "Work", icon: Briefcase },
                { value: "other", label: "Other", icon: MapPinned },
              ].map((type) => {
                const TypeIcon = type.icon;
                const isActive = formik.values.label === type.value;

                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("label", type.value);
                      formik.setFieldTouched("label", true);
                    }}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      isActive
                        ? "border-[#4A90E2] bg-[#F0F7FF]" // Style pas aktif (biru)
                        : "border-[#E5DDD3] hover:border-[#4A90E2] bg-white" // Style pas mati
                    }`}
                  >
                    <TypeIcon
                      className={`w-5 h-5 mx-auto mb-1 ${
                        isActive ? "text-[#4A90E2]" : "text-[#6B6662]"
                      }`}
                    />
                    <p
                      className={`text-xs font-medium ${
                        isActive ? "text-[#4A90E2]" : "text-black"
                      }`}
                    >
                      {type.label}
                    </p>
                  </button>
                );
              })}
            </div>
            {formik.touched.label && formik.errors.label ? (
              <ErrorMessage error={formik.errors.label} />
            ) : null} 
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#6B6662] mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                name="recipientName"
                value={formik.values.recipientName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="e.g., Joko"
                className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none transition-colors"
              />
              {formik.touched.recipientName && formik.errors.recipientName ? (
                <ErrorMessage error={formik.errors.recipientName} />
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6B6662] mb-2">
                Recipient Phone Number
              </label>
              <input
                type="text"
                name="recipientPhoneNumber"
                placeholder="e.g., 0812345678"
                value={formik.values.recipientPhoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none transition-colors"
              />
              {formik.touched.recipientPhoneNumber &&
              formik.errors.recipientPhoneNumber ? (
                <ErrorMessage error={formik.errors.recipientPhoneNumber} />
              ) : null}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6B6662] mb-2">
              Street Address
            </label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="123 Main Street"
              className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none transition-colors"
            />
            {formik.touched.address && formik.errors.address ? (
              <ErrorMessage error={formik.errors.address} />
            ) : null}
          </div>

          {/* Dropdowns for Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <select
                name="provinceId"
                value={formik.values.provinceId}
                onChange={(e) => {
                  const idSelected = Number(e.target.value);
                  const provinceData = provinces.find(
                    (p: any) => Number(p.id) === idSelected,
                  );

                  fetchCities(String(idSelected));

                  if (provinceData) {
                    formik.setFieldValue("provinceName", provinceData.name);
                  }

                  if (idSelected) {
                    formik.setFieldValue("provinceId", idSelected);
                  }
                }}
                className="text-gray-500 w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none bg-white transition-colors"
              >
                <option value="">Select Province</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id} className="capitalize">
                    {p.name.charAt(0).toUpperCase() +
                      p.name.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {formik.touched.provinceName && formik.errors.provinceName ? (
                <ErrorMessage error={formik.errors.provinceName} />
              ) : null}
            </div>

            <div>
              <select
                name="cityId"
                value={formik.values.cityId}
                onChange={(e) => {
                  const idSelected = Number(e.target.value);
                  const citiesData = cities.find(
                    (c: any) => Number(c.id) === idSelected,
                  );

                  fetchDistricts(String(idSelected));

                  if (idSelected) {
                    formik.setFieldValue("cityId", idSelected);
                  }
                  if (citiesData) {
                    formik.setFieldValue("cityName", citiesData.name);
                  }
                }}
                className="text-gray-500 w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none bg-white transition-colors"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id} className="capitalize">
                    {c.name.charAt(0).toUpperCase() +
                      c.name.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {formik.touched.cityName && formik.errors.cityName ? (
                <ErrorMessage error={formik.errors.cityName} />
              ) : null}
            </div>

            <div>
              <select
                name="districtId"
                value={formik.values.districtId}
                onChange={(e) => {
                  const idSelected = Number(e.target.value);
                  const districtData = districts.find(
                    (d: any) => Number(d.id) === idSelected,
                  );

                  if (idSelected) {
                    formik.setFieldValue("districtId", idSelected);
                  }

                  if (districtData) {
                    formik.setFieldValue("districtName", districtData.name);
                  }
                }}
                className="text-gray-500 w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none bg-white transition-colors"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id} className="capitalize">
                    {d.name.charAt(0).toUpperCase() +
                      d.name.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {formik.touched.districtName && formik.errors.districtName ? (
                <ErrorMessage error={formik.errors.districtName} />
              ) : null}
            </div>

            <div>
              <input
                type="text"
                name="postalCode"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Postal Code"
                className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none transition-colors"
              />
              {formik.touched.postalCode && formik.errors.postalCode ? (
                <ErrorMessage error={formik.errors.postalCode} />
              ) : null}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6B6662] mb-2">
              Notes (Optional)
            </label>
            <input
              type="text"
              name="notes"
              value={formik.values.notes || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g., House with the blue gate"
              className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none transition-colors"
            />
          </div>
          {formik.touched.notes && formik.errors.notes ? (
            <ErrorMessage error={formik.errors.notes} />
          ) : null}

          {/* Set Default Address (Is Primary) */}
          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              id="isPrimary"
              name="isPrimary"
              checked={formik.values.isPrimary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-5 h-5 rounded border-[#E5DDD3] text-[#4A90E2] focus:ring-[#4A90E2]"
            />
            <label
              htmlFor="isPrimary"
              className="text-sm font-medium text-[#2C2826] cursor-pointer"
            >
              Set as primary address
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-[#E5DDD3] text-[#6B6662] hover:border-[#4A90E2] transition-all"
            >
              Cancel
            </button>
            <SubmitButton
              isLoading={isLoading}
              isValid={formik.isValid}
              cta="Add Address"
              ctaLoading="Adding Address..."
            />
          </div>
        </form>
      </div>
    </div>
  );
  
}
