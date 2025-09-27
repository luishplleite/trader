import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, X, TrendingUp, TrendingDown } from "lucide-react";

interface Trade {
  id: string;
  asset: string;
  type: "call" | "put";
  amount: number;
  entryPrice: number;
  currentPrice: number;
  openTime: string;
  expiryTime: string;
  status: "open" | "winning" | "losing";
}

interface ActiveTradesProps {
  trades: Trade[];
  onCloseTrade: (tradeId: string) => void;
}

export default function ActiveTrades({ trades, onCloseTrade }: ActiveTradesProps) {
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const calculatePnL = (trade: Trade) => {
    const priceDiff = trade.currentPrice - trade.entryPrice;
    const multiplier = trade.type === "call" ? 1 : -1;
    return priceDiff * multiplier * trade.amount;
  };

  return (
    <Card data-testid="card-active-trades" className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <Badge variant="secondary" data-testid="badge-trades-count">
            {trades.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {trades.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground" data-testid="text-no-trades">
            No active trades
          </div>
        ) : (
          <div className="space-y-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Asset</TableHead>
                  <TableHead className="text-xs">Type</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">Entry</TableHead>
                  <TableHead className="text-xs">Current</TableHead>
                  <TableHead className="text-xs">P/L</TableHead>
                  <TableHead className="text-xs">Expiry</TableHead>
                  <TableHead className="text-xs w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade) => {
                  const pnl = calculatePnL(trade);
                  const isProfit = pnl >= 0;
                  
                  return (
                    <TableRow key={trade.id} data-testid={`row-trade-${trade.id}`}>
                      <TableCell className="font-medium text-xs">{trade.asset}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {trade.type === "call" ? (
                            <TrendingUp className="h-3 w-3 text-primary" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-destructive" />
                          )}
                          <Badge
                            variant={trade.type === "call" ? "default" : "destructive"}
                            className="text-xs"
                            data-testid={`badge-trade-type-${trade.type}`}
                          >
                            {trade.type.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs" data-testid={`text-amount-${trade.id}`}>
                        ${trade.amount}
                      </TableCell>
                      <TableCell className="font-mono text-xs" data-testid={`text-entry-price-${trade.id}`}>
                        {trade.entryPrice.toFixed(5)}
                      </TableCell>
                      <TableCell className="font-mono text-xs" data-testid={`text-current-price-${trade.id}`}>
                        {trade.currentPrice.toFixed(5)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-mono text-xs ${
                            isProfit ? "text-primary" : "text-destructive"
                          }`}
                          data-testid={`text-pnl-${trade.id}`}
                        >
                          {isProfit ? "+" : ""}{pnl.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs" data-testid={`text-expiry-${trade.id}`}>
                        {formatTime(trade.expiryTime)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onCloseTrade(trade.id)}
                          data-testid={`button-close-trade-${trade.id}`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}