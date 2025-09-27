import RobotStatus from '../RobotStatus';
import { useState } from 'react';

export default function RobotStatusExample() {
  const [isActive, setIsActive] = useState(false); // todo: remove mock functionality

  return (
    <RobotStatus
      isActive={isActive}
      onStart={() => {
        console.log('Robot start triggered');
        setIsActive(true);
      }}
      onStop={() => {
        console.log('Robot stop triggered');
        setIsActive(false);
      }}
      onEmergencyStop={() => {
        console.log('Emergency stop triggered');
        setIsActive(false);
      }}
      tradesCount={23} // todo: remove mock functionality
      lastSignal="buy" // todo: remove mock functionality
      lastSignalTime="14:32:15" // todo: remove mock functionality
    />
  );
}