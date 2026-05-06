"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useUpdateOutlet from "@/features/super-admin/outlets/hooks/useUpdateOutlet";
import useRegionData from "@/features/super-admin/outlets/hooks/useRegionData";
import { useOutletStore } from "@/stores/useOutletStore";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
      <p className="text-gray-400">Loading Map...</p>
    </div>
  ),
});

export default function EditOutletPage() {
  const router = useRouter();
  const { selectedOutletId } = useOutletStore();
  
  useEffect(() => {
    if (!selectedOutletId) {
      router.replace("/super-admin/outlets");
    }
  }, [selectedOutletId, router]);

  const { formik, isLoading, fetching } = useUpdateOutlet(selectedOutletId as string);
  const { provinces, cities, districts, fetchCities, fetchDistricts } = useRegionData(formik.values.provinceId, formik.values.cityId);

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

    // Deep Sync Logic: Match names to IDs
    if (data.provinceName) {
      const matchedProvince = provinces.find(p => 
        normalizeString(data.provinceName).includes(normalizeString(p.name)) || 
        normalizeString(p.name).includes(normalizeString(data.provinceName))
      );

      if (matchedProvince) {
        formik.setFieldValue("provinceId", Number(matchedProvince.id));
        formik.setFieldValue("provinceName", matchedProvince.name);

        // Fetch and match City
        const citiesList = await fetchCities(matchedProvince.id);
        if (data.cityName && citiesList) {
          const matchedCity = (citiesList as any[]).find(c => 
            normalizeString(data.cityName).includes(normalizeString(c.name)) || 
            normalizeString(c.name).includes(normalizeString(data.cityName))
          );

          if (matchedCity) {
            formik.setFieldValue("cityId", Number(matchedCity.id));
            formik.setFieldValue("cityName", matchedCity.name);

            // Fetch and match District
            const districtsList = await fetchDistricts(matchedCity.id);
            if (data.districtName && districtsList) {
              const matchedDistrict = (districtsList as any[]).find(d => 
                normalizeString(data.districtName).includes(normalizeString(d.name)) || 
                normalizeString(d.name).includes(normalizeString(data.cityName))
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

  if (!selectedOutletId) return null;

  if (fetching) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="w-12 h-12 border-4 border-[#ff7143] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium">Fetching outlet details...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Link 
          href="/super-admin/outlets"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="text-xl text-gray-600" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Edit Outlet</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">General Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Outlet Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] outline-none transition-all"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Radius (km)
                  </label>
                  <input
                    type="number"
                    name="maxServiceDistance"
                    value={formik.values.maxServiceDistance}
                    onChange={formik.handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Kg (IDR)
                  </label>
                  <input
                    type="number"
                    name="pricePerKg"
                    value={formik.values.pricePerKg}
                    onChange={formik.handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address Text
              </label>
              <textarea
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] outline-none transition-all resize-none"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Location Selection</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <select
                    name="provinceId"
                    value={formik.values.provinceId || ""}
                    onChange={(e) => {
                      const id = e.target.value;
                      const name = e.target.options[e.target.selectedIndex].text;
                      formik.setFieldValue("provinceId", id ? Number(id) : 0);
                      formik.setFieldValue("provinceName", id ? name : "");
                      formik.setFieldValue("cityId", 0);
                      formik.setFieldValue("cityName", "");
                      formik.setFieldValue("districtId", 0);
                      formik.setFieldValue("districtName", "");

                      if (id) {
                        handleSearchLocation(name);
                      }
                    }}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] bg-white"
                  >
                    <option value="">Select Province</option>
                    {provinces.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    name="cityId"
                    value={formik.values.cityId || ""}
                    onChange={(e) => {
                      const id = e.target.value;
                      const name = e.target.options[e.target.selectedIndex].text;
                      formik.setFieldValue("cityId", id ? Number(id) : 0);
                      formik.setFieldValue("cityName", id ? name : "");
                      formik.setFieldValue("districtId", 0);
                      formik.setFieldValue("districtName", "");

                      if (id) {
                        handleSearchLocation(`${name}, ${formik.values.provinceName}`);
                      }
                    }}
                    disabled={!formik.values.provinceId}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] disabled:bg-gray-50 bg-white"
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <select
                    name="districtId"
                    value={formik.values.districtId || ""}
                    onChange={(e) => {
                      const id = e.target.value;
                      const name = e.target.options[e.target.selectedIndex].text;
                      formik.setFieldValue("districtId", id ? Number(id) : 0);
                      formik.setFieldValue("districtName", id ? name : "");

                      if (id) {
                        handleSearchLocation(`${name}, ${formik.values.cityName}, ${formik.values.provinceName}`);
                      }
                    }}
                    disabled={!formik.values.cityId}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] disabled:bg-gray-50 bg-white"
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Location Pinpoint</h2>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Set Map Location</label>
                <MapPicker 
                  lat={formik.values.latitude}
                  lng={formik.values.longitude}
                  onLocationChange={handleLocationChange}
                  selectedProvince={formik.values.provinceName}
                  selectedCity={formik.values.cityName}
                  selectedDistrict={formik.values.districtName}
                />
                <p className="text-xs text-gray-500 italic">Hint: You can drag the pin to adjust the outlet location.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <Link
              href="/super-admin/outlets"
              className="px-8 py-3 text-gray-600 font-semibold hover:bg-gray-50 rounded-xl transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-[#ff7143] hover:bg-[#e05e32] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#ff7143]/20 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Outlet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
