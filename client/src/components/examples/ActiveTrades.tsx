import ActiveTrades from '../ActiveTrades';

export default function ActiveTradesExample() {
  // todo: remove mock functionality
  const mockTrades = [
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
    {
      id: "3",
      asset: "USD/JPY",
      type: "call" as const,
      amount: 75,
      entryPrice: 149.85,
      currentPrice: 149.78,
      openTime: new Date(Date.now() - 3 * 60000).toISOString(),
      expiryTime: new Date(Date.now() + 12 * 60000).toISOString(),
      status: "losing" as const,
    },
  ];

  return (
    <ActiveTrades
      trades={mockTrades}
      onCloseTrade={(tradeId) => {
        console.log(`Close trade triggered for: ${tradeId}`);
      }}
    />
  );
}