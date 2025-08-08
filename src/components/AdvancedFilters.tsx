'use client';

import { useState, useEffect } from 'react';

interface FilterPreset {
  id: string;
  name: string;
  filters: {
    status?: string;
    location?: string;
    skills?: string[];
    minHourlyRate?: number;
    maxHourlyRate?: number;
    minBudget?: number;
    maxBudget?: number;
    sortBy?: string;
  };
}

interface AdvancedFiltersProps {
  type: 'teams' | 'projects';
  currentFilters: {
    status: string;
    location?: string;
    skills: string[];
    minHourlyRate: number;
    maxHourlyRate: number;
    minBudget?: number;
    maxBudget?: number;
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
  availableSkills: Array<{id: string, name: string, category: string | null}>;
}

export default function AdvancedFilters({
  type,
  currentFilters,
  onFiltersChange,
  availableSkills
}: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [savedPresets, setSavedPresets] = useState<FilterPreset[]>([]);
  const [showSavePreset, setShowSavePreset] = useState(false);
  const [presetName, setPresetName] = useState('');

  // Quick filter presets
  const quickPresets = [
    {
      id: 'high-paying',
      name: 'High Paying',
      filters: {
        minHourlyRate: 50,
        sortBy: 'hourlyRate'
      }
    },
    {
      id: 'remote-only',
      name: 'Remote Only',
      filters: {
        location: 'remote'
      }
    },
    {
      id: 'newest',
      name: 'Recently Posted',
      filters: {
        sortBy: 'newest'
      }
    },
    {
      id: 'frontend',
      name: 'Frontend Focus',
      filters: {
        skills: availableSkills
          .filter(skill => 
            skill.category === 'Frontend' || 
            skill.name.toLowerCase().includes('react') ||
            skill.name.toLowerCase().includes('vue') ||
            skill.name.toLowerCase().includes('angular')
          )
          .map(skill => skill.id)
      }
    },
    {
      id: 'backend',
      name: 'Backend Focus',
      filters: {
        skills: availableSkills
          .filter(skill => 
            skill.category === 'Backend' || 
            skill.name.toLowerCase().includes('node') ||
            skill.name.toLowerCase().includes('python') ||
            skill.name.toLowerCase().includes('java')
          )
          .map(skill => skill.id)
      }
    }
  ];

  useEffect(() => {
    // Load saved presets from localStorage
    const saved = localStorage.getItem(`${type}-filter-presets`);
    if (saved) {
      setSavedPresets(JSON.parse(saved));
    }
  }, [type]);

  const savePreset = () => {
    if (!presetName.trim()) return;

    const newPreset: FilterPreset = {
      id: Date.now().toString(),
      name: presetName,
      filters: currentFilters
    };

    const updatedPresets = [...savedPresets, newPreset];
    setSavedPresets(updatedPresets);
    localStorage.setItem(`${type}-filter-presets`, JSON.stringify(updatedPresets));
    setPresetName('');
    setShowSavePreset(false);
  };

  const deletePreset = (presetId: string) => {
    const updatedPresets = savedPresets.filter(preset => preset.id !== presetId);
    setSavedPresets(updatedPresets);
    localStorage.setItem(`${type}-filter-presets`, JSON.stringify(updatedPresets));
  };

  const applyPreset = (preset: FilterPreset) => {
    onFiltersChange({ ...currentFilters, ...preset.filters });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: 'all',
      location: 'all',
      skills: [],
      minHourlyRate: 0,
      maxHourlyRate: 1000,
      minBudget: 0,
      maxBudget: 100000,
      sortBy: 'relevance'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Quick Filter Presets */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Filters</h3>
        <div className="flex flex-wrap gap-2">
          {quickPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Saved Presets */}
      {savedPresets.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Saved Filters</h3>
          <div className="flex flex-wrap gap-2">
            {savedPresets.map((preset) => (
              <div key={preset.id} className="flex items-center gap-1">
                <button
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full hover:bg-blue-200 transition-colors"
                >
                  {preset.name}
                </button>
                <button
                  onClick={() => deletePreset(preset.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Current Filters */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSavePreset(!showSavePreset)}
            className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full hover:bg-green-200 transition-colors"
          >
            Save Current Filters
          </button>
          <button
            onClick={clearAllFilters}
            className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full hover:bg-red-200 transition-colors"
          >
            Clear All
          </button>
        </div>

        {showSavePreset && (
          <div className="mt-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter preset name..."
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={savePreset}
              disabled={!presetName.trim()}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowSavePreset(false);
                setPresetName('');
              }}
              className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Advanced Filters Toggle */}
      <div className="border-t pt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium text-gray-700">Advanced Filters</span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {/* Filter Summary */}
            <div className="bg-gray-50 rounded-md p-3">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Active Filters:</h4>
              <div className="flex flex-wrap gap-1">
                {currentFilters.status !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Status: {currentFilters.status}
                  </span>
                )}
                {currentFilters.location && currentFilters.location !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Location: {currentFilters.location}
                  </span>
                )}
                {currentFilters.skills.length > 0 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Skills: {currentFilters.skills.length} selected
                  </span>
                )}
                {currentFilters.minHourlyRate > 0 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Min Rate: ${currentFilters.minHourlyRate}/hr
                  </span>
                )}
                {currentFilters.maxHourlyRate < 1000 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Max Rate: ${currentFilters.maxHourlyRate}/hr
                  </span>
                )}
                {type === 'projects' && currentFilters.minBudget && currentFilters.minBudget > 0 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Min Budget: ${currentFilters.minBudget}
                  </span>
                )}
                {type === 'projects' && currentFilters.maxBudget && currentFilters.maxBudget < 100000 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Max Budget: ${currentFilters.maxBudget}
                  </span>
                )}
              </div>
            </div>

            {/* Export/Import Filters */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const filtersData = JSON.stringify(currentFilters);
                  navigator.clipboard.writeText(filtersData);
                  alert('Filters copied to clipboard!');
                }}
                className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full hover:bg-purple-200 transition-colors"
              >
                Export Filters
              </button>
              <button
                onClick={() => {
                  const filtersData = prompt('Paste your filters JSON:');
                  if (filtersData) {
                    try {
                      const parsed = JSON.parse(filtersData);
                      onFiltersChange(parsed);
                    } catch (error) {
                      alert('Invalid filters data');
                    }
                  }
                }}
                className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full hover:bg-purple-200 transition-colors"
              >
                Import Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 