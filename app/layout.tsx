import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Curiosity Cloud | Infrastructure Layer for India's AI Economy",
  description:
    "The infrastructure layer for India's AI economy. Energy, data centres and cloud built as one system.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://curiositycloud.in"
  ),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Curiosity Cloud | Infrastructure Layer for India's AI Economy",
    description:
      "The infrastructure layer for India's AI economy. Energy, data centres and cloud built as one system.",
    url: "/",
    siteName: "Curiosity Cloud",
    images: [
      {
        url: "/og-image.png",
        width: 2786,
        height: 1462,
        alt: "Curiosity Cloud — Infrastructure Layer for India's AI Economy",
        type: "image/png",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curiosity Cloud | Infrastructure Layer for India's AI Economy",
    description:
      "The infrastructure layer for India's AI economy. Energy, data centres and cloud built as one system.",
    images: [
      {
        url: "/og-image.png",
        width: 2786,
        height: 1462,
        alt: "Curiosity Cloud — Infrastructure Layer for India's AI Economy",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script src="/pixel-canvas.js" strategy="beforeInteractive" />
        <div className="cc-root">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
