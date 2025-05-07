// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/utils/LanguageProvider";
import WelcomeAssistant from "@/components/WelcomeAssistant";
import AppLayout from "@/components/AppLayout"; // Import the new component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pascalinfo.com"),
  title: "Centre Pascal Info",
  description: "Centre de formation professionnelle au Maroc",
  openGraph: {
    title: "Centre Pascal Info",
    description: "Centre de formation professionnelle au Maroc",
    url: "https://pascalinfo.com",
    siteName: "Centre Pascal Info",
    images: "/og-image.jpg",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Centre Pascal Info",
    description: "Centre de formation professionnelle au Maroc",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <AppLayout>{children}</AppLayout>
          <Toaster position="top-center" />
          <WelcomeAssistant />
        </LanguageProvider>
      </body>
    </html>
  );
}
