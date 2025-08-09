'use client';

import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  requirements: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';
  hourlyRate: number;
  budget: number | null;
  estimatedHours: number | null;
  duration: string | null;
  clientName: string | null;
  createdAt: string;
  leader: {
    firstName: string | null;
    lastName: string | null;
    email: string;
  } | null;
  team: {
    id: string;
    name: string;
  } | null;
  members: Array<{
    id: string;
    role: string;
    user: {
      firstName: string | null;
      lastName: string | null;
      email: string;
    };
  }>;
  skills: Array<{
    id: string;
    name: string;
    category: string | null;
  }>;
}

interface UserProfile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  skills: Array<{
    id: string;
    name: string;
    category: string | null;
  }>;
  customSkills: string[];
  location: string | null;
  hourlyRate: number | null;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(true);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minHourlyRate, setMinHourlyRate] = useState<number>(0);
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(1000);
  const [minBudget, setMinBudget] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(100000);
  const [sortBy, setSortBy] = useState<string>('relevance');

  // Available skills for filtering
  const [availableSkills, setAvailableSkills] = useState<Array<{id: string, name: string, category: string | null}>>([]);

  // Fetch projects and user profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const email = localStorage.getItem('userEmail') || 'demo@example.com';
        const [projectsResponse, profileResponse, skillsResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch(`/api/users/profile?email=${email}`),
          fetch('/api/skills')
        ]);

        let mergedProjects: Project[] = [];

        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          const apiProjects: Project[] = Array.isArray(projectsData) ? projectsData : (Array.isArray(projectsData?.projects) ? projectsData.projects : []);
          const localCreated: Project[] = (() => { try { return JSON.parse(localStorage.getItem('createdProjects') || '[]'); } catch { return []; } })();
          mergedProjects = [...localCreated, ...apiProjects];
          setProjects(mergedProjects);
          setFilteredProjects(mergedProjects);
        } else {
          const localCreated: Project[] = (() => { try { return JSON.parse(localStorage.getItem('createdProjects') || '[]'); } catch { return []; } })();
          mergedProjects = localCreated;
          setProjects(mergedProjects);
          setFilteredProjects(mergedProjects);
        }

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setUserProfile(profileData);
        }

        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          setAvailableSkills(skillsData);
        }
      } catch (error) {
        console.error('Error fetching projects data:', error);
        const localCreated: Project[] = (() => { try { return JSON.parse(localStorage.getItem('createdProjects') || '[]'); } catch { return []; } })();
        setProjects(localCreated);
        setFilteredProjects(localCreated);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate match score for a project based on user profile
  const calculateMatchScore = (project: Project): number => {
    if (!userProfile) return 0;

    let score = 0;
    const userSkills = [
      ...userProfile.skills.map(s => s.name.toLowerCase()),
      ...userProfile.customSkills.map(s => s.toLowerCase())
    ];
    const projectSkills = project.skills.map(s => s.name.toLowerCase());

    // Skill match (50% weight)
    const skillMatches = projectSkills.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.includes(skill) || skill.includes(userSkill)
      )
    );
    score += (skillMatches.length / projectSkills.length) * 50;

    // Hourly rate compatibility (30% weight)
    if (userProfile.hourlyRate && project.hourlyRate) {
      const rateDiff = Math.abs(userProfile.hourlyRate - project.hourlyRate);
      const rateScore = Math.max(0, 30 - (rateDiff / 10));
      score += rateScore;
    }

    // Project complexity (10% weight)
    if (project.estimatedHours && project.estimatedHours > 0) {
      if (project.estimatedHours <= 40) {
        score += 10; // Small project
      } else if (project.estimatedHours <= 160) {
        score += 8; // Medium project
      } else {
        score += 5; // Large project
      }
    }

    // Budget availability (10% weight)
    if (project.budget && project.budget > 0) {
      score += 10;
    }

    return Math.round(score);
  };

  // Apply filters and search
  useEffect(() => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.requirements.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(project =>
        selectedSkills.some(selectedSkill =>
          project.skills.some(projectSkill => projectSkill.id === selectedSkill)
        )
      );
    }

    // Hourly rate filter
    filtered = filtered.filter(project =>
      project.hourlyRate >= minHourlyRate && project.hourlyRate <= maxHourlyRate
    );

    // Budget filter
    filtered = filtered.filter(project =>
      !project.budget || (project.budget >= minBudget && project.budget <= maxBudget)
    );

    // Sort results
    switch (sortBy) {
      case 'relevance':
        if (userProfile) {
          filtered.sort((a, b) => calculateMatchScore(b) - calculateMatchScore(a));
        } else {
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        break;
      case 'hourlyRate':
        filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case 'budget':
        filtered.sort((a, b) => (b.budget || 0) - (a.budget || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'duration':
        filtered.sort((a, b) => (a.estimatedHours || 0) - (b.estimatedHours || 0));
        break;
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedStatus, selectedSkills, minHourlyRate, maxHourlyRate, minBudget, maxBudget, sortBy, userProfile]);

  // Get recommended projects
  const getRecommendedProjects = () => {
    if (!userProfile) return [];
    
    return filteredProjects
      .filter(project => project.status === 'OPEN')
      .map(project => ({
        ...project,
        matchScore: calculateMatchScore(project)
      }))
      .filter(project => project.matchScore > 30) // Only show projects with >30% match
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  };

  const recommendedProjects = getRecommendedProjects();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Browse Projects</h1>
              <p className="text-gray-600 mt-1">Find exciting projects that match your skills and interests</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/create-project"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Project
              </a>
              <a
                href="/dashboard"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                ← Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Recommendations Section */}
        {showRecommendations && recommendedProjects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
              <button
                onClick={() => setShowRecommendations(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Hide
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendedProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {project.matchScore}% match
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-green-600">${project.hourlyRate}/hr</span>
                    {project.budget && (
                      <span className="text-sm text-gray-500">Budget: ${project.budget}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                        +{project.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  <a
                    href={`/projects/${project.id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Projects</label>
              <input
                type="text"
                placeholder="Search by title, description, requirements, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>

            {/* Skills Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
              <select
                multiple
                value={selectedSkills}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value);
                  setSelectedSkills(values);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                size={3}
              >
                {availableSkills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Hourly Rate Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Hourly Rate</label>
              <input
                type="number"
                value={minHourlyRate}
                onChange={(e) => setMinHourlyRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Hourly Rate</label>
              <input
                type="number"
                value={maxHourlyRate}
                onChange={(e) => setMaxHourlyRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Budget</label>
              <input
                type="number"
                value={minBudget}
                onChange={(e) => setMinBudget(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Budget</label>
              <input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="hourlyRate">Hourly Rate</option>
                <option value="budget">Budget</option>
                <option value="newest">Newest</option>
                <option value="duration">Duration</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const matchScore = userProfile ? calculateMatchScore(project) : 0;
            const isRecommended = recommendedProjects.some(rp => rp.id === project.id);
            
            return (
              <div 
                key={project.id} 
                className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
                  isRecommended ? 'border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  {userProfile && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      matchScore > 70 ? 'bg-green-100 text-green-800' :
                      matchScore > 40 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {matchScore}% match
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-green-600">${project.hourlyRate}/hr</span>
                  {project.budget && (
                    <span className="text-sm text-gray-500">Budget: ${project.budget}</span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                    project.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'COMPLETED' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                  {project.estimatedHours && (
                    <span className="text-sm text-gray-500">~{project.estimatedHours}h</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {project.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                      +{project.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    by {project.leader?.firstName || project.leader?.email || 'Unknown'}
                  </div>
                  <a
                    href={`/projects/${project.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or create a new project</p>
            <a
              href="/create-project"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Project
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 