import { NextRequest, NextResponse } from 'next/server';

// GET /api/teams - Get teams with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const skills = searchParams.get('skills') || '';

    // Mock teams data
    const mockTeams = [
      {
        id: '1',
        name: 'Cloud Migration Experts',
        description: 'Specialized team for enterprise cloud migrations',
        type: 'development',
        hourlyRate: 150,
        maxMembers: 6,
        currentMembers: 4,
        status: 'OPEN',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
        leader: {
          id: '1',
          firstName: 'Sarah',
          lastName: 'Chen',
          email: 'sarah.chen@example.com',
          avatar: 'SC'
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-02-15')
      },
      {
        id: '2',
        name: 'AI Innovation Squad',
        description: 'Cutting-edge AI and machine learning solutions',
        type: 'development',
        hourlyRate: 180,
        maxMembers: 5,
        currentMembers: 3,
        status: 'OPEN',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
        leader: {
          id: '2',
          firstName: 'Mike',
          lastName: 'Johnson',
          email: 'mike.johnson@example.com',
          avatar: 'MJ'
        },
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-02-14')
      },
      {
        id: '3',
        name: 'Full-Stack Wizards',
        description: 'Complete web application development team',
        type: 'development',
        hourlyRate: 120,
        maxMembers: 8,
        currentMembers: 5,
        status: 'FULL',
        skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
        leader: {
          id: '3',
          firstName: 'Lisa',
          lastName: 'Wang',
          email: 'lisa.wang@example.com',
          avatar: 'LW'
        },
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-02-13')
      }
    ];

    // Filter teams based on search params
    let filteredTeams = mockTeams;
    
    if (search) {
      filteredTeams = filteredTeams.filter(team => 
        team.name.toLowerCase().includes(search.toLowerCase()) ||
        team.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (type) {
      filteredTeams = filteredTeams.filter(team => team.type === type);
    }
    
    if (skills) {
      const skillArray = skills.split(',').map(s => s.trim());
      filteredTeams = filteredTeams.filter(team => 
        skillArray.some(skill => team.skills.includes(skill))
      );
    }

    // Apply pagination
    const total = filteredTeams.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTeams = filteredTeams.slice(startIndex, endIndex);

    return NextResponse.json({
      teams: paginatedTeams,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}

// POST /api/teams - Create a new team
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, type, hourlyRate, maxMembers, skills } = body;

    if (!name || !description || !type || !hourlyRate) {
      return NextResponse.json(
        { error: 'Name, description, type, and hourlyRate are required' },
        { status: 400 }
      );
    }

    // Mock team creation
    const newTeam = {
      id: '4',
      name,
      description,
      type,
      hourlyRate,
      maxMembers: maxMembers || 5,
      currentMembers: 1,
      status: 'OPEN',
      skills: skills || [],
      leader: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        avatar: 'JD'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json(newTeam, { status: 201 });

  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json(
      { error: 'Failed to create team' },
      { status: 500 }
    );
  }
} 