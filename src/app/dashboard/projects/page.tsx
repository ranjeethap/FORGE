'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { FileText, Plus, Search, Filter, Clock, Users, DollarSign, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MyProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Mock data for demonstration
  const allProjects = [
    {
      id: '1',
      title: 'Cloud Migration for E-commerce Platform',
      description: 'Help migrate a large e-commerce platform from on-premise to AWS with zero downtime.',
      role: 'Team Lead',
      status: 'in_progress',
      budget: { min: 50000, max: 150000, currency: 'USD' },
      timeline: '3-6 months',
      teamSize: '4-6 members',
      progress: 65
    },
    {
      id: '2',
      title: 'AI-Powered Customer Support Chatbot',
      description: 'Develop an intelligent chatbot using NLP and machine learning for customer support.',
      role: 'Developer',
      status: 'planning',
      budget: { min: 30000, max: 80000, currency: 'USD' },
      timeline: '2-4 months',
      teamSize: '3-4 members',
      progress: 15
    }
  ];

  // Filter and search logic
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleNewProject = () => {
    router.push('/dashboard/projects/new');
  };

  const handleViewDetails = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}`);
  };

  const handleViewDocuments = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}/documents`);
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
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Projects</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage and track your project involvement</p>
          </div>
          <Button 
            onClick={handleNewProject}
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all hover:shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
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
                placeholder="Search projects..."
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
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
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

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <Search className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No projects found</h3>
                <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("");
                }}
              >
                Clear filters
              </Button>
            </div>
          </div>
        ) : (
          filteredProjects.map(project => (
            <Card 
              key={project.id} 
              className="group hover:shadow-lg transition-all duration-300 hover:border-orange-200 dark:hover:border-orange-800"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className={
                    project.status === 'in_progress' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      : project.status === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                  }>
                    {project.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge variant="outline">{project.role}</Badge>
                </div>
                
                <CardTitle className="text-xl mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {project.title}
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{project.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Budget:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      ${project.budget.min.toLocaleString()} - ${project.budget.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Timeline:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{project.timeline}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Team Size:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{project.teamSize}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Progress</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-2 bg-orange-500 rounded-full transition-all duration-500 ease-in-out group-hover:bg-orange-600"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => handleViewDetails(project.id)}
                    className="flex-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 group-hover:border-orange-200 dark:group-hover:border-orange-800 transition-colors"
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleViewDocuments(project.id)}
                    variant="outline" 
                    size="icon"
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 group-hover:border-orange-200 dark:group-hover:border-orange-800 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
