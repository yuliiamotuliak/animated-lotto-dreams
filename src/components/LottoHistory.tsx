
import React from "react";
import LottoBall from "./LottoBall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface LottoTicket {
  id: number;
  date: string;
  numbers: number[];
  winningNumbers: number[];
}

interface LottoHistoryProps {
  tickets: LottoTicket[];
}

const LottoHistory: React.FC<LottoHistoryProps> = ({ tickets }) => {
  const isMobile = useIsMobile();
  
  if (tickets.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 sm:mt-12 px-2 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Your Recent Tickets</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {tickets.map((ticket) => {
          const matchedNumbers = ticket.numbers.filter(num => 
            ticket.winningNumbers.includes(num)
          );
          
          return (
            <Card key={ticket.id} className="overflow-hidden">
              <CardHeader className="p-3 sm:pb-2">
                <CardTitle className="flex justify-between items-center text-sm sm:text-base">
                  <span>{ticket.date}</span>
                  <span className="text-xs sm:text-sm font-medium bg-secondary rounded-full px-2 sm:px-3 py-1">
                    {matchedNumbers.length} matches
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground mr-1 sm:mr-2">Your numbers:</span>
                  {ticket.numbers.map((num) => (
                    <LottoBall
                      key={num}
                      number={num}
                      size="sm"
                      selected={ticket.winningNumbers.includes(num)}
                      color={ticket.winningNumbers.includes(num) ? "purple" : "blue"}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground mr-1 sm:mr-2">Winning numbers:</span>
                  {ticket.winningNumbers.map((num) => (
                    <LottoBall 
                      key={num} 
                      number={num} 
                      size="sm" 
                      color="purple"
                      selected
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LottoHistory;
