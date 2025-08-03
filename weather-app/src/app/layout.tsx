import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather Outfit App",
  description: "Suggests what to wear based on current weather",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
