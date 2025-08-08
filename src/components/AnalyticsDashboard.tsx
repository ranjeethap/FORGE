'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  overview?: {
    totalProjects: number;
    activeProjects: number;
    totalTeams: number;
    activeTeams: number;
    totalEarnings: number;
    totalApplications: number;
    completionRate: number;
  };
  recentActivity?: any[];
  skillDistribution?: any[];
  topSkills?: any[];
  projectStatusDistribution?: any[];
  teamStatusDistribution?: any[];
  projectParticipation?: any[];
  teamParticipation?: any[];
  applicationSuccess?: {
    breakdown: any[];
    successRate: number;
    totalApplications: number;
    approvedApplications: number;
  };
  earningsTrend?: any[];
  skillGrowth?: any[];
  activityTimeline?: any[];
  collaborationMetrics?: {
    totalCollaborations: number;
    averageTeamSize: number;
  };
}

interface AnalyticsDashboardProps {
  type?: 'overview' | 'user' | 'team' | 'project' | 'platform' | 'trends';
  teamId?: string;
  projectId?: string;
}

export default function AnalyticsDashboard({ 
  type = 'overview', 
  teamId, 
  projectId 
}: AnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData>({});
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('30d');
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        email: 'demo@example.com', // Mock email for now
        type,
        period
      });

      if (teamId) params.append('teamId', teamId);
      if (projectId) params.append('projectId', projectId);

      const response = await fetch(`/api/analytics?${params}`);
      
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [type, period, teamId, projectId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
      case 'IN_PROGRESS':
        return 'text-green-600 bg-green-100';
      case 'COMPLETED':
        return 'text-blue-600 bg-blue-100';
      case 'CANCELLED':
      case 'ON_HOLD':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading analytics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading analytics</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {type.charAt(0).toUpperCase() + type.slice(1)} Analytics
        </h2>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Period:</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      {/* Overview Metrics */}
      {analytics.overview && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalProjects)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Teams</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.activeTeams)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.overview.totalEarnings)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{formatPercentage(analytics.overview.completionRate)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Success Rate */}
      {analytics.applicationSuccess && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Application Success Rate</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{formatPercentage(analytics.applicationSuccess.successRate)}</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{formatNumber(analytics.applicationSuccess.approvedApplications)}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-600">{formatNumber(analytics.applicationSuccess.totalApplications)}</p>
              <p className="text-sm text-gray-600">Total Applications</p>
            </div>
          </div>
          
          {/* Application Status Breakdown */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Status Breakdown</h4>
            <div className="space-y-2">
              {analytics.applicationSuccess.breakdown.map((item: any) => (
                <div key={item.status} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">{item.status.toLowerCase()}</span>
                  <span className="text-sm font-medium text-gray-900">{item._count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skill Distribution */}
      {analytics.skillDistribution && analytics.skillDistribution.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Your Skills</h3>
          <div className="flex flex-wrap gap-2">
            {analytics.skillDistribution.map((skill: any) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top Skills in Platform */}
      {analytics.topSkills && analytics.topSkills.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Skills in Platform</h3>
          <div className="space-y-3">
            {analytics.topSkills.slice(0, 10).map((skill: any, index: number) => (
              <div key={skill.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 w-6">{index + 1}.</span>
                  <span className="text-sm text-gray-600">{skill.name}</span>
                  {skill.category && (
                    <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {skill.category}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900">{formatNumber(skill.userCount)} users</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Status Distribution */}
      {analytics.projectStatusDistribution && analytics.projectStatusDistribution.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Status Distribution</h3>
          <div className="space-y-3">
            {analytics.projectStatusDistribution.map((item: any) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item._count} projects</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Status Distribution */}
      {analytics.teamStatusDistribution && analytics.teamStatusDistribution.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Team Status Distribution</h3>
          <div className="space-y-3">
            {analytics.teamStatusDistribution.map((item: any) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item._count} teams</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {analytics.recentActivity && analytics.recentActivity.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {analytics.recentActivity.map((activity: any) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">
                    {activity.leader?.firstName || activity.leader?.email} • {new Date(activity.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(activity.status || 'UNKNOWN')}`}>
                    {(activity.status || 'UNKNOWN').replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collaboration Metrics */}
      {analytics.collaborationMetrics && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Collaboration Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{formatNumber(analytics.collaborationMetrics.totalCollaborations)}</p>
              <p className="text-sm text-gray-600">Total Collaborations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{analytics.collaborationMetrics.averageTeamSize.toFixed(1)}</p>
              <p className="text-sm text-gray-600">Average Team Size</p>
            </div>
          </div>
        </div>
      )}

      {/* Activity Timeline */}
      {analytics.activityTimeline && analytics.activityTimeline.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Timeline</h3>
          <div className="space-y-4">
            {analytics.activityTimeline.slice(0, 10).map((activity: any) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">
                    {activity.leader?.firstName || activity.leader?.email} • {new Date(activity.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(activity.status || 'UNKNOWN')}`}>
                    {(activity.status || 'UNKNOWN').replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data State */}
      {!analytics.overview && !analytics.applicationSuccess && !analytics.skillDistribution && 
       !analytics.topSkills && !analytics.recentActivity && !analytics.collaborationMetrics && 
       !analytics.activityTimeline && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Analytics Data</h3>
          <p className="text-gray-600">Start participating in projects and teams to see your analytics here.</p>
        </div>
      )}
    </div>
  );
} 