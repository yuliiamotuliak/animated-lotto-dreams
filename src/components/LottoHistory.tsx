
import React from "react";
import LottoBall from "./LottoBall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  if (tickets.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Recent Tickets</h2>
      
      <div className="space-y-4">
        {tickets.map((ticket) => {
          const matchedNumbers = ticket.numbers.filter(num => 
            ticket.winningNumbers.includes(num)
          );
          
          return (
            <Card key={ticket.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-base">
                  <span>{ticket.date}</span>
                  <span className="text-sm font-medium bg-secondary rounded-full px-3 py-1">
                    {matchedNumbers.length} matches
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-sm text-muted-foreground mr-2">Your numbers:</span>
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
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground mr-2">Winning numbers:</span>
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
