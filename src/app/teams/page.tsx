'use client';


import { useState, useEffect, useMemo } from "react";
import SearchSuggestions from "../../components/SearchSuggestions";
import AdvancedFilters from "../../components/AdvancedFilters";

interface Team {
  id: string;
  name: string;
  description: string;
  status: 'OPEN' | 'FULL' | 'CLOSED' | 'INACTIVE';
  hourlyRate: number;
  maxMembers: number;
  location: string | null;
  timezone: string | null;
  communication: string[];
  totalEarnings: number;
  averageRating: number;
  createdAt: string;
  leader: {
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
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

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(true);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minHourlyRate, setMinHourlyRate] = useState<number>(0);
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>('relevance');

  // Available skills for filtering
  const [availableSkills, setAvailableSkills] = useState<Array<{id: string, name: string, category: string | null}>>([]);

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    try {
      const teamNames = Array.isArray(teams) ? teams.map(team => team?.name).filter(Boolean) : [];
      const teamDescriptions = Array.isArray(teams) ? teams.map(team => team?.description).filter(Boolean) : [];
      const skillNames = Array.isArray(availableSkills) ? availableSkills.map(skill => skill?.name).filter(Boolean) : [];
      
      return [
        ...teamNames,
        ...teamDescriptions,
        ...skillNames,
        'Remote', 'Hybrid', 'On-site', 'Frontend', 'Backend', 'Mobile', 'DevOps'
      ];
    } catch (error) {
      console.error('Error creating search suggestions:', error);
      return ['Remote', 'Hybrid', 'On-site', 'Frontend', 'Backend', 'Mobile', 'DevOps'];
    }
  }, [teams, availableSkills]);

  // Fetch teams and user profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Try to get user email from URL params or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const userEmail = urlParams.get('email') || localStorage.getItem('userEmail') || 'demo@example.com';
        
        const [teamsResponse, profileResponse, skillsResponse] = await Promise.all([
          fetch('/api/teams'),
          fetch(`/api/users/profile?email=${userEmail}`),
          fetch('/api/skills')
        ]);

        if (teamsResponse.ok) {
          const teamsData = await teamsResponse.json();
          // Ensure teamsData is an array
          const teamsArray = Array.isArray(teamsData) ? teamsData : [];
          setTeams(teamsArray);
          setFilteredTeams(teamsArray);
        } else {
          console.error('Failed to fetch teams:', teamsResponse.status);
          setTeams([]);
          setFilteredTeams([]);
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
        console.error('Error fetching teams data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate match score for a team based on user profile
  const calculateMatchScore = (team: Team): number => {
    if (!userProfile) return 0;

    let score = 0;
    const userSkills = [
      ...userProfile.skills.map(s => s.name.toLowerCase()),
      ...userProfile.customSkills.map(s => s.toLowerCase())
    ];
    const teamSkills = team.skills.map(s => s.name.toLowerCase());

    // Skill match (40% weight)
    const skillMatches = teamSkills.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.includes(skill) || skill.includes(userSkill)
      )
    );
    score += (skillMatches.length / teamSkills.length) * 40;

    // Location match (20% weight)
    if (userProfile.location && team.location) {
      const userLocation = userProfile.location.toLowerCase();
      const teamLocation = team.location.toLowerCase();
      if (userLocation.includes('remote') || teamLocation.includes('remote')) {
        score += 20;
      } else if (userLocation.includes(teamLocation) || teamLocation.includes(userLocation)) {
        score += 20;
      }
    }

    // Hourly rate compatibility (20% weight)
    if (userProfile.hourlyRate && team.hourlyRate) {
      const rateDiff = Math.abs(userProfile.hourlyRate - team.hourlyRate);
      const rateScore = Math.max(0, 20 - (rateDiff / 10));
      score += rateScore;
    }

    // Team size preference (10% weight)
    const currentMembers = team.members.length;
    const availableSpots = team.maxMembers - currentMembers;
    if (availableSpots > 0) {
      score += 10;
    }

    // Team activity (10% weight)
    if (team.totalEarnings > 0 || team.averageRating > 0) {
      score += 10;
    }

    return Math.round(score);
  };

  // Apply filters and search
  useEffect(() => {
    let filtered = teams;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(team => team.status === selectedStatus);
    }

    // Location filter
    if (selectedLocation !== 'all') {
      if (selectedLocation === 'remote') {
        filtered = filtered.filter(team => 
          team.location?.toLowerCase().includes('remote')
        );
      } else {
        filtered = filtered.filter(team => 
          team.location?.toLowerCase().includes(selectedLocation.toLowerCase())
        );
      }
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(team =>
        selectedSkills.some(selectedSkill =>
          team.skills.some(teamSkill => teamSkill.id === selectedSkill)
        )
      );
    }

    // Hourly rate filter
    filtered = filtered.filter(team =>
      team.hourlyRate >= minHourlyRate && team.hourlyRate <= maxHourlyRate
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
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
    }

    setFilteredTeams(filtered);
  }, [teams, searchTerm, selectedStatus, selectedLocation, selectedSkills, minHourlyRate, maxHourlyRate, sortBy, userProfile]);

  // Get recommended teams
  const getRecommendedTeams = () => {
    if (!userProfile) return [];
    
    return filteredTeams
      .filter(team => team.status === 'OPEN')
      .map(team => ({
        ...team,
        matchScore: calculateMatchScore(team)
      }))
      .filter(team => team.matchScore > 30) // Only show teams with >30% match
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  };

  const recommendedTeams = getRecommendedTeams();

  // Handle filter changes
  const handleFiltersChange = (newFilters: any) => {
    if (newFilters.status !== undefined) setSelectedStatus(newFilters.status);
    if (newFilters.location !== undefined) setSelectedLocation(newFilters.location);
    if (newFilters.skills !== undefined) setSelectedSkills(newFilters.skills);
    if (newFilters.minHourlyRate !== undefined) setMinHourlyRate(newFilters.minHourlyRate);
    if (newFilters.maxHourlyRate !== undefined) setMaxHourlyRate(newFilters.maxHourlyRate);
    if (newFilters.sortBy !== undefined) setSortBy(newFilters.sortBy);
  };

  // Current filters object for AdvancedFilters component
  const currentFilters = {
    status: selectedStatus,
    location: selectedLocation,
    skills: selectedSkills,
    minHourlyRate,
    maxHourlyRate,
    sortBy
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading teams...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Browse Teams</h1>
              <p className="text-gray-600 mt-1">Find the perfect team to join and start collaborating</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/create-team"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Team
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
        {showRecommendations && recommendedTeams.length > 0 && (
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
              {recommendedTeams.map((team) => (
                <div key={team.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {team.matchScore}% match
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{team.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-green-600">${team.hourlyRate}/hr</span>
                    <span className="text-sm text-gray-500">
                      {team.members.length}/{team.maxMembers} members
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {team.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {team.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                        +{team.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  <a
                    href={`/teams/${team.id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Filters */}
        <AdvancedFilters
          type="teams"
          currentFilters={currentFilters}
          onFiltersChange={handleFiltersChange}
          availableSkills={availableSkills}
        />

        {/* Search and Basic Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search with Suggestions */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Teams</label>
              <SearchSuggestions
                searchTerm={searchTerm}
                onSuggestionClick={setSearchTerm}
                suggestions={searchSuggestions}
                placeholder="Search by name, description, or skills..."
                className="w-full"
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
                <option value="FULL">Full</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Skills Filter */}
            <div className="lg:col-span-2">
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
                <option value="newest">Newest</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredTeams.length} team{filteredTeams.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => {
            const matchScore = userProfile ? calculateMatchScore(team) : 0;
            const isRecommended = recommendedTeams.some(rt => rt.id === team.id);
            
            return (
              <div 
                key={team.id} 
                className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
                  isRecommended ? 'border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
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
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{team.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-green-600">${team.hourlyRate}/hr</span>
                  <span className="text-sm text-gray-500">
                    {team.members.length}/{team.maxMembers} members
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    team.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                    team.status === 'FULL' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {team.status}
                  </span>
                  {team.location && (
                    <span className="text-sm text-gray-500">{team.location}</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {team.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {team.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                      +{team.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    by {team.leader.firstName || team.leader.email}
                  </div>
                  <a
                    href={`/teams/${team.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or create a new team</p>
            <a
              href="/create-team"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Team
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 