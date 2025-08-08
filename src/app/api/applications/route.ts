import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get the user from the request headers
    const userEmail = request.headers.get('x-user-email');
    
    if (!userEmail) {
      return NextResponse.json(
        { error: 'User authentication required' },
        { status: 401 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's team applications
    const teamApplications = await prisma.teamApplication.findMany({
      where: { userId: user.id },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            description: true,
            hourlyRate: true,
            status: true,
            leader: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              }
            }
          }
        }
      },
      orderBy: {
        appliedAt: 'desc'
      }
    });

    // Get user's project applications
    const projectApplications = await prisma.projectApplication.findMany({
      where: { userId: user.id },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            description: true,
            hourlyRate: true,
            status: true,
            team: {
              select: {
                name: true,
              }
            }
          }
        }
      },
      orderBy: {
        appliedAt: 'desc'
      }
    });

    return NextResponse.json({
      teamApplications,
      projectApplications
    });
  } catch (error) {
    console.error('Error fetching user applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
} 