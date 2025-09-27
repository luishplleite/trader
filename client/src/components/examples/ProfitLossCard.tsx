import ProfitLossCard from '../ProfitLossCard';
import { useState } from 'react';

export default function ProfitLossCardExample() {
  const [selectedPeriod, setSelectedPeriod] = useState<"day" | "week" | "month">("day"); // todo: remove mock functionality

  const mockData = [ // todo: remove mock functionality
    { period: "day" as const, profit: 245.80, percentage: 2.5, trades: 12, winRate: 75.0 },
    { period: "week" as const, profit: 1250.30, percentage: 12.8, trades: 67, winRate: 72.5 },
    { period: "month" as const, profit: -320.50, percentage: -3.2, trades: 245, winRate: 68.5 },
  ];

  return (
    <ProfitLossCard
      data={mockData}
      selectedPeriod={selectedPeriod}
      onPeriodChange={(period) => {
        console.log(`Period changed to: ${period}`);
        setSelectedPeriod(period);
      }}
    />
  );
}