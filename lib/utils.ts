import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale: string = 'zh'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', options);
}

export function formatNumber(num: number, decimals: number = 0): string {
  return num.toFixed(decimals);
}

export function getGreeting(hour: number, t: (key: string) => string): string {
  if (hour < 12) return t('greeting.morning');
  if (hour < 18) return t('greeting.afternoon');
  return t('greeting.evening');
}
