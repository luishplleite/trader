import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, WifiOff, Power, PowerOff } from "lucide-react";
import { useState } from "react";

interface ConnectionStatusProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  accountType: "demo" | "real";
  balance: number;
}

export default function ConnectionStatus({
  isConnected,
  onConnect,
  onDisconnect,
  accountType,
  balance,
}: ConnectionStatusProps) {
  return (
    <Card data-testid="card-connection-status" className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">IQ Option Connection</CardTitle>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Wifi className="h-4 w-4 text-primary" data-testid="icon-connected" />
          ) : (
            <WifiOff className="h-4 w-4 text-muted-foreground" data-testid="icon-disconnected" />
          )}
          <Badge
            variant={isConnected ? "default" : "secondary"}
            data-testid={`badge-status-${isConnected ? "connected" : "disconnected"}`}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isConnected && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account Type:</span>
                <Badge variant={accountType === "real" ? "destructive" : "secondary"} data-testid={`badge-account-${accountType}`}>
                  {accountType === "real" ? "Real Money" : "Demo"}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Balance:</span>
                <span className="font-mono font-semibold" data-testid="text-balance">
                  ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )}
          <Button
            variant={isConnected ? "destructive" : "default"}
            onClick={isConnected ? onDisconnect : onConnect}
            className="w-full"
            data-testid={`button-${isConnected ? "disconnect" : "connect"}`}
          >
            {isConnected ? (
              <>
                <PowerOff className="mr-2 h-4 w-4" />
                Disconnect
              </>
            ) : (
              <>
                <Power className="mr-2 h-4 w-4" />
                Connect to IQ Option
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}