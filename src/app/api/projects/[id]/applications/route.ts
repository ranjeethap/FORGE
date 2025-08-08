import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Get all applications for a project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const applications = await prisma.projectApplication.findMany({
      where: { projectId: id },
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
    console.error('Error fetching project applications:', error);
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
    const application = await prisma.projectApplication.findUnique({
      where: { id: applicationId },
      include: {
        project: true,
        user: true
      }
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Check if application belongs to this project
    if (application.projectId !== id) {
      return NextResponse.json(
        { error: 'Application does not belong to this project' },
        { status: 403 }
      );
    }

    // Update application status
    const updatedApplication = await prisma.projectApplication.update({
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
        project: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    });

    // If approved, add user to project
    if (status === 'APPROVED') {
      // Add user to project
      await prisma.projectMember.create({
        data: {
          userId: application.userId,
          projectId: id,
          role: 'Member',
        }
      });
    }

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error('Error updating project application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
} 