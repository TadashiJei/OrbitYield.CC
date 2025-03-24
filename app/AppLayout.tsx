'use client';

import React, { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";

// List of paths that are part of the app (not marketing site)
const APP_PATHS = [
  '/dashboard',
  '/portfolio',
  '/investments',
  '/opportunities',
  '/transactions',
  '/wallet-management',
  '/settings',
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { address, isConnected } = useAccount();
  const pathname = usePathname();
  
  // Check if the current path is part of the app
  const isAppPath = APP_PATHS.some(path => pathname?.startsWith(path));
  
  // Only show the dashboard header for app paths
  if (!isAppPath) {
    return <>{children}</>;
  }
  
  return (
    <>
      <DashboardHeader walletAddress={isConnected ? address as string : null} />
      {children}
    </>
  );
}
