'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { PreferencesForm } from '@/components/user/PreferencesForm';
import Link from 'next/link';
import {
  ArrowLeft,
  Sliders,
  Bell,
  Shield,
  UserCog,
  Wallet,
  Lock,
  CircleDollarSign,
  Globe
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

export default function SettingsPage() {
  const { address, isConnected, connect } = useWallet();
  const [activeTab, setActiveTab] = useState('preferences');

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-1 mb-4"
        >
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <Separator className="my-4" />

        <Tabs defaultValue="preferences" className="w-full">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <TabsList className="flex flex-col h-auto space-y-1 bg-transparent p-0">
                <TabsTrigger 
                  value="preferences"
                  className="w-full justify-start px-3 py-2 text-left"
                >
                  <Sliders className="h-4 w-4 mr-2" />
                  Yield Preferences
                </TabsTrigger>
                <TabsTrigger 
                  value="account"
                  className="w-full justify-start px-3 py-2 text-left"
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications"
                  className="w-full justify-start px-3 py-2 text-left"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="security"
                  className="w-full justify-start px-3 py-2 text-left"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="wallets"
                  className="w-full justify-start px-3 py-2 text-left"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallets
                </TabsTrigger>
                <TabsTrigger 
                  value="network"
                  className="w-full justify-start px-3 py-2 text-left"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Network Settings
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="md:w-3/4">
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Yield Optimization Preferences</CardTitle>
                    <CardDescription>
                      Configure your risk tolerance, asset preferences, and rebalancing settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!isConnected ? (
                      <div className="text-center py-10">
                        <CircleDollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-medium mb-2">Connect Wallet to Access Settings</h3>
                        <p className="text-muted-foreground mb-4">
                          You need to connect your wallet to view and update your yield preferences.
                        </p>
                        <Button onClick={connect}>Connect Wallet</Button>
                      </div>
                    ) : (
                      <PreferencesForm />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account information, email and linked accounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10">
                      <UserCog className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Account Settings</h3>
                      <p className="text-muted-foreground mb-4">
                        This section is coming soon. You'll be able to manage your profile, email preferences and linked services.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how and when you receive alerts and notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Notification Settings</h3>
                      <p className="text-muted-foreground mb-4">
                        This section is coming soon. You'll be able to customize your notification preferences here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your security preferences, two-factor authentication and sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10">
                      <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Security Settings</h3>
                      <p className="text-muted-foreground mb-4">
                        This section is coming soon. You'll be able to manage your security settings here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="wallets">
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Management</CardTitle>
                    <CardDescription>
                      Manage your connected wallets and wallet permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Wallet Settings</h3>
                      <p className="text-muted-foreground mb-4">
                        Manage your wallet connections and permissions in the wallet management section.
                      </p>
                      <Button asChild>
                        <Link href="/wallet-management">
                          Go to Wallet Management
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="network">
                <Card>
                  <CardHeader>
                    <CardTitle>Network Settings</CardTitle>
                    <CardDescription>
                      Configure your RPC endpoints and network preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10">
                      <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Network Settings</h3>
                      <p className="text-muted-foreground mb-4">
                        This section is coming soon. You'll be able to customize your network preferences here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
