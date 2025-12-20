import type { Metadata } from "next";
import { Inter, Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { NavbarWrapper } from "./components/navbar-wrapper";
import { Footer } from "./components/footer";
import { SiteWrapper } from "./components/site-wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Plot Venture - Premium Real Estate",
  description: "Your dream home awaits at Plot Venture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${manrope.variable}`}
    >
      <body className={`${inter.className} antialiased`}>
        <SiteWrapper>
          <NavbarWrapper />
          <main className="flex-1">{children}</main>
          <Footer />
        </SiteWrapper>
      </body>
    </html>
  );
}
