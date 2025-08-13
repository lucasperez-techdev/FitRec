'use client';

import { usePreferences } from '@/contexts/PreferencesContext';
import Link from 'next/link';

export default function PreferencesSummary() {
  const { preferences, hasPreferences, loading } = usePreferences();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!hasPreferences) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          🎨 Style Preferences
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Set your clothing preferences to get personalized outfit recommendations from our AI assistant.
        </p>
        <Link 
          href="/profile/settings" 
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Set Preferences
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        🎨 Your Style Preferences
      </h3>
      
      <div className="space-y-3 mb-4">
        {preferences.style && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Style:</span>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm font-medium capitalize">
              {preferences.style}
            </span>
          </div>
        )}
        
        {preferences.colors.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Colors:</span>
            <div className="flex gap-1">
              {preferences.colors.map(color => (
                <span 
                  key={color} 
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-medium capitalize"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {preferences.comfort && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Comfort:</span>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm font-medium">
              {preferences.comfort === 'cold' ? 'Runs cold' : 
               preferences.comfort === 'hot' ? 'Runs hot' : 'Neutral'}
            </span>
          </div>
        )}
        
        {preferences.footwear && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Footwear:</span>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-sm font-medium capitalize">
              {preferences.footwear}
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Rain gear:</span>
          <span className={`px-2 py-1 rounded text-sm font-medium ${
            preferences.rainGear 
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
          }`}>
            {preferences.rainGear ? 'Willing to wear' : 'Prefers not to'}
          </span>
        </div>
      </div>
      
      <div className="text-center">
        <Link 
          href="/profile/settings" 
          className="inline-block px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          Edit Preferences
        </Link>
      </div>
    </div>
  );
} 