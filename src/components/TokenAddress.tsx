
import React, { useState } from "react";
import { Copy } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface TokenAddressProps {
  className?: string;
}

const TokenAddress: React.FC<TokenAddressProps> = ({ className }) => {
  const isMobile = useIsMobile();
  
  // Token address with ellipsis
  const tokenAddress = "dsdfsd...sdfsdfsd";
  const fullTokenAddress = "dsdfsd8f7sd8f7sd8f7sd8f7sd8f7sdfsdfsd";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(fullTokenAddress);
    toast.success("Token address copied to clipboard!", {
      duration: 2000,
    });
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <button 
        onClick={handleCopy}
        className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] flex items-center hover:bg-accent/10 transition-all duration-300 transform hover:scale-105"
      >
        <span className="text-xs sm:text-sm font-mono">{tokenAddress}</span>
        <Copy size={isMobile ? 14 : 16} className="ml-2" />
      </button>
    </div>
  );
};

export default TokenAddress;
