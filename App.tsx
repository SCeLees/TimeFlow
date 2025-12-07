import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import CountdownCard from './components/CountdownCard';
import SeasonCountdownCard from './components/SeasonCountdownCard';
import SettingsPanel from './components/SettingsPanel';
import TimeStatsCard from './components/TimeStatsCard';
import { TARGET_EVENTS, DEFAULT_SETTINGS, APP_CONFIG } from './constants';
import { AppSettings } from './types';

const App: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 从本地存储加载设置
  useEffect(() => {
    const savedSettings = localStorage.getItem('countdownFocusSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (error) {
        console.error('Failed to parse settings from localStorage:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    // 保存到本地存储
    localStorage.setItem('countdownFocusSettings', JSON.stringify(updatedSettings));
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: settings.bgType === 'color' ? settings.bgColor : 'transparent',
    backgroundImage: settings.bgType === 'image' && settings.bgImage ? `url(${settings.bgImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: settings.textColor
  };

  return (
    <div 
      className="min-h-screen w-full relative transition-all duration-500 ease-in-out overflow-x-hidden"
      style={containerStyle}
    >
      {/* Overlay for better readability on images if needed, though cards handle this mostly */}
      <div className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${settings.bgType === 'image' ? 'bg-black/10' : ''}`} />

      {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
          
          {/* Header */}
          <header className="w-full max-w-5xl mx-auto flex justify-between items-center mb-8 md:mb-12">
            <div className="flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
               <h1 
                 className="text-2xl md:text-4xl font-black tracking-tighter"
                 style={{ textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}
               >
                 倒计时
               </h1>
            </div>
            
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className={`p-3 rounded-full backdrop-blur-md transition-all hover:scale-110 shadow-lg border ${
                settings.textColor === 'white' 
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white' 
                  : 'bg-black/5 hover:bg-black/10 border-black/10 text-black'
              }`}
            >
              <SettingsIcon className="w-6 h-6" />
            </button>
          </header>

          {/* Countdowns Grid */}
          <main className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
            {APP_CONFIG.seasonCardPosition === 'first' && (
              <SeasonCountdownCard settings={settings} />
            )}
            {TARGET_EVENTS.map(event => (
              <CountdownCard 
                key={event.id} 
                event={event} 
                settings={settings} 
              />
            ))}
            {APP_CONFIG.seasonCardPosition === 'last' && (
              <SeasonCountdownCard settings={settings} />
            )}
          </main>

          {/* Time Stats Card */}
          <div className="w-full max-w-5xl mx-auto mt-10">
            <TimeStatsCard settings={settings} />
          </div>
        
        <footer className={`mt-auto text-sm font-medium opacity-60 py-6 text-center w-full`}>
          <div>把握当下，展望未来</div>
          <div className="mt-1">
            MIT License | Copyright © {new Date().getFullYear()}{' '}
            <a 
              href="https://github.com/SCeLees" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              SCeLees
            </a>
          </div>
        </footer>
      </div>

      {/* Settings Modal/Drawer */}
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        updateSettings={updateSettings}
      />
      
      {/* Backdrop for settings */}
      {isSettingsOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
          onClick={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
