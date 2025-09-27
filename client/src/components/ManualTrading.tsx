import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, DollarSign } from "lucide-react";
import { useState } from "react";

interface ManualTradingProps {
  currentPrice: number;
  asset: string;
  onExecuteTrade: (trade: {
    type: "call" | "put";
    amount: number;
    expiryMinutes: number;
  }) => void;
}

export default function ManualTrading({ currentPrice, asset, onExecuteTrade }: ManualTradingProps) {
  const [tradeType, setTradeType] = useState<"call" | "put">("call");
  const [amount, setAmount] = useState<string>("50");
  const [expiryMinutes, setExpiryMinutes] = useState<string>("15");

  const handleExecuteTrade = () => {
    const numAmount = parseFloat(amount);
    const numExpiry = parseInt(expiryMinutes);
    
    if (numAmount > 0 && numExpiry > 0) {
      onExecuteTrade({
        type: tradeType,
        amount: numAmount,
        expiryMinutes: numExpiry,
      });
    }
  };

  const potentialPayout = parseFloat(amount) * 1.85; // 85% payout rate

  return (
    <Card data-testid="card-manual-trading" className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Manual Trading</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Price Display */}
          <div className="p-3 rounded-md bg-muted/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{asset}</span>
              <span className="text-lg font-mono font-bold" data-testid="text-current-price">
                ${currentPrice.toFixed(5)}
              </span>
            </div>
          </div>

          {/* Trade Direction */}
          <div className="space-y-2">
            <Label htmlFor="trade-direction">Direction</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={tradeType === "call" ? "default" : "outline"}
                onClick={() => setTradeType("call")}
                className="w-full"
                data-testid="button-call"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                CALL (Up)
              </Button>
              <Button
                variant={tradeType === "put" ? "destructive" : "outline"}
                onClick={() => setTradeType("put")}
                className="w-full"
                data-testid="button-put"
              >
                <TrendingDown className="mr-2 h-4 w-4" />
                PUT (Down)
              </Button>
            </div>
          </div>

          {/* Trade Amount */}
          <div className="space-y-2">
            <Label htmlFor="trade-amount">Investment Amount ($)</Label>
            <Input
              id="trade-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="50"
              className="font-mono"
              data-testid="input-trade-amount"
            />
          </div>

          {/* Expiry Time */}
          <div className="space-y-2">
            <Label htmlFor="expiry-time">Expiry Time</Label>
            <Select value={expiryMinutes} onValueChange={setExpiryMinutes}>
              <SelectTrigger data-testid="select-expiry-time">
                <SelectValue placeholder="Select expiry time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Minute</SelectItem>
                <SelectItem value="5">5 Minutes</SelectItem>
                <SelectItem value="15">15 Minutes</SelectItem>
                <SelectItem value="30">30 Minutes</SelectItem>
                <SelectItem value="60">1 Hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Trade Summary */}
          <div className="p-3 rounded-md bg-muted/50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Investment:</span>
              <span className="font-mono" data-testid="text-investment">
                ${parseFloat(amount || "0").toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Potential Payout:</span>
              <span className="font-mono text-primary" data-testid="text-payout">
                ${potentialPayout.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Potential Profit:</span>
              <span className="font-mono text-primary" data-testid="text-profit">
                ${(potentialPayout - parseFloat(amount || "0")).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Execute Trade Button */}
          <Button
            onClick={handleExecuteTrade}
            className="w-full"
            size="lg"
            variant={tradeType === "call" ? "default" : "destructive"}
            disabled={!amount || parseFloat(amount) <= 0}
            data-testid="button-execute-trade"
          >
            <Clock className="mr-2 h-4 w-4" />
            Execute {tradeType.toUpperCase()} Trade
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}