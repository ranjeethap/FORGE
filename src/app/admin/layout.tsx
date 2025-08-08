import { redirect } from 'next/navigation';
import { getCurrentUser, requireAdmin } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    // Check if user is authenticated and has admin privileges
    await requireAdmin();
  } catch (error) {
    // Redirect to sign-in if not authenticated
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
}
