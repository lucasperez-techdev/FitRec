'use client';
import WeatherCard from "./components/WeatherCard";
import ChatCard from "./components/ChatCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";
import PreferencesSummary from "@/components/PreferencesSummary";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { userProfile } = useAuth();
  return (
    <ProtectedRoute>
      <div>
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Welcome back {userProfile?.firstName}!
            </p>
          </div>
          <LogoutButton className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Sign Out
          </LogoutButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="">
            <WeatherCard />
          </div>
          <div>
            <PreferencesSummary />
          </div>
          <div className="">
            <ChatCard />
          </div>
        </div>
        
      </div>
    </ProtectedRoute>
  );
} 