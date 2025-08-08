import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { message } = await request.json();
    const { id } = await params;
    
    // Get the user from the request headers (we'll need to implement auth middleware later)
    // For now, we'll use a placeholder - in real app this would come from Clerk
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

    // Check if team exists
    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        members: true,
        applications: {
          where: { userId: user.id }
        }
      }
    });

    if (!team) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }

    // Check if user is already a member
    const isAlreadyMember = team.members.some(member => member.userId === user.id);
    if (isAlreadyMember) {
      return NextResponse.json(
        { error: 'You are already a member of this team' },
        { status: 400 }
      );
    }

    // Check if user has already applied
    const existingApplication = team.applications.find(app => app.userId === user.id);
    if (existingApplication) {
      return NextResponse.json(
        { error: 'You have already applied to this team' },
        { status: 400 }
      );
    }

    // Check if team is accepting applications
    if (team.status !== 'OPEN') {
      return NextResponse.json(
        { error: 'This team is not currently accepting applications' },
        { status: 400 }
      );
    }

    // Create the application
    const application = await prisma.teamApplication.create({
      data: {
        userId: user.id,
        teamId: team.id,
        message: message || null,
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

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating team application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
} 