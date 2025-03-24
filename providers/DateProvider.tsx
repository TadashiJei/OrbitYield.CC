'use client';

import * as React from "react";
import { format, parse, isValid, addDays, Locale } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { type Matcher, type Formatters } from "react-day-picker";

// Create a context for the date adapter
const DateAdapterContext = React.createContext<DateAdapterContextValue | undefined>(undefined);

// This is a proper implementation of the DateProvider that includes the full
// date adapter implementation required by react-day-picker
export function DateProvider({ children, locale = enUS }: { 
  children: React.ReactNode;
  locale?: Locale;
}) {
  return (
    <DateAdapterContext.Provider value={{ locale, utils }}>
      {children}
    </DateAdapterContext.Provider>
  );
}

// Date utilities used by the date adapter
const utils = {
  // Format dates
  format: (date: Date, formatString: string, locale?: Locale): string => {
    return format(date, formatString, { locale: locale || enUS });
  },
  // Parse a string to a date
  parse: (dateString: string, formatString: string, referenceDate?: Date, locale?: Locale): Date | undefined => {
    const parsedDate = parse(dateString, formatString, referenceDate || new Date(), { locale: locale || enUS });
    return isValid(parsedDate) ? parsedDate : undefined;
  },
  // Add days to a date
  addDays: (date: Date, amount: number): Date => {
    return addDays(date, amount);
  },
  // Check if a date is valid
  isValid: (date: any): boolean => {
    return date instanceof Date && isValid(date);
  },
  // Convert a date object to a string in ISO format
  toISODate: (date: Date): string => {
    return date.toISOString().split('T')[0];
  },
  // Get today's date
  today: (): Date => {
    return new Date();
  },
  // Get current date/time
  now: (): Date => {
    return new Date();
  },
  // Get day of the month
  getDate: (date: Date): number => {
    return date.getDate();
  },
  // Get month (0-11)
  getMonth: (date: Date): number => {
    return date.getMonth();
  },
  // Get year
  getYear: (date: Date): number => {
    return date.getFullYear();
  },
  // Convert date parts to Date object
  setDate: (date: Date, day: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(day);
    return newDate;
  },
  // Set month
  setMonth: (date: Date, month: number): Date => {
    const newDate = new Date(date);
    newDate.setMonth(month);
    return newDate;
  },
  // Set year
  setYear: (date: Date, year: number): Date => {
    const newDate = new Date(date);
    newDate.setFullYear(year);
    return newDate;
  },
  // Get days in month
  getDaysInMonth: (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  },
  // Get start of week
  startOfWeek: (date: Date): Date => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() - day;
    newDate.setDate(diff);
    return newDate;
  },
  // Get end of week
  endOfWeek: (date: Date): Date => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() + (6 - day);
    newDate.setDate(diff);
    return newDate;
  },
  // Compare dates
  isSameDay: (date1: Date, date2: Date): boolean => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  },
  // Formatters for react-day-picker
  formatters: {
    formatDay: (date: Date, options?: { locale?: any }) => format(date, 'd', { locale: options?.locale || enUS }),
    formatMonth: (date: Date, options?: { locale?: any }) => format(date, 'MMMM', { locale: options?.locale || enUS }),
    formatMonthCaption: (date: Date, options?: { locale?: any }) => 
      format(date, 'MMMM yyyy', { locale: options?.locale || enUS }),
    formatWeekday: (date: Date, options?: { locale?: any }) => 
      format(date, 'EEEEEE', { locale: options?.locale || enUS }),
    formatYearCaption: (date: Date, options?: { locale?: any }) => 
      format(date, 'yyyy', { locale: options?.locale || enUS })
  }
};

// Date adapter context
type DateAdapterContextValue = {
  locale?: Locale;
  utils: typeof utils;
};

// Hook to use the date adapter
export function useDateAdapter() {
  const context = React.useContext(DateAdapterContext);
  if (context === undefined) {
    throw new Error("useDateAdapter must be used within a DateProvider");
  }
  return context;
}

// Helper function to format dates consistently throughout the app
export function formatDate(date: Date | number, formatStr: string = "PPP"): string {
  const dateObj = typeof date === 'number' ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: enUS });
}

// Function to format a timestamp (in seconds) to a readable date
export function formatTimestamp(timestamp: number, formatStr: string = "PPP"): string {
  // Handle both millisecond timestamps and second timestamps
  const date = new Date(timestamp > 1000000000000 ? timestamp : timestamp * 1000);
  return format(date, formatStr, { locale: enUS });
}

// Helper to format a date relative to now (e.g., "2 days ago")
export function formatRelative(date: Date | number): string {
  const now = new Date();
  const dateObj = typeof date === 'number' ? new Date(date) : date;
  if (!isValid(dateObj)) return "Invalid date";
  
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSecs < 60) {
    return 'just now';
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  } else {
    return format(dateObj, 'PPP', { locale: enUS });
  }
}
