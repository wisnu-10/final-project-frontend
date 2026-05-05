import { Sparkles, WashingMachine } from "lucide-react";

export default function Service () {
    return (
      <section
        id="service"
        className="py-12 md:py-20 px-4 md:px-8 bg-linear-to-b from-[#FFF5F2] to-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2826] mb-4 leading-tight">
              Expert laundry services delivered fresh
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Quick Wash - Orange */}
            <div className="bg-[#FF6B4A] rounded-3xl p-6 md:p-8 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/90 rounded-2xl flex items-center justify-center mb-6">
                <WashingMachine className="w-7 h-7 md:w-8 md:h-8 text-[#FF6B4A]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Quick Wash</h3>
              <p className="text-white/90 leading-relaxed text-sm md:text-base">
                Fast and efficient washing service. Clean your garments using
                premium detergents in record time.
              </p>
            </div>

            {/* Fresh Press - Yellow */}
            <div className="bg-[#FDD835] rounded-3xl p-6 md:p-8 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/90 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 text-[#FDD835]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Fresh Press</h3>
              <p className="text-white/90 leading-relaxed text-sm md:text-base">
                Accurate and sharp, top-level ironing service using superior
                equipment for a perfect finish.
              </p>
            </div>

            {/* Stain Removal - Blue */}
            <div className="bg-[#4A90E2] rounded-3xl p-6 md:p-8 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/90 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-[#4A90E2]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Stain Removal</h3>
              <p className="text-white/90 leading-relaxed text-sm md:text-base">
                We can handle all types of stains. Expert treatment that
                consistently surpasses expectations.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}