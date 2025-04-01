
import React, { useEffect, useState } from "react";
import LottoBall from "./LottoBall";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface LottoResultsProps {
  playerNumbers: number[];
  onPlayAgain: () => void;
}

const LottoResults: React.FC<LottoResultsProps> = ({
  playerNumbers,
  onPlayAgain,
}) => {
  const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [matchedNumbers, setMatchedNumbers] = useState<number[]>([]);

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
    
    for (let i = 0; i < 50; i++) {
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

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      {renderConfetti()}
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Winning Numbers</h2>
        <div className="flex justify-center flex-wrap gap-3 mb-6">
          {winningNumbers.map((number, index) => (
            <LottoBall
              key={number}
              number={number}
              selected={true}
              animated={index < revealedCount}
              size="lg"
              color="purple"
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Numbers</h2>
        <div className="flex justify-center flex-wrap gap-3">
          {playerNumbers.map((number) => (
            <LottoBall
              key={number}
              number={number}
              selected={matchedNumbers.includes(number)}
              size="md"
              color={matchedNumbers.includes(number) ? "purple" : "blue"}
            />
          ))}
        </div>
      </div>

      {revealedCount === winningNumbers.length && (
        <div className="mt-8 animate-bounce-in">
          <div className="text-xl font-bold mb-2 flex items-center justify-center">
            <Star className="text-yellow-400 mr-2" />
            <span>{getPrizeMessage()}</span>
            <Star className="text-yellow-400 ml-2" />
          </div>
          <p className="text-muted-foreground mb-6">
            You matched {matchedNumbers.length} out of 6 numbers
          </p>
          <Button onClick={onPlayAgain} size="lg">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default LottoResults;
