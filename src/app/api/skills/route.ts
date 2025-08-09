import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock skills list (no Prisma dependency)
    const skills = [
      { id: '1', name: 'React', category: 'Frontend' },
      { id: '2', name: 'Node.js', category: 'Backend' },
      { id: '3', name: 'TypeScript', category: 'Language' },
      { id: '4', name: 'AWS', category: 'Cloud' },
      { id: '5', name: 'Docker', category: 'DevOps' },
      { id: '6', name: 'Kubernetes', category: 'DevOps' },
      { id: '7', name: 'PostgreSQL', category: 'Database' },
      { id: '8', name: 'GraphQL', category: 'API' },
    ];

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
} 