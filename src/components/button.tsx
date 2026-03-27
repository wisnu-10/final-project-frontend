// @/components/ui/SubmitButton.tsx
import { SubmitButtonProps } from "@/types/props.dto";
import { FiLoader } from "react-icons/fi";

export default function SubmitButton({
  isLoading,
  isValid,
  cta,
  ctaLoading,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || !isValid}
      className="w-full flex items-center justify-center gap-3 py-3 bg-[#FF6B4A] text-white rounded-xl font-semibold hover:bg-[#FF5533] active:scale-[0.98] transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:ring-4 focus:ring-[#FFF0ED] hover:scale-[1.02]"
    >
      {isLoading ? (
        <>
          <FiLoader className="w-5 h-5 animate-spin" />
          <span>{ctaLoading}</span>
        </>
      ) : (
        <span>{cta}</span>
      )}
    </button>
  );
}
