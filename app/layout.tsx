import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BoligBeregner Danmark | Gratis Boliglån & Energiforbedring Beregner",
  description: "Beregn dine boligomkostninger i Danmark gratis. Få estimat på boliglån, energiforbedring, varmepumpe, solceller, og isolering. Sammenlign tilbud fra lokale leverandører.",
  keywords: "boligberegner, boliglån Danmark, energiforbedring, varmepumpe, solceller, isolering, boligomkostninger, boligkøb Danmark",
  authors: [{ name: "ThorandLoke" }],
  openGraph: {
    title: "BoligBeregner Danmark - Beregn dine boligomkostninger gratis",
    description: "Beregn boliglån, energiforbedring, varmepumpe og meget mere. Gratis dansk boligberegner.",
    url: "https://denmark-home-buyer.vercel.app",
    siteName: "BoligBeregner Danmark",
    locale: "da_DK",
    type: "website",
  },
  alternates: {
    languages: {
      "da": "https://denmark-home-buyer.vercel.app",
      "en": "https://denmark-home-buyer.vercel.app?lang=en",
      "zh": "https://denmark-home-buyer.vercel.app?lang=zh",
    },
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
    <html lang="da">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
