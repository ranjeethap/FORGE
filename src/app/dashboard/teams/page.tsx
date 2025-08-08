'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Users, Plus, Search, Filter, Clock, DollarSign, Settings, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MyTeamsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Mock data for demonstration
  const allTeams = [
    {
      id: '1',
      name: 'Cloud Migration Experts',
      role: 'Team Lead',
      status: 'active',
      members: [
        { name: 'Sarah Chen', role: 'Team Lead', avatar: 'SC' },
        { name: 'Mike Johnson', role: 'Backend Developer', avatar: 'MJ' },
        { name: 'Lisa Wang', role: 'Infrastructure Engineer', avatar: 'LW' }
      ],
      activeProjects: 2,
      completedProjects: 3,
      hourlyRate: 150
    },
    {
      id: '2',
      name: 'AI Innovation Squad',
      role: 'Developer',
      status: 'active',
      members: [
        { name: 'Alex Rodriguez', role: 'ML Engineer', avatar: 'AR' },
        { name: 'Emma Davis', role: 'NLP Specialist', avatar: 'ED' }
      ],
      activeProjects: 1,
      completedProjects: 1,
      hourlyRate: 120
    }
  ];

  // Filter and search logic
  const filteredTeams = allTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || team.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleCreateTeam = () => {
    router.push('/dashboard/teams/new');
  };

  const handleViewTeam = (teamId: string) => {
    router.push(`/dashboard/teams/${teamId}`);
  };

  const handleTeamSettings = (teamId: string) => {
    router.push(`/dashboard/teams/${teamId}/settings`);
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
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Teams</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage your team memberships and collaborations</p>
          </div>
          <Button 
            onClick={handleCreateTeam}
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all hover:shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Team
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
                placeholder="Search teams..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-shadow hover:shadow-sm"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer"
              >
                <option value="">All Roles</option>
                <option value="team lead">Team Lead</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
              </select>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setRoleFilter("");
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

      {/* Teams Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTeams.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <Users className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No teams found</h3>
                <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setRoleFilter("");
                }}
              >
                Clear filters
              </Button>
            </div>
          </div>
        ) : (
          filteredTeams.map(team => (
            <Card 
              key={team.id} 
              className="group hover:shadow-lg transition-all duration-300 hover:border-orange-200 dark:hover:border-orange-800"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className={
                    team.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400'
                  }>
                    {team.status.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">{team.role}</Badge>
                </div>
                
                <CardTitle className="text-xl mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {team.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Team Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{team.members.length}</p>
                    <p className="text-sm text-slate-500">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{team.activeProjects}</p>
                    <p className="text-sm text-slate-500">Active Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">${team.hourlyRate}</p>
                    <p className="text-sm text-slate-500">Per Hour</p>
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Team Members</h4>
                  <div className="space-y-2">
                    {team.members.map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-sm font-medium text-orange-600 dark:text-orange-400">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{member.name}</p>
                            <p className="text-xs text-slate-500">{member.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => handleViewTeam(team.id)}
                    className="flex-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 group-hover:border-orange-200 dark:group-hover:border-orange-800 transition-colors"
                  >
                    View Team
                  </Button>
                  <Button 
                    onClick={() => handleTeamSettings(team.id)}
                    variant="outline" 
                    size="icon"
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 group-hover:border-orange-200 dark:group-hover:border-orange-800 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
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
