import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Script from "next/script";

import { GaPageTracker } from "@/components/analytics/ga-page-tracker";
import { RootChrome } from "@/components/layout/root-chrome";
import { QueryProvider } from "@/components/providers/query-provider";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeyDwiki | Portfolio & Journey Blog",
  description: "Swiss-minimal portfolio, projects, and learning journal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasAnalytics = Boolean(GA_MEASUREMENT_ID);

  return (
    <html lang="en">
      <body className={`${onest.variable} antialiased`}>
        <QueryProvider>
          {hasAnalytics ? (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    anonymize_ip: true,
                    send_page_view: false
                  });
                `}
              </Script>
              <GaPageTracker />
            </>
          ) : null}
          <RootChrome />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
