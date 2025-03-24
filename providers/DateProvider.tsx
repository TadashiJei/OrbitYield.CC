'use client';

import * as React from "react";
import { format, parse, isValid, addDays, Locale } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { DayPicker } from "react-day-picker";

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
};

// Date adapter context
type DateAdapterContextValue = {
  locale?: Locale;
  utils: typeof utils;
};

const DateAdapterContext = React.createContext<DateAdapterContextValue>({
  locale: enUS,
  utils,
});

// Hook to use the date adapter
export function useDateAdapter() {
  return React.useContext(DateAdapterContext);
}

// Helper function to format dates consistently throughout the app
export function formatDate(date: Date | number, formatStr: string = "PPP"): string {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  return utils.format(date, formatStr);
}

// Function to format a timestamp (in seconds) to a readable date
export function formatTimestamp(timestamp: number, formatStr: string = "PPP"): string {
  return formatDate(timestamp * 1000, formatStr);
}

// Helper to format a date relative to now (e.g., "2 days ago")
export function formatRelative(date: Date | number): string {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  
  if (diffSec < 60) return `${diffSec} seconds ago`;
  if (diffMin < 60) return `${diffMin} minutes ago`;
  if (diffHour < 24) return `${diffHour} hours ago`;
  if (diffDay < 30) return `${diffDay} days ago`;
  
  return formatDate(date, "MMM d, yyyy");
}
