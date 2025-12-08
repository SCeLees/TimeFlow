import { TimeLeft } from '../types';

export const calculateTimeLeft = (month: number, day: number, type: 'countdown' | 'countup' = 'countdown', startYear?: number): TimeLeft => {
  const now = new Date();
  let targetDate: Date;

  if (type === 'countup' && startYear) {
    // 正计时：从指定年份的日期到现在的时长
    targetDate = new Date(startYear, month - 1, day, 0, 0, 0);
  } else {
    // 倒计时：默认行为
    let year = now.getFullYear();
    targetDate = new Date(year, month - 1, day, 0, 0, 0);

    // 如果目标日期已过，设置为明年
    if (now.getTime() > targetDate.getTime()) {
      targetDate = new Date(year + 1, month - 1, day, 0, 0, 0);
    }
  }

  const difference = type === 'countup' && startYear 
    ? now.getTime() - targetDate.getTime()  // 正计时：现在减去开始时间
    : targetDate.getTime() - now.getTime(); // 倒计时：目标时间减去现在

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

// Helper function to format time display based on duration with one decimal place
export const formatTimeDisplay = (milliseconds: number): string => {
  const seconds = milliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (days >= 1) {
    return `${days.toFixed(1)} 天`;
  } else if (hours >= 1) {
    return `${hours.toFixed(1)} 小时`;
  } else if (minutes >= 1) {
    return `${minutes.toFixed(1)} 分钟`;
  } else {
    return `${seconds.toFixed(1)} 秒`;
  }
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
  
  return [
    {
      name: '今日',
      elapsed: {
        value: msElapsedToday / (1000 * 60 * 60),
        unit: '小时',
        display: formatTimeDisplay(msElapsedToday)
      },
      remaining: {
        value: msRemainingToday / (1000 * 60 * 60),
        unit: '小时',
        display: formatTimeDisplay(msRemainingToday)
      },
      percentage: percentToday,
      total: 24
    },
    {
      name: '本周',
      elapsed: {
        value: msElapsedWeek / (1000 * 60 * 60),
        unit: '小时',
        display: formatTimeDisplay(msElapsedWeek)
      },
      remaining: {
        value: msRemainingWeek / (1000 * 60 * 60),
        unit: '小时',
        display: formatTimeDisplay(msRemainingWeek)
      },
      percentage: percentWeek,
      total: 168 // 7天 * 24小时
    },
    {
      name: '本月',
      elapsed: {
        value: msElapsedMonth / (1000 * 60 * 60),
        unit: '小时',
        display: formatTimeDisplay(msElapsedMonth)
      },
      remaining: {
        value: msRemainingMonth / (1000 * 60 * 60),
        unit: '小时',
        display: formatTimeDisplay(msRemainingMonth)
      },
      percentage: percentMonth,
      total: msInMonth / (1000 * 60 * 60) // 总小时数
    },
    {
      name: '本年',
      elapsed: {
        value: msElapsedYear / (1000 * 60 * 60),
        unit: '小时',
        display: formatTimeDisplay(msElapsedYear)
      },
      remaining: {
        value: msRemainingYear / (1000 * 60 * 60),
        unit: '小时',
        display: formatTimeDisplay(msRemainingYear)
      },
      percentage: percentYear,
      total: msInYear / (1000 * 60 * 60) // 总小时数
    }
  ];
};