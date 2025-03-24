'use client';

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

// Create a DateProvider component that provides the date formatting capabilities
export function DateProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

// Helper function to format dates consistently throughout the app
export function formatDate(date: Date | number, formatStr: string = "PPP"): string {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  return format(date, formatStr);
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
