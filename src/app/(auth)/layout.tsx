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
    <div className="auth-layout-container">
      <div className="auth-layout-content">
        <div className="text-center">
          <h1 className="auth-layout-title">
            FitRec
          </h1>
          <p className="auth-layout-description">
            The only Weather Based Outfit Recommender
          </p>
        </div>
        {children}
      </div>
    </div>
  );
} 
