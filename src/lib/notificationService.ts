// Mock notification service
export interface NotificationData {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
}

export async function createNotification(
  userId: string,
  type: string,
  title: string,
  message: string,
  data?: any
) {
  try {
    // Mock notification creation
    const notification = {
      id: `notification-${Date.now()}`,
      userId,
      type,
      title,
      message,
      data: data || {},
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Mock notification created:', notification);
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    // Mock marking notification as read
    console.log('Mock notification marked as read:', notificationId);
    return { success: true };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    // Mock marking all notifications as read
    console.log('Mock all notifications marked as read for user:', userId);
    return { success: true };
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
} 