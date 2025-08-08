import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Crown, Settings, Users } from "lucide-react";
import { useState, useEffect } from "react";

export function AdminNavigation() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail') || 'demo@example.com';
        const response = await fetch(`/api/users/profile?email=${userEmail}`);
        if (response.ok) {
          const userData = await response.json();
          setIsAdmin(userData.role === 'ADMIN');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (loading || !isAdmin) return null;

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm">
        <Link href="/admin" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Admin Panel</span>
        </Link>
      </Button>
    </div>
  );
}

export function SubscriptionBadge() {
  const [tier, setTier] = useState('FREE');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail') || 'demo@example.com';
        const response = await fetch(`/api/users/profile?email=${userEmail}`);
        if (response.ok) {
          const userData = await response.json();
          setTier(userData.subscriptionTier || 'FREE');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return null;
  
  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant="secondary"
        className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
      >
        <Crown className="h-3 w-3 mr-1" />
        {tier}
      </Badge>
      <Button asChild variant="outline" size="sm">
        <Link href="/pricing">Upgrade</Link>
      </Button>
    </div>
  );
}

export function MainNavigation() {
  return (
    <nav className="flex items-center space-x-4">
      <Link 
        href="/dashboard"
        className="px-3 py-2 text-sm font-medium rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300"
      >
        Overview
      </Link>
      <Link 
        href="/projects"
        className="px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700"
      >
        Projects
      </Link>
      <Link 
        href="/teams"
        className="px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700"
      >
        Teams
      </Link>
      <Link 
        href="/messages"
        className="px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700"
      >
        Messages
      </Link>
    </nav>
  );
}