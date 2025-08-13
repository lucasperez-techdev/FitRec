"use client";
import { useState } from "react";
import { usePreferences } from "@/contexts/PreferencesContext";
import Link from "next/link";

const COLORS = ["black", "white", "blue", "green", "red", "beige", "purple", "pink", "orange", "yellow", "brown", "gray"];

export default function ProfileSettingsPage() {
  const { preferences, updatePreferences, savePreferences, resetPreferences, loading } = usePreferences();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const toggleColor = (c: string) => {
    const newColors = preferences.colors.includes(c) 
      ? preferences.colors.filter(x => x !== c) 
      : [...preferences.colors, c];
    updatePreferences({ colors: newColors });
  };

  const onSave = async () => {
    setSaving(true);
    try {
      await savePreferences();
      setMessage({ text: "Preferences saved successfully!", type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ text: "Error saving preferences. Please try again.", type: 'error' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const onReset = () => {
    resetPreferences();
  };

  if (loading) {
    return (
      <main className="profile-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading settings...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-container">
      <div className="w-full max-w-xl">
        <h1 className="profile-title text-center mb-8">Profile Settings</h1>

        <section className="profile-card">
          <h2 className="text-xl font-semibold mb-6">Edit Clothing Preferences</h2>
          
          <div className="space-y-6">
            <div>
              <label className="label">Clothing Style</label>
              <select 
                className="input w-full" 
                value={preferences.style}
                onChange={(e) => updatePreferences({ style: e.target.value as "casual" | "sporty" | "formal" | "street" | "" })}
              >
                <option value="">Select your preferred style</option>
                <option value="casual">Casual - Comfortable, everyday wear</option>
                <option value="sporty">Sporty - Athletic and active wear</option>
                <option value="formal">Formal - Business and professional attire</option>
                <option value="street">Street - Urban and trendy fashion</option>
              </select>
              <p className="text-sm text-gray-600 mt-1">This helps us recommend appropriate clothing for different occasions.</p>
            </div>

            <div>
              <label className="label">Favorite Colors</label>
              <div className="chips mt-2">
                {COLORS.map(c => (
                  <button 
                    key={c} 
                    type="button" 
                    onClick={() => toggleColor(c)}
                    className={`chip ${preferences.colors.includes(c) ? "chip-active" : ""}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">Select colors you prefer in your clothing. You can choose multiple colors.</p>
            </div>

            <div>
              <label className="label">Weather Comfort Level</label>
              <select 
                className="input w-full" 
                value={preferences.comfort}
                onChange={(e) => updatePreferences({ comfort: e.target.value as "cold" | "neutral" | "hot" | "" })}
              >
                <option value="">Select your comfort level</option>
                <option value="I run cold/ prefer warmer clothing">I run cold - I prefer warmer clothing</option>
                <option value="neutral">Neutral - I&apos;m comfortable with standard clothing</option>
                <option value="I run hot/ prefer lighter, breathable clothing">I run hot - I prefer lighter, breathable clothing</option>
              </select>
              <p className="text-sm text-gray-600 mt-1">This helps us adjust recommendations based on your temperature sensitivity.</p>
            </div>

            <div>
              <label className="label">Footwear Preference</label>
              <select 
                className="input w-full" 
                value={preferences.footwear}
                onChange={(e) => updatePreferences({ footwear: e.target.value as "sneakers" | "boots" | "dress" | "" })}
              >
                <option value="">Select your preferred footwear</option>
                <option value="sneakers">Sneakers - Comfortable and casual</option>
                <option value="boots">Boots - Sturdy and weather-resistant</option>
                <option value="dress">Dress shoes - Formal and professional</option>
              </select>
              <p className="text-sm text-gray-600 mt-1">Your preferred type of footwear for different occasions.</p>
            </div>

            <div>
              <label className="label flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={preferences.rainGear}
                  onChange={(e) => updatePreferences({ rainGear: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                I&apos;m willing to wear rain gear when needed
              </label>
              <p className="text-sm text-gray-600 mt-1">This helps us recommend appropriate outerwear for rainy weather.</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button 
              className="btn-primary px-6 py-3" 
              onClick={onSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Preferences'}
            </button>
            <button 
              className="btn-muted px-6 py-3" 
              onClick={onReset}
              disabled={saving}
            >
              Reset to Defaults
            </button>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded-lg ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {message.text}
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">How These Preferences Help</h3>
            <p className="text-sm text-blue-800">
              Your clothing preferences are used by our AI assistant to provide personalized outfit recommendations 
              that match your style, comfort level, and color preferences. These settings help ensure that 
              every recommendation is tailored specifically to your taste and needs.
            </p>
          </div>
        </section>

        <div className="text-center mt-8 space-y-3">
          <Link 
            href="/profile" 
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Profile
          </Link>
          <br />
          <Link 
            href="/dashboard" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
} 