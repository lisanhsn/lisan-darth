import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lisan Hsn - Dark Side Developer | Imperial Portfolio",
  description:
    "Join the Empire. Discover the portfolio of Lisan Hsn, a powerful developer who has mastered the dark side of coding. Explore projects, skills, and witness the force of modern web development.",
  keywords: [
    "developer",
    "portfolio",
    "web development",
    "mobile apps",
    "react",
    "nextjs",
    "typescript",
    "star wars",
    "darth vader",
  ],
  authors: [{ name: "Lisan Hsn" }],
  creator: "Lisan Hsn",
  openGraph: {
    title: "Lisan Hsn - Dark Side Developer",
    description:
      "Imperial Portfolio showcasing the power of the dark side in web development",
    url: "https://darth-lisan.dev",
    siteName: "Darth Lisan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Darth Lisan - Imperial Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lisan Hsn - Dark Side Developer",
    description:
      "Imperial Portfolio showcasing the power of the dark side in web development",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className="bg-imperial-black text-primary font-inter antialiased text-readable"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        <div className="star-field" style={{ willChange: "transform" }} />
        <div style={{ willChange: "transform" }}>{children}</div>
      </body>
    </html>
  );
}
