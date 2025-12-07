import { TimeLeft } from '../types';

export const calculateTimeLeft = (month: number, day: number): TimeLeft => {
  const now = new Date();
  let year = now.getFullYear();

  // Create target date for this year
  // Note: Month in Date constructor is 0-indexed (0 = Jan, 11 = Dec)
  let targetDate = new Date(year, month - 1, day, 0, 0, 0);

  // If the date has already passed this year, set it to next year
  if (now.getTime() > targetDate.getTime()) {
    targetDate = new Date(year + 1, month - 1, day, 0, 0, 0);
  }

  const difference = targetDate.getTime() - now.getTime();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

export const formatNumber = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

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

// 计算时间段统计数据
export const calculatePeriodStats = (): PeriodStats[] => {
  const now = new Date();
  
  // 获取今天的开始和结束时间
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);
  
  // 获取本周的开始和结束时间（假设周一为一周开始）
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Monday as start
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - daysSinceMonday);
  weekStart.setHours(0, 0, 0, 0);
  const nextWeekStart = new Date(weekStart);
  nextWeekStart.setDate(nextWeekStart.getDate() + 7);
  
  // 获取本月的开始和结束时间
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  
  // 获取本年的开始和结束时间
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const nextYearStart = new Date(now.getFullYear() + 1, 0, 1);
  
  // 计算各时间段的毫秒数
  const msInDay = 24 * 60 * 60 * 1000;
  const msInWeek = 7 * msInDay;
  const msInYear = (nextYearStart.getTime() - yearStart.getTime());
  const msInMonth = (nextMonthStart.getTime() - monthStart.getTime());
  
  // 计算已过去的时间毫秒数
  const msElapsedToday = now.getTime() - todayStart.getTime();
  const msElapsedWeek = now.getTime() - weekStart.getTime();
  const msElapsedMonth = now.getTime() - monthStart.getTime();
  const msElapsedYear = now.getTime() - yearStart.getTime();
  
  // 计算剩余时间毫秒数
  const msRemainingToday = tomorrowStart.getTime() - now.getTime();
  const msRemainingWeek = nextWeekStart.getTime() - now.getTime();
  const msRemainingMonth = nextMonthStart.getTime() - now.getTime();
  const msRemainingYear = nextYearStart.getTime() - now.getTime();
  
  // 计算百分比
  const percentToday = (msElapsedToday / msInDay) * 100;
  const percentWeek = (msElapsedWeek / msInWeek) * 100;
  const percentMonth = (msElapsedMonth / msInMonth) * 100;
  const percentYear = (msElapsedYear / msInYear) * 100;
  
  // 转换为小时数用于显示
  const hoursElapsedToday = msElapsedToday / (1000 * 60 * 60);
  const hoursRemainingToday = msRemainingToday / (1000 * 60 * 60);
  const hoursElapsedWeek = msElapsedWeek / (1000 * 60 * 60);
  const hoursRemainingWeek = msRemainingWeek / (1000 * 60 * 60);
  const hoursElapsedMonth = msElapsedMonth / (1000 * 60 * 60);
  const hoursRemainingMonth = msRemainingMonth / (1000 * 60 * 60);
  const hoursElapsedYear = msElapsedYear / (1000 * 60 * 60);
  const hoursRemainingYear = msRemainingYear / (1000 * 60 * 60);
  
  return [
    {
      name: '今日',
      elapsed: {
        value: hoursElapsedToday,
        unit: '小时',
        display: `${Math.floor(hoursElapsedToday)} 小时`
      },
      remaining: {
        value: hoursRemainingToday,
        unit: '小时',
        display: `${Math.ceil(hoursRemainingToday)} 小时`
      },
      percentage: percentToday,
      total: 24
    },
    {
      name: '本周',
      elapsed: {
        value: hoursElapsedWeek,
        unit: '小时',
        display: `${Math.floor(hoursElapsedWeek)} 小时`
      },
      remaining: {
        value: hoursRemainingWeek,
        unit: '小时',
        display: `${Math.ceil(hoursRemainingWeek)} 小时`
      },
      percentage: percentWeek,
      total: 168 // 7天 * 24小时
    },
    {
      name: '本月',
      elapsed: {
        value: hoursElapsedMonth,
        unit: '小时',
        display: `${Math.floor(hoursElapsedMonth / 24)} 天`
      },
      remaining: {
        value: hoursRemainingMonth,
        unit: '小时',
        display: `${Math.ceil(hoursRemainingMonth / 24)} 天`
      },
      percentage: percentMonth,
      total: msInMonth / (1000 * 60 * 60) // 总小时数
    },
    {
      name: '本年',
      elapsed: {
        value: hoursElapsedYear,
        unit: '小时',
        display: `${Math.floor(hoursElapsedYear / 24)} 天`
      },
      remaining: {
        value: hoursRemainingYear,
        unit: '小时',
        display: `${Math.ceil(hoursRemainingYear / 24)} 天`
      },
      percentage: percentYear,
      total: msInYear / (1000 * 60 * 60) // 总小时数
    }
  ];
};
