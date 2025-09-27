import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Settings, Plus, X } from "lucide-react";
import { useState } from "react";

interface StrategySettings {
  selectedAssets: string[];
  marketTypes: ("binary" | "digital" | "otc")[];
  entryAmount: number;
  stopLoss: number;
  stopGain: number;
  takeProfit: number;
  martingaleEnabled: boolean;
  martingaleLevels: number;
  timeframe: "M1" | "M5" | "M15";
}

interface StrategyConfigProps {
  settings: StrategySettings;
  onSettingsChange: (settings: StrategySettings) => void;
  onSave: () => void;
}

const availableAssets = [
  "EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD", "NZD/USD"
];

const marketTypes = [
  { value: "binary", label: "Binary Options" },
  { value: "digital", label: "Digital Options" },
  { value: "otc", label: "OTC Markets" },
] as const;

export default function StrategyConfig({ settings, onSettingsChange, onSave }: StrategyConfigProps) {
  const [newAsset, setNewAsset] = useState<string>("");

  const updateSettings = (updates: Partial<StrategySettings>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  const addAsset = (asset: string) => {
    if (asset && !settings.selectedAssets.includes(asset)) {
      updateSettings({
        selectedAssets: [...settings.selectedAssets, asset]
      });
      setNewAsset("");
    }
  };

  const removeAsset = (assetToRemove: string) => {
    updateSettings({
      selectedAssets: settings.selectedAssets.filter(asset => asset !== assetToRemove)
    });
  };

  const toggleMarketType = (marketType: "binary" | "digital" | "otc") => {
    const newMarketTypes = settings.marketTypes.includes(marketType)
      ? settings.marketTypes.filter(type => type !== marketType)
      : [...settings.marketTypes, marketType];
    
    updateSettings({ marketTypes: newMarketTypes });
  };

  return (
    <Card data-testid="card-strategy-config" className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Strategy Configuration</CardTitle>
        <Settings className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Asset Selection */}
          <div className="space-y-3">
            <Label>Trading Assets</Label>
            <div className="flex gap-2">
              <Select value={newAsset} onValueChange={setNewAsset}>
                <SelectTrigger className="flex-1" data-testid="select-add-asset">
                  <SelectValue placeholder="Select asset to add" />
                </SelectTrigger>
                <SelectContent>
                  {availableAssets
                    .filter(asset => !settings.selectedAssets.includes(asset))
                    .map(asset => (
                      <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => addAsset(newAsset)}
                disabled={!newAsset}
                data-testid="button-add-asset"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {settings.selectedAssets.map(asset => (
                <Badge
                  key={asset}
                  variant="default"
                  className="cursor-pointer hover-elevate"
                  data-testid={`badge-asset-${asset.replace("/", "-")}`}
                >
                  {asset}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => removeAsset(asset)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Market Types */}
          <div className="space-y-3">
            <Label>Market Types</Label>
            <div className="grid grid-cols-1 gap-2">
              {marketTypes.map(({ value, label }) => (
                <div key={value} className="flex items-center justify-between">
                  <Label htmlFor={`market-${value}`} className="text-sm">{label}</Label>
                  <Switch
                    id={`market-${value}`}
                    checked={settings.marketTypes.includes(value)}
                    onCheckedChange={() => toggleMarketType(value)}
                    data-testid={`switch-market-${value}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Trading Parameters */}
          <div className="space-y-4">
            <Label>Trading Parameters</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entry-amount">Entry Amount ($)</Label>
                <Input
                  id="entry-amount"
                  type="number"
                  value={settings.entryAmount}
                  onChange={(e) => updateSettings({ entryAmount: parseFloat(e.target.value) || 0 })}
                  className="font-mono"
                  data-testid="input-entry-amount"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeframe">Timeframe</Label>
                <Select
                  value={settings.timeframe}
                  onValueChange={(value: "M1" | "M5" | "M15") => updateSettings({ timeframe: value })}
                >
                  <SelectTrigger data-testid="select-timeframe">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M1">1 Minute</SelectItem>
                    <SelectItem value="M5">5 Minutes</SelectItem>
                    <SelectItem value="M15">15 Minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Risk Management */}
          <div className="space-y-4">
            <Label>Risk Management</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stop-loss">Stop Loss ($)</Label>
                <Input
                  id="stop-loss"
                  type="number"
                  value={settings.stopLoss}
                  onChange={(e) => updateSettings({ stopLoss: parseFloat(e.target.value) || 0 })}
                  className="font-mono"
                  data-testid="input-stop-loss"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stop-gain">Stop Gain ($)</Label>
                <Input
                  id="stop-gain"
                  type="number"
                  value={settings.stopGain}
                  onChange={(e) => updateSettings({ stopGain: parseFloat(e.target.value) || 0 })}
                  className="font-mono"
                  data-testid="input-stop-gain"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="take-profit">Take Profit ($)</Label>
                <Input
                  id="take-profit"
                  type="number"
                  value={settings.takeProfit}
                  onChange={(e) => updateSettings({ takeProfit: parseFloat(e.target.value) || 0 })}
                  className="font-mono"
                  data-testid="input-take-profit"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Martingale Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="martingale">Martingale Strategy</Label>
              <Switch
                id="martingale"
                checked={settings.martingaleEnabled}
                onCheckedChange={(checked) => updateSettings({ martingaleEnabled: checked })}
                data-testid="switch-martingale"
              />
            </div>
            {settings.martingaleEnabled && (
              <div className="space-y-2">
                <Label htmlFor="martingale-levels">Martingale Levels</Label>
                <Input
                  id="martingale-levels"
                  type="number"
                  value={settings.martingaleLevels}
                  onChange={(e) => updateSettings({ martingaleLevels: parseInt(e.target.value) || 1 })}
                  min="1"
                  max="5"
                  className="font-mono"
                  data-testid="input-martingale-levels"
                />
              </div>
            )}
          </div>

          {/* Save Button */}
          <Button
            onClick={onSave}
            className="w-full"
            size="lg"
            data-testid="button-save-strategy"
          >
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}