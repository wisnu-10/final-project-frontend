"use client";

import { MapPinOff, ArrowLeft, Phone, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface NoOutletModalProps {
  onClose?: (value: boolean) => void;
  type: "radius" | "city" | null;
}

export default function NoOutletModal({ onClose, type }: NoOutletModalProps) {
  if (!type) return null;

  const router = useRouter();

  const content = {
    radius: {
      icon: <MapPinOff className="w-12 h-12 text-[#FF6B4A]" />,
      title: "Oops! Out of Range",
      desc: "It looks like your address is outside our service area from our nearest outlet.",
    },
    city: {
      icon: <Building2 className="w-12 h-12 text-[#FF6B4A]" />,
      title: "Coming Soon to Your City!",
      desc: "We haven't expanded our services to your city yet. We're working hard to get there soon!",
    },
  };

  const activeContent = content[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-[#2C2826]/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] max-w-md w-full p-8 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-[#FFF5F2] rounded-full flex items-center justify-center animate-pulse">
            {activeContent.icon}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#2C2826] mb-3 tracking-tight">
            {activeContent.title}
          </h1>
          <p className="text-[#6B6662] text-sm px-2">
            We’re sorry! {activeContent.desc}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              if (onClose) onClose(false);
            }}
            className="w-full py-4 bg-[#FF6B4A] text-white rounded-2xl font-bold hover:bg-[#FF5533] transition-all hover:scale-[1.02] shadow-lg shadow-[#FF6B4A]/20 flex items-center justify-center gap-2"
          >
            
            Check Another Address
          </button>

          
        </div>

        <p className="text-center text-[10px] text-[#94A3B8] mt-6 ">
          diLaundryin © 2026
        </p>
      </div>
    </div>
  );
}
