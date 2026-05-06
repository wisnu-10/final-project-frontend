"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import Logo from "../../../../public/logo-Photoroom.png";
import Image from "next/image";
import Login from "./components/loginForm";
import Register from "./components/registerForm";
import RightPanelInformation from "./components/rightPaneInformation";
import BackLink from "@/components/backLink";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultTab =
    searchParams.get("tab") === "register" ? "register" : "login";

  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);

  useEffect(() => {
    const tab = searchParams.get("tab") === "register" ? "register" : "login";
    setActiveTab(tab);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex bg-[#FAF6F1]">
      {/* LEFT PANEL */}
      <RightPanelInformation />

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12">
        {/* BACK */}
        <div className="w-full max-w-md mb-6">
          <BackLink link="/" page="Home" />
        </div>

        <div className="w-full max-w-md">
          {/* TAB SWITCH */}
          <div className="flex rounded-xl p-1 mb-8 bg-white border border-[#E5DDD3]">
            {(["login", "register"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-2.5 rounded-lg text-sm capitalize"
                style={{
                  background: activeTab === tab ? "#FF6B4A" : "transparent",
                  color: activeTab === tab ? "#fff" : "#6B6662",
                }}
              >
                {tab === "login" ? "Log In" : "Create Account"}
              </button>
            ))}
          </div>

          {activeTab === "login" && <Login />}

          {activeTab === "register" && <Register />}
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1]">
          <div className="inline-block w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
