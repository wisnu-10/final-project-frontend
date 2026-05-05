import { Sparkles, WashingMachine } from "lucide-react";

export default function Service () {
    return (
      <section
        id="service"
        className="py-20 px-8 bg-gradient-to-b from-[#FFF5F2] to-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2C2826] mb-4">
              Expert laundry services
              <br />
              delivered fresh
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Quick Wash - Orange */}
            <div className="bg-[#FF6B4A] rounded-3xl p-8 text-white">
              <div className="w-16 h-16 bg-white/90 rounded-2xl flex items-center justify-center mb-6">
                <WashingMachine className="w-8 h-8 text-[#FF6B4A]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Quick Wash</h3>
              <p className="text-white/90 leading-relaxed">
                Fast and efficient washing service. Clean your garments using
                premium detergents in record time.
              </p>
            </div>

            {/* Fresh Press - Yellow */}
            <div className="bg-[#FDD835] rounded-3xl p-8 text-white">
              <div className="w-16 h-16 bg-white/90 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#FDD835]"
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
              <h3 className="text-2xl font-bold mb-3">Fresh Press</h3>
              <p className="text-white/90 leading-relaxed">
                Accurate and sharp, top-level ironing service using superior
                equipment for a perfect finish.
              </p>
            </div>

            {/* Stain Removal - Blue */}
            <div className="bg-[#4A90E2] rounded-3xl p-8 text-white">
              <div className="w-16 h-16 bg-white/90 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-[#4A90E2]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Stain Removal</h3>
              <p className="text-white/90 leading-relaxed">
                We can handle all types of stains. Expert treatment that
                consistently surpasses expectations.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}