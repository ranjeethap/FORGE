import { NextRequest, NextResponse } from 'next/server';

// GET /api/notifications - Get user's notifications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Mock notifications data
    const mockNotifications = [
      {
        id: '1',
        userId: '1',
        type: 'PROJECT_INVITATION',
        title: 'Project Invitation',
        message: 'You have been invited to join the Cloud Migration project',
        data: {
          projectId: '1',
          projectName: 'Cloud Migration',
          inviterId: '2',
          inviterName: 'Jane Smith'
        },
        isRead: false,
        createdAt: new Date('2024-02-15T10:30:00Z'),
        updatedAt: new Date('2024-02-15T10:30:00Z')
      },
      {
        id: '2',
        userId: '1',
        type: 'TEAM_APPLICATION_APPROVED',
        title: 'Team Application Approved',
        message: 'Your application to join the AI Innovation Squad has been approved',
        data: {
          teamId: '2',
          teamName: 'AI Innovation Squad',
          role: 'Developer'
        },
        isRead: true,
        createdAt: new Date('2024-02-15T09:15:00Z'),
        updatedAt: new Date('2024-02-15T09:15:00Z')
      },
      {
        id: '3',
        userId: '1',
        type: 'MESSAGE_RECEIVED',
        title: 'New Message',
        message: 'Bob Wilson sent you a message in Cloud Migration Team',
        data: {
          conversationId: '2',
          messageId: '3',
          senderId: '3',
          senderName: 'Bob Wilson'
        },
        isRead: false,
        createdAt: new Date('2024-02-15T08:45:00Z'),
        updatedAt: new Date('2024-02-15T08:45:00Z')
      },
      {
        id: '4',
        userId: '1',
        type: 'PROJECT_MILESTONE',
        title: 'Project Milestone Reached',
        message: 'Planning phase completed for E-commerce Platform project',
        data: {
          projectId: '1',
          projectName: 'E-commerce Platform',
          milestone: 'Planning Phase',
          progress: 25
        },
        isRead: true,
        createdAt: new Date('2024-02-14T16:20:00Z'),
        updatedAt: new Date('2024-02-14T16:20:00Z')
      }
    ];

    // Filter by type if specified
    let filteredNotifications = mockNotifications;
    if (type) {
      filteredNotifications = mockNotifications.filter(n => n.type === type);
    }

    // Apply pagination
    const total = filteredNotifications.length;
    const paginatedNotifications = filteredNotifications.slice(offset, offset + limit);

    return NextResponse.json({
      notifications: paginatedNotifications,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// POST /api/notifications - Create a new notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, title, message, data } = body;

    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'userId, type, title, and message are required' },
        { status: 400 }
      );
    }

    // Mock new notification
    const newNotification = {
      id: '5',
      userId,
      type,
      title,
      message,
      data: data || {},
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json(newNotification, { status: 201 });

  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

// PATCH /api/notifications - Mark notifications as read
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, notificationIds, markAllAsRead } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Mock response
    const updatedNotifications = notificationIds ? 
      notificationIds.map((id: string) => ({
        id,
        isRead: true,
        updatedAt: new Date()
      })) : 
      [];

    return NextResponse.json({
      success: true,
      updatedCount: updatedNotifications.length,
      message: markAllAsRead ? 'All notifications marked as read' : 'Notifications marked as read'
    });

  } catch (error) {
    console.error('Error updating notifications:', error);
    return NextResponse.json(
      { error: 'Failed to update notifications' },
      { status: 500 }
    );
  }
} 