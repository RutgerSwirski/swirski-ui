// apps/docs/app/layout.tsx

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Anton, Bangers, Inter } from "next/font/google";
import { CursorDock, CursorProvider, SwirskiProvider } from "@swirski/ui";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Swirski UI",
  description: "Documentation for @swirski/ui.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${bangers.variable} ${inter.variable} font-inter`}
      >
        <SwirskiProvider>
          <CursorProvider>
            <CursorDock />
            {children}
          </CursorProvider>
        </SwirskiProvider>
      </body>
    </html>
  );
}
