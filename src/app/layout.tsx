import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "TécnicoIT - Servicios IT Profesionales",
    template: "%s | TécnicoIT"
  },
  description: "Servicios IT profesionales para empresas y particulares. Mantenimiento de PC, soporte remoto, instalación de software y más. Técnico especializado con años de experiencia.",
  keywords: [
    "técnico IT",
    "soporte técnico",
    "mantenimiento PC",
    "soporte remoto",
    "instalación software",
    "reparación computadoras",
    "servicios informáticos",
    "freelance IT"
  ],
  authors: [{ name: "TécnicoIT" }],
  creator: "TécnicoIT",
  publisher: "TécnicoIT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tecnicoit.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TécnicoIT - Servicios IT Profesionales",
    description: "Servicios IT profesionales para empresas y particulares. Mantenimiento, soporte remoto y soluciones tecnológicas.",
    url: "https://tecnicoit.vercel.app",
    siteName: "TécnicoIT",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TécnicoIT - Servicios IT Profesionales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TécnicoIT - Servicios IT Profesionales",
    description: "Servicios IT profesionales para empresas y particulares.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
