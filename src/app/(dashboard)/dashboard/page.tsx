'use client';
import type { Metadata } from "next";
import WeatherCard from "./components/WeatherCard";
import ChatCard from "./components/ChatCard";

import type { Metadata } from "next";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserProfile from "@/components/UserProfile";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Welcome back!
            </p>
          </div>
          <LogoutButton className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Sign Out
          </LogoutButton>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UserProfile />
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherCard />
        <ChatCard />
      </div>
    </div>
        </ProtectedRoute>
  );
} 