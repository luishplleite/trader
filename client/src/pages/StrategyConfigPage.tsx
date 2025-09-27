import StrategyConfig from "@/components/StrategyConfig";
import { useState } from "react";

export default function StrategyConfigPage() {
  // todo: remove mock functionality
  const [settings, setSettings] = useState({
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
    <div className="p-6 space-y-6" data-testid="page-strategy-config">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Strategy Configuration</h1>
      </div>

      <div className="max-w-2xl">
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
      </div>
    </div>
  );
}