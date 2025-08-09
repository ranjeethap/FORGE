'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Project {
  id: string;
  title: string;
  description: string;
  hourlyRate: number;
  estimatedHours: number | null;
  duration: string | null;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';
  budget: number | null;
  clientName: string | null;
  requirements: string | null;
  createdAt: string;
  updatedAt: string;
  team: {
    id: string;
    name: string;
    description: string;
    hourlyRate: number;
    status: string;
    leader: {
      firstName: string | null;
      lastName: string | null;
      email: string;
    };
  } | null;
  leader: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    bio: string | null;
    location: string | null;
    timezone: string | null;
    hourlyRate: number | null;
  } | null;
  skills: Array<{
    id: string;
    name: string;
    category: string | null;
  }>;
  members: Array<{
    id: string;
    role: string;
    joinedAt: string;
    isActive: boolean;
    user: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string;
      bio: string | null;
      location: string | null;
      timezone: string | null;
      hourlyRate: number | null;
      skills: Array<{
        id: string;
        name: string;
        category: string | null;
      }>;
    };
  }>;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || '';
  const [activeTab, setActiveTab] = useState('overview');
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userEmail'));
    const fetchProject = async () => {
      try {
        setLoading(true);
        let data: Project | null = null;

        // Local first for just-created projects
        try {
          const createdProjects = JSON.parse(localStorage.getItem('createdProjects') || '[]');
          const local = createdProjects.find((p: any) => String(p.id) === String(id));
          if (local) data = local as Project;
        } catch {}

        // API fallback
        if (!data && id) {
          const response = await fetch(`/api/projects/${id}`);
          if (response.ok) data = await response.json();
        }

        if (!data) throw new Error('Failed to fetch project');
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
    else setError('Invalid project id');
  }, [id]);

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

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const backHref = isLoggedIn ? '/dashboard' : '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
              <p className="text-gray-600 mt-1">{project.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={backHref}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                ← Back to {isLoggedIn ? 'Dashboard' : 'Landing'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">${project.hourlyRate}</div>
              <div className="text-sm text-gray-600">Hourly Rate</div>
            </div>
            {project.budget && (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">${project.budget.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Budget</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{project.members?.length || 0}</div>
              <div className="text-sm text-gray-600">Members</div>
            </div>
            {project.estimatedHours && (
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{project.estimatedHours}h</div>
                <div className="text-sm text-gray-600">Estimated Hours</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'members'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Members ({project.members?.length || 0})
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Project Info */}
            <div className="md:col-span-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Project Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Description</h3>
                    <p className="text-gray-900 mt-1">{project.description}</p>
                  </div>

                  {project.requirements && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Requirements</h3>
                      <p className="text-gray-900 mt-1">{project.requirements}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {project.clientName && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Client</h3>
                        <p className="text-gray-900 mt-1">{project.clientName}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Status</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                        project.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                        project.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'COMPLETED' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {(project.status || 'UNKNOWN').replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {project.skills && project.skills.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Project Actions */}
            <div className="md:col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Project Actions</h2>
                
                <div className="space-y-3">
                  {isLoggedIn ? (
                    <a
                      href="/dashboard"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                    >
                      Go to Dashboard
                    </a>
                  ) : (
                    <>
                      <p className="text-gray-500 text-center">Sign up to apply for this project</p>
                      <a
                        href="/sign-up"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                      >
                        Sign Up to Apply
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Project Members</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.members?.map((member) => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {member.user?.firstName || 'Unknown'} {member.user?.lastName || 'User'}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.role === 'Lead'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {member.role}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{member.user?.email || 'No email'}</p>
                  {member.user?.bio && (
                    <p className="text-sm text-gray-600 mb-2">{member.user.bio}</p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {member.user?.skills?.slice(0, 3).map((skill) => (
                      <span
                        key={skill.id}
                        className="px-1 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {member.user?.skills && member.user.skills.length > 3 && (
                      <span className="px-1 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        +{member.user.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 