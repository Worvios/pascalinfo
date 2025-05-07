import BlogPageClient from "./BlogPageClient";
import { client } from "@/lib/sanityClient";

export default function Page() {
  return <BlogPageClient />;
}

export async function generateMetadata() {
  // Fetch the first post for og:image if available
  const posts = await client.fetch(
    `*[_type == "post"] | order(date desc)[0]{ mainImage { asset->{url, alt}, alt } }`
  );
  const image = posts?.mainImage?.asset?.url;
  return {
    title: "Blog Éducatif - Pascal Info",
    description:
      "Conseils, actualités et ressources pour réussir votre parcours scolaire et professionnel.",
    openGraph: {
      title: "Blog Éducatif - Pascal Info",
      description:
        "Conseils, actualités et ressources pour réussir votre parcours scolaire et professionnel.",
      images: image
        ? [{ url: image, width: 800, height: 400, alt: "Blog Pascal Info" }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog Éducatif - Pascal Info",
      description:
        "Conseils, actualités et ressources pour réussir votre parcours scolaire et professionnel.",
      images: image ? [image] : [],
    },
  };
}
