import type { Metadata } from "next";
import { Fraunces, Inter, Caveat, Space_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageTransitionProvider } from "@/components/transition/PageTransitionProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fraym.studio"),
  title: {
    default: "FRAYM — A Creative + Business Solutions Studio",
    template: "%s · FRAYM",
  },
  description:
    "FRAYM is a creative + business solutions studio. We investigate what brands, businesses and experiences need, then use strategy, creative direction and production to move them forward.",
  keywords: [
    "FRAYM",
    "creative studio",
    "business solutions studio",
    "brand studio",
    "creative direction",
    "campaign photography",
    "film direction",
    "brand strategy",
  ],
  openGraph: {
    type: "website",
    siteName: "FRAYM — A Creative + Business Solutions Studio",
    title: "FRAYM — A Creative + Business Solutions Studio",
    description:
      "We observe. We direct. We frame. A creative + business solutions studio for brands, businesses and experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FRAYM — A Creative + Business Solutions Studio",
    description: "We observe. We direct. We frame.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <PageTransitionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
