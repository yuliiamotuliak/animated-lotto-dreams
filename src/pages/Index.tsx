
import React from "react";
import LottoGame from "@/components/LottoGame";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";
import TokenAddress from "@/components/TokenAddress";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen pb-8 sm:pb-16 bg-gradient-to-br from-background to-muted transition-colors duration-300">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 sm:py-6 mb-4 sm:mb-8 sticky top-0 z-10 transition-colors shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4 relative">
          <div className="absolute right-4 sm:right-8">
            <ThemeToggle />
          </div>
          <div className="text-center w-full">
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-lotto-purple via-lotto-pink to-lotto-blue bg-clip-text text-transparent transform-style-3d perspective-1000 rotate-x-1 transition-transform duration-500 hover:scale-105">
              Magic Lotto
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 max-w-xl mx-auto font-medium italic bg-gradient-to-r from-foreground/80 to-foreground/60 bg-clip-text">
              Pick your lucky numbers and win big in the ultimate lottery experience!
            </p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-2 sm:px-4">
        <TokenAddress className="mb-6" />
        
        <Card className="border border-border/40 shadow-xl bg-card/50 backdrop-blur-sm transform perspective-1000 transition-all duration-500 hover:shadow-2xl hover:rotate-x-1">
          <CardContent className={isMobile ? "p-3" : "p-6"}>
            <LottoGame />
          </CardContent>
        </Card>
      </main>
      
      <footer className="mt-10 sm:mt-20 py-4 sm:py-6 border-t border-border/40 bg-background/50 transition-colors">
        <div className="container mx-auto text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Magic Lotto. This is a demo application.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
