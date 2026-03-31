"use client"

import { ApiResponse } from "@/types/api";
import { ProfileUpdateDTO } from "@/types/profileCustomer.dto";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useGetProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get<ApiResponse<ProfileUpdateDTO | null >>("/profile/me");

      setProfile(res.data.data);
    } catch (error) {
      toast.error("Failed to load profile");
      setIsError(true)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile()
  }, [])

  return{profile, isLoading, isError}
};
