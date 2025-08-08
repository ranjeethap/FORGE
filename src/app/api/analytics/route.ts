import { NextRequest, NextResponse } from 'next/server';

// GET /api/analytics - Get comprehensive platform analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview';
    const period = searchParams.get('period') || '30d';

    // Mock analytics data
    const mockAnalytics = {
      overview: {
        totalProjects: 12,
        activeProjects: 8,
        totalTeams: 5,
        activeTeams: 3,
        totalEarnings: 8500,
        totalApplications: 25,
        recentActivity: [
          { type: 'project_created', title: 'E-commerce Platform', date: '2024-02-15' },
          { type: 'application_submitted', title: 'AI Chatbot Project', date: '2024-02-14' },
          { type: 'team_joined', title: 'Cloud Migration Team', date: '2024-02-13' }
        ],
        skillDistribution: [
          { skill: 'React', count: 8 },
          { skill: 'Node.js', count: 6 },
          { skill: 'TypeScript', count: 5 },
          { skill: 'AWS', count: 4 }
        ],
        topSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Python'],
        projectStatusDistribution: [
          { status: 'completed', count: 6 },
          { status: 'in_progress', count: 4 },
          { status: 'pending', count: 2 }
        ],
        teamStatusDistribution: [
          { status: 'active', count: 3 },
          { status: 'inactive', count: 2 }
        ]
      },
      user: {
        totalProjects: 12,
        totalTeams: 5,
        totalApplications: 25,
        acceptedApplications: 18,
        rejectedApplications: 7,
        averageResponseTime: 2.5,
        successRate: 72,
        earnings: 8500,
        timeSpent: 120,
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        recentActivity: [
          { type: 'project_created', title: 'E-commerce Platform', date: '2024-02-15' },
          { type: 'application_submitted', title: 'AI Chatbot Project', date: '2024-02-14' },
          { type: 'team_joined', title: 'Cloud Migration Team', date: '2024-02-13' }
        ]
      },
      team: {
        totalMembers: 4,
        totalProjects: 8,
        completedProjects: 6,
        activeProjects: 2,
        totalRevenue: 45000,
        averageProjectDuration: 3.2,
        clientSatisfaction: 4.8,
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
        recentActivity: [
          { type: 'project_completed', title: 'Cloud Migration', date: '2024-02-15' },
          { type: 'member_joined', name: 'Sarah Chen', date: '2024-02-14' },
          { type: 'project_started', title: 'AI Platform', date: '2024-02-13' }
        ]
      },
      project: {
        totalTasks: 45,
        completedTasks: 32,
        remainingTasks: 13,
        progress: 71,
        budget: { allocated: 50000, spent: 35000, remaining: 15000 },
        timeline: { start: '2024-01-15', end: '2024-04-15', current: '2024-02-15' },
        team: { size: 4, roles: ['Lead', 'Developer', 'Designer', 'QA'] },
        milestones: [
          { title: 'Planning', status: 'completed', date: '2024-01-30' },
          { title: 'Development', status: 'in_progress', date: '2024-03-15' },
          { title: 'Testing', status: 'pending', date: '2024-04-01' }
        ]
      },
      platform: {
        totalUsers: 1250,
        totalTeams: 180,
        totalProjects: 450,
        activeProjects: 320,
        totalRevenue: 125000,
        averageProjectValue: 2800,
        userGrowth: 15,
        projectSuccessRate: 85,
        topSkills: ['React', 'Node.js', 'Python', 'AWS', 'TypeScript'],
        recentActivity: [
          { type: 'user_registered', count: 25, date: '2024-02-15' },
          { type: 'project_created', count: 12, date: '2024-02-15' },
          { type: 'team_formed', count: 8, date: '2024-02-15' }
        ]
      },
      trends: {
        userGrowth: [
          { date: '2024-01', count: 1000 },
          { date: '2024-02', count: 1250 }
        ],
        projectGrowth: [
          { date: '2024-01', count: 350 },
          { date: '2024-02', count: 450 }
        ],
        revenueGrowth: [
          { date: '2024-01', amount: 95000 },
          { date: '2024-02', amount: 125000 }
        ]
      }
    };

    const analytics = mockAnalytics[type as keyof typeof mockAnalytics] || mockAnalytics.overview;

    return NextResponse.json(analytics);

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
} 