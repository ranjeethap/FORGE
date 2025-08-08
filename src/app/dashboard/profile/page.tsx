'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { ArrowLeft, Plus, X, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Predefined skills list
const PREDEFINED_SKILLS = [
  { id: '1', name: 'React', category: 'Frontend' },
  { id: '2', name: 'Node.js', category: 'Backend' },
  { id: '3', name: 'Python', category: 'Backend' },
  { id: '4', name: 'AWS', category: 'Cloud' },
  { id: '5', name: 'Docker', category: 'DevOps' },
  { id: '6', name: 'Kubernetes', category: 'DevOps' },
  { id: '7', name: 'TypeScript', category: 'Frontend' },
  { id: '8', name: 'GraphQL', category: 'Backend' },
  { id: '9', name: 'PostgreSQL', category: 'Database' },
  { id: '10', name: 'MongoDB', category: 'Database' },
  { id: '11', name: 'Next.js', category: 'Frontend' },
  { id: '12', name: 'Vue.js', category: 'Frontend' },
  { id: '13', name: 'Angular', category: 'Frontend' },
  { id: '14', name: 'Java', category: 'Backend' },
  { id: '15', name: 'Go', category: 'Backend' }
];

export default function ProfilePage() {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleSkillToggle = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleAddCustomSkill = () => {
    if (newSkill.trim() && !customSkills.includes(newSkill.trim())) {
      setCustomSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveCustomSkill = (skill: string) => {
    setCustomSkills(prev => prev.filter(s => s !== skill));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: [
            ...selectedSkills.map(id => {
              const skill = PREDEFINED_SKILLS.find(s => s.id === id);
              return { name: skill?.name, category: skill?.category };
            }),
            ...customSkills.map(name => ({ name, category: 'Custom' }))
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  // Group predefined skills by category
  const groupedSkills = PREDEFINED_SKILLS.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof PREDEFINED_SKILLS>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBack}
            variant="ghost"
            size="sm"
            className="group flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 -ml-2 px-2"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Button>
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            size="sm"
            className="group flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Home className="h-4 w-4" />
            <span className="text-sm font-medium">Go to Landing Page</span>
          </Button>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Profile</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your profile and skills</p>
        </div>
      </div>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Expertise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Predefined Skills</h3>
            <div className="space-y-4">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-slate-500 mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <Badge
                        key={skill.id}
                        variant={selectedSkills.includes(skill.id) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={() => handleSkillToggle(skill.id)}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Custom Skills</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., Next.js, GraphQL, AWS Lambda..."
                  className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                />
                <Button
                  onClick={handleAddCustomSkill}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {customSkills.map(skill => (
                  <Badge
                    key={skill}
                    variant="default"
                    className="group"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveCustomSkill(skill)}
                      className="ml-2 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={handleBack}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveChanges}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
