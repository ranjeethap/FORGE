'use client';

import { useState, useEffect, use } from "react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  timeline: string;
  teamSize: string;
  progress: number;
  team: {
    id: string;
    name: string;
    members: Array<{
      id: string;
      name: string;
      role: string;
      avatar: string;
    }>;
  };
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'in_progress' | 'completed';
  }>;
}

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock project data
    const mockProject: Project = {
      id: id,
      title: 'Cloud Migration for E-commerce Platform',
      description: 'Help migrate a large e-commerce platform from on-premise to AWS with zero downtime. This project involves setting up cloud infrastructure, migrating databases, and ensuring high availability and performance.',
      role: 'Team Lead',
      status: 'in_progress',
      budget: { min: 50000, max: 150000, currency: 'USD' },
      timeline: '3-6 months',
      teamSize: '4-6 members',
      progress: 65,
      team: {
        id: '1',
        name: 'Cloud Migration Experts',
        members: [
          { id: '1', name: 'John Doe', role: 'Team Lead', avatar: 'JD' },
          { id: '2', name: 'Jane Smith', role: 'DevOps Engineer', avatar: 'JS' },
          { id: '3', name: 'Bob Wilson', role: 'Backend Developer', avatar: 'BW' },
          { id: '4', name: 'Alice Brown', role: 'Frontend Developer', avatar: 'AB' },
        ]
      },
      milestones: [
        {
          id: '1',
          title: 'Infrastructure Setup',
          description: 'Set up AWS infrastructure and networking',
          dueDate: '2024-03-15',
          status: 'completed'
        },
        {
          id: '2',
          title: 'Database Migration',
          description: 'Migrate databases to AWS RDS',
          dueDate: '2024-04-15',
          status: 'in_progress'
        },
        {
          id: '3',
          title: 'Application Deployment',
          description: 'Deploy applications to AWS',
          dueDate: '2024-05-15',
          status: 'pending'
        },
        {
          id: '4',
          title: 'Testing & Optimization',
          description: 'Performance testing and optimization',
          dueDate: '2024-06-15',
          status: 'pending'
        }
      ]
    };

    setProject(mockProject);
    setLoading(false);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on_hold': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Project not found</p>
          <Link
            href="/dashboard/projects"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
              <p className="text-gray-600 mt-1">Project Details</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/projects"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                ← Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Overview</h2>
              <p className="text-gray-700 mb-6">{project.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{project.progress}%</div>
                  <div className="text-sm text-gray-600">Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">${project.budget.min.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Min Budget</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{project.timeline}</div>
                  <div className="text-sm text-gray-600">Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{project.teamSize}</div>
                  <div className="text-sm text-gray-600">Team Size</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Progress</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{project.progress}% complete</p>
            </div>

            {/* Milestones */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Milestones</h2>
              <div className="space-y-4">
                {project.milestones.map((milestone) => (
                  <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                        {milestone.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                    <p className="text-xs text-gray-500">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Your Role</label>
                  <p className="text-sm text-gray-900">{project.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p className="text-sm text-gray-900 capitalize">{project.status.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Budget Range</label>
                  <p className="text-sm text-gray-900">
                    ${project.budget.min.toLocaleString()} - ${project.budget.max.toLocaleString()} {project.budget.currency}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Timeline</label>
                  <p className="text-sm text-gray-900">{project.timeline}</p>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Team</h2>
              <div className="space-y-3">
                {project.team.members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{member.avatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-600">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  View Documents
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  Update Progress
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                  Team Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
