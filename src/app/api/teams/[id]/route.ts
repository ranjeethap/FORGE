import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Mock authentication check
    const userId = 'mock-user-id';

    // Mock team data for now
    const team = {
      id: id,
      name: 'Cloud Migration Experts',
      description: 'Specialized team for enterprise cloud migrations',
      hourlyRate: 150,
      maxMembers: 5,
      status: 'OPEN',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
      leader: {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Chen',
        email: 'sarah.chen@example.com',
        bio: 'Experienced team lead with 10+ years in cloud infrastructure',
        location: 'San Francisco, CA',
        timezone: 'PST',
        hourlyRate: 150
      },
      members: [
        {
          id: '1',
          role: 'Team Lead',
          joinedAt: '2024-01-15T00:00:00Z',
          isActive: true,
          user: {
            id: '1',
            firstName: 'Sarah',
            lastName: 'Chen',
            email: 'sarah.chen@example.com',
            bio: 'Experienced team lead with 10+ years in cloud infrastructure',
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
      skills: [
        { id: '1', name: 'AWS', category: 'Cloud' },
        { id: '2', name: 'Docker', category: 'DevOps' },
        { id: '3', name: 'Kubernetes', category: 'DevOps' },
        { id: '4', name: 'Terraform', category: 'DevOps' }
      ],
      projects: [
        {
          id: '1',
          title: 'E-commerce Platform Migration',
          description: 'Migrating legacy e-commerce platform to cloud infrastructure',
          status: 'IN_PROGRESS',
          budget: 50000,
          skills: [
            { id: '1', name: 'AWS', category: 'Cloud' },
            { id: '2', name: 'Docker', category: 'DevOps' }
          ]
        }
      ]
    };

    return NextResponse.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team' },
      { status: 500 }
    );
  }
} 