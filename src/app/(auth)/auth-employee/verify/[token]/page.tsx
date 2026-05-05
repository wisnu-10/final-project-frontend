"use client";

import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { useVerifyEmployee } from "@/features/auth-employee/verify-email/hooks/useVerifyEmployee";
import SubmitButton from "@/components/button";

export default function VerifyEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  const { status, message } = useVerifyEmployee(token);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6F1] p-6 text-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-[#E5DDD3]">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-[#FF6B4A] animate-spin" />
            <h1 className="text-xl font-semibold text-[#2C2826]">Verifying your account...</h1>
            <p className="text-[#6B6662]">Please wait while we activate your employee account.</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-[#2C2826]">Verified Successfully!</h1>
            <p className="text-[#6B6662] mb-4">
              {message}. You can now login to your dashboard using the credentials provided by your admin.
            </p>
            <button
              onClick={() => router.push("/auth-employee")}
              className="w-full bg-[#FF6B4A] hover:bg-[#FF5A35] text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group"
            >
              Proceed to Login
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-[#2C2826]">Verification Failed</h1>
            <p className="text-[#6B6662] mb-4">{message}</p>
            <button
              onClick={() => router.push("/auth-employee")}
              className="w-full bg-[#2C2826] hover:bg-[#1C1816] text-white py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
