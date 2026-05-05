"use client";

import React from "react";
import {
  MessageSquare,
  CheckCircle2,
  ArrowLeft,
  Clock,
  User,
  ShieldCheck,
} from "lucide-react";
import { useGetIdOrder } from "@/features/order-customer/hooks/useGetIdOrder";
import { useParams, useRouter } from "next/navigation";
import FormAddressSkeleton from "@/components/formAddressSkeleton";
import PageError from "@/components/pageError";

export default function ResponseComplaint() {
  const router = useRouter()
  const {id} = useParams()

  const { data, isLoading, error } = useGetIdOrder(id as string);

  if (isLoading || !data) return <FormAddressSkeleton />;

  if (error) return <PageError />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
        {/* Dekorasi Background Lucu */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 rounded-full blur-3xl opacity-60" />

        {/* Header Section */}
        <div className="text-center mb-8 relative">
          <div className="w-20 h-20 rounded-3xl bg-green-50 flex items-center justify-center mx-auto mb-4 rotate-3 border-2 border-green-100">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-[#2C2826] tracking-tight">
            Review Completed
          </h2>
          <p className="text-sm text-[#6B6662] mt-1 font-medium italic">
            Check the resolution from our team below
          </p>
        </div>

        {/* Order Info & Status */}
        <div className="flex items-center justify-between gap-2 mb-6 bg-[#FAF6F1] p-4 rounded-2xl border border-[#E5DDD3]">
          <div>
            <p className="text-[10px] uppercase font-black text-[#6B6662] tracking-widest">
              Order ID
            </p>
            <p className="text-sm font-bold text-[#2C2826]">
              {data?.invoiceNumber}
            </p>
          </div>
        </div>

        {/* Conversation Flow */}
        <div className="space-y-6 mb-8">
          {/* User Side */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <User className="w-3 h-3 text-orange-400" />
              <span className="text-[11px] font-bold text-[#6B6662] uppercase tracking-wider">
                Your Message
              </span>
            </div>
            <div className="bg-white border-2 border-[#E5DDD3] rounded-2xl rounded-tl-none p-4 shadow-sm">
              <p className="text-sm text-[#2C2826] leading-relaxed">
                {data?.complaints[data.complaints.length - 1]?.description}
              </p>
              <div className="flex items-center gap-1 mt-3 text-[#A8A29E]">
                <Clock className="w-3 h-3" />
                <span className="text-[10px] font-medium">
                  {new Date(
                    data.complaints[data.complaints.length - 1].createdAt,
                  ).toLocaleString("en-EN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Admin Side */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1 justify-end">
              <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider text-right">
                {
                  data?.complaints[data.complaints.length - 1]?.resolveBy
                    ?.firstName
                }{" "}
                {
                  data?.complaints[data.complaints.length - 1]?.resolveBy
                    ?.lastName
                }
              </span>
              <MessageSquare className="w-3 h-3 text-orange-600" />
            </div>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl rounded-tr-none p-5 shadow-inner relative overflow-hidden">
              {/* Aksen petik di background */}
              <div className="absolute top-2 right-2 text-orange-200 opacity-30 select-none font-serif text-6xl">
                ”
              </div>

              <p className="text-sm text-[#2C2826] leading-relaxed font-medium relative z-10">
                {data?.complaints[data.complaints.length - 1]?.adminResponse}
              </p>
              <div className="flex items-center gap-1 mt-4 text-orange-400/80 justify-end">
                <Clock className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">
                  {new Date(
                    data.complaints[data.complaints.length - 1].updatedAt,
                  ).toLocaleString("en-EN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <button
          onClick={() => router.back()}
          className="w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#2C2826] text-white font-bold hover:bg-[#ff6b4a] transition-all duration-300 shadow-xl shadow-orange-100 hover:shadow-orange-200"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Close Resolution
        </button>
      </div>
    </div>
  );
}
