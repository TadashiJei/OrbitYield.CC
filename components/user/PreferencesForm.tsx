'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useWallet } from '@/hooks/useWallet';
import { 
  RiskTolerance, 
  YieldPreferences, 
  userPreferenceService 
} from '@/lib/user/preference-service';
import {
  Info,
  Shield,
  Bell,
  Sliders,
  Lock,
  ArrowRightLeft,
  Target,
  Rocket,
  Wallet,
  ChevronRight,
  Save,
  RefreshCw
} from 'lucide-react';

// Form schema for validation
const preferencesSchema = z.object({
  riskTolerance: z.enum([
    RiskTolerance.CONSERVATIVE, 
    RiskTolerance.MODERATE, 
    RiskTolerance.AGGRESSIVE, 
    RiskTolerance.CUSTOM
  ]),
  maxRiskScore: z.number().min(1).max(10).optional(),
  targetAPY: z.number().min(0).max(100).optional(),
  preferredChains: z.array(z.string()),
  excludedChains: z.array(z.string()),
  preferredProtocols: z.array(z.string()),
  excludedProtocols: z.array(z.string()),
  preferredAssets: z.array(z.string()),
  excludedAssets: z.array(z.string()),
  maxProtocolExposure: z.number().min(0).max(100).optional(),
  maxChainExposure: z.number().min(0).max(100).optional(),
  rebalancingFrequency: z.enum(['daily', 'weekly', 'monthly', 'manual']),
  notificationSettings: z.object({
    emailNotifications: z.boolean(),
    pushNotifications: z.boolean(),
    apyAlerts: z.boolean(),
    riskAlerts: z.boolean(),
    rebalancingAlerts: z.boolean(),
  }),
});

// Props for the form component
interface PreferencesFormProps {
  onSave?: (preferences: YieldPreferences) => void;
}

/**
 * User preferences form for yield optimization settings
 */
