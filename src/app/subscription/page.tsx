'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Check, X, Crown, Calendar, CreditCard, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionInfo {
  tier: string;
  status: string;
  subscriptionStart?: string;
  subscriptionEnd?: string;
  maxTeams: number;
  maxProjects: number;
  maxTeamMembers: number;
  maxProjectMembers: number;
  hasAdvancedAnalytics: boolean;
  hasPrioritySupport: boolean;
  hasCustomBranding: boolean;
  hasAPIAccess: boolean;
}

interface Usage {
  teams: number;
  projects: number;
}

export default function SubscriptionPage() {
  const { user, isLoaded } = useUser();
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      fetchSubscriptionInfo();
    }
  }, [isLoaded, user]);

  const fetchSubscriptionInfo = async () => {
    try {
      const response = await fetch('/api/subscriptions/upgrade');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data.subscription);
        setUsage(data.usage);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch subscription info:', error);
      setLoading(false);
    }
  };

  const handleUpgrade = async (tier: string) => {
    if (upgrading) return;
    
    setUpgrading(true);
    try {
      const response = await fetch('/api/subscriptions/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tier, billingCycle: 'monthly' }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Redirect to checkout or refresh subscription info
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          fetchSubscriptionInfo();
        }
      } else {
        alert(data.error || 'Failed to upgrade subscription');
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Failed to upgrade subscription');
    } finally {
      setUpgrading(false);
    }
  };

  const getCurrentTierIndex = () => {
    const tiers = ['FREE', 'INDIVIDUAL', 'STARTUP', 'BUSINESS', 'ENTERPRISE'];
    return tiers.indexOf(subscription?.tier || 'FREE');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getUsagePercentage = (current: number, max: number) => {
    if (max === -1) return 0; // Unlimited
    return Math.min((current / max) * 100, 100);
  };

  if (!isLoaded || loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading subscription information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-muted-foreground">
            Manage your subscription plan and billing
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/pricing">View All Plans</Link>
        </Button>
      </div>

      {/* Current Subscription */}
      {subscription && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Current Plan: {subscription.tier}
                </CardTitle>
                <CardDescription>
                  Status: <Badge variant={subscription.status === 'ACTIVE' ? 'default' : 'secondary'}>
                    {subscription.status}
                  </Badge>
                </CardDescription>
              </div>
              {subscription.tier !== 'ENTERPRISE' && (
                <Button asChild>
                  <Link href="/pricing">Upgrade Plan</Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Billing Information */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Billing Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subscription Start:</span>
                    <span>{formatDate(subscription.subscriptionStart)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Billing:</span>
                    <span>{formatDate(subscription.subscriptionEnd)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billing Cycle:</span>
                    <span>Monthly</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Plan Features
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    {subscription.hasAdvancedAnalytics ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-400" />
                    )}
                    <span>Advanced Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {subscription.hasPrioritySupport ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-400" />
                    )}
                    <span>Priority Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {subscription.hasCustomBranding ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-400" />
                    )}
                    <span>Custom Branding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {subscription.hasAPIAccess ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-400" />
                    )}
                    <span>API Access</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Overview */}
      {subscription && usage && (
        <Card>
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>
              Track your current usage against plan limits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Teams Usage */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Teams</span>
                  <span className="text-muted-foreground">
                    {usage.teams} / {subscription.maxTeams === -1 ? '∞' : subscription.maxTeams}
                  </span>
                </div>
                {subscription.maxTeams !== -1 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        getUsagePercentage(usage.teams, subscription.maxTeams) > 80
                          ? 'bg-red-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${getUsagePercentage(usage.teams, subscription.maxTeams)}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Projects Usage */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Projects</span>
                  <span className="text-muted-foreground">
                    {usage.projects} / {subscription.maxProjects === -1 ? '∞' : subscription.maxProjects}
                  </span>
                </div>
                {subscription.maxProjects !== -1 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        getUsagePercentage(usage.projects, subscription.maxProjects) > 80
                          ? 'bg-red-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${getUsagePercentage(usage.projects, subscription.maxProjects)}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Team Members Limit */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Max Team Members</span>
                  <span className="text-muted-foreground">
                    {subscription.maxTeamMembers === -1 ? 'Unlimited' : subscription.maxTeamMembers}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Per team limit
                </div>
              </div>
            </div>

            {/* Usage Warnings */}
            {subscription.maxTeams !== -1 && getUsagePercentage(usage.teams, subscription.maxTeams) > 80 && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-orange-800">Team limit warning</p>
                  <p className="text-orange-700">
                    You're approaching your team limit. Consider upgrading to create more teams.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Upgrade Options */}
      {subscription && getCurrentTierIndex() < 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Upgrade Options</CardTitle>
            <CardDescription>
              Unlock more features and higher limits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['INDIVIDUAL', 'STARTUP', 'BUSINESS'].map((tier, index) => {
                const tierIndex = ['FREE', 'INDIVIDUAL', 'STARTUP', 'BUSINESS', 'ENTERPRISE'].indexOf(tier);
                const currentIndex = getCurrentTierIndex();
                
                if (tierIndex <= currentIndex) return null;
                
                return (
                  <div key={tier} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{tier}</h3>
                    <div className="text-sm text-muted-foreground mb-3">
                      {tier === 'INDIVIDUAL' && 'Perfect for freelancers'}
                      {tier === 'STARTUP' && 'Great for growing teams'}
                      {tier === 'BUSINESS' && 'For established businesses'}
                    </div>
                    <Button
                      onClick={() => handleUpgrade(tier)}
                      disabled={upgrading}
                      className="w-full"
                      variant={index === 0 ? 'default' : 'outline'}
                    >
                      {upgrading ? 'Processing...' : `Upgrade to ${tier}`}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View your past invoices and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No billing history available yet
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
