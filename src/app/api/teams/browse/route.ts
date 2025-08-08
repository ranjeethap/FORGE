import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    // Mock authentication check
    const userId = 'mock-user-id';

    // Mock teams data for now
    const teams = [
      {
        id: '1',
        name: 'Cloud Migration Experts',
        description: 'Specialized team for enterprise cloud migrations',
        type: 'development',
        hourlyRate: 150,
        members: 4,
        activeProjects: 2,
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
        rating: 4.8,
        completedProjects: 15
      },
      {
        id: '2',
        name: 'AI Innovation Squad',
        description: 'Cutting-edge AI and machine learning solutions',
        type: 'development',
        hourlyRate: 180,
        members: 3,
        activeProjects: 1,
        skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
        rating: 4.9,
        completedProjects: 8
      },
      {
        id: '3',
        name: 'Full-Stack Wizards',
        description: 'Complete web application development team',
        type: 'development',
        hourlyRate: 120,
        members: 5,
        activeProjects: 3,
        skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
        rating: 4.7,
        completedProjects: 25
      }
    ];

    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
