'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Badge } from "../../../../../components/ui/badge";
import { ArrowLeft, Users, DollarSign, MessageSquare, Calendar, Building } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TeamApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();

  // Mock application data
  const application = {
    id: '1',
    teamName: 'Cloud Migration Experts',
    role: 'Backend Developer',
    status: 'pending',
    appliedAt: '2024-02-15',
    message: 'I have extensive experience with AWS and cloud migrations. I have successfully led multiple cloud migration projects and have a deep understanding of cloud architecture and best practices. I am particularly interested in joining this team because of its focus on enterprise-scale migrations.',
    team: {
      members: 4,
      activeProjects: 2,
      hourlyRate: 150,
      description: 'A specialized team focused on helping enterprises migrate their infrastructure to the cloud securely and efficiently.',
      requirements: [
        'At least 3 years of experience with cloud platforms (AWS/Azure/GCP)',
        'Strong knowledge of DevOps practices',
        'Experience with containerization and orchestration',
        'Excellent problem-solving skills'
      ],
      currentMembers: [
        { name: 'Sarah Chen', role: 'Team Lead', avatar: 'SC' },
        { name: 'Mike Johnson', role: 'Backend Developer', avatar: 'MJ' },
        { name: 'Lisa Wang', role: 'Infrastructure Engineer', avatar: 'LW' }
      ]
    }
  };

  const handleBack = () => {
    router.push('/dashboard/applications');
  };

  const handleWithdraw = () => {
    if (confirm('Are you sure you want to withdraw your application?')) {
      // In a real app, this would make an API call
      alert('Application withdrawn successfully');
      router.push('/dashboard/applications');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Button
            onClick={handleBack}
            variant="ghost"
            size="sm"
            className="group flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 -ml-2 px-2"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Applications</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{application.teamName}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Application for {application.role} Position</p>
          </div>
          <Badge variant="secondary" className={
            application.status === 'approved'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : application.status === 'rejected'
              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
          }>
            {application.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Application Details */}
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Your Message</h4>
                <p className="text-slate-600 dark:text-slate-400">{application.message}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Application Timeline</h4>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span>Applied on {new Date(application.appliedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Team Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600 dark:text-slate-400">{application.team.description}</p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{application.team.members}</p>
                  <p className="text-sm text-slate-500">Members</p>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{application.team.activeProjects}</p>
                  <p className="text-sm text-slate-500">Active Projects</p>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">${application.team.hourlyRate}</p>
                  <p className="text-sm text-slate-500">Per Hour</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Requirements</h4>
                <ul className="space-y-2">
                  {application.team.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Status */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-slate-500">Status</span>
                <Badge variant="secondary" className={
                  application.status === 'approved'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : application.status === 'rejected'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                }>
                  {application.status.toUpperCase()}
                </Badge>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-slate-500">Applied On</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {new Date(application.appliedAt).toLocaleDateString()}
                </span>
              </div>

              {application.status === 'pending' && (
                <Button 
                  onClick={handleWithdraw}
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700"
                >
                  Withdraw Application
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Current Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.team.currentMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-sm font-medium text-orange-600 dark:text-orange-400">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{member.name}</p>
                      <p className="text-sm text-slate-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Team
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Building className="h-4 w-4 mr-2" />
                View Team Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
