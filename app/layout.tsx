import "./globals.css";
import React from "react";
import {Inter as FontSans} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})


export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (<html lang="en" suppressHydrationWarning>
    <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Eleven Apps API Fetcher</title>
    </head>
    <body>
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        {children}
    </ThemeProvider>
    </body>
    </html>);
}
