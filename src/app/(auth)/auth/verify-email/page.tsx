"use client"

import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#FDFCFB]">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md border border-[#E5DDD3]">
        <div className="text-6xl mb-4">📩</div>
        <h1 className="text-2xl font-bold text-[#2C2826] mb-2">
          Verify Your Email
        </h1>
        <p className="text-[#6B6662] mb-6">
          Your account is almost ready! Please check your email for the
          activation link. If you can’t find it, don’t forget to check your
          spam folder.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-[#FF6B4A] text-white rounded-xl font-semibold hover:bg-[#FF5533] transition-all"
          >
            Back to Home
          </button>

          {/* <button className="text-sm text-[#FF6B4A] font-medium hover:underline">
              Didn't receive email? Resend
            </button> */}
        </div>
      </div>
    </div>
  );
}
