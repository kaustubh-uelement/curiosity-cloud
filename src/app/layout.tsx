import type { Metadata } from "next";
import { Poppins, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { FlareField } from "@/components/layout/FlareField";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins-var",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope-var",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono-var",
  display: "swap",
});

const SITE_URL = "https://curiosity-cloud.vercel.app";
const SITE_TITLE = "Curiosity Cloud - Energy · AI · Cloud";
const SITE_DESCRIPTION =
  "India's AI buildout is not short of chips. It is short of firm, clean, round-the-clock power. Curiosity contracts the energy, builds the campuses, and runs the cloud on top, one company, one stack, one invoice.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Curiosity Cloud",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/curiosity-og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/curiosity-og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <FlareField />
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
