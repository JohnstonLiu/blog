import type { Metadata } from "next";
import { Roboto_Mono } from 'next/font/google';
import "./globals.css";
import "./styles/syntax-highlighting.css";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: "Johnston Liu's Blog",
  description: "A personal engineering blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // We set an empty className to ensure consistency between server and client render
  // The suppressHydrationWarning is used to prevent React from complaining about
  // classes that might be added by browser extensions after hydration
  return (
    <html lang="en" className={robotoMono.variable}>
      <body className="" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
