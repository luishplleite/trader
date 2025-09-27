import ConnectionStatus from "@/components/ConnectionStatus";
import RobotStatus from "@/components/RobotStatus";
import ProfitLossCard from "@/components/ProfitLossCard";
import TradingChart from "@/components/TradingChart";
import ActiveTrades from "@/components/ActiveTrades";
import { useState } from "react";

export default function Dashboard() {
  // todo: remove mock functionality - state management
  const [isConnected, setIsConnected] = useState(true);
  const [isRobotActive, setIsRobotActive] = useState(false);
  const [selectedPLPeriod, setSelectedPLPeriod] = useState<"day" | "week" | "month">("day");
  const [timeframe, setTimeframe] = useState<"M1" | "M5" | "M15">("M5");

  // todo: remove mock functionality - mock data
  const mockPLData = [
    { period: "day" as const, profit: 245.80, percentage: 2.5, trades: 12, winRate: 75.0 },
    { period: "week" as const, profit: 1250.30, percentage: 12.8, trades: 67, winRate: 72.5 },
    { period: "month" as const, profit: -320.50, percentage: -3.2, trades: 245, winRate: 68.5 },
  ];

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
    {
      id: "2",
      asset: "GBP/USD",
      type: "put" as const,
      amount: 25,
      entryPrice: 1.2654,
      currentPrice: 1.2648,
      openTime: new Date(Date.now() - 8 * 60000).toISOString(),
      expiryTime: new Date(Date.now() + 7 * 60000).toISOString(),
      status: "winning" as const,
    },
  ];

  return (
    <div className="p-6 space-y-6" data-testid="page-dashboard">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Trading Dashboard</h1>
      </div>

      {/* Top Row - Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ConnectionStatus
          isConnected={isConnected}
          onConnect={() => {
            console.log('Connect triggered');
            setIsConnected(true);
          }}
          onDisconnect={() => {
            console.log('Disconnect triggered');
            setIsConnected(false);
          }}
          accountType="demo"
          balance={10000.50}
        />
        
        <RobotStatus
          isActive={isRobotActive}
          onStart={() => {
            console.log('Robot start triggered');
            setIsRobotActive(true);
          }}
          onStop={() => {
            console.log('Robot stop triggered');
            setIsRobotActive(false);
          }}
          onEmergencyStop={() => {
            console.log('Emergency stop triggered');
            setIsRobotActive(false);
          }}
          tradesCount={23}
          lastSignal="buy"
          lastSignalTime="14:32:15"
        />
        
        <ProfitLossCard
          data={mockPLData}
          selectedPeriod={selectedPLPeriod}
          onPeriodChange={setSelectedPLPeriod}
        />
      </div>

      {/* Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TradingChart
          asset="EUR/USD"
          currentPrice={1.0847}
          priceChange={0.0012}
          priceChangePercent={0.11}
          chartData={generateMockChartData()}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
        />
        
        <ActiveTrades
          trades={mockActiveTrades}
          onCloseTrade={(tradeId) => {
            console.log(`Close trade triggered for: ${tradeId}`);
          }}
        />
      </div>
    </div>
  );
}