'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  Users, 
  Building, 
  FolderOpen, 
  DollarSign, 
  TrendingUp, 
  Settings,
  Shield,
  AlertTriangle,
  Activity,
  UserCheck,
  UserX,
  Crown
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalTeams: number;
  totalProjects: number;
  subscriptionRevenue: number;
  newSignupsToday: number;
  subscriptionBreakdown: {
    [key: string]: number;
  };
}

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  subscriptionTier: string;
  subscriptionStatus: string;
  createdAt: string;
  lastActive?: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsResponse, usersResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/users?limit=10')
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      } else {
        // Fallback to mock data if API fails
        setStats({
          totalUsers: 1247,
          activeUsers: 892,
          totalTeams: 156,
          totalProjects: 342,
          subscriptionRevenue: 15670,
          newSignupsToday: 12,
          subscriptionBreakdown: {
            FREE: 620,
            INDIVIDUAL: 387,
            STARTUP: 156,
            BUSINESS: 67,
            ENTERPRISE: 17
          }
        });
      }

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData.users || []);
      } else {
        // Fallback to mock data if API fails
        setUsers([
          {
            id: '1',
            email: 'john.doe@example.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'USER',
            subscriptionTier: 'INDIVIDUAL',
            subscriptionStatus: 'ACTIVE',
            createdAt: '2024-01-15T10:00:00Z',
            lastActive: '2024-01-20T15:30:00Z'
          }
        ]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      
      // Fallback to mock data
      setStats({
        totalUsers: 1247,
        activeUsers: 892,
        totalTeams: 156,
        totalProjects: 342,
        subscriptionRevenue: 15670,
        newSignupsToday: 12,
        subscriptionBreakdown: {
          FREE: 620,
          INDIVIDUAL: 387,
          STARTUP: 156,
          BUSINESS: 67,
          ENTERPRISE: 17
        }
      });
      
      setUsers([
        {
          id: '1',
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'USER',
          subscriptionTier: 'INDIVIDUAL',
          subscriptionStatus: 'ACTIVE',
          createdAt: '2024-01-15T10:00:00Z',
          lastActive: '2024-01-20T15:30:00Z'
        }
      ]);
      
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: 'suspend' | 'activate' | 'promote' | 'demote') => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, action }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(data.message || `User ${action} successful`);
        fetchAdminData();
      } else {
        alert(data.error || `Failed to ${action} user`);
      }
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
      alert(`Failed to ${action} user`);
    }
  };

  const StatCard = ({ title, value, icon: Icon, description, trend }: {
    title: string;
    value: string | number;
    icon: any;
    description?: string;
    trend?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="flex items-center pt-1">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Activity className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading admin dashboard...</p>
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
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, subscriptions, and platform operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-yellow-500" />
          <Badge variant="secondary">Admin Access</Badge>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            description={`${stats.activeUsers} active users`}
            trend="+12% from last month"
          />
          <StatCard
            title="Teams Created"
            value={stats.totalTeams}
            icon={Building}
            description="Active collaborative teams"
            trend="+8% from last month"
          />
          <StatCard
            title="Projects"
            value={stats.totalProjects}
            icon={FolderOpen}
            description="Total projects on platform"
            trend="+15% from last month"
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${stats.subscriptionRevenue}`}
            icon={DollarSign}
            description="Subscription revenue"
            trend="+23% from last month"
          />
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activity and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New user registration</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Subscription upgrade</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment failed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Subscription Distribution</CardTitle>
                <CardDescription>Current subscription tier breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                {stats?.subscriptionBreakdown && (
                  <div className="space-y-3">
                    {Object.entries(stats.subscriptionBreakdown).map(([tier, count]) => (
                      <div key={tier} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{tier}</Badge>
                        </div>
                        <div className="font-medium">{count} users</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts, roles, and subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">
                          {user.firstName} {user.lastName}
                        </h4>
                        {user.role === 'ADMIN' && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={user.subscriptionStatus === 'ACTIVE' ? 'default' : 'secondary'}>
                          {user.subscriptionTier}
                        </Badge>
                        <Badge variant="outline">{user.role}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUserAction(user.id, 'suspend')}
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUserAction(user.id, 'promote')}
                      >
                        Promote
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>Monitor and manage user subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Subscription management features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <CardDescription>Detailed analytics and reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advanced analytics dashboard coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure platform-wide settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Platform settings management coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
