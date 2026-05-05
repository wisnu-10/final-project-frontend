import axiosInstance from "@/utils/axiosInstance";

export const getProvincesApi = async () => {
  const response = await axiosInstance.get("/region/provinces");
  return response.data;
};

export const getCitiesApi = async (provinceId: string | number) => {
  const response = await axiosInstance.get(`/region/cities/${provinceId}`);
  return response.data;
};

export const getDistrictsApi = async (cityId: string | number) => {
  const response = await axiosInstance.get(`/region/districts/${cityId}`);
  return response.data;
};
