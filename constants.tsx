import { GraduationCap, School, PartyPopper, Calendar, Flag, Heart } from 'lucide-react';
import { EventTarget, AppSettings } from './types';
import React from 'react';

// 默认配置
export const TARGET_EVENTS: EventTarget[] = [
  {
    id: 'zhongkao',
    name: '中考',
    month: 6,
    day: 20,
    icon: <School className="w-6 h-6" />,
  },
  {
    id: 'gaokao',
    name: '高考',
    month: 6,
    day: 7,
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: 'spring_festival',
    name: '春节',
    month: 2,
    day: 17,
    icon: <PartyPopper className="w-6 h-6" />,
  },
  {
    id: 'new_year',
    name: '元旦',
    month: 1,
    day: 1,
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    id: 'national_day',
    name: '国庆节',
    month: 10,
    day: 1,
    icon: <Flag className="w-6 h-6" />,
  },
];

// 应用配置
export const APP_CONFIG = {
  // 四季倒计时卡片的位置：'first' 表示排在第一个，'last' 表示排在最后一个（默认）
  seasonCardPosition: 'last' as 'first' | 'last',
};

export const DEFAULT_SETTINGS: AppSettings = {
  bgType: 'image',
  bgColor: '#3b82f6',
  bgImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&w=2940&q=80', // 默认使用unsplash上的图片
  blurLevel: 12,
  overlayOpacity: 20,
  textColor: 'white',
};
