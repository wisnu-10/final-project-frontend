import { LucideIcon } from "lucide-react";

interface FloatingInfoCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  position: string; // Tailwind classes for positioning
  animationClass?: string; // Custom animation class, defaults to 'animate-float'
}

export default function FloatingInfoCard({
  icon: Icon,
  title,
  subtitle,
  position,
  animationClass = "animate-float",
}: FloatingInfoCardProps) {
  return (
    <div
      className={`absolute hidden md:block bg-white rounded-2xl shadow-lg p-4 max-w-[160px] ${animationClass} ${position}`}
    >
      <div className="w-8 h-8 rounded-lg bg-[#2C2826] flex items-center justify-center mb-2">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-xs font-semibold text-[#2C2826]">{title}</p>
      <p className="text-xs text-[#6B6662]">{subtitle}</p>
    </div>
  );
}
