
import React from "react";
import LottoGame from "@/components/LottoGame";

const Index = () => {
  return (
    <div className="min-h-screen pb-16">
      <header className="bg-white shadow-sm py-6 mb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-lotto-purple via-lotto-pink to-lotto-blue bg-clip-text text-transparent">
            Magic Lotto
          </h1>
          <p className="text-muted-foreground mt-2">
            Pick your lucky numbers and win big!
          </p>
        </div>
      </header>
      
      <main>
        <LottoGame />
      </main>
      
      <footer className="text-center text-sm text-muted-foreground mt-20">
        <p>© {new Date().getFullYear()} Magic Lotto. This is a demo application.</p>
      </footer>
    </div>
  );
};

export default Index;
