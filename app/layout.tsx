import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientChakraProvider } from './clientChakraProvider'
import { ClientRecoildRoot } from "./clientRecoildRoot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next - Pf",
  description: "lbotelho's personal website",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="bg-blue-custom-900">
        <ClientRecoildRoot>
          <ClientChakraProvider>
            {children}
          </ClientChakraProvider>
        </ClientRecoildRoot>
      </body>
    </html>
  );
}
