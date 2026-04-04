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
    const res = await axios.get(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
    );

    setProvinces(res.data);
  }, []) 

  const fetchCities = useCallback(async (pId: string) => {
    const res = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${pId}.json`,
    );

    setCities(res.data);
  }, []);

  const fetchDistricts = useCallback(async (cId: string) => {
    const res = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cId}.json`,
    );

    setDistricts(res.data);
  }, []) 

  useEffect(() => {
    fetchProvince();
  }, []);

  useEffect(() => {
    if (provinceId) {
      fetchCities(String(provinceId));
    } else {
      setCities([]);
    }
  }, [provinceId, fetchCities]);

  useEffect(() => {
    if (cityId) {
      fetchDistricts(String(cityId));
    } else {
      setDistricts([]);
    }
  }, [cityId, fetchDistricts]);

  return { provinces, cities, districts, fetchCities, fetchDistricts };
}
