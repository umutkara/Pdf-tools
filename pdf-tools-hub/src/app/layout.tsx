import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDF Tools Hub",
  description: "Your All-in-One Smart PDF Toolkit",
  metadataBase: new URL("https://pdf-tools-hub.local"),
  openGraph: {
    title: "PDF Tools Hub",
    description: "Your All-in-One Smart PDF Toolkit",
    type: "website",
    url: "https://pdf-tools-hub.local",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "PDF Tools Hub" }],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-animated">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased` }>
        <link rel="manifest" href="/manifest.json" />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
