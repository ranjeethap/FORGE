import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Crown, Settings } from "lucide-react";

export function AdminNavigation() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'ADMIN';

  if (!isAdmin) return null;

  return (
    <Button asChild variant="ghost" size="sm">
      <Link href="/admin" className="flex items-center gap-2">
        <Settings className="h-4 w-4" />
        <span>Admin Panel</span>
      </Link>
    </Button>
  );
}

export function SubscriptionBadge() {
  const { user } = useUser();
  const tier = (user?.publicMetadata?.subscriptionTier as string) || 'FREE';
  
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