export function PreferencesForm({ onSave }: PreferencesFormProps) {
  const { address, isConnected } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('risk');
  
  // Supported chains, protocols, and assets for selection
  const supportedChains = [
    'Polkadot', 'Kusama', 'Acala', 'Moonbeam', 'Astar', 'Karura', 'Moonriver', 'Parallel'
  ];
  
  const supportedProtocols = [
    'Acala', 'Moonwell', 'Karura', 'Parallel', 'Stellaswap', 'Zenlink', 'Bifrost'
  ];
  
  const supportedAssets = [
    'DOT', 'KSM', 'ACA', 'GLMR', 'ASTR', 'USDT', 'USDC', 'DAI', 'BTC', 'ETH', 'aUSD'
  ];

  // Set up form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof preferencesSchema>>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      riskTolerance: RiskTolerance.MODERATE,
      maxRiskScore: 5,
      targetAPY: 10,
      preferredChains: [],
      excludedChains: [],
      preferredProtocols: [],
      excludedProtocols: [],
      preferredAssets: [],
      excludedAssets: [],
      maxProtocolExposure: 40,
      maxChainExposure: 60,
      rebalancingFrequency: 'weekly',
      notificationSettings: {
        emailNotifications: true,
        pushNotifications: true,
        apyAlerts: true,
        riskAlerts: true,
        rebalancingAlerts: true,
      },
    },
  });
  
  // Watch form values for conditional rendering
  const riskTolerance = form.watch('riskTolerance');
  const preferredChains = form.watch('preferredChains');
  const preferredProtocols = form.watch('preferredProtocols');
  const preferredAssets = form.watch('preferredAssets');
  const excludedChains = form.watch('excludedChains');
  const excludedProtocols = form.watch('excludedProtocols');
  const excludedAssets = form.watch('excludedAssets');
  
  // Load user preferences
  useEffect(() => {
    const loadPreferences = async () => {
      if (!isConnected || !address) return;
      
      try {
        setIsLoading(true);
        const preferences = await userPreferenceService.getUserPreferences(address);
        
        // Reset form with user preferences
        form.reset(preferences);
      } catch (error) {
        console.error('Error loading preferences:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your preferences. Default values will be used.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPreferences();
  }, [address, isConnected, form]);
  
  // Handle form submission
  const onSubmit = async (data: z.infer<typeof preferencesSchema>) => {
    if (!isConnected || !address) {
      toast({
        title: 'Connect Wallet',
        description: 'Please connect your wallet to save preferences.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Save preferences to storage
      const success = await userPreferenceService.saveUserPreferences(address, data);
      
      if (success) {
        toast({
          title: 'Preferences Saved',
          description: 'Your yield optimization preferences have been updated.',
        });
        
        // Call onSave callback if provided
        if (onSave) {
          onSave(data);
        }
      } else {
        throw new Error('Failed to save preferences');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your preferences. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Apply preset risk tolerance settings
  const applyRiskPreset = (preset: RiskTolerance) => {
    // Get default values for the selected risk tolerance
    const defaultPreferences = userPreferenceService.getDefaultPreferences(preset);
    
    // Update form with default values from the preset, but keep other user preferences
    form.setValue('riskTolerance', preset);
    
    if (defaultPreferences.maxRiskScore !== undefined) {
      form.setValue('maxRiskScore', defaultPreferences.maxRiskScore);
    }
    
    if (defaultPreferences.targetAPY !== undefined) {
      form.setValue('targetAPY', defaultPreferences.targetAPY);
    }
    
    if (defaultPreferences.maxProtocolExposure !== undefined) {
      form.setValue('maxProtocolExposure', defaultPreferences.maxProtocolExposure);
    }
    
    if (defaultPreferences.maxChainExposure !== undefined) {
      form.setValue('maxChainExposure', defaultPreferences.maxChainExposure);
    }
    
    if (defaultPreferences.rebalancingFrequency !== undefined) {
      form.setValue('rebalancingFrequency', defaultPreferences.rebalancingFrequency);
    }
  };
  
  // Generate recommendations based on portfolio
  const generateRecommendations = async () => {
    if (!isConnected || !address) {
      toast({
        title: 'Connect Wallet',
        description: 'Please connect your wallet to generate recommendations.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // In a real implementation, this would fetch the user's portfolio and analyze it
      // For now, we'll simulate a delay and then use a preset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Apply a moderate risk profile as a recommendation
      applyRiskPreset(RiskTolerance.MODERATE);
      
      toast({
        title: 'Recommendations Generated',
        description: 'We\'ve analyzed your portfolio and recommended optimal settings. Review and save to apply them.',
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate recommendations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // For array selection fields (chains, protocols, assets)
  const toggleArrayItem = (field: string, value: string) => {
    const currentValues = form.getValues(field as any) as string[];
    if (currentValues.includes(value)) {
      form.setValue(field as any, currentValues.filter(v => v !== value));
    } else {
      form.setValue(field as any, [...currentValues, value]);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Yield Optimization Preferences</CardTitle>
            <CardDescription>
              Customize how the platform optimizes your yield opportunities
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateRecommendations}
            disabled={isLoading || !isConnected}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate Recommendations
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="risk" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Risk Profile
                </TabsTrigger>
                <TabsTrigger value="allocations" className="flex items-center gap-2">
                  <Sliders className="h-4 w-4" />
                  Allocations
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
              </TabsList>
              
              {/* Risk Profile Tab */}
              <TabsContent value="risk" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="riskTolerance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Risk Tolerance</FormLabel>
                        <div className="grid grid-cols-4 gap-2">
                          <Button
                            type="button"
                            variant={field.value === RiskTolerance.CONSERVATIVE ? 'default' : 'outline'}
                            className="flex flex-col items-center p-4 h-auto"
                            onClick={() => applyRiskPreset(RiskTolerance.CONSERVATIVE)}
                          >
                            <Shield className="h-5 w-5 mb-2" />
                            <span>Conservative</span>
                            <span className="text-xs text-muted-foreground mt-1">Lower risk, lower returns</span>
                          </Button>
                          
                          <Button
                            type="button"
                            variant={field.value === RiskTolerance.MODERATE ? 'default' : 'outline'}
                            className="flex flex-col items-center p-4 h-auto"
                            onClick={() => applyRiskPreset(RiskTolerance.MODERATE)}
                          >
                            <ArrowRightLeft className="h-5 w-5 mb-2" />
                            <span>Moderate</span>
                            <span className="text-xs text-muted-foreground mt-1">Balanced risk-return</span>
                          </Button>
                          
                          <Button
                            type="button"
                            variant={field.value === RiskTolerance.AGGRESSIVE ? 'default' : 'outline'}
                            className="flex flex-col items-center p-4 h-auto"
                            onClick={() => applyRiskPreset(RiskTolerance.AGGRESSIVE)}
                          >
                            <Rocket className="h-5 w-5 mb-2" />
                            <span>Aggressive</span>
                            <span className="text-xs text-muted-foreground mt-1">Higher risk, higher returns</span>
                          </Button>
                          
                          <Button
                            type="button"
                            variant={field.value === RiskTolerance.CUSTOM ? 'default' : 'outline'}
                            className="flex flex-col items-center p-4 h-auto"
                            onClick={() => form.setValue('riskTolerance', RiskTolerance.CUSTOM)}
                          >
                            <Sliders className="h-5 w-5 mb-2" />
                            <span>Custom</span>
                            <span className="text-xs text-muted-foreground mt-1">Your specific settings</span>
                          </Button>
                        </div>
                        <FormDescription>
                          Choose a risk profile for yield optimization or select custom for granular control
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {riskTolerance === RiskTolerance.CUSTOM && (
                    <>
                      <FormField
                        control={form.control}
                        name="maxRiskScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Risk Score (1-10)</FormLabel>
                            <div className="flex items-center gap-4">
                              <Slider
                                min={1}
                                max={10}
                                step={1}
                                value={[field.value || 5]}
                                onValueChange={([value]) => field.onChange(value)}
                                className="flex-1"
                              />
                              <span className="w-8 text-center">{field.value}</span>
                            </div>
                            <FormDescription>
                              Higher values allow higher-risk opportunities
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="targetAPY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target APY (%)</FormLabel>
                            <div className="flex items-center gap-4">
                              <Slider
                                min={1}
                                max={50}
                                step={1}
                                value={[field.value || 10]}
                                onValueChange={([value]) => field.onChange(value)}
                                className="flex-1"
                              />
                              <span className="w-12 text-center">{field.value}%</span>
                            </div>
                            <FormDescription>
                              The optimizer will aim for this target APY
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </TabsContent>
              
              {/* Allocations Tab */}
              <TabsContent value="allocations" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="maxProtocolExposure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Protocol Exposure (%)</FormLabel>
                        <div className="flex items-center gap-4">
                          <Slider
                            min={5}
                            max={100}
                            step={5}
                            value={[field.value || 40]}
                            onValueChange={([value]) => field.onChange(value)}
                            className="flex-1"
                          />
                          <span className="w-12 text-center">{field.value}%</span>
                        </div>
                        <FormDescription>
                          Maximum percentage of your portfolio in a single protocol
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="maxChainExposure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Chain Exposure (%)</FormLabel>
                        <div className="flex items-center gap-4">
                          <Slider
                            min={5}
                            max={100}
                            step={5}
                            value={[field.value || 60]}
                            onValueChange={([value]) => field.onChange(value)}
                            className="flex-1"
                          />
                          <span className="w-12 text-center">{field.value}%</span>
                        </div>
                        <FormDescription>
                          Maximum percentage of your portfolio on a single blockchain
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="preferredChains"
                    render={() => (
                      <FormItem>
                        <FormLabel>Preferred Chains</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {supportedChains.map(chain => (
                            <Badge
                              key={chain}
                              variant={preferredChains.includes(chain) ? 'default' : 'outline'}
                              className="cursor-pointer"
                              onClick={() => toggleArrayItem('preferredChains', chain)}
                            >
                              {chain}
                            </Badge>
                          ))}
                        </div>
                        <FormDescription>
                          The optimizer will prioritize these chains
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="excludedChains"
                    render={() => (
                      <FormItem>
                        <FormLabel>Excluded Chains</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {supportedChains.map(chain => (
                            <Badge
                              key={chain}
                              variant={excludedChains.includes(chain) ? 'destructive' : 'outline'}
                              className="cursor-pointer"
                              onClick={() => toggleArrayItem('excludedChains', chain)}
                            >
                              {chain}
                            </Badge>
                          ))}
                        </div>
                        <FormDescription>
                          The optimizer will avoid these chains
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="rebalancingFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rebalancing Frequency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="manual">Manual Only</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How often the optimizer should suggest portfolio rebalancing
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="preferredProtocols"
                    render={() => (
                      <FormItem>
                        <FormLabel>Preferred Protocols</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {supportedProtocols.map(protocol => (
                            <Badge
                              key={protocol}
                              variant={preferredProtocols.includes(protocol) ? 'default' : 'outline'}
                              className="cursor-pointer"
                              onClick={() => toggleArrayItem('preferredProtocols', protocol)}
                            >
                              {protocol}
                            </Badge>
                          ))}
                        </div>
                        <FormDescription>
                          The optimizer will prioritize these protocols
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="excludedProtocols"
                    render={() => (
                      <FormItem>
                        <FormLabel>Excluded Protocols</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {supportedProtocols.map(protocol => (
                            <Badge
                              key={protocol}
                              variant={excludedProtocols.includes(protocol) ? 'destructive' : 'outline'}
                              className="cursor-pointer"
                              onClick={() => toggleArrayItem('excludedProtocols', protocol)}
                            >
                              {protocol}
                            </Badge>
                          ))}
                        </div>
                        <FormDescription>
                          The optimizer will avoid these protocols
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="preferredAssets"
                    render={() => (
                      <FormItem>
                        <FormLabel>Preferred Assets</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {supportedAssets.map(asset => (
                            <Badge
                              key={asset}
                              variant={preferredAssets.includes(asset) ? 'default' : 'outline'}
                              className="cursor-pointer"
                              onClick={() => toggleArrayItem('preferredAssets', asset)}
                            >
                              {asset}
                            </Badge>
                          ))}
                        </div>
                        <FormDescription>
                          The optimizer will prioritize these assets
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="excludedAssets"
                    render={() => (
                      <FormItem>
                        <FormLabel>Excluded Assets</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {supportedAssets.map(asset => (
                            <Badge
                              key={asset}
                              variant={excludedAssets.includes(asset) ? 'destructive' : 'outline'}
                              className="cursor-pointer"
                              onClick={() => toggleArrayItem('excludedAssets', asset)}
                            >
                              {asset}
                            </Badge>
                          ))}
                        </div>
                        <FormDescription>
                          The optimizer will avoid these assets
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="notificationSettings.emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive yield optimization updates via email
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notificationSettings.pushNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Push Notifications</FormLabel>
                          <FormDescription>
                            Receive browser push notifications for important updates
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notificationSettings.apyAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">APY Alerts</FormLabel>
                          <FormDescription>
                            Get notified when APY changes significantly on your investments
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notificationSettings.riskAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Risk Alerts</FormLabel>
                          <FormDescription>
                            Get notified when risk factors change for your investments
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notificationSettings.rebalancingAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Rebalancing Alerts</FormLabel>
                          <FormDescription>
                            Get notified when portfolio rebalancing is recommended
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || !isConnected}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <><RefreshCw className="h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="h-4 w-4" /> Save Preferences</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
