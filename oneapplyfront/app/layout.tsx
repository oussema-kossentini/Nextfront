import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import { UserProvider } from "@/contexts/UserContext"; // ✅ ajout UserProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ONE APPLY - AI-Powered Job Matching",
  description:
      "Apply once, reach hundreds of companies. Find your perfect internship with AI-powered job matching.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
          <UserProvider> {/* ✅ Ajoute UserProvider ici */}
            {children}
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
      </body>
      </html>
  );
}
