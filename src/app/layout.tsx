import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/seo/GoogleTagManager";
import OrganizationSchema from "@/components/seo/schemas/OrganizationSchema";
import LocalBusinessSchema from "@/components/seo/schemas/LocalBusinessSchema";

const inter = Inter({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#003366",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://excelardor.com'),
  title: {
    default: "Excelardor | Telescopic Mast Manufacturer & Supplier",
    template: "%s | Excelardor",
  },
  description: "Global manufacturer and supplier of telescopic masts, pneumatic masts, military masts, and custom industrial solutions. Based in Hyderabad, India.",
  keywords: ["telescopic mast", "pneumatic mast", "mast manufacturer", "military mast", "antenna mast", "camera mast", "portable mast", "hydraulic mast"],
  authors: [{ name: "Excelardor" }],
  creator: "Excelardor",
  publisher: "Excelardor",
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en-IN': '/en-IN',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://excelardor.com",
    title: "Excelardor | Telescopic Mast Manufacturer & Supplier",
    description: "Global manufacturer of high-quality telescopic masts, pneumatic masts, and military masts.",
    siteName: "Excelardor",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Excelardor Telescopic Masts",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excelardor | Telescopic Mast Manufacturer & Supplier",
    description: "Global manufacturer of high-quality telescopic masts, pneumatic masts, and military masts.",
    images: ["/og-image.jpg"],
    creator: "@excelardor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${inter.className} antialiased selection:bg-blue-600 selection:text-white`} suppressHydrationWarning>
        <GoogleTagManagerNoScript gtm_id="GTM-XXXXXXX" />
        <OrganizationSchema />
        <LocalBusinessSchema />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Navbar />
        <GoogleAnalytics ga_id="G-XXXXXXXXXX" />
        <GoogleTagManager gtm_id="GTM-XXXXXXX" />
      </body>
    </html>
  );
}
