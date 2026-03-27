"use client";

export default function SocialButton() {
  const handleLogin = (provider: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    window.location.href = `${baseUrl}/auth/${provider.toLowerCase()}`;
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {["Google"].map((provider) => (
        <button
          key={provider}
          type="button"
          onClick={() => handleLogin(provider)}
          className="py-2.5 rounded-xl text-sm bg-white border border-[#E5DDD3] text-[#6B6662] hover:border-[#FF6B4A] hover:text-[#2C2826] transition-all duration-200"
        >
         {provider}
        </button>
      ))}
    </div>
  );
}
