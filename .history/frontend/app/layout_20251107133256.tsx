import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flolabs International | Innovation in AI & Robotics",
  description: "Join Flolabs International - Building the future through innovation in AI, robotics, and cutting-edge technology. Explore internship opportunities.",
  keywords: "AI, robotics, internships, technology, machine learning, engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        {/* HubSpot Forms Script */}
        <Script
          src="//js.hsforms.net/forms/embed/v2.js"
          strategy="lazyOnload"
          charSet="utf-8"
        />
      </body>
    </html>
  );
}
