import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - FitRec",
  description: "Your FitRec dashboard overview",
};

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your fitness journey.
        </p>
      </div>
    </div>
  );
} 