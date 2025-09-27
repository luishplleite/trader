import TradingChart from '../TradingChart';
import { useState } from 'react';

export default function TradingChartExample() {
  const [timeframe, setTimeframe] = useState<"M1" | "M5" | "M15">("M5"); // todo: remove mock functionality

  // Generate mock chart data // todo: remove mock functionality
  const generateMockData = () => {
    const labels = [];
    const prices = [];
    const boIndicator = [];
    const cccIndicator = [];
    const srIndicator = [];
    
    let basePrice = 1.0850;
    
    for (let i = 0; i < 50; i++) {
      const time = new Date(Date.now() - (49 - i) * 60000);
      labels.push(time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
      
      // Generate realistic price movement
      basePrice += (Math.random() - 0.5) * 0.0010;
      prices.push(basePrice);
      
      // Generate indicator values
      boIndicator.push(basePrice + (Math.random() - 0.5) * 0.0005);
      cccIndicator.push(basePrice + (Math.random() - 0.5) * 0.0008);
      srIndicator.push(basePrice + (Math.random() - 0.5) * 0.0003);
    }
    
    return { labels, prices, boIndicator, cccIndicator, srIndicator };
  };

  const mockChartData = generateMockData();

  return (
    <TradingChart
      asset="EUR/USD" // todo: remove mock functionality
      currentPrice={1.0847} // todo: remove mock functionality
      priceChange={0.0012} // todo: remove mock functionality
      priceChangePercent={0.11} // todo: remove mock functionality
      chartData={mockChartData}
      timeframe={timeframe}
      onTimeframeChange={(tf) => {
        console.log(`Timeframe changed to: ${tf}`);
        setTimeframe(tf);
      }}
    />
  );
}