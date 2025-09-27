import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { History, Download, Filter, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

interface HistoryTrade {
  id: string;
  asset: string;
  type: "call" | "put";
  amount: number;
  entryPrice: number;
  exitPrice: number;
  openTime: string;
  closeTime: string;
  result: "win" | "loss";
  profit: number;
  market: "binary" | "digital" | "otc";
}

export default function TradeHistory() {
  const [filterAsset, setFilterAsset] = useState<string>("all"); // todo: remove mock functionality
  const [filterResult, setFilterResult] = useState<string>("all"); // todo: remove mock functionality
  const [dateFrom, setDateFrom] = useState<string>(""); // todo: remove mock functionality
  const [dateTo, setDateTo] = useState<string>(""); // todo: remove mock functionality

  // todo: remove mock functionality
  const mockTrades: HistoryTrade[] = [
    {
      id: "1",
      asset: "EUR/USD",
      type: "call",
      amount: 50,
      entryPrice: 1.0845,
      exitPrice: 1.0852,
      openTime: "2024-01-15T14:30:00Z",
      closeTime: "2024-01-15T14:45:00Z",
      result: "win",
      profit: 42.50,
      market: "binary",
    },
    {
      id: "2",
      asset: "GBP/USD",
      type: "put",
      amount: 75,
      entryPrice: 1.2654,
      exitPrice: 1.2648,
      openTime: "2024-01-15T15:20:00Z",
      closeTime: "2024-01-15T15:35:00Z",
      result: "win",
      profit: 63.75,
      market: "digital",
    },
    {
      id: "3",
      asset: "USD/JPY",
      type: "call",
      amount: 100,
      entryPrice: 149.85,
      exitPrice: 149.78,
      openTime: "2024-01-15T16:10:00Z",
      closeTime: "2024-01-15T16:25:00Z",
      result: "loss",
      profit: -100,
      market: "binary",
    },
    {
      id: "4",
      asset: "EUR/USD",
      type: "put",
      amount: 25,
      entryPrice: 1.0847,
      exitPrice: 1.0841,
      openTime: "2024-01-15T17:05:00Z",
      closeTime: "2024-01-15T17:20:00Z",
      result: "win",
      profit: 21.25,
      market: "otc",
    },
    {
      id: "5",
      asset: "AUD/USD",
      type: "call",
      amount: 60,
      entryPrice: 0.6789,
      exitPrice: 0.6785,
      openTime: "2024-01-15T18:15:00Z",
      closeTime: "2024-01-15T18:30:00Z",
      result: "loss",
      profit: -60,
      market: "binary",
    },
  ];

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // Calculate statistics
  const totalTrades = mockTrades.length;
  const wins = mockTrades.filter(t => t.result === "win").length;
  const losses = mockTrades.filter(t => t.result === "loss").length;
  const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;
  const totalProfit = mockTrades.reduce((sum, trade) => sum + trade.profit, 0);

  return (
    <div className="p-6 space-y-6" data-testid="page-trade-history">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Trade History</h1>
        <Button variant="outline" data-testid="button-export">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Trades</p>
                <p className="text-2xl font-bold" data-testid="text-total-trades">{totalTrades}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold text-primary" data-testid="text-win-rate">{winRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Wins / Losses</p>
              <div className="flex items-center gap-2">
                <Badge variant="default" data-testid="badge-wins">{wins}W</Badge>
                <Badge variant="destructive" data-testid="badge-losses">{losses}L</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Total P/L</p>
              <p 
                className={`text-2xl font-bold font-mono ${
                  totalProfit >= 0 ? "text-primary" : "text-destructive"
                }`}
                data-testid="text-total-pnl"
              >
                {totalProfit >= 0 ? "+" : ""}${totalProfit.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filter-asset">Asset</Label>
              <Select value={filterAsset} onValueChange={setFilterAsset}>
                <SelectTrigger data-testid="select-filter-asset">
                  <SelectValue placeholder="All Assets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assets</SelectItem>
                  <SelectItem value="EUR/USD">EUR/USD</SelectItem>
                  <SelectItem value="GBP/USD">GBP/USD</SelectItem>
                  <SelectItem value="USD/JPY">USD/JPY</SelectItem>
                  <SelectItem value="AUD/USD">AUD/USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filter-result">Result</Label>
              <Select value={filterResult} onValueChange={setFilterResult}>
                <SelectTrigger data-testid="select-filter-result">
                  <SelectValue placeholder="All Results" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="win">Wins Only</SelectItem>
                  <SelectItem value="loss">Losses Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-from">From Date</Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                data-testid="input-date-from"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-to">To Date</Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                data-testid="input-date-to"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trade History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Entry Price</TableHead>
                <TableHead>Exit Price</TableHead>
                <TableHead>Open Time</TableHead>
                <TableHead>Close Time</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>P/L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTrades.map((trade) => (
                <TableRow key={trade.id} data-testid={`row-trade-${trade.id}`}>
                  <TableCell className="font-medium">{trade.asset}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {trade.type === "call" ? (
                        <TrendingUp className="h-3 w-3 text-primary" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      )}
                      <Badge variant={trade.type === "call" ? "default" : "destructive"}>
                        {trade.type.toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">${trade.amount}</TableCell>
                  <TableCell className="font-mono">{trade.entryPrice.toFixed(5)}</TableCell>
                  <TableCell className="font-mono">{trade.exitPrice.toFixed(5)}</TableCell>
                  <TableCell className="font-mono text-sm">{formatDateTime(trade.openTime)}</TableCell>
                  <TableCell className="font-mono text-sm">{formatDateTime(trade.closeTime)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{trade.market.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={trade.result === "win" ? "default" : "destructive"}>
                      {trade.result.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-mono font-bold ${
                        trade.profit >= 0 ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {trade.profit >= 0 ? "+" : ""}${trade.profit.toFixed(2)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}