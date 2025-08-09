'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Skill {
  id: string;
  name: string;
  category: string | null;
}

interface Team {
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
}

export default function CreateProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [userTeams, setUserTeams] = useState<Team[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    hourlyRate: '',
    budget: '',
    estimatedHours: '',
    duration: '',
    clientName: '',
    teamId: '',
    skills: [] as string[]
  });

  // Fetch available skills and user's teams
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [skillsResponse, teamsResponse] = await Promise.all([
          fetch('/api/skills'),
          fetch('/api/teams')
        ]);

        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          setAvailableSkills(skillsData);
        }

        if (teamsResponse.ok) {
          const teamsData = await teamsResponse.json();
          const apiTeams: Team[] = Array.isArray(teamsData) ? teamsData : (Array.isArray(teamsData?.teams) ? teamsData.teams : []);
          setUserTeams(apiTeams);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillToggle = (skillId: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(id => id !== skillId)
        : [...prev.skills, skillId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setError('Project title is required');
      return;
    }

    if (!formData.description.trim()) {
      setError('Project description is required');
      return;
    }

    if (!formData.hourlyRate || parseFloat(formData.hourlyRate) <= 0) {
      setError('Valid hourly rate is required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Persist locally for mock flow
      const createdProjects = JSON.parse(localStorage.getItem('createdProjects') || '[]');
      const newId = String(Date.now());
      const newProject = {
        id: newId,
        title: formData.title.trim(),
        description: formData.description.trim(),
        requirements: formData.requirements.trim() || '',
        hourlyRate: parseFloat(formData.hourlyRate),
        budget: formData.budget ? parseFloat(formData.budget) : null,
        estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : null,
        duration: formData.duration.trim() || null,
        clientName: formData.clientName.trim() || null,
        status: 'OPEN' as const,
        team: null,
        leader: {
          firstName: localStorage.getItem('userFirstName') || 'You',
          lastName: localStorage.getItem('userLastName') || '',
          email: localStorage.getItem('userEmail') || 'demo@example.com',
        },
        skills: (formData.skills || []).map(id => ({ id, name: availableSkills.find(s => s.id === id)?.name || 'Skill', category: null })),
        members: [],
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('createdProjects', JSON.stringify([newProject, ...createdProjects]));

      // Redirect to projects list (the new project will appear there)
      router.push(`/projects/${newId}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
              <p className="text-gray-600 mt-1">Post a project and find the perfect team to work on it</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/projects"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                ← Back to Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Basic Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Project Information</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your project, goals, and what you're looking to achieve"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                    Requirements
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="List specific requirements, deliverables, and expectations"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate (USD) *
                    </label>
                    <input
                      type="number"
                      id="hourlyRate"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      min="1"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="50.00"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Total Budget (USD)
                    </label>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="5000.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="estimatedHours" className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Hours
                    </label>
                    <input
                      type="number"
                      id="estimatedHours"
                      name="estimatedHours"
                      value={formData.estimatedHours}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="40"
                    />
                  </div>

                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Duration
                    </label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 2 weeks, 1 month, 3 months"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter client or company name"
                  />
                </div>
              </div>
            </div>

            {/* Team Assignment */}
            {userTeams.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Team Assignment</h2>
                <p className="text-sm text-gray-600 mb-4">Assign this project to one of your teams (optional)</p>
                
                <div>
                  <label htmlFor="teamId" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Team
                  </label>
                  <select
                    id="teamId"
                    name="teamId"
                    value={formData.teamId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">No team assignment</option>
                    {userTeams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name} - ${team.hourlyRate}/hr
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Required Skills */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Required Skills</h2>
              <p className="text-sm text-gray-600 mb-4">Select the skills needed for this project</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableSkills.map((skill) => (
                  <label key={skill.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill.id)}
                      onChange={() => handleSkillToggle(skill.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{skill.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end space-x-4">
              <a
                href="/projects"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </a>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Creating Project...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 