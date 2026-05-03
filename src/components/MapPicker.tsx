"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Swal from "sweetalert2";

// Fix for default Leaflet icon
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapPickerProps {
  lat: number;
  lng: number;
  onLocationChange: (data: {
    lat: number;
    lng: number;
    address?: string;
    provinceName?: string;
    cityName?: string;
    districtName?: string;
  }) => void;
  selectedProvince?: string;
  selectedCity?: string;
  selectedDistrict?: string;
}

// Component to handle map centering and clicks
function MapEvents({ onMapClick, center }: { onMapClick: (lat: number, lng: number) => void, center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

// Helper to normalize regional names for better matching
const normalizeString = (str: string | undefined): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/(kabupaten|kota|kecamatan|kelurahan|desa|provinsi|province|regency|city|district|suburb|village|township)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
};

export default function MapPicker({
  lat,
  lng,
  onLocationChange,
  selectedProvince,
  selectedCity,
  selectedDistrict,
}: MapPickerProps) {
  const [position, setPosition] = useState<[number, number]>([lat || -6.200000, lng || 106.816666]);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);

  useEffect(() => {
    if (lat && lng && (lat !== position[0] || lng !== position[1])) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  const handleReverseGeocode = useCallback(async (newLat: number, newLng: number) => {
    setIsReverseGeocoding(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}&addressdetails=1`
      );
      
      const address = response.data.address;
      const displayAddress = response.data.display_name;
      
      const province = address.state || address.region;
      const city = address.city || address.city_district || address.town || address.municipality;
      const district = address.suburb || address.district || address.village;

      // Smart Matching with Normalization
      const normProvince = normalizeString(province);
      const normCity = normalizeString(city);
      const normDistrict = normalizeString(district);

      const normSelectedProv = normalizeString(selectedProvince);
      const normSelectedCity = normalizeString(selectedCity);
      const normSelectedDist = normalizeString(selectedDistrict);

      let shouldUpdateRegions = false;
      
      const matchesProvince = !normSelectedProv || normProvince.includes(normSelectedProv) || normSelectedProv.includes(normProvince);
      const matchesCity = !normSelectedCity || normCity.includes(normSelectedCity) || normSelectedCity.includes(normCity);
      const matchesDistrict = !normSelectedDist || normDistrict.includes(normSelectedDist) || normSelectedDist.includes(normDistrict);

      // SILENT UPDATE if it still matches the current selection
      if (matchesProvince && matchesCity && matchesDistrict) {
        onLocationChange({
          lat: newLat,
          lng: newLng,
          address: displayAddress,
        });
        return;
      }

      // ONLY SHOW ALERT if the pin moved to a DIFFERENT region
      const result = await Swal.fire({
        title: "Region Changed",
        html: `
          <div class="text-left text-sm space-y-2">
            <p>The pin moved to a different area:</p>
            <div class="bg-[#FDF2F0] p-3 rounded-xl text-[#e05e32] border border-[#FDE3DC]">
              <span class="font-bold">${district || "Unknown"}</span>, ${city || ""}, ${province || ""}
            </div>
            <p class="mt-2 text-xs text-gray-500 italic">
              Current selection: ${selectedDistrict || "None"}
            </p>
            <p class="font-medium text-gray-700">Sync dropdowns with this new location?</p>
          </div>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Sync regions",
        cancelButtonText: "No, keep current regions",
        confirmButtonColor: "#ff7143",
        cancelButtonColor: "#6B6662",
        background: "#fff",
        customClass: {
          title: "text-lg font-bold text-gray-800",
          popup: "rounded-3xl border-none shadow-2xl",
        }
      });
      
      if (result.isConfirmed) {
        shouldUpdateRegions = true;
      }

      onLocationChange({
        lat: newLat,
        lng: newLng,
        address: displayAddress,
        ...(shouldUpdateRegions ? {
          provinceName: province,
          cityName: city,
          districtName: district,
        } : {})
      });


    } catch (error) {
      console.error("Reverse geocoding error:", error);
      onLocationChange({ lat: newLat, lng: newLng });
    } finally {
      setIsReverseGeocoding(false);
    }
  }, [onLocationChange, selectedProvince, selectedCity, selectedDistrict]);

  const onMarkerDragEnd = (e: any) => {
    const marker = e.target;
    if (marker != null) {
      const newPos = marker.getLatLng();
      setPosition([newPos.lat, newPos.lng]);
      handleReverseGeocode(newPos.lat, newPos.lng);
    }
  };

  const handleMapClick = (newLat: number, newLng: number) => {
    setPosition([newLat, newLng]);
    handleReverseGeocode(newLat, newLng);
  };

  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden border-2 border-[#E5DDD3] relative z-0">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          draggable={true}
          eventHandlers={{
            dragend: onMarkerDragEnd,
          }}
        />
        <MapEvents onMapClick={handleMapClick} center={position} />
      </MapContainer>
      {isReverseGeocoding && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-[1000] flex items-center justify-center">
          <div className="bg-white p-3 rounded-lg shadow-lg flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Fetching location...</span>
          </div>
        </div>
      )}
    </div>
  );
}
