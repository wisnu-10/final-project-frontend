"use client";

import useAuthStore from "@/stores/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Price() {
  const router = useRouter();
  const { email } = useAuthStore();

  return (
    <section
      id="pricing"
      className="py-20 px-8 bg-gradient-to-b from-white to-[#FFF5F2]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2C2826] mb-4">
            Tailored Laundry Packages Designed
            <br />
            Specifically for Your Needs!
          </h2>
        </div>

        <div className="gap-8 max-w-xl mx-auto">
          {/* Basic Wash */}
          <div className="bg-gradient-to-b from-[#FFF5F2] to-white rounded-3xl p-8 border-2 border-[#E5DDD3] hover:border-[#FF6B4A] transition-all">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#2C2826] mb-2">
                Basic Wash
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#2C2826]">
                  Rp. 10.000
                </span>
                <span className="text-[#6B6662]">per load</span>
              </div>
            </div>

            <div className="mb-6">
              <img
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400"
                alt="Basic wash"
                className="w-1000 h-32 object-cover"
              />
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-[#6B6662] mb-3">
                Benefit Included :-
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[#2C2826]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
                  Wash & Dry
                </li>
                <li className="flex items-center gap-2 text-sm text-[#2C2826]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
                  Folding
                </li>
                <li className="flex items-center gap-2 text-sm text-[#2C2826]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
                  24-hour Turnaround
                </li>
                <li className="flex items-center gap-2 text-sm text-[#2C2826]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
                  Stain Treatment
                </li>
              </ul>
            </div>

            <button
              
              onClick={() =>
                router.push(email ? "/order-history" : "/auth?tab=register")
              }
              className="w-full py-3 rounded-xl bg-[#FF6B4A] text-white hover:bg-[#FF5533] transition-all shadow-lg font-semibold"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
