import Image from "next/image";
import ctaImage from "../../../../public/laundry-orang-Photoroom.png";

export default function Discount() {
  return (
    <section className="py-20 px-8 bg-gradient-to-b from-[#FFF5F2] to-white">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-[#FF6B4A] rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left - Text */}
            <div className="p-12 lg:p-16 text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Get 50% off your first wash today!
              </h2>
              <p className="text-white/90 mb-8 leading-relaxed">
                We’ll handle the wash, fold, and delivery while you focus on
                what really matters.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 rounded-xl bg-white text-[#FF6B4A] hover:bg-gray-50 transition-all shadow-lg font-semibold">
                  Claim Your 50% Off
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="absolute right-0 hidden lg:block">
              <Image
                src={ctaImage}
                alt="Woman with laundry"
                className="w-120 h-auto mx-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
