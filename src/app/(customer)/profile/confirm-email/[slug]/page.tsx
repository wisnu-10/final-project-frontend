"use client";

import { useRouter } from "next/navigation";
import BackLink from "@/components/backLink";
import useUpdateEmail from "@/features/profile-customer/hooks/useUpdateEmail";
import useConfirmEmail from "@/features/profile-customer/hooks/useConfirmEmail";
import Loading from "@/components/loading";
import PageError from "@/components/pageError";

export default function ConfirmEmail() {
  const router = useRouter();
  const {data, isLoading} = useConfirmEmail()

  if(isLoading) return <Loading/>

  if(!data) return <PageError/>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#FDFCFB]">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md border border-[#E5DDD3]">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-[#2C2826] mb-2">
          Email Updated Successfully!
        </h1>
        <p className="text-[#6B6662] mb-6">
          Your email address has been updated. You can now use your new email to
          log in and receive notifications about your laundry orders.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/profile")}
            className="w-full py-3 bg-[#FF6B4A] text-white rounded-xl font-semibold hover:bg-[#FF5533] transition-all"
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
}
