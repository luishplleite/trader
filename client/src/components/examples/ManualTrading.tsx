import ManualTrading from '../ManualTrading';

export default function ManualTradingExample() {
  return (
    <ManualTrading
      currentPrice={1.0847} // todo: remove mock functionality
      asset="EUR/USD" // todo: remove mock functionality
      onExecuteTrade={(trade) => {
        console.log('Execute trade triggered:', trade);
      }}
    />
  );
}