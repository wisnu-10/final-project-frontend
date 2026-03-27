import { Award, Clock, Shield, Sparkles } from "lucide-react";
import Image from "next/image";
import heroImage from "../../../../public/laundry-Photoroom.png";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 px-8 bg-gradient-to-b from-[#FFF5F2] to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col gap- items-center">
          {/* Left Content */}
          <div className="space-y-5 flex flex-col items-center">
            <h1 className="text-5xl lg:text-6xl text-[#2C2826] leading-tight text-center">
              Delivering excellence
              <br />
              every step ahead
            </h1>

            <p className="text-base text-[#6B6662] leading-relaxed text-center">
              Experience premium laundry service delivered to your doorstep.
              <br />
              Quality care for your clothes, convenience for your life.
            </p>

            <div className="flex gap-4">
              <Link
                href="/login"
                className="px-8 py-3 rounded-full bg-[#FF6B4A] text-white hover:bg-[#FF5533] transition-all shadow-lg"
              >
                Get Started
              </Link>
              <a
                href="#contact"
                className="px-8 py-3 rounded-full border-2 border-[#E5DDD3] text-[#6B6662] hover:border-[#FF6B4A] hover:text-[#FF6B4A] transition-all"
              >
                Contact with us
              </a>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="relative">
            <div className="absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF6B4A] rounded-full blur-[120px] opacity-50 z-0 pointer-events-none" />
            <Image
              src={heroImage}
              alt="Colorful laundry stack"
              className="relative w-full h-auto max-w-lg mx-auto drop-shadow-2xl"
            />

            {/* Floating Info Cards */}
            <div className="absolute hidden md:block top-8 -left-70 bg-white rounded-2xl shadow-lg p-4 max-w-[160px] animate-bounce">
              <div className="w-8 h-8 rounded-lg bg-[#2C2826] flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-semibold text-[#2C2826]">
                Quality and accurate
              </p>
              <p className="text-xs text-[#6B6662]">services for you</p>
            </div>

            <div className="absolute hidden md:block top-8 -right-70 bg-white rounded-2xl shadow-lg p-4 max-w-[160px] animate-bounce">
              <div className="w-8 h-8 rounded-lg bg-[#2C2826] flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-semibold text-[#2C2826]">24 Hours</p>
              <p className="text-xs text-[#6B6662]">available to serve</p>
            </div>

            <div className="absolute hidden md:block bottom-32 -left-70 bg-white rounded-2xl shadow-lg p-4 max-w-[160px] animate-bounce">
              <div className="w-8 h-8 rounded-lg bg-[#2C2826] flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-semibold text-[#2C2826]">
                Clothes will become clean and neat
              </p>
            </div>

            <div className="absolute hidden md:block bottom-8 -right-70 bg-white rounded-2xl shadow-lg p-4 max-w-[160px] animate-bounce">
              <div className="w-8 h-8 rounded-lg bg-[#2C2826] flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-semibold text-[#2C2826]">
                Warning helpers for quick reply
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
