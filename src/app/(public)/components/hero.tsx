"use client";

import { Award, Clock, Shield, Sparkles } from "lucide-react";
import Image from "next/image";
import heroImage from "../../../../public/laundry-Photoroom.png";
import Link from "next/link";
import useAuthStore from "@/stores/useAuthStore";
import FloatingInfoCard from "@/components/floating-info-cards/FloatingInfoCard";

export default function Hero() {
  const { user } = useAuthStore();
  const email = user?.email;

  return (
    <section
      id="home"
      className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-8 bg-linear-to-b from-[#FFF5F2] to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col items-center">
          {/* Left Content */}
          <div className="space-y-5 flex flex-col items-center w-full max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2C2826] font-bold leading-tight text-center">
              Delivering excellence every step ahead
            </h1>

            <p className="text-sm md:text-base text-[#6B6662] leading-relaxed text-center px-4">
              Experience premium laundry service delivered to your doorstep.
              Quality care for your clothes, convenience for your life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Link
                href={email ? "/order-history" : "/auth"}
                className="px-8 py-3 rounded-full bg-[#FF6B4A] text-white hover:bg-[#FF5533] transition-all shadow-lg text-center font-semibold"
              >
                Get Started
              </Link>
              <a
                href="#contact"
                className="px-8 py-3 rounded-full border-2 border-[#E5DDD3] text-[#6B6662] hover:border-[#FF6B4A] hover:text-[#FF6B4A] transition-all text-center font-semibold"
              >
                Contact with us
              </a>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="relative mt-12 md:mt-16 w-full">
            <div className="absolute hidden lg:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF6B4A] rounded-full blur-[120px] opacity-50 z-0 pointer-events-none" />
            <Image
              src={heroImage}
              alt="Colorful laundry stack"
              className="relative w-full h-auto max-w-sm md:max-w-lg mx-auto drop-shadow-2xl"
            />

            {/* Floating Info Cards - Only on large screens to prevent overflow */}
            <div className="hidden lg:block">
              <FloatingInfoCard
                icon={Award}
                title="Quality and accurate"
                subtitle="services for you"
                position="top-8 -left-20 xl:-left-40"
                animationClass="animate-float"
              />
              <FloatingInfoCard
                icon={Shield}
                title="24 Hours"
                subtitle="available to serve"
                position="top-8 -right-20 xl:-right-40"
                animationClass="animate-float-delay-1"
              />
              <FloatingInfoCard
                icon={Sparkles}
                title="Clean and neat"
                subtitle="guaranteed finish"
                position="bottom-32 -left-20 xl:-left-40"
                animationClass="animate-float-delay-2"
              />
              <FloatingInfoCard
                icon={Clock}
                title="Quick reply"
                subtitle="ready to help"
                position="bottom-8 -right-20 xl:-right-40"
                animationClass="animate-float-delay-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
