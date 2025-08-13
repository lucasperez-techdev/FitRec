import { userService } from './userService';
import { useAuth } from '@/contexts/AuthContext';

export type UserPrefs = {
  style: "casual" | "sporty" | "formal" | "street" | "";
  colors: string[];
  comfort: "cold" | "neutral" | "hot" | "";
  rainGear: boolean;
  footwear: "sneakers" | "boots" | "dress" | "";
};

const KEY = "userPreferences";

// Local storage fallback functions
export function loadPrefs(): UserPrefs {
  if (typeof window === "undefined") {
    return { style: "", colors: [], comfort: "", rainGear: true, footwear: "" };
  }
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as UserPrefs) : { style: "", colors: [], comfort: "", rainGear: true, footwear: "" };
  } catch {
    return { style: "", colors: [], comfort: "", rainGear: true, footwear: "" };
  }
}

export function savePrefs(p: UserPrefs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

// Firebase-integrated functions
export async function loadPrefsFromFirebase(uid: string): Promise<UserPrefs> {
  try {
    const prefs = await userService.getUserPreferences(uid);
    if (prefs) {
      // Also save to localStorage as backup
      savePrefs(prefs);
      return prefs;
    }
  } catch (error) {
    console.error('Error loading preferences from Firebase:', error);
  }
  
  // Fallback to localStorage
  return loadPrefs();
}

export async function savePrefsToFirebase(uid: string, prefs: UserPrefs): Promise<void> {
  try {
    await userService.updateUserPreferences(uid, prefs);
    // Also save to localStorage as backup
    savePrefs(prefs);
  } catch (error) {
    console.error('Error saving preferences to Firebase:', error);
    // Fallback to localStorage only
    savePrefs(prefs);
    throw error;
  }
}

// Hook for managing preferences with Firebase integration
export function usePreferences() {
  const { user } = useAuth();
  
  const loadPreferences = async (): Promise<UserPrefs> => {
    if (user) {
      return await loadPrefsFromFirebase(user.uid);
    }
    return loadPrefs();
  };
  
  const savePreferences = async (prefs: UserPrefs): Promise<void> => {
    if (user) {
      await savePrefsToFirebase(user.uid, prefs);
    } else {
      savePrefs(prefs);
    }
  };
  
  return { loadPreferences, savePreferences };
}
  