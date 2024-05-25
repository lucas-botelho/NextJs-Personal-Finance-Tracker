import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import useProtectedRoute from './hooks/useProtectedRoute';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next - Pf",
  description: "lbotelho's personal website",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
