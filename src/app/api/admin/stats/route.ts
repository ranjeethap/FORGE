import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Mock data for now since we don't have the database schema fully set up
    const totalUsers = 300;
    const activeUsers = 245;
    const totalTeams = 45;
    const totalProjects = 120;
    const subscriptionBreakdown = [
      { subscriptionTier: 'FREE', _count: { subscriptionTier: 150 } },
      { subscriptionTier: 'INDIVIDUAL', _count: { subscriptionTier: 75 } },
      { subscriptionTier: 'STARTUP', _count: { subscriptionTier: 45 } },
      { subscriptionTier: 'BUSINESS', _count: { subscriptionTier: 25 } },
      { subscriptionTier: 'ENTERPRISE', _count: { subscriptionTier: 5 } }
    ];
    const newSignupsToday = 12;
    const recentActivity = [
      {
        id: '1',
        action: 'USER_SUSPENDED',
        targetType: 'USER',
        targetId: 'user-123',
        createdAt: new Date(),
        admin: { firstName: 'Admin', lastName: 'User', email: 'admin@example.com' },
        details: 'User suspended for policy violation'
      },
      {
        id: '2',
        action: 'TEAM_APPROVED',
        targetType: 'TEAM',
        targetId: 'team-456',
        createdAt: new Date(),
        admin: { firstName: 'Admin', lastName: 'User', email: 'admin@example.com' },
        details: 'Team application approved'
      }
    ];

    // Calculate subscription revenue (mock calculation)
    const tierPricing = {
      FREE: 0,
      INDIVIDUAL: 29,
      STARTUP: 79,
      BUSINESS: 199,
      ENTERPRISE: 500 // estimate
    };

    let subscriptionRevenue = 0;
    const subscriptionBreakdownFormatted: { [key: string]: number } = {};

    subscriptionBreakdown.forEach((sub: any) => {
      const tier = sub.subscriptionTier;
      const count = sub._count.subscriptionTier;
      subscriptionBreakdownFormatted[tier] = count;
      subscriptionRevenue += (tierPricing[tier as keyof typeof tierPricing] || 0) * count;
    });

    // Format recent activity
    const formattedActivity = recentActivity.map(action => ({
      id: action.id,
      action: action.action,
      targetType: action.targetType,
      targetId: action.targetId,
      performedBy: {
        name: `${action.admin.firstName} ${action.admin.lastName}`,
        email: action.admin.email
      },
      createdAt: action.createdAt,
      details: action.details
    }));

    const stats = {
      totalUsers,
      activeUsers,
      totalTeams,
      totalProjects,
      subscriptionRevenue,
      newSignupsToday,
      subscriptionBreakdown: subscriptionBreakdownFormatted,
      recentActivity: formattedActivity,
      // Additional metrics
      metrics: {
        userGrowthRate: 12, // Mock percentage
        teamGrowthRate: 8,
        projectGrowthRate: 15,
        revenueGrowthRate: 23,
        averageProjectsPerUser: totalUsers > 0 ? (totalProjects / totalUsers).toFixed(1) : 0,
        averageTeamsPerUser: totalUsers > 0 ? (totalTeams / totalUsers).toFixed(1) : 0,
      }
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Admin stats fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
}
