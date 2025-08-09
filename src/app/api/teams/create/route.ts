import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, type, hourlyRate } = data;

    if (!name || !description || !type || !hourlyRate) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const mockTeam = {
      id: String(Date.now()),
      name,
      description,
      type,
      hourlyRate,
      createdById: 'mock-user-id',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json(mockTeam, { status: 201 });
  } catch (error) {
    console.error('Error creating team:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}
