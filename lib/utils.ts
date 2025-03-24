import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as USD currency
 * @param value - Number to format
 * @param maximumFractionDigits - Maximum number of decimal places
 */
export function formatCurrency(
  value: number, 
  maximumFractionDigits: number = 2
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits
  }).format(value);
}

/**
 * Format a number as percentage
 * @param value - Number to format (0.1 = 10%)
 * @param maximumFractionDigits - Maximum number of decimal places
 */
export function formatPercent(
  value: number, 
  maximumFractionDigits: number = 2
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits
  }).format(value);
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param length - Maximum length
 */
export function truncateText(text: string, length: number = 10): string {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}

/**
 * Format a blockchain address with ellipsis
 * @param address - Blockchain address to format
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
