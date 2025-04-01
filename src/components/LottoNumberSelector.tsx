
import React, { useState } from "react";
import LottoBall from "./LottoBall";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface LottoNumberSelectorProps {
  maxNumbers: number;
  numbersToSelect: number;
  onSelectionComplete: (selectedNumbers: number[]) => void;
}

const LottoNumberSelector: React.FC<LottoNumberSelectorProps> = ({
  maxNumbers,
  numbersToSelect,
  onSelectionComplete,
}) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const isMobile = useIsMobile();

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

  const handleRandomSelection = () => {
    const numbers: number[] = [];
    while (numbers.length < numbersToSelect) {
      const num = Math.floor(Math.random() * maxNumbers) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setSelectedNumbers(numbers);
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
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Select Your Numbers</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Choose {numbersToSelect} numbers from 1 to {maxNumbers}
        </p>
        <div className="flex justify-center space-x-2 mt-4">
          <p className="text-xs sm:text-sm bg-secondary rounded-full px-3 py-1">
            {selectedNumbers.length} / {numbersToSelect} selected
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 gap-1 sm:gap-3 justify-items-center mb-6 sm:mb-8">
        {renderNumbers()}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => setSelectedNumbers([])}
          disabled={selectedNumbers.length === 0}
          className="w-full sm:w-auto"
          size={isMobile ? "sm" : "default"}
        >
          Clear
        </Button>
        <Button
          variant="outline"
          onClick={handleRandomSelection}
          className="w-full sm:w-auto"
          size={isMobile ? "sm" : "default"}
        >
          Quick Pick
        </Button>
        <Button
          onClick={() => onSelectionComplete(selectedNumbers)}
          disabled={selectedNumbers.length !== numbersToSelect}
          className="w-full sm:w-auto"
          size={isMobile ? "sm" : "default"}
        >
          Submit Numbers
        </Button>
      </div>
    </div>
  );
};

export default LottoNumberSelector;
