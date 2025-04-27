"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
}

export function SEO({
  title,
  description,
  canonical,
  ogImage = "/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
}: SEOProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const siteTitle = title ?? t("site.title", "Centre Pascal Info");
  const siteDesc =
    description ??
    t("site.description", "Centre de formation informatique au Maroc");
  const fullCanonical = canonical || `https://pascal-info.ma${pathname}`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDesc} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
