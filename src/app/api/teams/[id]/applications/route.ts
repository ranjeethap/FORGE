import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Get all applications for a team
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const applications = await prisma.teamApplication.findMany({
      where: { teamId: id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            bio: true,
            location: true,
            timezone: true,
            hourlyRate: true,
            skills: {
              select: {
                id: true,
                name: true,
                category: true,
              }
            }
          }
        }
      },
      orderBy: {
        appliedAt: 'desc'
      }
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching team applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// Update application status (approve/reject)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { applicationId, status } = await request.json();
    const { id } = await params;
    
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be APPROVED or REJECTED' },
        { status: 400 }
      );
    }

    // Get the application
    const application = await prisma.teamApplication.findUnique({
      where: { id: applicationId },
      include: {
        team: true,
        user: true
      }
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Check if application belongs to this team
    if (application.teamId !== id) {
      return NextResponse.json(
        { error: 'Application does not belong to this team' },
        { status: 403 }
      );
    }

    // Update application status
    const updatedApplication = await prisma.teamApplication.update({
      where: { id: applicationId },
      data: { 
        status,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          }
        },
        team: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    // If approved, add user to team
    if (status === 'APPROVED') {
      // Check if team has space
      const team = await prisma.team.findUnique({
        where: { id },
        include: { members: true }
      });

      if (team && team.members.length >= team.maxMembers) {
        return NextResponse.json(
          { error: 'Team is at maximum capacity' },
          { status: 400 }
        );
      }

      // Add user to team
      await prisma.teamMember.create({
        data: {
          userId: application.userId,
          teamId: id,
          role: 'MEMBER',
        }
      });

      // Update team status if full
      if (team && team.members.length + 1 >= team.maxMembers) {
        await prisma.team.update({
          where: { id },
          data: { status: 'FULL' }
        });
      }
    }

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error('Error updating team application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
} 