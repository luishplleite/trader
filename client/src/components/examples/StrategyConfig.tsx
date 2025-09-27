import StrategyConfig from '../StrategyConfig';
import { useState } from 'react';

export default function StrategyConfigExample() {
  const [settings, setSettings] = useState({ // todo: remove mock functionality
    selectedAssets: ["EUR/USD", "GBP/USD"],
    marketTypes: ["binary", "digital"] as ("binary" | "digital" | "otc")[],
    entryAmount: 50,
    stopLoss: 500,
    stopGain: 1000,
    takeProfit: 200,
    martingaleEnabled: true,
    martingaleLevels: 3,
    timeframe: "M5" as ("M1" | "M5" | "M15"),
  });

  return (
    <StrategyConfig
      settings={settings}
      onSettingsChange={(newSettings) => {
        console.log('Settings changed:', newSettings);
        setSettings(newSettings);
      }}
      onSave={() => {
        console.log('Save strategy triggered:', settings);
      }}
    />
  );
}