import type { Metadata } from "next";
import { Great_Vibes, Montserrat } from "next/font/google";
import { GENERAL_LOADING_ID, THEME_BG_COLOR } from "@/constants";
import "./globals.css";

const great_vibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"]
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Wedding invitation",
  description: "Wedding invitation",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Wedding invitation",
    title: "Wedding invitation",
    description: "Wedding invitation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Wedding invitation" />
        <meta name="theme-color" content={THEME_BG_COLOR} />
      </head>
      <body
        className={`${great_vibes.variable} ${montserrat.variable} antialiased`}
      >
        {children}
        <div className="loaderContainer loaderConteinerInView" id={GENERAL_LOADING_ID}>
          <div className="loader" />
        </div>
      </body>
    </html>
  );
}