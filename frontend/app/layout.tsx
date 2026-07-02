import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Memzee",
  description: "The AI Memory Operating System",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}

        <Toaster
          richColors
          position="top-right"
          expand
        />
      </body>
    </html>
  );
}


