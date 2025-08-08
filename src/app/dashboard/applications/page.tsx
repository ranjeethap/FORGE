'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Search, Filter, Clock, DollarSign, Building, FileText, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplicationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Mock data for demonstration
  const allApplications = {
    teams: [
      {
        id: '1',
        teamName: 'Cloud Migration Experts',
        role: 'Backend Developer',
        status: 'pending',
        appliedAt: '2024-02-15',
        message: 'I have extensive experience with AWS and cloud migrations.',
        team: {
          members: 4,
          activeProjects: 2,
          hourlyRate: 150
        }
      },
      {
        id: '2',
        teamName: 'AI Innovation Squad',
        role: 'ML Engineer',
        status: 'approved',
        appliedAt: '2024-02-10',
        message: 'Looking forward to contributing to ML projects.',
        team: {
          members: 3,
          activeProjects: 1,
          hourlyRate: 120
        }
      }
    ],
    projects: [
      {
        id: '1',
        projectTitle: 'E-commerce Platform Migration',
        role: 'DevOps Engineer',
        status: 'pending',
        appliedAt: '2024-02-14',
        message: 'I have experience with similar migration projects.',
        project: {
          budget: { min: 50000, max: 150000 },
          timeline: '3-6 months',
          teamSize: '4-6 members'
        }
      }
    ]
  };

  // Filter and search logic
  const filteredApplications = {
    teams: allApplications.teams.filter(application => {
      const matchesSearch = application.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           application.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || application.status === statusFilter;
      return matchesSearch && matchesStatus;
    }),
    projects: allApplications.projects.filter(application => {
      const matchesSearch = application.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           application.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || application.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleViewApplication = (applicationId: string, type: 'team' | 'project') => {
    router.push(`/dashboard/applications/${type}/${applicationId}`);
  };

  const handleWithdrawApplication = (applicationId: string, type: 'team' | 'project') => {
    if (confirm(`Are you sure you want to withdraw your ${type} application?`)) {
      // In a real app, this would make an API call
      alert(`Withdrew ${type} application ${applicationId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Button
            onClick={handleBack}
            variant="ghost"
            size="sm"
            className="group flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 -ml-2 px-2"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Button>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Applications</h1>
          <p className="text-slate-600 dark:text-slate-400">Track your team and project applications</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-shadow hover:shadow-sm"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("");
                }}
                className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Applications */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Team Applications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredApplications.teams.length === 0 ? (
            <div className="col-span-2 text-center py-8">
              <div className="flex flex-col items-center gap-2">
                <FileText className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                <p className="text-slate-600 dark:text-slate-400">No team applications found</p>
              </div>
            </div>
          ) : (
            filteredApplications.teams.map(application => (
              <Card key={application.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className={
                      application.status === 'approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : application.status === 'rejected'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                    }>
                      {application.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{application.role}</Badge>
                  </div>
                  
                  <CardTitle className="text-xl mb-2">{application.teamName}</CardTitle>
                  <p className="text-sm text-slate-500">Applied on {new Date(application.appliedAt).toLocaleDateString()}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Team Stats */}
                  <div className="grid grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{application.team.members}</p>
                      <p className="text-xs text-slate-500">Members</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{application.team.activeProjects}</p>
                      <p className="text-xs text-slate-500">Projects</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">${application.team.hourlyRate}</p>
                      <p className="text-xs text-slate-500">Per Hour</p>
                    </div>
                  </div>

                  {/* Application Message */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Your Message</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{application.message}"</p>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => handleViewApplication(application.id, 'team')}
                      className="flex-1"
                    >
                      View Application
                    </Button>
                    {application.status === 'pending' && (
                      <Button 
                        onClick={() => handleWithdrawApplication(application.id, 'team')}
                        variant="outline" 
                        className="text-red-600 hover:text-red-700"
                      >
                        Withdraw
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Project Applications */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Project Applications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredApplications.projects.length === 0 ? (
            <div className="col-span-2 text-center py-8">
              <div className="flex flex-col items-center gap-2">
                <FileText className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                <p className="text-slate-600 dark:text-slate-400">No project applications found</p>
              </div>
            </div>
          ) : (
            filteredApplications.projects.map(application => (
              <Card key={application.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className={
                      application.status === 'approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : application.status === 'rejected'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                    }>
                      {application.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{application.role}</Badge>
                  </div>
                  
                  <CardTitle className="text-xl mb-2">{application.projectTitle}</CardTitle>
                  <p className="text-sm text-slate-500">Applied on {new Date(application.appliedAt).toLocaleDateString()}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Project Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        Budget:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        ${application.project.budget.min.toLocaleString()} - ${application.project.budget.max.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Timeline:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{application.project.timeline}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        Team Size:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{application.project.teamSize}</span>
                    </div>
                  </div>

                  {/* Application Message */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Your Message</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{application.message}"</p>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => handleViewApplication(application.id, 'project')}
                      className="flex-1"
                    >
                      View Application
                    </Button>
                    {application.status === 'pending' && (
                      <Button 
                        onClick={() => handleWithdrawApplication(application.id, 'project')}
                        variant="outline" 
                        className="text-red-600 hover:text-red-700"
                      >
                        Withdraw
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}