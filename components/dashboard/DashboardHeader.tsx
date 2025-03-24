'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  CircleDollarSign, 
  BarChart3, 
  Wallet, 
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  PieChart
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDisconnect } from "wagmi";

// App navigation items
const appNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Portfolio", href: "/portfolio", icon: PieChart },
  { name: "Investments", href: "/investments", icon: CircleDollarSign },
  { name: "Opportunities", href: "/opportunities", icon: BarChart3 },
  { name: "Transactions", href: "/transactions", icon: BarChart3 },
  { name: "Wallet", href: "/wallet-management", icon: Wallet },
];

export default function DashboardHeader({ walletAddress }: { walletAddress: string | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { disconnect } = useDisconnect();

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Handle user logout
  const handleLogout = () => {
    disconnect();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="App">
        <div className="flex lg:flex-1">
          <Link href="/dashboard" className="-m-1.5 p-1.5">
            <span className="sr-only">OrbitYield</span>
            <div className="flex items-center gap-2">
              <Image 
                src="/Polkadot_Token_Pink.svg" 
                alt="Polkadot Logo" 
                width={32} 
                height={32}
              />
              <span className="text-xl font-bold">OrbitYield</span>
            </div>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {appNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors",
                  pathname === item.href && "text-primary",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
        
        {/* Desktop user menu */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          {walletAddress ? (
            <>
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {walletAddress?.substring(2, 4)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{formatWalletAddress(walletAddress)}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/wallet-management" className="flex items-center gap-2 cursor-pointer">
                      <Wallet className="h-4 w-4" />
                      <span>Wallet</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/">
              <Button variant="outline" size="sm">
                Back to Home
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
            <Menu className="h-6 w-6" aria-hidden={mobileMenuOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ease-in-out",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">OrbitYield</span>
              <div className="flex items-center gap-2">
                <Image 
                  src="/Polkadot_Token_Pink.svg" 
                  alt="Polkadot Logo" 
                  width={32} 
                  height={32}
                />
                <span className="text-xl font-bold">OrbitYield</span>
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          {walletAddress && (
            <div className="mt-4 flex items-center">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {walletAddress?.substring(2, 4)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{formatWalletAddress(walletAddress)}</p>
                <p className="text-gray-500 text-xs">Connected</p>
              </div>
            </div>
          )}
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {appNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors",
                        pathname === item.href && "text-primary bg-primary/5",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              
              <div className="py-6">
                <Link 
                  href="/settings" 
                  className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
                
                {walletAddress ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    Disconnect Wallet
                  </button>
                ) : (
                  <Link 
                    href="/" 
                    className="-mx-3 mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogOut className="h-5 w-5" />
                    Back to Home
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
