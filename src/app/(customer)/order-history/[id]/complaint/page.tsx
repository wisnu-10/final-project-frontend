"use client";

import SubmitButton from "@/components/button";
import ErrorMessage from "@/components/errorMessage";
import Loading from "@/components/loading";
import PageError from "@/components/pageError";
import { useCreateComplains } from "@/features/complaint-customer/hooks/useCreateComplain";
import { useGetIdOrder } from "@/features/order-customer/hooks/useGetIdOrder";
import { MessageSquare, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function ComplaintModal() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, error } = useGetIdOrder(id as string);

  const { formik, isLoading: isSubmitting } = useCreateComplains(id as string);

  if (isLoading) return <Loading />;

  if (error) return <PageError />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-3xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#2C2826] mb-2">
            Submit a Complaint
          </h2>
          <p className="text-sm text-[#6B6662]">
            Please provide details about your complaint regarding this order
          </p>
        </div>

        {/* Order Info Summary */}
        <div className="bg-[#FAF6F1] rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#6B6662]">Order Number</span>
            <span className="font-bold text-[#2C2826]">
              DL_{data?.id?.slice(0, 8)?.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#6B6662]">Recipient Name</span>
            <span className="font-medium text-[#2C2826]">
              {data?.pickupAddress?.recipientName}
            </span>
          </div>
        </div>

        {/* Complaint Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#6B6662] mb-2">
            Complaint Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Describe your complaint in detail..."
            rows={6}
            className="w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-orange-400 outline-none transition-colors resize-none"
          />
          {formik.touched.description && formik.errors.description ? (
            <ErrorMessage error={formik.errors.description} />
          ) : null}
        </div>

        {/* Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 mb-6">
          <p className="text-xs text-blue-800">
            ℹ️ Our team will follow up on your complaint within 24 hours.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 rounded-xl border-2 border-[#E5DDD3] text-[#6B6662] hover:border-orange-400 transition-all disabled:opacity-50"
          >
            cancel
          </button>
          <SubmitButton
            isLoading={isSubmitting}
            isValid={formik.isValid}
            cta="Send Complaint"
            ctaLoading="Sending Complaint..."
          />
        </div>
      </form>
    </div>
  );
}
