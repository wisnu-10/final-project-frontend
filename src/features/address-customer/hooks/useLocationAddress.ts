import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface LocationArea {
  id: string;
  name: string;
}

export function useLocationAddress(provinceId: string, cityId: string) {
  const [provinces, setProvinces] = useState<LocationArea[]>([]);
  const [cities, setCities] = useState<LocationArea[]>([]);
  const [districts, setDistricts] = useState<LocationArea[]>([]);

  const fetchProvince = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
      );
      setProvinces(res.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
      setProvinces([]);
    }
  }, []);

  const fetchCities = useCallback(async (pId: string) => {
    if (!pId || pId === "undefined" || pId === "null") {
      setCities([]);
      return [];
    }

    try {
      const res = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${pId}.json`,
      );
      setCities(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
      return [];
    }
  }, []);

  const fetchDistricts = useCallback(async (cId: string) => {
    if (!cId || cId === "undefined" || cId === "null") {
      setDistricts([]);
      return [];
    }

    try {
      const res = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cId}.json`,
      );
      setDistricts(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistricts([]);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchProvince();
  }, [fetchProvince]);

  useEffect(() => {
    if (provinceId && provinceId !== "undefined" && provinceId !== "null") {
      fetchCities(String(provinceId));
    } else {
      setCities([]);
    }
  }, [provinceId, fetchCities]);

  useEffect(() => {
    if (cityId && cityId !== "undefined" && cityId !== "null") {
      fetchDistricts(String(cityId));
    } else {
      setDistricts([]);
    }
  }, [cityId, fetchDistricts]);

  return { provinces, cities, districts, fetchCities, fetchDistricts };
}
