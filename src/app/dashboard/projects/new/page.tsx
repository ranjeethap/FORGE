'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/dashboard/projects');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement project creation
    router.push('/dashboard/projects');
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
            <span className="text-sm font-medium">Back to Projects</span>
          </Button>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Create New Project</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Fill in the details to create a new project.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                  Project Title
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="Describe your project"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    required
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select budget range</option>
                    <option value="10000-30000">$10,000 - $30,000</option>
                    <option value="30000-50000">$30,000 - $50,000</option>
                    <option value="50000-100000">$50,000 - $100,000</option>
                    <option value="100000+">$100,000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    required
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select timeline</option>
                    <option value="1-3">1-3 months</option>
                    <option value="3-6">3-6 months</option>
                    <option value="6-12">6-12 months</option>
                    <option value="12+">12+ months</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                  Team Size
                </label>
                <select
                  id="teamSize"
                  required
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="">Select team size</option>
                  <option value="1-3">1-3 members</option>
                  <option value="4-6">4-6 members</option>
                  <option value="7-10">7-10 members</option>
                  <option value="10+">10+ members</option>
                </select>
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
                Create Project
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
