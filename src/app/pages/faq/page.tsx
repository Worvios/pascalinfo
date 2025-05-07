import FaqPageClient from "./FaqPageClient";

export const generateMetadata = () => ({
  title: "FAQ - Pascal Info",
  description:
    "Toutes les réponses à vos questions sur la vie scolaire, l'inscription et plus encore.",
  openGraph: {
    title: "FAQ - Pascal Info",
    description:
      "Toutes les réponses à vos questions sur la vie scolaire, l'inscription et plus encore.",
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
    title: "FAQ - Pascal Info",
    description:
      "Toutes les réponses à vos questions sur la vie scolaire, l'inscription et plus encore.",
    images: ["/logo-pascal.png"],
  },
});

export default function FAQPage() {
  return <FaqPageClient />;
}
