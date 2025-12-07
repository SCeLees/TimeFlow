import React from 'react';

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface EventTarget {
  id: string;
  name: string;
  month: number; // 1-12
  day: number;   // 1-31
  icon?: React.ReactNode;
}

export interface AppSettings {
  bgType: 'color' | 'image';
  bgColor: string;
  bgImage: string | null;
  blurLevel: number; // 0 to 40
  overlayOpacity: number; // 0 to 100
  textColor: 'white' | 'black';
}

// 新增的时间段统计接口
export interface PeriodStats {
  name: string;
  elapsed: {
    value: number;
    unit: string;
    display: string;
  };
  remaining: {
    value: number;
    unit: string;
    display: string;
  };
  percentage: number;
  total: number;
}