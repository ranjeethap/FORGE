'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Badge } from "../../../../../components/ui/badge";
import { ArrowLeft, Clock, Users, DollarSign, MessageSquare, Calendar, Building } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();

  // Mock application data
  const application = {
    id: '1',
    projectTitle: 'E-commerce Platform Migration',
    role: 'DevOps Engineer',
    status: 'pending',
    appliedAt: '2024-02-14',
    message: 'I have experience with similar migration projects. My background in cloud infrastructure and DevOps practices makes me well-suited for this role. I have successfully completed several large-scale migrations with minimal downtime.',
    project: {
      budget: { min: 50000, max: 150000 },
      timeline: '3-6 months',
      teamSize: '4-6 members',
      description: 'Help migrate a large e-commerce platform from on-premise to AWS with zero downtime. This project involves comprehensive planning, execution, and monitoring of the migration process.',
      requirements: [
        'Experience with AWS migration tools and services',
        'Knowledge of containerization (Docker, Kubernetes)',
        'Strong background in CI/CD practices',
        'Experience with high-availability architectures'
      ],
      milestones: [
        { title: 'Planning Phase', deadline: '2024-03-15' },
        { title: 'Infrastructure Setup', deadline: '2024-04-15' },
        { title: 'Data Migration', deadline: '2024-06-15' },
        { title: 'Testing & Validation', deadline: '2024-07-15' }
      ],
      client: {
        name: 'TechRetail Inc.',
        industry: 'E-commerce',
        size: 'Mid-size Enterprise'
      }
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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{application.projectTitle}</h1>
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

          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600 dark:text-slate-400">{application.project.description}</p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    ${application.project.budget.min.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-500">Min Budget</p>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{application.project.timeline}</p>
                  <p className="text-sm text-slate-500">Timeline</p>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{application.project.teamSize}</p>
                  <p className="text-sm text-slate-500">Team Size</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Requirements</h4>
                <ul className="space-y-2">
                  {application.project.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Project Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.project.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{milestone.title}</p>
                        <p className="text-sm text-slate-500">Due: {new Date(milestone.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
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

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-slate-500">Company</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">{application.project.client.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-slate-500">Industry</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">{application.project.client.industry}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-slate-500">Company Size</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">{application.project.client.size}</span>
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
                Contact Client
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Building className="h-4 w-4 mr-2" />
                View Project Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
