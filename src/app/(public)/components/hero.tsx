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
      className="relative pt-32 pb-20 px-8 bg-gradient-to-b from-[#FFF5F2] to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col gap- items-center">
          {/* Left Content */}
          <div className="space-y-5 flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2C2826] leading-tight text-center">
              Delivering excellence
              <br />
              every step ahead
            </h1>

            <p className="text-sm sm:text-base text-[#6B6662] leading-relaxed text-center">
              Experience premium laundry service delivered to your doorstep.
              <br className="hidden md:flex"/>
              Quality care for your clothes, convenience for your life.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
              <Link
                href={email ? "/order-history" : "/auth"}
                className="px-6 sm:px-8 py-3 rounded-full bg-[#FF6B4A] text-white hover:bg-[#FF5533] transition-all shadow-lg text-center"
              >
                Get Started
              </Link>
              <a
                href="#contact"
                className="px-6 sm:px-8 py-3 rounded-full border-2 border-[#E5DDD3] text-[#6B6662] hover:border-[#FF6B4A] hover:text-[#FF6B4A] transition-all text-center"
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
            <FloatingInfoCard
              icon={Award}
              title="Quality and accurate"
              subtitle="services for you"
              position="top-8 -left-40 md:-left-50 lg:-left-70"
              animationClass="animate-float"
            />
            <FloatingInfoCard
              icon={Shield}
              title="24 Hours"
              subtitle="available to serve"
              position="top-8 -right-40 md:-right-50 lg:-right-70"
              animationClass="animate-float-delay-1"
            />
            <FloatingInfoCard
              icon={Sparkles}
              title="Clothes will become clean and neat"
              subtitle=""
              position="bottom-32 -left-40 md:-left-50 lg:-left-70"
              animationClass="animate-float-delay-2"
            />
            <FloatingInfoCard
              icon={Clock}
              title="Warning helpers for quick reply"
              subtitle=""
              position="bottom-8 -right-40 md:-right-50 lg:-right-70"
              animationClass="animate-float-delay-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
