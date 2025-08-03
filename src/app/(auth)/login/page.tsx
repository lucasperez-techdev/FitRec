import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In - FitRec",
  description: "Sign in to your FitRec account",
};

export default function LoginPage() {
  return (
    <div className="login-form-container">
      <div className="mb-8">
        <h2 className="login-form-title">
          Sign in to your account
        </h2>
        <p className="login-form-description">
          Welcome back! Please enter your details.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="login-form-label">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="login-form-input"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="login-form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="login-form-input"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
} 