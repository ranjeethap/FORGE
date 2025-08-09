import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Serve mock projects to keep frontend working without Prisma
    const mockProjects = [
      {
        id: 'p1',
        title: 'E-commerce Platform Migration',
        description: 'Migrate legacy platform to modern microservices',
        requirements: 'AWS, Docker, CI/CD',
        status: 'OPEN',
        hourlyRate: 120,
        budget: 50000,
        estimatedHours: 400,
        duration: '3 months',
        clientName: 'TechCorp Inc.',
        createdAt: new Date().toISOString(),
        leader: { firstName: 'Sarah', lastName: 'Chen', email: 'sarah.chen@example.com' },
        team: null,
        members: [],
        skills: [
          { id: '1', name: 'AWS', category: 'Cloud' },
          { id: '2', name: 'Docker', category: 'DevOps' },
          { id: '3', name: 'CI/CD', category: 'DevOps' },
        ],
      },
    ];
    return NextResponse.json(mockProjects);
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

    if (!title || !description || !hourlyRate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const mockProject = {
      id: String(Date.now()),
      title: title.trim(),
      description: description.trim(),
      requirements: requirements?.trim() || '',
      hourlyRate: parseFloat(hourlyRate),
      budget: budget ? parseFloat(budget) : null,
      estimatedHours: estimatedHours ? parseInt(estimatedHours) : null,
      duration: duration?.trim() || null,
      clientName: clientName?.trim() || null,
      status: 'OPEN',
      team: null,
      leader: { firstName: 'You', lastName: '', email: 'demo@example.com' },
      skills: (skillIds || []).map((id: string) => ({ id, name: id, category: null })),
      members: [],
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(mockProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 