import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface ProfitLossData {
  period: "day" | "week" | "month";
  profit: number;
  percentage: number;
  trades: number;
  winRate: number;
}

interface ProfitLossCardProps {
  data: ProfitLossData[];
  selectedPeriod: "day" | "week" | "month";
  onPeriodChange: (period: "day" | "week" | "month") => void;
}

export default function ProfitLossCard({ data, selectedPeriod, onPeriodChange }: ProfitLossCardProps) {
  const currentData = data.find(d => d.period === selectedPeriod) || data[0];
  const isProfit = currentData.profit >= 0;

  return (
    <Card data-testid="card-profit-loss" className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Profit & Loss</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Period Selection */}
          <div className="flex gap-1">
            {(["day", "week", "month"] as const).map((period) => (
              <Badge
                key={period}
                variant={selectedPeriod === period ? "default" : "secondary"}
                className="cursor-pointer hover-elevate"
                onClick={() => onPeriodChange(period)}
                data-testid={`badge-period-${period}`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Badge>
            ))}
          </div>

          {/* Main P/L Display */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {isProfit ? (
                <TrendingUp className="h-5 w-5 text-primary" data-testid="icon-profit" />
              ) : (
                <TrendingDown className="h-5 w-5 text-destructive" data-testid="icon-loss" />
              )}
              <span
                className={`text-2xl font-mono font-bold ${
                  isProfit ? "text-primary" : "text-destructive"
                }`}
                data-testid="text-profit-amount"
              >
                ${Math.abs(currentData.profit).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <Badge
                variant={isProfit ? "default" : "destructive"}
                data-testid="badge-profit-percentage"
              >
                {isProfit ? "+" : ""}{currentData.percentage.toFixed(1)}%
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Trades</p>
              <p className="font-mono font-semibold" data-testid="text-trades-total">
                {currentData.trades}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Win Rate</p>
              <p className="font-mono font-semibold" data-testid="text-win-rate">
                {currentData.winRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}