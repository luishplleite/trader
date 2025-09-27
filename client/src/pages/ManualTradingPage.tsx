import ManualTrading from "@/components/ManualTrading";
import TradingChart from "@/components/TradingChart";
import ActiveTrades from "@/components/ActiveTrades";
import { useState } from "react";

export default function ManualTradingPage() {
  const [timeframe, setTimeframe] = useState<"M1" | "M5" | "M15">("M5"); // todo: remove mock functionality

  // todo: remove mock functionality - generate chart data
  const generateMockChartData = () => {
    const labels = [];
    const prices = [];
    const boIndicator = [];
    const cccIndicator = [];
    const srIndicator = [];
    
    let basePrice = 1.0850;
    
    for (let i = 0; i < 50; i++) {
      const time = new Date(Date.now() - (49 - i) * 60000);
      labels.push(time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
      
      basePrice += (Math.random() - 0.5) * 0.0010;
      prices.push(basePrice);
      
      boIndicator.push(basePrice + (Math.random() - 0.5) * 0.0005);
      cccIndicator.push(basePrice + (Math.random() - 0.5) * 0.0008);
      srIndicator.push(basePrice + (Math.random() - 0.5) * 0.0003);
    }
    
    return { labels, prices, boIndicator, cccIndicator, srIndicator };
  };

  // todo: remove mock functionality
  const mockActiveTrades = [
    {
      id: "1",
      asset: "EUR/USD",
      type: "call" as const,
      amount: 50,
      entryPrice: 1.0845,
      currentPrice: 1.0852,
      openTime: new Date(Date.now() - 5 * 60000).toISOString(),
      expiryTime: new Date(Date.now() + 10 * 60000).toISOString(),
      status: "winning" as const,
    },
  ];

  return (
    <div className="p-6 space-y-6" data-testid="page-manual-trading">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manual Trading</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trading Panel */}
        <div className="lg:col-span-1">
          <ManualTrading
            currentPrice={1.0847}
            asset="EUR/USD"
            onExecuteTrade={(trade) => {
              console.log('Execute trade triggered:', trade);
            }}
          />
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <TradingChart
            asset="EUR/USD"
            currentPrice={1.0847}
            priceChange={0.0012}
            priceChangePercent={0.11}
            chartData={generateMockChartData()}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </div>
      </div>

      {/* Active Trades */}
      <ActiveTrades
        trades={mockActiveTrades}
        onCloseTrade={(tradeId) => {
          console.log(`Close trade triggered for: ${tradeId}`);
        }}
      />
    </div>
  );
}