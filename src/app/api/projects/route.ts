import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || 'all';

    let whereClause: any = {};

    // Add search functionality
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { skills: { some: { name: { contains: search, mode: 'insensitive' } } } }
      ];
    }

    // Add filter functionality
    if (filter === 'open') {
      whereClause.status = 'OPEN';
    } else if (filter === 'in-progress') {
      whereClause.status = 'IN_PROGRESS';
    } else if (filter === 'completed') {
      whereClause.status = 'COMPLETED';
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        team: {
          include: {
            leader: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              }
            }
          }
        },
        leader: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          }
        },
        skills: true,
        members: {
          include: {
            user: {
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
        createdAt: 'desc'
      }
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userEmail = request.headers.get('x-user-email');
    
    if (!userEmail) {
      return NextResponse.json(
        { error: 'User authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      requirements,
      hourlyRate,
      budget,
      estimatedHours,
      duration,
      clientName,
      teamId,
      skillIds
    } = body;

    // Validation
    if (!title || !description || !hourlyRate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (hourlyRate <= 0) {
      return NextResponse.json(
        { error: 'Hourly rate must be greater than 0' },
        { status: 400 }
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

    // Validate team if provided
    if (teamId) {
      const team = await prisma.team.findUnique({
        where: { id: teamId }
      });

      if (!team) {
        return NextResponse.json(
          { error: 'Team not found' },
          { status: 404 }
        );
      }

      // Check if user is the team leader
      if (team.leaderId !== user.id) {
        return NextResponse.json(
          { error: 'You can only assign projects to teams you lead' },
          { status: 403 }
        );
      }
    }

    // Create the project
    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        requirements: requirements?.trim() || null,
        hourlyRate: parseFloat(hourlyRate),
        budget: budget ? parseFloat(budget) : null,
        estimatedHours: estimatedHours ? parseInt(estimatedHours) : null,
        duration: duration?.trim() || null,
        clientName: clientName?.trim() || null,
        status: 'OPEN',
        teamId: teamId || null,
        leaderId: user.id,
        skills: {
          connect: skillIds?.map((id: string) => ({ id })) || []
        }
      },
      include: {
        team: {
          include: {
            leader: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              }
            }
          }
        },
        leader: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          }
        },
        skills: true,
        members: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              }
            }
          }
        }
      }
    });

    // Add the creator as the first project member with LEADER role
    await prisma.projectMember.create({
      data: {
        projectId: project.id,
        userId: user.id,
        role: 'Lead',
        isActive: true
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 