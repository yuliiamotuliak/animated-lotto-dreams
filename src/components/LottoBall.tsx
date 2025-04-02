
import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface LottoBallProps {
  number: number;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  color?: "purple" | "pink" | "blue" | "random";
  className?: string;
  animated?: boolean;
}

const LottoBall: React.FC<LottoBallProps> = ({
  number,
  selected = false,
  onClick,
  size = "md",
  color = "purple",
  className,
  animated = false,
}) => {
  const isMobile = useIsMobile();
  
  // Determine random color for balls
  const randomColor = React.useMemo(() => {
    const colors = ["purple", "pink", "blue"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const actualColor = color === "random" ? randomColor : color;

  // Adjust size based on mobile view with more responsive sizing
  const getSize = () => {
    if (isMobile) {
      if (size === "lg") return "w-14 h-14 text-lg";
      if (size === "md") return "w-10 h-10 text-sm";
      return "w-7 h-7 text-xs";
    }
    
    return {
      sm: "w-10 h-10 text-sm",
      md: "w-14 h-14 text-lg",
      lg: "w-20 h-20 text-2xl",
    }[size];
  };

  const colorClasses = {
    purple: selected 
      ? "bg-lotto-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.6)]" 
      : "bg-lotto-light-purple text-lotto-purple border-2 border-lotto-purple dark:bg-lotto-purple/20 dark:border-lotto-purple/70",
    pink: selected 
      ? "bg-lotto-pink text-white shadow-[0_0_15px_rgba(217,70,239,0.6)]" 
      : "bg-pink-100 text-lotto-pink border-2 border-lotto-pink dark:bg-lotto-pink/20 dark:border-lotto-pink/70",
    blue: selected 
      ? "bg-lotto-blue text-white shadow-[0_0_15px_rgba(14,165,233,0.6)]" 
      : "bg-blue-100 text-lotto-blue border-2 border-lotto-blue dark:bg-lotto-blue/20 dark:border-lotto-blue/70",
  };

  return (
    <div
      className={cn(
        "lotto-ball",
        getSize(),
        colorClasses[actualColor as keyof typeof colorClasses],
        animated && "animate-bounce-in", 
        selected && !animated && "scale-110",
        onClick && "cursor-pointer hover:scale-105 hover:shadow-lg transition-all",
        "transition-all duration-300 shadow-md",
        "transform hover:rotate-y-12 hover:rotate-x-12",
        className
      )}
      onClick={onClick}
    >
      {number}
    </div>
  );
};

export default LottoBall;
