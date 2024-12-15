/* eslint-disable import/order */
import React from "react";

import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";
import { Providers } from "../lib/Providers";

export const metadata: Metadata = {
  title: {
    default: "ECommerce",
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e-commerce-logo%2Conline-store-logo%2Ccart-logo-design-template-9b5e4319f7f69b92d7421a048ce90dcb_screen.jpg?ts=1662916038",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
