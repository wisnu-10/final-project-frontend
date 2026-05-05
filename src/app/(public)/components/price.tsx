"use client";

import useAuthStore from "@/stores/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Price() {
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <section
      id="pricing"
      className="py-12 md:py-20 px-4 md:px-8 bg-linear-to-b from-white to-[#FFF5F2]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2826] mb-4 leading-tight">
            Tailored Laundry Packages Designed Specifically for Your Needs!
          </h2>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Basic Wash */}
          <div className="bg-linear-to-b from-[#FFF5F2] to-white rounded-3xl p-6 md:p-8 border-2 border-[#E5DDD3] hover:border-[#FF6B4A] transition-all shadow-sm hover:shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#2C2826] mb-2">
                Basic Wash
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-bold text-[#2C2826]">
                  Rp. 10.000
                </span>
                <span className="text-sm text-[#6B6662]">per load</span>
              </div>
            </div>

            <div className="mb-6 rounded-2xl overflow-hidden shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400"
                alt="Basic wash"
                className="w-full h-32 object-cover"
              />
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-[#6B6662] mb-4">
                Benefit Included :-
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm md:text-base text-[#2C2826]">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
                  Wash & Dry
                </li>
                <li className="flex items-center gap-3 text-sm md:text-base text-[#2C2826]">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
                  Folding
                </li>
                <li className="flex items-center gap-3 text-sm md:text-base text-[#2C2826]">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
                  24-hour Turnaround
                </li>
                <li className="flex items-center gap-3 text-sm md:text-base text-[#2C2826]">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
                  Stain Treatment
                </li>
              </ul>
            </div>

            <button
              onClick={() =>
                router.push(user?.email ? "/order-history" : "/auth?tab=register")
              }
              className="w-full py-4 rounded-xl bg-[#FF6B4A] text-white hover:bg-[#FF5533] transition-all shadow-lg font-bold text-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
