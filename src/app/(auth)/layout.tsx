import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - FitRec",
  description: "Sign in to your FitRec account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            FitRec
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The only Weather Based Outfit Recommender
          </p>
        </div>
        {children}
      </div>
    </div>
  );
} 