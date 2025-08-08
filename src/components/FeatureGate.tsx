import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";

interface FeatureGateProps {
  feature: string;
  requiredTier: 'STARTUP' | 'BUSINESS' | 'ENTERPRISE';
  children: React.ReactNode;
}

export function FeatureGate({ feature, requiredTier, children }: FeatureGateProps) {
  const { user } = useUser();
  const userTier = (user?.publicMetadata?.subscriptionTier as string) || 'FREE';
  const tiers = ['FREE', 'INDIVIDUAL', 'STARTUP', 'BUSINESS', 'ENTERPRISE'];
  const userTierIndex = tiers.indexOf(userTier);
  const requiredTierIndex = tiers.indexOf(requiredTier);

  if (userTierIndex >= requiredTierIndex) {
    return <>{children}</>;
  }

  return (
    <div className="relative group">
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 bg-slate-900/5 dark:bg-slate-900/20 backdrop-blur-[1px] rounded flex items-center justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 transform scale-0 group-hover:scale-100 transition-transform">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Lock className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Upgrade Required
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                This feature requires {requiredTier.toLowerCase()} plan or higher
              </p>
              <Button asChild size="sm" variant="default">
                <Link href="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SubscriptionLimitsProps {
  type: 'teams' | 'projects' | 'members';
}

export function SubscriptionLimits({ type }: SubscriptionLimitsProps) {
  const { user } = useUser();
  const userTier = (user?.publicMetadata?.subscriptionTier as string) || 'FREE';

  const limits = {
    FREE: { teams: 3, projects: 10, members: 25 },
    INDIVIDUAL: { teams: 5, projects: 20, members: 50 },
    STARTUP: { teams: 10, projects: 50, members: 100 },
    BUSINESS: { teams: -1, projects: -1, members: 250 },
    ENTERPRISE: { teams: -1, projects: -1, members: -1 }
  };

  const currentLimit = limits[userTier as keyof typeof limits][type];
  const usage = {
    teams: 2,
    projects: 8,
    members: 15
  };

  const percentage = currentLimit === -1 ? 0 : (usage[type] / currentLimit) * 100;
  const isNearLimit = percentage >= 80;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-500">
          {type.charAt(0).toUpperCase() + type.slice(1)} Usage
        </span>
        <span className="text-sm font-medium">
          {usage[type]} / {currentLimit === -1 ? '∞' : currentLimit}
        </span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
        <div 
          className={`h-2 rounded-full transition-all ${
            isNearLimit ? 'bg-orange-500' : 'bg-blue-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {isNearLimit && (
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-orange-500">
            Approaching limit
          </p>
          <Button asChild size="sm" variant="ghost" className="text-xs">
            <Link href="/pricing">Upgrade</Link>
          </Button>
        </div>
      )}
    </div>
  );
}