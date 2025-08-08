import { NextRequest, NextResponse } from 'next/server';

// GET /api/messages - Get messages for a conversation
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId') || 'demo-conversation';
    const email = searchParams.get('email') || 'demo@example.com';

    if (!conversationId || !email) {
      return NextResponse.json(
        { error: 'conversationId and email are required' },
        { status: 400 }
      );
    }

    // Mock messages data
    const messages = [
      {
        id: '1',
        content: 'Hey team! How is everyone doing?',
        createdAt: new Date('2024-02-15T10:00:00Z'),
        senderId: '1',
        conversationId: conversationId,
        sender: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          avatar: 'JD'
        }
      },
      {
        id: '2',
        content: 'Great! Working on the cloud migration project.',
        createdAt: new Date('2024-02-15T10:05:00Z'),
        senderId: '2',
        conversationId: conversationId,
        sender: {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          avatar: 'JS'
        }
      },
      {
        id: '3',
        content: 'Perfect! We have a meeting tomorrow at 2 PM.',
        createdAt: new Date('2024-02-15T10:10:00Z'),
        senderId: '3',
        conversationId: conversationId,
        sender: {
          id: '3',
          firstName: 'Bob',
          lastName: 'Wilson',
          email: 'bob.wilson@example.com',
          avatar: 'BW'
        }
      }
    ];

    return NextResponse.json(messages);

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST /api/messages - Send a new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId, content, email } = body;

    if (!conversationId || !content || !email) {
      return NextResponse.json(
        { error: 'conversationId, content, and email are required' },
        { status: 400 }
      );
    }

    // Mock new message
    const newMessage = {
      id: '4',
      content,
      createdAt: new Date(),
      senderId: '1',
      conversationId,
      sender: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        avatar: 'JD'
      }
    };

    return NextResponse.json(newMessage, { status: 201 });

  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

// PATCH /api/messages - Edit a message
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, messageId, content } = body;

    if (!email || !messageId || !content) {
      return NextResponse.json(
        { error: 'Email, messageId, and content are required' },
        { status: 400 }
      );
    }

    // Mock updated message
    const updatedMessage = {
      id: messageId,
      content,
      createdAt: new Date('2024-02-15T10:00:00Z'),
      isEdited: true,
      editedAt: new Date(),
      senderId: '1',
      conversationId: '1',
      sender: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        avatar: 'JD'
      }
    };

    return NextResponse.json(updatedMessage);

  } catch (error) {
    console.error('Error editing message:', error);
    return NextResponse.json(
      { error: 'Failed to edit message' },
      { status: 500 }
    );
  }
} 