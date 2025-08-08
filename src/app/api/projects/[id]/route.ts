import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Mock project data
    const project = {
      id: id,
      title: 'E-commerce Platform Migration',
      description: 'Migrating legacy e-commerce platform to cloud infrastructure with modern microservices architecture',
      hourlyRate: 120,
      estimatedHours: 400,
      duration: '3 months',
      status: 'OPEN',
      budget: 50000,
      clientName: 'TechCorp Inc.',
      requirements: 'AWS infrastructure, Docker containers, CI/CD pipeline, monitoring and logging',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
      team: {
        id: '1',
        name: 'Cloud Migration Experts',
        description: 'Specialized team for enterprise cloud migrations',
        hourlyRate: 150,
        status: 'ACTIVE',
        leader: {
          firstName: 'Sarah',
          lastName: 'Chen',
          email: 'sarah.chen@example.com'
        }
      },
      leader: {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Chen',
        email: 'sarah.chen@example.com',
        bio: 'Experienced project lead with 10+ years in cloud infrastructure',
        location: 'San Francisco, CA',
        timezone: 'PST',
        hourlyRate: 150
      },
      skills: [
        { id: '1', name: 'AWS', category: 'Cloud' },
        { id: '2', name: 'Docker', category: 'DevOps' },
        { id: '3', name: 'Kubernetes', category: 'DevOps' },
        { id: '4', name: 'Node.js', category: 'Backend' },
        { id: '5', name: 'React', category: 'Frontend' }
      ],
      members: [
        {
          id: '1',
          role: 'Project Lead',
          joinedAt: '2024-01-15T00:00:00Z',
          isActive: true,
          user: {
            id: '1',
            firstName: 'Sarah',
            lastName: 'Chen',
            email: 'sarah.chen@example.com',
            bio: 'Experienced project lead with 10+ years in cloud infrastructure',
            location: 'San Francisco, CA',
            timezone: 'PST',
            hourlyRate: 150,
            skills: [
              { id: '1', name: 'AWS', category: 'Cloud' },
              { id: '2', name: 'Docker', category: 'DevOps' },
              { id: '3', name: 'Kubernetes', category: 'DevOps' }
            ]
          }
        },
        {
          id: '2',
          role: 'Backend Developer',
          joinedAt: '2024-01-16T00:00:00Z',
          isActive: true,
          user: {
            id: '2',
            firstName: 'Mike',
            lastName: 'Johnson',
            email: 'mike.johnson@example.com',
            bio: 'Senior backend developer specializing in Node.js and Python',
            location: 'New York, NY',
            timezone: 'EST',
            hourlyRate: 120,
            skills: [
              { id: '4', name: 'Node.js', category: 'Backend' },
              { id: '5', name: 'Python', category: 'Backend' },
              { id: '6', name: 'PostgreSQL', category: 'Database' }
            ]
          }
        }
      ],
      applications: []
    };

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
} 