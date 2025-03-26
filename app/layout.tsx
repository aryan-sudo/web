import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://flowpilot.aryanp.in'),
  title: "FlowPilot - AI-Powered Software Development Platform",
  description: "Transform your software development with FlowPilot's AI-powered platform. Streamline planning, development, and deployment with intelligent tools for better collaboration and efficiency.",
  keywords: "AI software development, development automation, project management, code generation, software analytics",
  authors: [{ name: "FlowPilot Team" }],
  creator: "FlowPilot",
  publisher: "FlowPilot",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flowpilot.aryanp.in",
    siteName: "FlowPilot",
    title: "FlowPilot - AI-Powered Software Development Platform",
    description: "Transform your software development with FlowPilot's AI-powered platform. Streamline planning, development, and deployment with intelligent tools for better collaboration and efficiency.",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "FlowPilot Platform Preview",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowPilot - AI-Powered Software Development Platform",
    description: "Transform your software development with FlowPilot's AI-powered platform. Streamline planning, development, and deployment with intelligent tools for better collaboration and efficiency.",
    images: ["/twitter-image.jpg"],
    creator: "@flowpilot",
    site: "@flowpilot",
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
  alternates: {
    canonical: "https://flowpilot.aryanp.in",
    languages: {
      'en-US': "https://flowpilot.aryanp.in",
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "./favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "FlowPilot",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
