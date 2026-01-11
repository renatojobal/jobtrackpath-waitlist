import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobTrackPath - Job Application Tracker | Exclusive Launch Discount",
  description: "Join the waitlist for JobTrackPath - the ultimate job application tracker. Organize your job search with Kanban boards, track recruiter conversations, and get AI-powered insights. Sign up now for exclusive launch benefits!",
  keywords: ["job application tracker", "job search organizer", "career management", "job hunt tool", "application tracking system", "kanban board jobs", "recruiter tracker", "AI job insights"],
  authors: [{ name: "JobTrackPath" }],
  creator: "JobTrackPath",
  publisher: "JobTrackPath",
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
    url: "https://jobtrackpath.com",
    siteName: "JobTrackPath",
    title: "JobTrackPath - Smart Job Application Tracker",
    description: "Track your job applications with ease. Get exclusive launch discount! Manage your job search with Kanban boards, conversation tracking, and AI insights.",
    images: [
      {
        url: "/images/board_trans_bg.png",
        width: 1200,
        height: 630,
        alt: "JobTrackPath Kanban Board",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobTrackPath - Job Application Tracker",
    description: "Join the waitlist & get exclusive launch discount! Track job applications with Kanban boards, conversation tracker & AI insights.",
    images: ["/images/board_trans_bg.png"],
    creator: "@jobtrackpath",
  },
  metadataBase: new URL("https://jobtrackpath.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
