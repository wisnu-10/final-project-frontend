"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";

export default function SocialButton() {
  const [isLoading, setIsLoading] = useState(false);

  const socialProviders = [
    { name: "Google", icon: <FcGoogle className="w-5 h-5" />, id: "google" },
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      {socialProviders.map((provider) => (
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/auth/${provider.id}`}
          onClick={() => setIsLoading(true)} 
          className="flex items-center justify-center gap-3 py-2.5 rounded-xl text-sm bg-white border border-[#E5DDD3] text-[#6B6662] hover:border-[#FF6B4A] hover:text-[#2C2826] transition-all duration-200"
        >
          {isLoading ? (
            <FiLoader className="w-5 h-5 animate-spin [#6B6662]" />
          ) : (
            provider.icon
          )}
          <span>Continue with {provider.name}</span>
        </a>
      ))}
    </div>
  );
}
