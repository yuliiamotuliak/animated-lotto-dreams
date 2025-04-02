
import React, { useState } from "react";
import LottoBall from "./LottoBall";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface LottoNumberSelectorProps {
  maxNumbers: number;
  numbersToSelect: number;
  onSelectionComplete: (selectedNumbers: number[], betAmount: number) => void;
}

const LottoNumberSelector: React.FC<LottoNumberSelectorProps> = ({
  maxNumbers,
  numbersToSelect,
  onSelectionComplete,
}) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedBetAmount, setSelectedBetAmount] = useState<number>(25000);
  const isMobile = useIsMobile();

  const betAmounts = [
    { value: 25000, label: "25K" },
    { value: 50000, label: "50K" },
    { value: 100000, label: "100K" },
    { value: 200000, label: "200K" },
    { value: 500000, label: "500K" },
    { value: 1000000, label: "1M" },
  ];

  const handleNumberClick = (number: number) => {
    setSelectedNumbers((prev) => {
      if (prev.includes(number)) {
        return prev.filter((n) => n !== number);
      } else {
        if (prev.length < numbersToSelect) {
          return [...prev, number];
        }
        return prev;
      }
    });
  };

  const handleRandomSelection = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default to avoid page refresh
    const numbers: number[] = [];
    while (numbers.length < numbersToSelect) {
      const num = Math.floor(Math.random() * maxNumbers) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setSelectedNumbers(numbers);
  };

  const handleClearSelection = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default to avoid page refresh
    setSelectedNumbers([]);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default to avoid page refresh
    if (selectedNumbers.length === numbersToSelect) {
      onSelectionComplete(selectedNumbers, selectedBetAmount);
    }
  };

  const renderNumbers = () => {
    const balls = [];
    for (let i = 1; i <= maxNumbers; i++) {
      balls.push(
        <LottoBall
          key={i}
          number={i}
          selected={selectedNumbers.includes(i)}
          onClick={() => handleNumberClick(i)}
          color="random"
          size={isMobile ? "sm" : "md"}
        />
      );
    }
    return balls;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-4 sm:mb-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-lotto-purple to-lotto-blue bg-clip-text text-transparent perspective-1000">Select Your Numbers</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Choose {numbersToSelect} numbers from 1 to {maxNumbers}
        </p>
        <div className="flex justify-center space-x-2 mt-4">
          <p className="text-xs sm:text-sm bg-secondary/70 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
            {selectedNumbers.length} / {numbersToSelect} selected
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 gap-1 sm:gap-3 justify-items-center mb-6 sm:mb-8 perspective-2000">
        {renderNumbers()}
      </div>

      {/* Bet Amount Selector */}
      <div className="mb-6">
        <h3 className="text-center text-sm sm:text-base font-medium mb-3 bg-gradient-to-r from-lotto-purple to-lotto-pink bg-clip-text text-transparent">Select Bet Amount</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {betAmounts.map((amount) => (
            <Button
              key={amount.value}
              variant={selectedBetAmount === amount.value ? "default" : "outline"}
              onClick={(e) => {
                e.preventDefault(); // Prevent default to avoid page refresh
                setSelectedBetAmount(amount.value);
              }}
              className="btn-3d relative overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              size={isMobile ? "sm" : "default"}
            >
              {amount.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4">
        <Button
          variant="outline"
          onClick={handleClearSelection}
          disabled={selectedNumbers.length === 0}
          className="w-full sm:w-auto btn-3d"
          size={isMobile ? "sm" : "default"}
        >
          Clear
        </Button>
        <Button
          variant="outline"
          onClick={handleRandomSelection}
          className="w-full sm:w-auto btn-3d"
          size={isMobile ? "sm" : "default"}
        >
          Quick Pick
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={selectedNumbers.length !== numbersToSelect}
          className="w-full sm:w-auto btn-3d"
          size={isMobile ? "sm" : "default"}
        >
          Submit Numbers
        </Button>
      </div>
    </div>
  );
};

export default LottoNumberSelector;
