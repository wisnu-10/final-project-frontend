'use client'

import React from "react";
import { Waves, MapPin, Package, Scale } from "lucide-react";
import logo from "../../../../../public/logo-Photoroom.png"
import Image from "next/image";
import useEmailInvoice from "@/features/payment-customer/hooks/useEmailInvoice";
import { FiLoader } from "react-icons/fi";

interface InvoicePageProps {
  order:  any
  setShowInvoice: (value: boolean) => void
}

const InvoicePage = ({order, setShowInvoice}: InvoicePageProps) => {

  const {emailInvoice, isLoading} = useEmailInvoice()

  const data = order;

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-md mx-auto max-h-[90vh] overflow-y-auto bg-white p-6 shadow-xl rounded-2xl border border-gray-100 text-[#2C2826] font-sans">
        {/* HEADER: Brand & Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-md">
            <Image src={logo} alt="diLaundryin Logo" className="h-15 w-10" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-[#4A90E2]">
            DILAUNDRIYIN
          </h1>
          <div className="mt-2 flex flex-col items-center text-[#6B6662] text-xs">
            <div className="flex items-center gap-1 font-bold text-[#4A90E2] uppercase tracking-widest">
              <MapPin className="w-3 h-3" />
              <span>{data?.outlet.name}</span>
            </div>
            <p className="max-w-[220px] leading-tight mt-1 opacity-80">
              {data?.outlet.address}, {data?.outlet.cityName},{" "}
              {data?.outlet.provinceName}
            </p>
          </div>
        </div>

        {/* CUSTOMER & ORDER INFO */}
        <div className="grid grid-cols-2 gap-4 py-5 border-y border-dashed border-[#E5DDD3] mb-6">
          <div>
            <span className="text-[10px] uppercase font-black text-[#94A3B8] block mb-1 tracking-widest">
              Customer
            </span>
            <p className="text-sm font-bold text-[#4A4541]">
              {data?.customer?.firstName} {data?.customer?.lastName}
            </p>
            <p className="text-xs text-[#6B6662] font-medium">
              {data?.customer?.phoneNumber}
            </p>
          </div>
          <div className="text-right border-l border-[#E5DDD3] pl-4">
            <span className="text-[10px] uppercase font-black text-[#94A3B8] block mb-1 tracking-widest">
              Invoice
            </span>
            <p className="text-sm font-mono font-bold text-[#4A4541]">
              {data.invoiceNumber}
            </p>
            <p className="text-[10px] text-[#6B6662] font-bold uppercase mt-1">
              {new Date(data.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* LAUNDRY SERVICES */}
        <div className="space-y-6">
          {/* 1. KILOAN SECTION */}
          {data?.orderItems?.some(
            (o: any) => o.laundryItem.pricingType === "kiloan",
          ) && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-[#4A90E2]" />
                <span className="text-xs font-black uppercase text-[#4A4541] tracking-[0.2em]">
                  Weight Services
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="font-bold text-[#4A4541] text-sm">
                      Basic Wash
                    </span>
                    <span className="text-[11px] text-[#6B6662] font-medium">
                      {data.totalWeight} kg x Rp{" "}
                      {Number(data.pricePerKg).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <span className="font-bold text-sm text-[#2C2826]">
                    Rp{" "}
                    {(
                      Number(data?.totalWeight || 0) *
                      Number(data?.pricePerKg || 0)
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2. SATUAN SECTION */}
          {data?.orderItems?.some(
            (o: any) => o.laundryItem?.pricingType === "per_item",
          ) && (
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-[#4A90E2]" />
                <span className="text-xs font-black uppercase text-[#4A4541] tracking-[0.2em]">
                  Item Details
                </span>
              </div>
              <div className="space-y-3">
                {data.orderItems
                  .filter((o: any) => o.laundryItem.pricingType === "per_item")
                  .map((o: any) => (
                    <div
                      key={o.id}
                      className="flex justify-between items-start"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-[#4A4541] text-sm">
                          {o?.laundryItem?.name}
                        </span>
                        <span className="text-[11px] text-[#6B6662] font-medium">
                          {o.quantity} pcs x Rp{" "}
                          {Number(o.laundryItem.price).toLocaleString("id-ID")}
                        </span>
                      </div>
                      <span className="font-bold text-sm text-[#2C2826]">
                        Rp {Number(o.subTotal).toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* TOTAL CALCULATION */}
        <div className="mt-8 pt-5 border-t-4 border-[#2C2826]">
          <div className="flex justify-between items-center mt-2">
            <span className="text-base font-black uppercase tracking-tighter text-[#2C2826]">
              Total Amount
            </span>
            <span className="text-lg font-black text-[#FF6B4A]">
              Rp {Number(data.totalPrice).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 text-center">
          <div className="inline-block px-6 py-1.5 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-green-100">
            {data.payments[0].status}
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-[#4A4541]">
              THANK YOU FOR YOUR TRUST!
            </p>
            <p className="text-[10px] text-[#94A3B8] leading-relaxed italic px-4">
              "We take care of your clothes like our own."
              <br />
              Pick-up policy: Valid for 30 days.
            </p>
          </div>
          {/* Decorative Barcode-like line */}
          <div className="mt-6 flex justify-center gap-1 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`h-8 w-1 bg-black ${i % 3 === 0 ? "w-2" : "w-0.5"}`}
              />
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-10">
            <button
              onClick={() => setShowInvoice(false)}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-[#FF6B4A] text-[#FF6B4A]  hover:text-white hover:bg-[#FF6B4A] transition-all disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={() => emailInvoice(order.id)}
              className="flex-1 px-6 py-3 rounded-xl border-2 bg-[#FF6B4A] text-white hover:bg-[#f94f28] transition-all disabled:opacity-50"
            >
              {isLoading ? (
                      <div className="flex">
                        <FiLoader className="w-5 h-5 animate-spin" />
                        <span>Sending Email...</span>
                      </div>
                    ) : (
                      <span>Send Email</span>
                    )}

              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
