
import React, { useState } from "react";
import LottoNumberSelector from "./LottoNumberSelector";
import LottoResults from "./LottoResults";
import LottoHistory from "./LottoHistory";
import TokenAddress from "./TokenAddress";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface LottoTicket {
  id: number;
  date: string;
  numbers: number[];
  winningNumbers: number[];
  betAmount: number;
}

const LottoGame: React.FC = () => {
  const [gameState, setGameState] = useState<"selecting" | "results">("selecting");
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [tickets, setTickets] = useState<LottoTicket[]>([]);
  const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
  const [betAmount, setBetAmount] = useState<number>(25000);
  const isMobile = useIsMobile();

  const handleSelectionComplete = (numbers: number[], selectedBetAmount: number) => {
    setSelectedNumbers(numbers.sort((a, b) => a - b));
    setBetAmount(selectedBetAmount);
    setGameState("results");
    
    // Generate winning numbers
    const winning: number[] = [];
    while (winning.length < 6) {
      const num = Math.floor(Math.random() * 49) + 1;
      if (!winning.includes(num)) {
        winning.push(num);
      }
    }
    
    setWinningNumbers(winning.sort((a, b) => a - b));
    
    // Add to tickets history
    const newTicket = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      numbers: numbers.sort((a, b) => a - b),
      winningNumbers: winning.sort((a, b) => a - b),
      betAmount: selectedBetAmount
    };
    
    setTickets(prev => [newTicket, ...prev].slice(0, 5));
  };

  const handlePlayAgain = () => {
    setGameState("selecting");
    setSelectedNumbers([]);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="mb-5 sm:mb-8">
        <TokenAddress className="mx-auto" />
      </div>
      
      <Card className="w-full max-w-4xl mx-auto mb-6 sm:mb-10 overflow-hidden transform perspective-1000 hover:rotate-x-1 transition-transform duration-300 shadow-xl dark:shadow-lg dark:shadow-primary/10">
        <div className="lotto-gradient h-2 sm:h-3" />
        <CardContent className={isMobile ? "p-3 sm:p-4" : "p-6 sm:p-8"}>
          {gameState === "selecting" ? (
            <LottoNumberSelector
              maxNumbers={49}
              numbersToSelect={6}
              onSelectionComplete={handleSelectionComplete}
            />
          ) : (
            <LottoResults
              playerNumbers={selectedNumbers}
              betAmount={betAmount}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </CardContent>
      </Card>
      
      <LottoHistory tickets={tickets} />
    </div>
  );
};

export default LottoGame;
