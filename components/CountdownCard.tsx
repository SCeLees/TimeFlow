import React, { useEffect, useState } from 'react';
import { calculateTimeLeft, formatNumber } from '../utils/time';
import { EventTarget, AppSettings } from '../types';

interface CountdownCardProps {
  event: EventTarget;
  settings: AppSettings;
}

const CountdownCard: React.FC<CountdownCardProps> = ({ event, settings }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(
    event.month, 
    event.day, 
    event.type || 'countdown',
    event.startYear
  ));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(
        event.month, 
        event.day, 
        event.type || 'countdown',
        event.startYear
      ));
    }, 1000);

    return () => clearInterval(timer);
  }, [event.month, event.day, event.type, event.startYear]);

  // Dynamic styles for glass effect
  const cardStyle: React.CSSProperties = {
    backdropFilter: `blur(${settings.blurLevel}px)`,
    WebkitBackdropFilter: `blur(${settings.blurLevel}px)`,
    backgroundColor: settings.textColor === 'white' 
      ? `rgba(0, 0, 0, ${settings.overlayOpacity / 100})` 
      : `rgba(255, 255, 255, ${settings.overlayOpacity / 100})`,
    color: settings.textColor,
    borderColor: settings.textColor === 'white' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)',
  };

  return (
    <div 
      className="rounded-2xl border p-4 md:p-6 w-full transition-all duration-300 hover:scale-[1.02] shadow-2xl h-full"
      style={cardStyle}
    >
      <div className="flex items-center gap-2 mb-4 opacity-90">
        <span className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
          {event.icon}
        </span>
        <h2 className="text-xl font-bold tracking-wide">{event.name}</h2>
      </div>

      <div className="grid grid-cols-4 gap-1 text-center">
        <TimeUnit value={timeLeft.days} label="天" settings={settings} />
        <TimeUnit value={timeLeft.hours} label="时" settings={settings} />
        <TimeUnit value={timeLeft.minutes} label="分" settings={settings} />
        <TimeUnit value={timeLeft.seconds} label="秒" settings={settings} />
      </div>
      
      <div className="mt-4 text-center">
        {event.description && (
          <div className="text-sm opacity-70 font-medium mb-1">
            {event.description}
          </div>
        )}
        <div className="text-sm opacity-60 font-medium">
          {event.type === 'countup' && event.startYear ? (
            `开始日期: ${event.startYear}年${event.month}月${event.day}日`
          ) : (
            `目标日期: ${new Date().getFullYear() + (new Date().getMonth() + 1 > event.month || (new Date().getMonth() + 1 === event.month && new Date().getDate() > event.day) ? 1 : 0)}年${event.month}月${event.day}日`
          )}
        </div>
      </div>
    </div>
  );
};

interface TimeUnitProps {
  value: number;
  label: string;
  settings: AppSettings;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label, settings }) => (
  <div className="flex flex-col items-center">
    <div 
      className="text-2xl sm:text-2xl lg:text-2xl xl:text-3xl font-black mb-1 tabular-nums tracking-tight"
      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
    >
      {formatNumber(value)}
    </div>
    <div className="text-xs font-medium opacity-70 uppercase tracking-widest">
      {label}
    </div>
  </div>
);

export default CountdownCard;