
import React, { useEffect, useState } from "react";
import LottoBall from "./LottoBall";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LottoResultsProps {
  playerNumbers: number[];
  betAmount: number;
  onPlayAgain: () => void;
}

const LottoResults: React.FC<LottoResultsProps> = ({
  playerNumbers,
  betAmount,
  onPlayAgain,
}) => {
  const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [matchedNumbers, setMatchedNumbers] = useState<number[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Generate random winning numbers
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 49) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setWinningNumbers(numbers.sort((a, b) => a - b));

    // Find matches
    const matches = playerNumbers.filter(num => numbers.includes(num));
    setMatchedNumbers(matches);

    // Start revealing animation
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRevealedCount(count);
      
      if (count === numbers.length) {
        clearInterval(interval);
        // Show confetti if there are matches
        if (matches.length > 0) {
          setShowConfetti(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playerNumbers]);

  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    const confetti = [];
    const colors = ["bg-lotto-purple", "bg-lotto-pink", "bg-lotto-blue", "bg-yellow-400", "bg-green-400"];
    
    // Reduce number of confetti particles on mobile for better performance
    const particleCount = isMobile ? 25 : 50;
    
    for (let i = 0; i < particleCount; i++) {
      const left = `${Math.random() * 100}%`;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = `${Math.random() * 3}s`;
      
      confetti.push(
        <div 
          key={i}
          className={`confetti ${color}`}
          style={{ 
            left, 
            top: "-20px", 
            animationDelay: delay,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      );
    }
    
    return confetti;
  };

  const getPrizeMessage = () => {
    switch (matchedNumbers.length) {
      case 0:
      case 1:
      case 2:
        return "Better luck next time!";
      case 3:
        return "You won a small prize!";
      case 4:
        return "Congratulations! You won a good prize!";
      case 5:
        return "Amazing! You won a big prize!";
      case 6:
        return "JACKPOT! You hit all numbers!";
      default:
        return "";
    }
  };

  const calculatePrize = () => {
    const multipliers = [0, 0, 0, 5, 20, 100, 10000];
    const multiplier = multipliers[matchedNumbers.length] || 0;
    return multiplier * betAmount;
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      {renderConfetti()}
      
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Winning Numbers</h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          {winningNumbers.map((number, index) => (
            <LottoBall
              key={number}
              number={number}
              selected={true}
              animated={index < revealedCount}
              size={isMobile ? "md" : "lg"}
              color="purple"
            />
          ))}
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Your Numbers</h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {playerNumbers.map((number) => (
            <LottoBall
              key={number}
              number={number}
              selected={matchedNumbers.includes(number)}
              size="sm"
              color={matchedNumbers.includes(number) ? "purple" : "blue"}
            />
          ))}
        </div>
      </div>

      {revealedCount === winningNumbers.length && (
        <div className="mt-6 sm:mt-8 animate-bounce-in">
          <div className="text-lg sm:text-xl font-bold mb-2 flex items-center justify-center">
            <Star className="text-yellow-400 mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>{getPrizeMessage()}</span>
            <Star className="text-yellow-400 ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          
          <div className="text-sm sm:text-base text-muted-foreground mb-2">
            <p>You matched {matchedNumbers.length} out of 6 numbers</p>
            <p className="mt-1">Bet Amount: {(betAmount).toLocaleString()} tokens</p>
            
            {calculatePrize() > 0 && (
              <p className="mt-2 text-green-500 dark:text-green-400 font-bold text-base sm:text-lg">
                Prize: {calculatePrize().toLocaleString()} tokens
              </p>
            )}
          </div>
          
          <Button 
            onClick={onPlayAgain} 
            size={isMobile ? "default" : "lg"}
            className="mt-4 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default LottoResults;
