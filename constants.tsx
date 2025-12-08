import { GraduationCap, School, PartyPopper, Calendar, Flag, Heart } from 'lucide-react';
import { EventTarget, AppSettings } from './types';
import React from 'react';

// 默认配置
export const TARGET_EVENTS: EventTarget[] = [
  {
    id: 'zhongkao',
    name: '中考倒计时',
    month: 6,
    day: 20,
    icon: <School className="w-6 h-6" />,
    description: '检验九年义务教育成果',
  },
  {
    id: 'gaokao',
    name: '高考倒计时',
    month: 6,
    day: 7,
    icon: <GraduationCap className="w-6 h-6" />,
    description: '人生的重要转折点',
  },
  {
    id: 'spring_festival',
    name: '春节倒计时',
    month: 2,
    day: 17,
    icon: <PartyPopper className="w-6 h-6" />,
    description: '阖家团圆的传统佳节',
  },
  {
    id: 'new_year',
    name: '元旦倒计时',
    month: 1,
    day: 1,
    icon: <Calendar className="w-6 h-6" />,
    description: '新年的第一天',
  },
  {
    id: 'national_day',
    name: '国庆节倒计时',
    month: 10,
    day: 1,
    icon: <Flag className="w-6 h-6" />,
    description: '庆祝祖国成立的日子',
  },
  {
    id: 'home-page',
    name: '主页存活了',
    month: 8,
    day: 20,
    type: 'countup',
    startYear: 2024,
    icon: <Heart className="w-6 h-6" />,
    description: 'gts.us.kg',
  },
  {
    id: 'blog-page',
    name: '博客存活了',
    month: 1,
    day: 15,
    type: 'countup',
    startYear: 2025,
    icon: <Heart className="w-6 h-6" />,
    description: 'blog.gts.us.kg',
  },
  {
    id: 'countdown-page',
    name: '本站点存活了',
    month: 12,
    day: 8,
    type: 'countup',
    startYear: 2025,
    icon: <Heart className="w-6 h-6" />,
    description: 'countdown.gts.us.kg',
  },
];

// 应用配置
export const APP_CONFIG = {
  // 四季倒计时卡片的位置：
  // 'first' 表示排在第一个
  // 'last' 表示排在最后一个（默认）
  // 数字表示具体位置索引（从0开始）
  seasonCardPosition: 5 as 'first' | 'last' | number,
  
  // 是否启用移动端和桌面端不同的背景图片
  enableDifferentBackgrounds: true,
  
  // 移动端背景图片路径（当enableDifferentBackgrounds为true时生效）
  mobileBgImage: '/background1.avif',
};

export const DEFAULT_SETTINGS: AppSettings = {
  bgType: 'image',
  bgColor: '#3b82f6',
  bgImage: '/background1.jpg', // 使用本地背景图片
  blurLevel: 12,
  overlayOpacity: 20,
  textColor: 'white',
};