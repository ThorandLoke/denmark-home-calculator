import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BoligBeregner Danmark - 丹麦买房成本计算器",
  description: "计算在丹麦买房的所有真实成本，包括隐藏费用。专为外国人和本地人设计。",
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
