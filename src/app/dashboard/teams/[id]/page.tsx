'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { ArrowLeft, Users, DollarSign, Briefcase, MessageSquare, Calendar, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TeamDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();

  // Mock team data
  const team = {
    id: '1',
    name: 'Cloud Migration Experts',
    description: 'A specialized team focused on helping enterprises migrate their infrastructure to the cloud securely and efficiently.',
    status: 'active',
    hourlyRate: 150,
    members: [
      { name: 'Sarah Chen', role: 'Team Lead', avatar: 'SC', joinedDate: '2023-12-01' },
      { name: 'Mike Johnson', role: 'Backend Developer', avatar: 'MJ', joinedDate: '2024-01-15' },
      { name: 'Lisa Wang', role: 'Infrastructure Engineer', avatar: 'LW', joinedDate: '2024-01-20' }
    ],
    projects: [
      {
        id: '1',
        title: 'E-commerce Platform Migration',
        status: 'in_progress',
        progress: 65,
        dueDate: '2024-07-15'
      },
      {
        id: '2',
        title: 'Healthcare App Cloud Setup',
        status: 'planning',
        progress: 15,
        dueDate: '2024-08-30'
      }
    ],
    stats: {
      completedProjects: 3,
      activeProjects: 2,
      totalHours: 450,
      clientSatisfaction: 4.8
    }
  };

  const handleBack = () => {
    router.push('/dashboard/teams');
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
            <span className="text-sm font-medium">Back to Teams</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{team.name}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">{team.description}</p>
          </div>
          <Badge variant="secondary" className={
            team.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400'
          }>
            {team.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Team Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{team.stats.completedProjects}</p>
                  <p className="text-sm text-slate-500">Completed Projects</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{team.stats.activeProjects}</p>
                  <p className="text-sm text-slate-500">Active Projects</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{team.stats.totalHours}</p>
                  <p className="text-sm text-slate-500">Total Hours</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{team.stats.clientSatisfaction}</p>
                  <p className="text-sm text-slate-500">Client Rating</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.projects.map(project => (
                  <div key={project.id} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        project.status === 'completed' ? 'bg-green-500' :
                        project.status === 'in_progress' ? 'bg-orange-500' : 'bg-slate-300'
                      }`} />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{project.title}</p>
                        <p className="text-sm text-slate-500">Due: {new Date(project.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-500">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-2 bg-orange-500 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/projects/${project.id}`)}>
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Members */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Team Members</CardTitle>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.members.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-sm font-medium text-orange-600 dark:text-orange-400">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{member.name}</p>
                        <p className="text-sm text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">
                      Joined {new Date(member.joinedDate).toLocaleDateString()}
                    </p>
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
                Team Chat
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Team Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
