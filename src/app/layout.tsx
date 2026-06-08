import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Excel Ardor | Industrial Engineering",
  description: "Advanced Hydraulic and SPM Solutions Since 1996",
};

import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.className} antialiased selection:bg-blue-600 selection:text-white`} suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Navbar />
      </body>
    </html>
  );
}
