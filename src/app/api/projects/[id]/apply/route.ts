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

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        members: true,
        applications: {
          where: { userId: user.id }
        }
      }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Check if user is already a member
    const isAlreadyMember = project.members.some(member => member.userId === user.id);
    if (isAlreadyMember) {
      return NextResponse.json(
        { error: 'You are already a member of this project' },
        { status: 400 }
      );
    }

    // Check if user has already applied
    const existingApplication = project.applications.find(app => app.userId === user.id);
    if (existingApplication) {
      return NextResponse.json(
        { error: 'You have already applied to this project' },
        { status: 400 }
      );
    }

    // Check if project is accepting applications
    if (project.status !== 'OPEN') {
      return NextResponse.json(
        { error: 'This project is not currently accepting applications' },
        { status: 400 }
      );
    }

    // Create the application
    const application = await prisma.projectApplication.create({
      data: {
        userId: user.id,
        projectId: project.id,
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
        project: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating project application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
} 