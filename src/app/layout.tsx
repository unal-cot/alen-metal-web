import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ALEN METAL - Güvenlikte Kalite, İşte Güç!",
  description:
    "Metal gücümüz ve tecrübemizle, yaşam alanlarınız için güvenli çözümler üretiyoruz. Dayanıklılık ve estetiği bir araya getiren premium uygulamalar.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ALEN METAL - Güvenlikte Kalite, İşte Güç!",
    description:
      "Metal gücümüz ve tecrübemizle, yaşam alanlarınız için güvenli çözümler üretiyoruz.",
    type: "website",
    locale: "tr_TR",
    siteName: "ALEN METAL",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALEN METAL - Güvenlikte Kalite, İşte Güç!",
    description:
      "Metal gücümüz ve tecrübemizle, yaşam alanlarınız için güvenli çözümler üretiyoruz.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className="dark h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} min-h-full bg-background text-on-surface font-body-lg`}
      >
        {children}
      </body>
    </html>
  );
}
