'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewTeamPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/dashboard/teams');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = e.target as any;
      const payload = {
        name: form.teamName.value,
        description: form.description.value,
        type: form.teamType.value,
        hourlyRate: parseInt(form.hourlyRate.value, 10),
      };

      const response = await fetch('/api/teams/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create team');
      }

      const data = await response.json();
      const newId = data?.id || String(Date.now());

      // Save a dashboard-shaped team locally so it appears in My Teams immediately
      try {
        const existing = JSON.parse(localStorage.getItem('dashboardTeams') || '[]');
        const newDashTeam = {
          id: newId,
          name: payload.name,
          role: 'Team Lead',
          status: 'active',
          members: [],
          activeProjects: 0,
          completedProjects: 0,
          hourlyRate: payload.hourlyRate,
        };
        localStorage.setItem('dashboardTeams', JSON.stringify([newDashTeam, ...existing]));
      } catch {}

      router.push('/dashboard/teams');
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team. Please try again.');
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
            <span className="text-sm font-medium">Back to Teams</span>
          </Button>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Create New Team</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Fill in the details to create a new team.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                  Team Name
                </label>
                <input
                  id="teamName"
                  name="teamName"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="Enter team name"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="Describe your team's expertise and focus"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="teamType" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                    Team Type
                  </label>
                  <select
                    id="teamType"
                    name="teamType"
                    required
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select team type</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="consulting">Consulting</option>
                    <option value="devops">DevOps</option>
                    <option value="data">Data & Analytics</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                    Hourly Rate (USD)
                  </label>
                  <input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    placeholder="Enter hourly rate"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Create Team
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
