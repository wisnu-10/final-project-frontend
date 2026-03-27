import { CheckCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import Logo from "../../../../../public/logo-Photoroom.png"

const features = [
  "Free pickup & delivery on every order",
  "Professional garment care specialists",
  "24/7 order tracking & support",
  "Eco-friendly cleaning products",
  "100% satisfaction guarantee",
];
export default function rightPanelInformation() {
  return (
    <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 relative overflow-hidden bg-white">
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-5"
        style={{ backgroundColor: "#FF6B4A" }}
      />

      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-5"
        style={{ backgroundColor: "#FFB088" }}
      />

      <div className="relative">
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-12">
          <Image src={Logo} alt="Logo diLaundyin" className="w-10 h-auto" />

          <span className="text-2xl font-bold text-[#2C2826]">diLaundryin</span>
        </div>

        <h2 className="text-4xl font-bold text-[#2C2826] mb-4 leading-tight">
          diLaundryin, <span className="text-[#FF6B4A]">Simplified</span>
        </h2>

        <p className="text-[#6B6662] mb-10 leading-relaxed">
          Join diLaundryin and enjoy professional garment care delivered
          straight to your door.
        </p>

        {/* FEATURES */}
        <div className="flex flex-col gap-4">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-[#FFF5F2]">
                <CheckCircle className="w-3.5 h-3.5 text-[#FF6B4A]" />
              </div>

              <span className="text-sm text-[#6B6662]">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PROMO */}
      <div className="relative mt-10 p-6 rounded-2xl bg-[#FFF5F2] border border-[#FFD4C4]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#FF6B4A]">
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#2C2826]">
              New Member Offer
            </p>

            <p className="text-xs text-[#6B6662]">Limited time deal</p>
          </div>
        </div>

        <p className="text-sm text-[#6B6662]">
          Get <span className="text-[#FF6B4A] font-bold">50% off</span> your
          first order when you create an account today.
        </p>
      </div>
    </div>
  );
}
