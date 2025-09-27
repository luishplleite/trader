import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TradingChartProps {
  asset: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  chartData: {
    labels: string[];
    prices: number[];
    boIndicator: number[];
    cccIndicator: number[];
    srIndicator: number[];
  };
  timeframe: "M1" | "M5" | "M15";
  onTimeframeChange: (timeframe: "M1" | "M5" | "M15") => void;
}

export default function TradingChart({
  asset,
  currentPrice,
  priceChange,
  priceChangePercent,
  chartData,
  timeframe,
  onTimeframeChange,
}: TradingChartProps) {
  const isPositive = priceChange >= 0;

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'hsl(0 0% 95%)',
          font: {
            family: 'JetBrains Mono',
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: 'hsl(0 0% 11%)',
        titleColor: 'hsl(0 0% 95%)',
        bodyColor: 'hsl(0 0% 95%)',
        borderColor: 'hsl(120 100% 50%)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'hsl(0 0% 60%)',
          font: {
            family: 'JetBrains Mono',
            size: 10,
          },
        },
        grid: {
          color: 'hsl(0 0% 20%)',
        },
      },
      y: {
        ticks: {
          color: 'hsl(0 0% 60%)',
          font: {
            family: 'JetBrains Mono',
            size: 10,
          },
        },
        grid: {
          color: 'hsl(0 0% 20%)',
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 4,
      },
      line: {
        tension: 0.1,
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Price',
        data: chartData.prices,
        borderColor: 'hsl(120 100% 50%)',
        backgroundColor: 'hsla(120 100% 50% / 0.1)',
        borderWidth: 2,
      },
      {
        label: 'BO Indicator',
        data: chartData.boIndicator,
        borderColor: 'hsl(217 91% 60%)',
        backgroundColor: 'hsla(217 91% 60% / 0.1)',
        borderWidth: 1,
        borderDash: [5, 5],
      },
      {
        label: 'CCC',
        data: chartData.cccIndicator,
        borderColor: 'hsl(45 93% 58%)',
        backgroundColor: 'hsla(45 93% 58% / 0.1)',
        borderWidth: 1,
        borderDash: [3, 3],
      },
      {
        label: 'S&R',
        data: chartData.srIndicator,
        borderColor: 'hsl(280 100% 40%)',
        backgroundColor: 'hsla(280 100% 40% / 0.1)',
        borderWidth: 1,
        borderDash: [2, 2],
      },
    ],
  };

  return (
    <Card data-testid="card-trading-chart" className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium">{asset}</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex gap-1">
          {(["M1", "M5", "M15"] as const).map((tf) => (
            <Badge
              key={tf}
              variant={timeframe === tf ? "default" : "secondary"}
              className="cursor-pointer hover-elevate"
              onClick={() => onTimeframeChange(tf)}
              data-testid={`badge-timeframe-${tf}`}
            >
              {tf}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Price Display */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isPositive ? (
                <TrendingUp className="h-5 w-5 text-primary" data-testid="icon-price-up" />
              ) : (
                <TrendingDown className="h-5 w-5 text-destructive" data-testid="icon-price-down" />
              )}
              <span className="text-2xl font-mono font-bold" data-testid="text-current-price">
                ${currentPrice.toFixed(5)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`font-mono text-sm ${
                  isPositive ? "text-primary" : "text-destructive"
                }`}
                data-testid="text-price-change"
              >
                {isPositive ? "+" : ""}{priceChange.toFixed(5)}
              </span>
              <Badge
                variant={isPositive ? "default" : "destructive"}
                data-testid="badge-price-change-percent"
              >
                {isPositive ? "+" : ""}{priceChangePercent.toFixed(2)}%
              </Badge>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64 w-full" data-testid="chart-container">
            <Line data={data} options={chartOptions} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}