"use client";
import { usePreferences } from "@/contexts/PreferencesContext";
import Link from "next/link";

export default function ProfilePage() {
  const { preferences, loading } = usePreferences();

  if (loading) {
    return (
      <main className="profile-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading your profile...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-container">
      <div className="w-full max-w-xl">
        <h1 className="profile-title text-center mb-8">Your Profile</h1>

        <section className="profile-card">
          <h2 className="text-xl font-semibold mb-6">Clothing Preferences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Clothing Style</label>
              <div className="mt-2 p-3 bg-white border border-gray-200 rounded-lg">
                {preferences.style ? (
                  <span className="text-lg font-medium capitalize text-gray-900">{preferences.style}</span>
                ) : (
                  <span className="text-gray-500">Not set</span>
                )}
              </div>
            </div>

            <div>
              <label className="label">Weather Comfort</label>
              <div className="mt-2 p-3 bg-white border border-gray-200 rounded-lg">
                {preferences.comfort ? (
                  <span className="text-lg font-medium capitalize text-gray-900">
                    {preferences.comfort === 'cold' ? 'I run cold' : 
                     preferences.comfort === 'hot' ? 'I run hot' : 'Neutral'}
                  </span>
                ) : (
                  <span className="text-gray-500">Not set</span>
                )}
              </div>
            </div>

            <div>
              <label className="label">Footwear Preference</label>
              <div className="mt-2 p-3 bg-white border border-gray-200 rounded-lg">
                {preferences.footwear ? (
                  <span className="text-lg font-medium capitalize text-gray-900">{preferences.footwear}</span>
                ) : (
                  <span className="text-gray-500">Not set</span>
                )}
              </div>
            </div>

            <div>
              <label className="label">Rain Gear</label>
              <div className="mt-2 p-3 bg-white border border-gray-200 rounded-lg">
                <span className="text-lg font-medium text-gray-900">
                  {preferences.rainGear ? 'Yes, I\'ll wear rain gear' : 'No, I prefer not to'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="label">Favorite Colors</label>
            <div className="mt-2">
              {preferences.colors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {preferences.colors.map(c => (
                    <span key={c} className="chip chip-active">
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No colors selected</span>
              )}
            </div>
          </div>
        </section>

        <div className="text-center mt-8 space-y-3">
          <Link 
            href="/profile/settings" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Settings
          </Link>
          <br />
          <Link 
            href="/dashboard" 
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
