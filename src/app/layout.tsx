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

export const metadata: Metadata = {
  title: "Curiosity Cloud — Energy · AI · Cloud",
  description:
    "India's AI buildout is not short of chips. It is short of firm, clean, round-the-clock power. Curiosity contracts the energy, builds the campuses, and runs the cloud on top.",
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
