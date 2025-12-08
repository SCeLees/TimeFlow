import React, { useEffect, useState } from 'react';
import { calculatePeriodStats, PeriodStats } from '../utils/time';
import { AppSettings } from '../types';

interface TimeStatsCardProps {
  settings: AppSettings;
}

const TimeStatsCard: React.FC<TimeStatsCardProps> = ({ settings }) => {
  const [stats, setStats] = useState<PeriodStats[]>([]);

  useEffect(() => {
    // 初始化数据
    setStats(calculatePeriodStats());
    
    // 设置定时器每分钟更新一次数据
    const timer = setInterval(() => {
      setStats(calculatePeriodStats());
    }, 60000); // 每分钟更新一次

    return () => clearInterval(timer);
  }, []);

  // 动态样式
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

  // 进度条样式
  const progressBarStyle = (percentage: number) => ({
    width: `${Math.min(Math.max(percentage, 0), 100)}%`,
    backgroundColor: settings.textColor === 'white' ? '#ffffff' : '#000000',
  });

  return (
    <div 
      className="rounded-2xl border p-6 md:p-8 w-full transition-all duration-300 shadow-2xl h-full"
      style={cardStyle}
    >
      <div className="flex items-center gap-3 mb-6 opacity-90">
        <h2 className="text-2xl font-bold tracking-wide">时间统计</h2>
      </div>

      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="pb-4 last:pb-0 border-b border-opacity-20" 
            style={{ borderColor: settings.textColor === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{stat.name}</span>
              <span className="text-sm opacity-75">剩余 {stat.remaining.display}</span>
            </div>
            
            <div className="relative h-6 rounded-full overflow-hidden mb-2"
              style={{ 
                backgroundColor: settings.textColor === 'white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
              }}>
              <div 
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                style={progressBarStyle(stat.percentage)}
              ></div>
              <div 
                className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                style={{ 
                  color: settings.textColor === 'white' ? '#000000' : '#ffffff'
                }}
              >
                {Math.round(stat.percentage)}%
              </div>
            </div>
            
            <div className="text-xs opacity-75">
              已过 {stat.elapsed.display}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeStatsCard;