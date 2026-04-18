'use client';

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getComplaintsApi, GetComplaintsParams, GetComplaintsResponse } from "../api/getComplaints.api";

export function useGetComplaints(initialParams: GetComplaintsParams = { page: 1, limit: 10 }) {
  const [data, setData] = useState<GetComplaintsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState<GetComplaintsParams>(initialParams);

  const fetchComplaints = async (fetchParams: GetComplaintsParams) => {
    try {
      setIsLoading(true);
      const result = await getComplaintsApi(fetchParams);
      setData(result);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch complaints");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints(params);
  }, [params.page, params.limit, params.search, params.status, params.outletId]);

  const handlePageChange = (newPage: number) => {
    setParams({ ...params, page: newPage });
  };

  const handleFilterChange = (newFilters: Partial<GetComplaintsParams>) => {
    setParams({ ...params, ...newFilters, page: 1 });
  };

  return { data, isLoading, params, handlePageChange, handleFilterChange, fetchComplaints };
}
