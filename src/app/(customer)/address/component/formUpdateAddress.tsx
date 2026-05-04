"use client";

import SubmitButton from "@/components/button";
import ErrorMessage from "@/components/errorMessage";
import { useUpdateAddress } from "@/features/address-customer/hooks/useUpdateAddress";
import { AddressCustomerDTO } from "@/types/addressCustomer";
import { Briefcase, Home, MapPinned } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
      <p className="text-gray-400">Loading Map...</p>
    </div>
  ),
});

interface FormAddressProps {
  initialData: AddressCustomerDTO;
}

export default function FormUpdateAddress({ initialData }: FormAddressProps) {
  const {
    formik,
    isLoading,
    provinces,
    cities,
    districts,
    fetchCities,
    fetchDistricts,
  } = useUpdateAddress(initialData);

  const handleSearchLocation = async (query: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query + ", Indonesia"
        )}&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        formik.setFieldValue("latitude", parseFloat(lat));
        formik.setFieldValue("longitude", parseFloat(lon));
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const handleLocationChange = async (data: any) => {
    formik.setFieldValue("latitude", data.lat);
    formik.setFieldValue("longitude", data.lng);

    if (data.address) {
      formik.setFieldValue("address", data.address);
    }
    
    // Deep Sync Logic: Match names from map to local IDs
    if (data.provinceName) {
      const matchedProvince = provinces.find(p => 
        normalizeString(data.provinceName).includes(normalizeString(p.name)) || 
        normalizeString(p.name).includes(normalizeString(data.provinceName))
      );

      if (matchedProvince) {
        // Reset children if province changes
        if (Number(matchedProvince.id) !== formik.values.provinceId) {
          formik.setFieldValue("cityId", 0);
          formik.setFieldValue("cityName", "");
          formik.setFieldValue("districtId", 0);
          formik.setFieldValue("districtName", "");
        }

        formik.setFieldValue("provinceId", Number(matchedProvince.id));
        formik.setFieldValue("provinceName", matchedProvince.name);
        
        // Fetch and match City
        const citiesList = await fetchCities(String(matchedProvince.id));
        if (data.cityName && citiesList) {
          const matchedCity = citiesList.find((c: any) => 
            normalizeString(data.cityName).includes(normalizeString(c.name)) || 
            normalizeString(c.name).includes(normalizeString(data.cityName))
          );

          if (matchedCity) {
            // Reset district if city changes
            if (Number(matchedCity.id) !== formik.values.cityId) {
              formik.setFieldValue("districtId", 0);
              formik.setFieldValue("districtName", "");
            }

            formik.setFieldValue("cityId", Number(matchedCity.id));
            formik.setFieldValue("cityName", matchedCity.name);

            // Fetch and match District
            const districtsList = await fetchDistricts(String(matchedCity.id));
            if (data.districtName && districtsList) {
              const matchedDistrict = districtsList.find((d: any) => 
                normalizeString(data.districtName).includes(normalizeString(d.name)) || 
                normalizeString(d.name).includes(normalizeString(data.districtName))
              );

              if (matchedDistrict) {
                formik.setFieldValue("districtId", Number(matchedDistrict.id));
                formik.setFieldValue("districtName", matchedDistrict.name);
              }
            }
          }
        }
      }
    }
  };

  const normalizeString = (str: string | undefined): string => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/(kabupaten|kota|kecamatan|kelurahan|desa|provinsi|province|regency|city|district|suburb|village|township)/gi, "")
      .trim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-[#E5DDD3] p-6 rounded-t-3xl z-10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#2C2826]">Update Address</h2>
          <Link 
            href="/address"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </Link>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address Type */}
            <div className="md:col-span-2">
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
                      onClick={() => formik.setFieldValue("label", type.value)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        isActive
                          ? "border-[#4A90E2] bg-[#F0F7FF]"
                          : "border-[#E5DDD3] hover:border-[#4A90E2] bg-white"
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

            {/* Recipient Info */}
            <div>
              <label className="block text-sm font-medium text-[#6B6662] mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                name="recipientName"
                value={formik.values.recipientName || ""}
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
                value={formik.values.recipientPhoneNumber || ""}
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
            <textarea
              name="address"
              value={formik.values.address || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              placeholder="123 Main Street"
              className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none transition-colors resize-none"
            />
            {formik.touched.address && formik.errors.address ? (
              <ErrorMessage error={formik.errors.address} />
            ) : null}
          </div>

          {/* Dropdowns for Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#6B6662] mb-2">Province</label>
              <select
                name="provinceId"
                value={formik.values.provinceId || ""}
                onChange={(e) => {
                  const idSelected = Number(e.target.value);
                  const provinceData = provinces.find(
                    (p: any) => Number(p.id) === idSelected,
                  );

                  fetchCities(String(idSelected));

                  if (provinceData) {
                    formik.setFieldValue("provinceName", provinceData.name);
                    formik.setFieldValue("provinceId", idSelected);
                    formik.setFieldValue("cityId", 0);
                    formik.setFieldValue("cityName", "");
                    formik.setFieldValue("districtId", 0);
                    formik.setFieldValue("districtName", "");

                    // Forward Geocoding
                    handleSearchLocation(provinceData.name);
                  }
                }}
                className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none bg-white transition-colors"
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
              <label className="block text-sm font-medium text-[#6B6662] mb-2">City</label>
              <select
                name="cityId"
                value={formik.values.cityId || ""}
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
                    formik.setFieldValue("districtId", 0);
                    formik.setFieldValue("districtName", "");

                    // Forward Geocoding
                    handleSearchLocation(`${citiesData.name}, ${formik.values.provinceName}`);
                  }
                }}
                disabled={!formik.values.provinceId}
                className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none bg-white transition-colors disabled:bg-gray-50 disabled:text-gray-400"
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
              <label className="block text-sm font-medium text-[#6B6662] mb-2">District</label>
              <select
                name="districtId"
                value={formik.values.districtId || ""}
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

                    // Forward Geocoding
                    handleSearchLocation(`${districtData.name}, ${formik.values.cityName}, ${formik.values.provinceName}`);
                  }
                }}
                disabled={!formik.values.cityId}
                className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none bg-white transition-colors disabled:bg-gray-50 disabled:text-gray-400"
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
              <label className="block text-sm font-medium text-[#6B6662] mb-2">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formik.values.postalCode || ""}
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

          {/* Map Section moved to bottom */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#2C2826]">
              Update Pinpoint Location
            </label>
            <MapPicker 
              lat={formik.values.latitude}
              lng={formik.values.longitude}
              onLocationChange={handleLocationChange}
              selectedProvince={formik.values.provinceName}
              selectedCity={formik.values.cityName}
              selectedDistrict={formik.values.districtName}
            />
            <p className="text-xs text-[#6B6662]">
              Drag the pin to adjust your exact location on the map.
            </p>
          </div>

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

          <div className="flex gap-3 pt-6 border-t border-[#E5DDD3]">
            <Link
              href="/address"
              className="flex-1 px-6 py-3 rounded-xl border-2 border-[#E5DDD3] text-[#6B6662] hover:border-[#4A90E2] transition-all font-semibold text-center"
            >
              Cancel
            </Link>
            <SubmitButton
              isLoading={isLoading}
              isValid={formik.isValid}
              cta="Update Address"
              ctaLoading="Updating Address..."
            />
          </div>
        </form>
      </div>
    </div>
  );
}
