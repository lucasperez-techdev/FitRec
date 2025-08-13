'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { UserPrefs, loadPrefsFromFirebase, savePrefsToFirebase } from '@/lib/prefs';

interface PreferencesContextType {
  preferences: UserPrefs;
  loading: boolean;
  updatePreferences: (newPrefs: Partial<UserPrefs>) => void;
  savePreferences: () => Promise<void>;
  resetPreferences: () => void;
  hasPreferences: boolean;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPrefs>({
    style: "",
    colors: [],
    comfort: "",
    rainGear: true,
    footwear: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      if (user) {
        try {
          const prefs = await loadPrefsFromFirebase(user.uid);
          setPreferences(prefs);
        } catch (error) {
          console.error('Error loading preferences:', error);
        }
      }
      setLoading(false);
    };

    loadPreferences();
  }, [user]);

  const updatePreferences = (newPrefs: Partial<UserPrefs>) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  const savePreferences = async () => {
    if (!user) return;
    
    try {
      await savePrefsToFirebase(user.uid, preferences);
    } catch (error) {
      console.error('Error saving preferences:', error);
      throw error;
    }
  };

  const resetPreferences = () => {
    const defaultPrefs: UserPrefs = {
      style: "",
      colors: [],
      comfort: "",
      rainGear: true,
      footwear: ""
    };
    setPreferences(defaultPrefs);
  };

  const hasPreferences = preferences.style !== "" || 
                       preferences.colors.length > 0 || 
                       preferences.comfort !== "" || 
                       preferences.footwear !== "";

  const value = {
    preferences,
    loading,
    updatePreferences,
    savePreferences,
    resetPreferences,
    hasPreferences,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
} 