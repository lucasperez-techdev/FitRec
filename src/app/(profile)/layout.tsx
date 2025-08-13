'use client'
import Link from "next/link";

import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from "next/navigation";
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { userProfile } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your personal information and preferences.
          </p>
        </div>

        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">{userProfile?.firstName?.charAt(0)} {userProfile?.lastName?.charAt(0)}</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {userProfile?.firstName} {userProfile?.lastName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {userProfile?.email}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Member since {userProfile?.createdAt?.toDate().toLocaleDateString()}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <Link
              href="/profile"
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                pathname === "/profile"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Overview
            </Link>
            <Link
              href="/profile/settings"
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                pathname === "/profile/settings"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Settings
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
} 