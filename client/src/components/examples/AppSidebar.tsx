import AppSidebar from '../AppSidebar';
import { useState } from 'react';

export default function AppSidebarExample() {
  const [isDarkMode, setIsDarkMode] = useState(true); // todo: remove mock functionality

  return (
    <AppSidebar
      isRobotActive={true} // todo: remove mock functionality
      onThemeToggle={() => {
        console.log('Theme toggle triggered');
        setIsDarkMode(!isDarkMode);
      }}
      isDarkMode={isDarkMode}
    />
  );
}