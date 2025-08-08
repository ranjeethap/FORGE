import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    // Mock authentication check
    const userId = 'mock-user-id';

    const data = await request.json();
    const { name, description, type, hourlyRate } = data;

    // Validate required fields
    if (!name || !description || !type || !hourlyRate) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Mock team creation response
    const mockTeam = {
      id: 'mock-team-id',
      name,
      description,
      type,
      hourlyRate,
      createdById: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json(mockTeam, { status: 201 });
  } catch (error) {
    console.error('Error creating team:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
