
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TokenAddressProps {
  className?: string;
}

const TokenAddress: React.FC<TokenAddressProps> = ({ className }) => {
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();
  
  // Token address with ellipsis
  const tokenAddress = "dsdfsd...sdfsdfsd";
  const fullTokenAddress = "dsdfsd8f7sd8f7sd8f7sd8f7sd8f7sdfsdfsd";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(fullTokenAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] flex items-center">
        <span className="text-xs sm:text-sm font-mono">{tokenAddress}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCopy} 
          className="ml-2 hover:bg-accent rounded-full h-8 w-8 p-0"
        >
          <span className="sr-only">Copy token address</span>
          <Copy size={isMobile ? 14 : 16} />
        </Button>
      </div>
      {copied && (
        <span className="absolute top-full mt-1 text-xs text-accent-foreground animate-fade-in">
          Copied!
        </span>
      )}
    </div>
  );
};

export default TokenAddress;
