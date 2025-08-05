import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const userService = {
  // Create or update user profile
  async createUserProfile(user: User, profileData: { firstName: string; lastName: string }) {
    const userRef = doc(db, 'users', user.uid);
    
    const userProfile: UserProfile = {
      uid: user.uid,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: user.email || '',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await setDoc(userRef, userProfile);
    return userProfile;
  },

  // Get user profile
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  },

  // Update user profile
  async updateUserProfile(uid: string, updates: Partial<Omit<UserProfile, 'createdAt' | 'updatedAt'>>) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  },
}; 