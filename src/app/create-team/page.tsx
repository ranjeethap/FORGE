'use client';


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Skill {
  id: string;
  name: string;
  category: string | null;
}

export default function CreateTeamPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    hourlyRate: '',
    maxMembers: '5',
    skills: [] as string[],
    location: '',
    timezone: '',
    communication: [] as string[]
  });

  // Fetch available skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        if (response.ok) {
          const data = await response.json();
          setAvailableSkills(data);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
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

  const handleCommunicationToggle = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      communication: prev.communication.includes(tool)
        ? prev.communication.filter(t => t !== tool)
        : [...prev.communication, tool]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setError('Team name is required');
      return;
    }

    if (!formData.description.trim()) {
      setError('Team description is required');
      return;
    }

    if (!formData.hourlyRate || parseFloat(formData.hourlyRate) <= 0) {
      setError('Valid hourly rate is required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          hourlyRate: parseFloat(formData.hourlyRate),
          maxMembers: parseInt(formData.maxMembers),
          skillIds: formData.skills,
          location: formData.location.trim() || null,
          timezone: formData.timezone.trim() || null,
          communication: formData.communication
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create team');
      }

      const generatedId = data.id || String(Date.now());
      try {
        const createdTeams = JSON.parse(localStorage.getItem('createdTeams') || '[]');
        const newTeam = {
          id: generatedId,
          name: data.name,
          description: data.description,
          status: 'OPEN',
          hourlyRate: data.hourlyRate,
          maxMembers: data.maxMembers || parseInt(formData.maxMembers),
          location: formData.location || null,
          timezone: formData.timezone || null,
          communication: formData.communication,
          totalEarnings: 0,
          averageRating: 0,
          createdAt: new Date().toISOString(),
          leader: {
            firstName: localStorage.getItem('userFirstName') || 'You',
            lastName: localStorage.getItem('userLastName') || '',
            email: localStorage.getItem('userEmail') || 'demo@example.com',
          },
          members: [],
          skills: (formData.skills || []).map(id => ({ id, name: availableSkills.find(s => s.id === id)?.name || 'Skill', category: null }))
        };
        localStorage.setItem('createdTeams', JSON.stringify([newTeam, ...createdTeams]));
      } catch {}

      // Redirect to the teams list so the user sees their new team
      router.push(`/teams/${generatedId}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create team');
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Team</h1>
              <p className="text-gray-600 mt-1">Build a team to collaborate on exciting projects</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/teams"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                ← Back to Teams
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
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter team name"
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
                    placeholder="Describe your team's expertise, goals, and what makes you unique"
                    required
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
                    <label htmlFor="maxMembers" className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Members
                    </label>
                    <select
                      id="maxMembers"
                      name="maxMembers"
                      value={formData.maxMembers}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="3">3 members</option>
                      <option value="5">5 members</option>
                      <option value="8">8 members</option>
                      <option value="10">10 members</option>
                      <option value="15">15 members</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Required Skills</h2>
              <p className="text-sm text-gray-600 mb-4">Select the skills your team specializes in</p>
              
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

            {/* Location & Communication */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Location & Communication</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Remote, San Francisco, CA"
                  />
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select timezone</option>
                    <option value="PST">Pacific Time (PST/PDT)</option>
                    <option value="MST">Mountain Time (MST/MDT)</option>
                    <option value="CST">Central Time (CST/CDT)</option>
                    <option value="EST">Eastern Time (EST/EDT)</option>
                    <option value="UTC">UTC</option>
                    <option value="GMT">GMT</option>
                    <option value="CET">Central European Time (CET)</option>
                    <option value="JST">Japan Standard Time (JST)</option>
                    <option value="IST">India Standard Time (IST)</option>
                    <option value="AEST">Australian Eastern Time (AEST)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Communication Tools
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Slack', 'Discord', 'Microsoft Teams', 'Zoom', 'Google Meet', 'Email', 'WhatsApp', 'Telegram'].map((tool) => (
                    <label key={tool} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.communication.includes(tool)}
                        onChange={() => handleCommunicationToggle(tool)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{tool}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end space-x-4">
              <a
                href="/teams"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </a>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Creating Team...' : 'Create Team'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 