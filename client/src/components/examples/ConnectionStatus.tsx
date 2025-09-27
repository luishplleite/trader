import ConnectionStatus from '../ConnectionStatus';
import { useState } from 'react';

export default function ConnectionStatusExample() {
  const [isConnected, setIsConnected] = useState(true); // todo: remove mock functionality

  return (
    <ConnectionStatus
      isConnected={isConnected}
      onConnect={() => {
        console.log('Connect triggered');
        setIsConnected(true);
      }}
      onDisconnect={() => {
        console.log('Disconnect triggered');
        setIsConnected(false);
      }}
      accountType="demo" // todo: remove mock functionality
      balance={10000.50} // todo: remove mock functionality
    />
  );
}