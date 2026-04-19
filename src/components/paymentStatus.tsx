"use client";

import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Headset,
} from "lucide-react";

interface PaymentStatusProps {
  status: "success" | "unfinish" | "error";
}

export default function PaymentStatusPage({ status }: PaymentStatusProps) {
  const router = useRouter();

  const config = {
    success: {
      icon: <CheckCircle2 className="w-12 h-12 text-green-600" />,
      iconBg: "bg-green-50",
      title: "Payment Successful",
      desc: "Thank you for your payment. Your transaction has been completed successfully, and your order is now being processed by our team.",
      btnText: "View Order History",
      btnColor: "bg-[#FF6B4A] hover:bg-[#FF5533]",
      btnPath: "/order-history",
    },
    unfinish: {
      icon: <AlertCircle className="w-12 h-12 text-amber-600" />,
      iconBg: "bg-amber-50",
      title: "Transaction Incomplete",
      desc: "It appears that the payment process was not finalized. Please complete the transaction to ensure your order can be processed promptly.",
      btnText: "Return to Orders",
      btnColor: "bg-[#4A90E2] hover:bg-[#357ABD]",
      btnPath: "/order-history",
    },
    error: {
      icon: <XCircle className="w-12 h-12 text-red-600" />,
      iconBg: "bg-red-50",
      title: "Payment Failed",
      desc: "We encountered a technical issue while processing your request. No funds were deducted. Please try again or contact our support team.",
      btnText: "Try Again",
      btnColor: "bg-[#2C2826] hover:bg-black",
      btnPath: "/order-history",
    },
  };

  const current = config[status];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#FDFCFB]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg border border-[#E5DDD3] w-full">
        {/* Dynamic Status Icon */}
        <div
          className={`w-24 h-24 ${current.iconBg} rounded-full flex items-center justify-center mx-auto mb-8 transition-transform hover:scale-105`}
        >
          {current.icon}
        </div>

        <h1 className="text-3xl font-bold text-[#2C2826] mb-4 tracking-tight">
          {current.title}
        </h1>

        <p className="text-[#6B6662] mb-10 text-lg leading-relaxed">
          {current.desc}
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push(current.btnPath)}
            className={`w-full py-4 ${current.btnColor} text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]`}
          >
            {current.btnText}
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full py-3 text-[#6B6662] font-semibold hover:text-[#2C2826] flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Return to Homepage
          </button>
        </div>
      </div>

      {/* Professional Support Footer */}
      <div className="mt-12 flex items-center gap-2 text-sm text-[#A39E99]">
        <Headset className="w-4 h-4" />
        <span>Encountering issues? </span>
        <button className="font-bold text-[#4A90E2] hover:underline decoration-2 underline-offset-4">
          Contact Customer Support
        </button>
      </div>
    </div>
  );
}
