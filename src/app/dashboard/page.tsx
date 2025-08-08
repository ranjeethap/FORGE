'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { 
  FileText, 
  Users, 
  DollarSign,
  Lock,
  Bell,
  ChevronDown,
  Settings
} from "lucide-react";
import { FeatureGate, SubscriptionLimits } from "../../components/FeatureGate";
import { AdminNavigation, SubscriptionBadge } from "../../components/Navigation";
import NotificationsPanel from "../../components/NotificationsPanel";

export default function DashboardPage() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showUpgradeNotice, setShowUpgradeNotice] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Try to get user email from multiple sources
        const urlParams = new URLSearchParams(window.location.search);
        let userEmail = urlParams.get('email') || localStorage.getItem('userEmail');
        
        // If no email found, try to detect from browser or use default
        if (!userEmail) {
          // Check if we're in a development environment and use the known user
          if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            userEmail = 'ranjeeth_ap@outlook.com';
          } else {
            userEmail = 'demo@example.com';
          }
        }
        
        const response = await fetch(`/api/users/profile?email=${userEmail}`);
        if (response.ok) {
          const profile = await response.json();
          setUserProfile(profile);
          // Store the email for future use
          localStorage.setItem('userEmail', userEmail);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
              <p className="text-slate-500 dark:text-slate-400">
                Welcome back, {userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Demo User'}
                {userProfile?.email && (
                  <span className="text-xs text-slate-400 ml-2">({userProfile.email})</span>
                )}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <NotificationsPanel />
              <AdminNavigation />
              <SubscriptionBadge />
              
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                      {userProfile ? (userProfile.firstName?.[0] || userProfile.lastName?.[0] || 'D') : 'D'}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-1 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Account Settings
                    </Link>
                    <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                    <button
                      onClick={() => {
                        // Set user to Ranjeeth
                        localStorage.setItem('userEmail', 'ranjeeth_ap@outlook.com');
                        window.location.reload();
                      }}
                      className="block w-full px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 text-left"
                    >
                      Switch to Ranjeeth
                    </button>
                    <button
                      onClick={() => {
                        // Set user to Demo
                        localStorage.setItem('userEmail', 'demo@example.com');
                        window.location.reload();
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 text-left"
                    >
                      Switch to Demo
                    </button>
                    <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                    <button
                      onClick={() => {
                        // Simple sign out - redirect to landing page
                        localStorage.removeItem('userEmail');
                        window.location.href = '/';
                      }}
                      className="block w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-1">
            <Link 
              href="/dashboard"
              className="px-3 py-2 text-sm font-medium rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-500"
            >
              Overview
            </Link>
            <Link 
              href="/dashboard/projects"
              className="px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700"
            >
              My Projects
            </Link>
            <Link 
              href="/dashboard/teams"
              className="px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700"
            >
              My Teams
            </Link>
            <Link 
              href="/dashboard/applications"
              className="px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700"
            >
              Applications
            </Link>
            <Link 
              href="/messages"
              className="px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700"
            >
              Messages
            </Link>
            <Link 
              href="/profile"
              className="px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700"
            >
              Profile
            </Link>
            <Link 
              href="/analytics"
              className="px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700"
            >
              Analytics
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <FileText className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-slate-500">No active projects</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Memberships</CardTitle>
                <Users className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-slate-500">No team memberships</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0</div>
                <p className="text-xs text-slate-500">From all projects</p>
              </CardContent>
            </Card>
          </div>

          {/* Subscription & Limits */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Subscription & Limits</CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Track your resource usage and limits
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/pricing">Upgrade Plan</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Teams Usage</span>
                    <span className="text-sm font-medium">2 / 3</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <div className="h-2 bg-orange-500 rounded-full w-2/3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Projects Usage</span>
                    <span className="text-sm font-medium">8 / 10</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <div className="h-2 bg-orange-500 rounded-full w-4/5" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Members Usage</span>
                    <span className="text-sm font-medium">15 / 25</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <div className="h-2 bg-orange-500 rounded-full w-3/5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/teams/browse">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">Browse Teams</h3>
                      <p className="text-sm text-slate-500">Find teams to join</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/projects/browse">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <FileText className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">Browse Projects</h3>
                      <p className="text-sm text-slate-500">Find projects to join</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/teams/create">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Users className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">Create Team</h3>
                      <p className="text-sm text-slate-500">Start your own team</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <Users className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">No teams yet</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link href="/teams">Browse Teams →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">No projects yet</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link href="/projects">Browse Projects →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Feature Gate Modal - Shown when accessing restricted features */}
      {showUpgradeNotice && (
        <div className="fixed bottom-4 right-4 max-w-sm bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Lock className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Upgrade Required</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                This feature requires a startup subscription or higher.
              </p>
              <div className="flex items-center gap-3">
                <Button asChild size="sm" variant="default">
                  <Link href="/pricing">View Plans</Link>
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setShowUpgradeNotice(false)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}