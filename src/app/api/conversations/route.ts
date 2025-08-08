import { NextRequest, NextResponse } from 'next/server';

// GET /api/conversations - Get user's conversations
export async function GET(request: NextRequest) {
  try {
    // Mock conversations data
    const conversations = [
      {
        id: '1',
        type: 'DIRECT',
        name: null,
        participants: [
          {
            userId: '1',
            role: 'MEMBER',
            lastReadAt: new Date('2024-02-15T10:30:00Z'),
            user: {
              id: '1',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              avatar: 'JD'
            }
          },
          {
            userId: '2',
            role: 'MEMBER',
            lastReadAt: new Date('2024-02-15T10:30:00Z'),
            user: {
              id: '2',
              firstName: 'Jane',
              lastName: 'Smith',
              email: 'jane.smith@example.com',
              avatar: 'JS'
            }
          }
        ],
        messages: [
          {
            id: '1',
            content: "Hey, how's the project going?",
            createdAt: new Date('2024-02-15T10:30:00Z'),
            senderId: '1',
            sender: {
              id: '1',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com'
            }
          }
        ],
        unreadCount: 0,
        lastReadAt: new Date('2024-02-15T10:30:00Z'),
        updatedAt: new Date('2024-02-15T10:30:00Z')
      },
      {
        id: '2',
        type: 'GROUP',
        name: 'Cloud Migration Team',
        participants: [
          {
            userId: '1',
            role: 'MEMBER',
            lastReadAt: new Date('2024-02-15T09:15:00Z'),
            user: {
              id: '1',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              avatar: 'JD'
            }
          },
          {
            userId: '3',
            role: 'ADMIN',
            lastReadAt: new Date('2024-02-15T09:15:00Z'),
            user: {
              id: '3',
              firstName: 'Bob',
              lastName: 'Wilson',
              email: 'bob.wilson@example.com',
              avatar: 'BW'
            }
          },
          {
            userId: '4',
            role: 'MEMBER',
            lastReadAt: new Date('2024-02-15T09:15:00Z'),
            user: {
              id: '4',
              firstName: 'Sarah',
              lastName: 'Chen',
              email: 'sarah.chen@example.com',
              avatar: 'SC'
            }
          }
        ],
        messages: [
          {
            id: '2',
            content: 'Team meeting tomorrow at 2 PM',
            createdAt: new Date('2024-02-15T09:15:00Z'),
            senderId: '4',
            sender: {
              id: '4',
              firstName: 'Sarah',
              lastName: 'Chen',
              email: 'sarah.chen@example.com'
            }
          }
        ],
        unreadCount: 1,
        lastReadAt: new Date('2024-02-15T09:15:00Z'),
        updatedAt: new Date('2024-02-15T09:15:00Z')
      }
    ];

    return NextResponse.json(conversations);

  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}

// POST /api/conversations - Create a new conversation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, participantEmails, name, type = 'DIRECT' } = body;

    // Mock response
    const mockConversation = {
      id: '3',
      type,
      name: name || null,
      participants: [
        {
          userId: '1',
          role: 'ADMIN',
          user: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            avatar: 'JD'
          }
        },
        {
          userId: '2',
          role: 'MEMBER',
          user: {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            avatar: 'JS'
          }
        }
      ]
    };

    return NextResponse.json(mockConversation, { status: 201 });

  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}

// PATCH /api/conversations - Update conversation (mark as read, etc.)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, conversationId, lastReadAt } = body;

    // Mock response
    const mockParticipant = {
      userId: '1',
      conversationId,
      role: 'MEMBER',
      lastReadAt: lastReadAt || new Date(),
      user: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      }
    };

    return NextResponse.json(mockParticipant);

  } catch (error) {
    console.error('Error updating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to update conversation' },
      { status: 500 }
    );
  }
} 