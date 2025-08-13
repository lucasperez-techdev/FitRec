'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function UserProfile() {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Profile Information
      </h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name
          </label>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {userProfile.firstName}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {userProfile.lastName}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {userProfile.email}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Member Since
          </label>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {userProfile.createdAt.toDate().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
} 