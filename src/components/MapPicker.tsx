"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Swal from "sweetalert2";

const createDefaultIcon = () => {
  if (typeof window === 'undefined') return null;
  return L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
};

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

function MapController({ flyTo }: { flyTo: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (map && flyTo) {
      map.flyTo(flyTo, map.getZoom());
    }
  }, [flyTo, map]);
  return null;
}

function MapEvents({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

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
  const [isMounted, setIsMounted] = useState(false);
  const [mapId] = useState(() => `map-${Math.random().toString(36).substring(2, 9)}`);
  
  const [position, setPosition] = useState<[number, number]>([
    (lat && lat !== 0) ? lat : -6.200000,
    (lng && lng !== 0) ? lng : 106.816666
  ]);
  
  const [flyToTrigger, setFlyToTrigger] = useState<[number, number] | null>(null);
  const isInternalUpdate = useRef(false);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const markerIcon = useRef<L.Icon | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (!markerIcon.current) markerIcon.current = createDefaultIcon();
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (lat && lng && (lat !== position[0] || lng !== position[1])) {
      if (!isInternalUpdate.current) {
        setPosition([lat, lng]);
        setFlyToTrigger([lat, lng]);
      }
      isInternalUpdate.current = false;
    }
  }, [lat, lng]);

  const handleReverseGeocode = useCallback(async (newLat: number, newLng: number) => {
    setIsReverseGeocoding(true);
    try {
      // Logic: Use current coordinates to constrain the search radius (Proximity constraint)
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}&addressdetails=1&zoom=18`
      );
      
      const displayAddress = response.data.display_name;
      
      // Update only coordinates and street address details
      isInternalUpdate.current = true;
      onLocationChange({
        lat: newLat,
        lng: newLng,
        address: displayAddress,
      });

    } catch (error) {
      console.error("Reverse geocoding error:", error);
      isInternalUpdate.current = true;
      onLocationChange({ lat: newLat, lng: newLng });
    } finally {
      setIsReverseGeocoding(false);
    }
  }, [onLocationChange]);

  const onMarkerDragEnd = (e: any) => {
    const marker = e.target;
    if (marker != null) {
      const newPos = marker.getLatLng();
      setPosition([newPos.lat, newPos.lng]);
      handleReverseGeocode(newPos.lat, newPos.lng);
    }
  };

  if (!isMounted) return null;

  return (
    <div key={mapId} className="w-full h-[300px] rounded-xl overflow-hidden border-2 border-[#E5DDD3] relative z-0">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} draggable={true} icon={markerIcon.current || undefined} eventHandlers={{ dragend: onMarkerDragEnd }} />
        <MapController flyTo={flyToTrigger} />
        <MapEvents onMapClick={(lat, lng) => { setPosition([lat, lng]); handleReverseGeocode(lat, lng); }} />
      </MapContainer>
      {isReverseGeocoding && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-[1000] flex items-center justify-center">
          <div className="bg-white p-3 rounded-lg shadow-lg flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Updating address details...</span>
          </div>
        </div>
      )}
    </div>
  );
}
