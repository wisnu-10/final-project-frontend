import { useState, useEffect } from "react";
import { getProvincesApi, getCitiesApi, getDistrictsApi } from "../api/region.api";

export interface RegionItem {
  id: string;
  name: string;
}

export default function useRegionData(selectedProvinceId?: string | number, selectedCityId?: string | number) {
  const [provinces, setProvinces] = useState<RegionItem[]>([]);
  const [cities, setCities] = useState<RegionItem[]>([]);
  const [districts, setDistricts] = useState<RegionItem[]>([]);

  useEffect(() => {
    getProvincesApi().then((res) => {
      if (res.success) setProvinces(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedProvinceId) {
      getCitiesApi(selectedProvinceId).then((res) => {
        if (res.success) setCities(res.data);
      });
    } else {
      setCities([]);
    }
  }, [selectedProvinceId]);

  useEffect(() => {
    if (selectedCityId) {
      getDistrictsApi(selectedCityId).then((res) => {
        if (res.success) setDistricts(res.data);
      });
    } else {
      setDistricts([]);
    }
  }, [selectedCityId]);

  return { provinces, cities, districts };
}
