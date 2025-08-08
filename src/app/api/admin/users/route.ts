import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Mock data for now since we don't have the database schema fully set up
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const tier = searchParams.get('tier') || '';

    // Mock users data
    const mockUsers = [
      {
        id: '1',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'USER',
        subscriptionTier: 'INDIVIDUAL',
        subscriptionStatus: 'ACTIVE',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-02-15'),
        isAvailable: true,
      },
      {
        id: '2',
        email: 'jane.smith@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'MODERATOR',
        subscriptionTier: 'STARTUP',
        subscriptionStatus: 'ACTIVE',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-02-14'),
        isAvailable: true,
      },
      {
        id: '3',
        email: 'bob.wilson@example.com',
        firstName: 'Bob',
        lastName: 'Wilson',
        role: 'USER',
        subscriptionTier: 'FREE',
        subscriptionStatus: 'ACTIVE',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-10'),
        isAvailable: false,
      }
    ];

    // Filter mock data based on search params
    let filteredUsers = mockUsers;
    
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }
    
    if (tier) {
      filteredUsers = filteredUsers.filter(user => user.subscriptionTier === tier);
    }

    const total = filteredUsers.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return NextResponse.json({
      users: paginatedUsers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Admin users fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action, ...updateData } = body;

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'userId and action are required' },
        { status: 400 }
      );
    }

    // Mock response for now
    const mockUpdatedUser = {
      id: userId,
      email: 'user@example.com',
      firstName: 'User',
      lastName: 'Name',
      role: action === 'promote' ? 'MODERATOR' : action === 'demote' ? 'USER' : 'USER',
      subscriptionTier: updateData.tier || 'FREE',
      subscriptionStatus: updateData.status || 'ACTIVE',
      isAvailable: action === 'suspend' ? false : action === 'activate' ? true : true,
    };

    return NextResponse.json({
      success: true,
      user: mockUpdatedUser,
      message: `User ${action} successful`
    });

  } catch (error) {
    console.error('Admin user action error:', error);
    return NextResponse.json(
      { error: 'Failed to perform user action' },
      { status: 500 }
    );
  }
}
