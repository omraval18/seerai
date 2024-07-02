import type { Metadata } from "next";
import { Inter,Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/provider/theme-provider";
import Header from "@/components/global/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });

export const metadata: Metadata = {
  title: "Seer AI",
  description: "An General LLM for Your Everyday Usage. ",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
          <body className={`${inter.variable} ${bricolage.variable}`}>
                  <ThemeProvider
                      attribute="class"
                      defaultTheme="dark"
                      enableSystem
                      disableTransitionOnChange
                  >
                      <Header />
                      <div className="flex flex-col flex-1 h-screen overflow-auto">{children}</div>
                  </ThemeProvider>
          </body>
      </html>
  );
}
