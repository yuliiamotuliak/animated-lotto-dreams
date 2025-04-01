
import React from "react";
import { cn } from "@/lib/utils";

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
  // Determine random color for balls
  const randomColor = React.useMemo(() => {
    const colors = ["purple", "pink", "blue"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const actualColor = color === "random" ? randomColor : color;

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-lg",
    lg: "w-20 h-20 text-2xl",
  };

  const colorClasses = {
    purple: selected ? "bg-lotto-purple text-white" : "bg-lotto-light-purple text-lotto-purple border-2 border-lotto-purple",
    pink: selected ? "bg-lotto-pink text-white" : "bg-pink-100 text-lotto-pink border-2 border-lotto-pink",
    blue: selected ? "bg-lotto-blue text-white" : "bg-blue-100 text-lotto-blue border-2 border-lotto-blue",
  };

  return (
    <div
      className={cn(
        "lotto-ball",
        sizeClasses[size],
        colorClasses[actualColor as keyof typeof colorClasses],
        animated && "animate-bounce-in", 
        selected && !animated && "scale-110",
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      {number}
    </div>
  );
};

export default LottoBall;
