import Image from "next/image";
import ctaImage from "../../../../public/laundry-orang-Photoroom.png";

export default function Discount() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-linear-to-b from-[#FFF5F2] to-white">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-[#FF6B4A] rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left - Text */}
            <div className="p-8 md:p-12 lg:p-16 text-white text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Get 50% off your first wash today!
              </h2>
              <p className="text-white/90 mb-8 leading-relaxed text-sm md:text-base max-w-xl mx-auto lg:mx-0">
                We’ll handle the wash, fold, and delivery while you focus on
                what really matters.
              </p>
              <div className="flex justify-center lg:justify-start">
                <button
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#FF6B4A] hover:bg-gray-50 transition-all shadow-lg font-bold text-lg"
                >
                  Claim Your 50% Off
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="absolute right-0 hidden lg:block h-full">
              <Image
                src={ctaImage}
                alt="Woman with laundry"
                className="h-full w-auto object-contain object-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
