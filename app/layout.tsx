import type { Metadata } from "next";
import { Onest } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";

import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeyDwiki | Portfolio & Journey Blog",
  description: "Swiss-minimal portfolio, projects, and learning journal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${onest.variable} antialiased`}>
        <Navbar className="lg:block hidden" />
        {children}
      </body>
    </html>
  );
}
