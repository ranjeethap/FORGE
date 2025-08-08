import { auth } from '@clerk/nextjs/server';

// Mock UserRole enum
enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR'
}

export interface AuthUser {
  id: string;
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  subscriptionTier: string;
  subscriptionStatus: string;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    // Mock authentication check
    const userId = 'mock-user-id';

    // Mock user data
    return {
      id: '1',
      clerkId: userId,
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.USER,
      subscriptionTier: 'INDIVIDUAL',
      subscriptionStatus: 'ACTIVE'
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function requireAdmin(): Promise<void> {
  const user = await getCurrentUser();
  if (!user || user.role !== UserRole.ADMIN) {
    throw new Error('Admin access required');
  }
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === UserRole.ADMIN;
}

export async function getUserProfileByClerkId(clerkId: string): Promise<AuthUser | null> {
  try {
    // Mock user profile lookup
    if (clerkId === 'mock-user-id') {
      return {
        id: '1',
        clerkId,
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
        subscriptionTier: 'INDIVIDUAL',
        subscriptionStatus: 'ACTIVE'
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile by clerk ID:', error);
    return null;
  }
}
