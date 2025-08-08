import { NextRequest, NextResponse } from 'next/server';

// GET /api/users/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Mock user profile data based on email
    const getUserProfile = (email: string) => {
      if (email === 'ranjeeth_ap@outlook.com') {
        return {
          id: '1',
          clerkId: 'clerk_mock_user_1',
          email: email,
          firstName: 'Ranjeeth',
          lastName: 'AP',
          bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Passionate about building scalable web applications and contributing to open-source projects.',
          location: 'San Francisco, CA',
          timezone: 'America/Los_Angeles',
          hourlyRate: 85,
          isAvailable: true,
          subscriptionTier: 'INDIVIDUAL',
          subscriptionStatus: 'ACTIVE',
        };
      } else {
        return {
          id: '2',
          clerkId: 'clerk_mock_user_2',
          email: email,
          firstName: 'Demo',
          lastName: 'User',
          bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Passionate about building scalable web applications and contributing to open-source projects.',
          location: 'San Francisco, CA',
          timezone: 'America/Los_Angeles',
          hourlyRate: 85,
          isAvailable: true,
          subscriptionTier: 'INDIVIDUAL',
          subscriptionStatus: 'ACTIVE',
        };
      }
    };

    const mockProfile = {
      ...getUserProfile(email),
      skills: [
        { id: '1', name: 'React', category: 'Frontend' },
        { id: '2', name: 'Node.js', category: 'Backend' },
        { id: '3', name: 'TypeScript', category: 'Language' },
        { id: '4', name: 'AWS', category: 'Cloud' },
        { id: '5', name: 'PostgreSQL', category: 'Database' }
      ],
      projects: [
        {
          id: '1',
          title: 'E-commerce Platform',
          role: 'Lead Developer',
          status: 'IN_PROGRESS',
          progress: 65
        },
        {
          id: '2',
          title: 'AI Chatbot',
          role: 'Full-Stack Developer',
          status: 'COMPLETED',
          progress: 100
        }
      ],
      teams: [
        {
          id: '1',
          name: 'Cloud Migration Experts',
          role: 'Team Lead',
          status: 'ACTIVE'
        },
        {
          id: '2',
          name: 'AI Innovation Squad',
          role: 'Developer',
          status: 'ACTIVE'
        }
      ],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-15')
    };

    return NextResponse.json(mockProfile);

  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

// PUT /api/users/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, bio, location, timezone, hourlyRate, skills } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Mock updated profile
    const updatedProfile = {
      id: '1',
      clerkId: 'clerk_mock_user_1',
      email,
      firstName: firstName || 'John',
      lastName: lastName || 'Doe',
      bio: bio || 'Full-stack developer with 5+ years of experience.',
      location: location || 'San Francisco, CA',
      timezone: timezone || 'America/Los_Angeles',
      hourlyRate: hourlyRate || 85,
      isAvailable: true,
      subscriptionTier: 'INDIVIDUAL',
      subscriptionStatus: 'ACTIVE',
      skills: skills || [
        { id: '1', name: 'React', category: 'Frontend' },
        { id: '2', name: 'Node.js', category: 'Backend' }
      ],
      updatedAt: new Date()
    };

    return NextResponse.json(updatedProfile);

  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
} 