import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Square, AlertTriangle, Zap } from "lucide-react";
import { useState } from "react";

interface RobotStatusProps {
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
  onEmergencyStop: () => void;
  tradesCount: number;
  lastSignal?: "buy" | "sell" | null;
  lastSignalTime?: string;
}

export default function RobotStatus({
  isActive,
  onStart,
  onStop,
  onEmergencyStop,
  tradesCount,
  lastSignal,
  lastSignalTime,
}: RobotStatusProps) {
  return (
    <Card data-testid="card-robot-status" className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Robot Status</CardTitle>
        <div className="flex items-center gap-2">
          {isActive ? (
            <Zap className="h-4 w-4 text-primary animate-pulse" data-testid="icon-robot-active" />
          ) : (
            <Square className="h-4 w-4 text-muted-foreground" data-testid="icon-robot-inactive" />
          )}
          <Badge
            variant={isActive ? "default" : "secondary"}
            data-testid={`badge-robot-${isActive ? "active" : "inactive"}`}
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Trades Today</p>
              <p className="text-2xl font-mono font-bold" data-testid="text-trades-count">
                {tradesCount}
              </p>
            </div>
            {lastSignal && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Signal</p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={lastSignal === "buy" ? "default" : "destructive"}
                    data-testid={`badge-last-signal-${lastSignal}`}
                  >
                    {lastSignal.toUpperCase()}
                  </Badge>
                  {lastSignalTime && (
                    <span className="text-xs text-muted-foreground font-mono" data-testid="text-signal-time">
                      {lastSignalTime}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={isActive ? "destructive" : "default"}
              onClick={isActive ? onStop : onStart}
              className="flex-1"
              data-testid={`button-robot-${isActive ? "stop" : "start"}`}
            >
              {isActive ? (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  Stop Robot
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start Robot
                </>
              )}
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={onEmergencyStop}
              className="hover-elevate"
              data-testid="button-emergency-stop"
            >
              <AlertTriangle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}