import type { Metadata } from "next";
import { Arima, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./context";

const arima = Arima({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-arima",
  display: "swap", // permet d'éviter le FOUT (Flash of Unstyled Text) qui se produit lorsqu'une police met du temps à charger (switch de la police par défaut du navigateur à celle de l'app)
});

// Kanji uniquement : placée en secours derrière Arima et la monospace (globals.css), elle ne sert
// qu'aux glyphes absents de celles-ci. Sans elle, les kanji dépendaient de la police système et
// pouvaient disparaître à l'impression. Les tranches japonaises sont chargées à la demande
// (unicode-range), d'où preload: false.
const notoSerifJp = Noto_Serif_JP({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-jp",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  // TODO: remplacer par le vrai domaine en prod (résout les URLs OG relatives)
  metadataBase: new URL("https://ikig-ai.vercel.app"),
  title: "Ikig-ai — Trouvez votre raison de vous lever chaque matin",
  description:
    "Quelques questions guidées à travers les 4 piliers de l'ikigai, puis une lecture personnalisée de ce qui vous anime, à la croisée de la philosophie japonaise et de l'IA. Gratuit, sans inscription.",
  openGraph: {
    title: "Ikig-ai — Trouvez votre ikigai",
    description:
      "Un moment pour soi : une lecture de ce qui vous anime, à la croisée de la philosophie japonaise et de l'IA. Gratuit, sans inscription.",
    type: "website",
    locale: "fr_FR",
    siteName: "Ikig-ai",
    images: [
      {
        // TODO: remplacer par une vraie image OG 1200×630 dédiée
        url: "/japanese-illustrations/art-institute-of-chicago-hKaKPwumxCI-unsplash.jpg",
        alt: "Ikig-ai — estampe japonaise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ikig-ai — Trouvez votre ikigai",
    description:
      "Une lecture de ce qui vous anime, à la croisée de la philosophie japonaise et de l'IA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <link rel="icon" href="/assets/logos/favicon-venn.svg" />

      <AppProviders>
        <body
          className={`${arima.variable} ${notoSerifJp.variable} antialiased max-w-screen`}
        >
          <main>{children}</main>
        </body>
      </AppProviders>
    </html>
  );
}
