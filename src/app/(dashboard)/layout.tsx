'use client';
import { useAuth } from '@/contexts/AuthContext';
import Link from "next/link";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userProfile, user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
                FitRec
              </Link>
            </div>
            
      
              
              <div className="relative">
                <button className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {userProfile?.firstName?.charAt(0)} {userProfile?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <Link href="/profile" className="text-gray-700 dark:text-gray-300">
                    {userProfile?.firstName} {userProfile?.lastName}
                  </Link>
                </button>
            </div>
          </div>
        </div>
      </header>
        {/* Main content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
    </div>
  );
} 