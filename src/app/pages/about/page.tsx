import AboutPageClient from "./AboutPageClient";

export const generateMetadata = () => ({
  title: "À Propos de Pascal Info",
  description:
    "Fondé en 1996, Pascal Info est devenu un centre d'excellence en formation professionnelle au Maroc. Notre approche complète combine expertise technique et développement personnel pour préparer nos étudiants aux défis du marché du travail moderne.",
  openGraph: {
    title: "À Propos de Pascal Info",
    description:
      "Fondé en 1996, Pascal Info est devenu un centre d'excellence en formation professionnelle au Maroc.",
    images: [
      {
        url: "/logo-pascal.png",
        width: 500,
        height: 500,
        alt: "Centre Pascal Info Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À Propos de Pascal Info",
    description:
      "Fondé en 1996, Pascal Info est devenu un centre d'excellence en formation professionnelle au Maroc.",
    images: ["/logo-pascal.png"],
  },
});

export default function AboutPage() {
  return <AboutPageClient />;
}
