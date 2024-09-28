// app/layout.tsx
import type { Metadata } from "next";
import { inter, jetbrain_mono } from "@/app/fonts";
import "./globals.css";
import { ThemeProvider } from "@/app/ThemeProvider";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

import StickyIcons from "@/components/sections/StickyIcons";
import Footer from "@/components/sections/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Krishnakumar",
  description: "Personal portfolio of Krishnakumar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon-32x32.png"
        />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

        <meta property="og:title" content="Krishnakumar's Portfolio" />
        <meta
          property="og:description"
          content="Data analyst with a passion for web development and machine learning. Transforming complex data into actionable insights and building innovative web solutions."
        />
        <meta property="og:url" content="https://krishnakumar.dev" />
        <meta
          property="og:image"
          content="https://krishnakumar.dev/pics/web_screenshot.png"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (window.location.href === "https://krishnavalliappan.github.io/portfolio-website/") {
              window.location.replace("https://www.krishnakumar.dev");
            }
          `,
          }}
        />
        <meta property="og:type" content="website" />
      </head>
      <body
        className={`${jetbrain_mono.variable} ${inter.variable} font-mono antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
