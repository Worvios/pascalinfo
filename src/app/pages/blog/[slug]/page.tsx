import { createClient } from "@sanity/client";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import Link from "next/link";
import BackToBlogLink from "./BackToBlogLink";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "@/components/LikeButton";
import GiscusComments from "@/components/GiscusComments";
import SvgDivider from "@/components/SvgDivider";
import { BookOpen, Code, User, Star, Globe, MessageCircle } from "lucide-react";

interface Author {
  name: string;
  image?: {
    asset?: {
      url: string;
      alt?: string;
    };
  };
}
interface Category {
  title: string;
  _ref?: string;
}
interface MainImage {
  asset?: {
    url: string;
    alt?: string;
  };
  alt?: string;
}
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  mainImage?: MainImage;
  author?: Author;
  categories?: Category[];
  body: PortableTextBlock[];
  date: string;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-05-07",
  useCdn: true,
});

function getReadTime(blocks: PortableTextBlock[]) {
  // Roughly 200 words per minute
  const text = blocks
    .map((block) =>
      typeof block.children !== "undefined"
        ? block.children.map((child: any) => child.text).join(" ")
        : ""
    )
    .join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Gradient and icon mappings
const categoryGradients: Record<string, string> = {
  Développement: "from-blue-200 via-blue-100 to-background/90",
  Éducation: "from-amber-200 via-yellow-100 to-background/90",
  Langues: "from-purple-200 via-pink-100 to-background/90",
  Management: "from-green-200 via-green-100 to-background/90",
  // Add more as needed
};
const categoryIcons: Record<string, React.ReactNode> = {
  Développement: <Code className="w-4 h-4 mr-1 inline" />,
  Éducation: <BookOpen className="w-4 h-4 mr-1 inline" />,
  Langues: <Globe className="w-4 h-4 mr-1 inline" />,
  Management: <User className="w-4 h-4 mr-1 inline" />,
  // Add more as needed
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: BlogPost | null = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      mainImage { asset->{url, alt}, alt },
      author->{name, image{asset->{url, alt}}},
      categories[]->{title, _ref},
      body,
      date
    }`,
    { slug: params.slug }
  );

  if (!post) {
    notFound();
  }

  // Related posts: share at least one tag, not the current post
  const related: BlogPost[] = await client.fetch(
    `*[_type == "post" && _id != $id && categories[]._ref in $categories] {
      _id,
      title,
      slug,
      mainImage { asset->{url, alt}, alt },
      author->{name, image{asset->{url, alt}}},
      categories[]->{title, _ref},
      body,
      date
    }`,
    { id: post._id, categories: post.categories?.map((cat) => cat._ref) }
  );

  const readTime = getReadTime(post.body);

  // Social share URLs
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : `https://pascalinfo.ma/pages/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(post.title);
  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: "📘",
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: "🟢",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      icon: "🔗",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: "🐦",
    },
  ];

  const mainCategory = post.categories?.[0]?.title || "";
  const gradient =
    categoryGradients[mainCategory] ||
    "from-primary/10 via-background/80 to-background/90";

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-b ${gradient} py-0 px-2 overflow-x-hidden pt-32`}
    >
      {/* Breadcrumb */}
      <nav
        className="max-w-2xl mx-auto mt-2 mb-4 px-2"
        aria-label="Fil d'Ariane"
      >
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:underline text-primary font-medium">
              Accueil
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link
              href="/pages/blog"
              className="hover:underline text-primary font-medium"
            >
              Blog
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li
            className="truncate text-foreground font-semibold"
            aria-current="page"
          >
            {post.title}
          </li>
        </ol>
      </nav>
      {/* Artistic floating shapes */}
      <div className="absolute top-0 left-0 w-full h-64 pointer-events-none z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-full opacity-30">
          <path
            fill="#6366f1"
            fillOpacity="0.2"
            d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-10">
        {/* Featured Image */}
        {post.mainImage?.asset?.url && (
          <div className="w-full max-w-2xl h-64 rounded-2xl overflow-hidden shadow-lg mb-6">
            <Image
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || post.title}
              className="object-cover w-full h-full"
              width={800}
              height={256}
              loading="lazy"
            />
          </div>
        )}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent text-center">
          {post.title}
        </h1>
      </div>
      <SvgDivider direction="down" color="#6366f1" />
      {/* Main Content Card */}
      <main className="relative z-10 max-w-2xl mx-auto mb-8 p-6 md:p-10 bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-2xl border border-primary/10 flex flex-col gap-8">
        {/* Post meta: date and reading time */}
        <div className="flex flex-wrap items-center gap-4 mb-2">
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {/* Themed icon for main category */}
            {mainCategory && categoryIcons[mainCategory]}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {post.date &&
              new Date(post.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
          </div>
          <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium dark:bg-purple-900/20 dark:text-purple-300">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            {readTime} min de lecture
          </div>
        </div>
        <article className="prose prose-neutral dark:prose-invert max-w-none text-lg">
          <PortableText value={post.body} />
        </article>
        <SvgDivider direction="down" color="#a855f7" />
        {/* Like/Clap Button */}
        <div className="flex justify-center mt-2 mb-2">
          <LikeButton postId={post._id} />
        </div>
        {/* Author and Categories at the bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-primary/10 pt-6">
          <div className="flex items-center gap-3">
            {post.author?.image?.asset?.url && (
              <Image
                src={post.author.image.asset.url}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full border border-primary/30"
              />
            )}
            <span className="font-medium text-primary text-base">
              {post.author?.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            {post.categories?.map((cat) => (
              <span
                key={cat.title}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 flex items-center gap-1"
              >
                {categoryIcons[cat.title]}
                {cat.title}
              </span>
            ))}
          </div>
        </div>
        {/* Social Share Buttons at the bottom */}
        <div className="flex gap-3 justify-center border-t border-primary/10 pt-6">
          {shareLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Partager sur ${s.name}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-base font-medium transition-all duration-200 border border-primary/10 shadow-sm hover:shadow-md"
            >
              {s.name === "Facebook" && (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
              )}
              {s.name === "WhatsApp" && (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.029-.967-.271-.099-.468-.148-.665.15-.197.297-.763.967-.935 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.665-1.611-.912-2.207-.242-.579-.487-.5-.665-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.271.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.271-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374A9.86 9.86 0 0 1 .96 11.463C.96 5.73 5.69 1 11.423 1c2.637 0 5.112 1.027 6.988 2.901a9.825 9.825 0 0 1 2.932 6.991c-.003 5.733-4.733 10.463-10.462 10.463m8.413-18.876A11.815 11.815 0 0 0 11.423 0C5.115 0 0 5.114 0 11.417c0 2.014.526 3.986 1.527 5.688L.057 23.925a1 1 0 0 0 1.225 1.225l6.819-1.797a11.88 11.88 0 0 0 5.322 1.273h.005c6.308 0 11.418-5.114 11.418-11.419 0-3.053-1.191-5.922-3.354-8.09" />
                </svg>
              )}
              {s.name === "LinkedIn" && (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z" />
                </svg>
              )}
              {s.name === "Twitter" && (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.633A9.936 9.936 0 0 0 24 4.557z" />
                </svg>
              )}
              <span className="hidden sm:inline">{s.name}</span>
            </a>
          ))}
        </div>
        <SvgDivider direction="down" color="#22d3ee" />
        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="Liens">
                🔗
              </span>{" "}
              Articles li&eacute;s
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.slice(0, 3).map((rel) => (
                <Link
                  key={rel._id}
                  href={`/pages/blog/${rel.slug}`}
                  className="flex flex-col bg-primary/5 dark:bg-primary/10 rounded-xl shadow-md border border-primary/10 overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  {rel.mainImage?.asset?.url && (
                    <div className="h-32 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      <Image
                        src={rel.mainImage.asset.url}
                        alt={rel.mainImage.alt || rel.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        width={400}
                        height={128}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="text-lg font-bold text-primary mb-1 group-hover:underline">
                      {rel.title}
                    </h4>
                    <span className="text-xs text-muted-foreground mb-2">
                      {new Date(rel.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-primary/80 mt-auto">
                      Lire l'article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <SvgDivider direction="down" color="#f59e42" />
        {/* Comments Section (Giscus) */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <span className="text-lg" role="img" aria-label="Commentaires">
              💬
            </span>{" "}
            Commentaires
          </h3>
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4">
            <GiscusComments />
          </div>
        </div>
      </main>
      {/* Back to Blog Button outside the card */}
      <BackToBlogLink />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post: BlogPost | null = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      mainImage { asset->{url, alt}, alt }
    }`,
    { slug: params.slug }
  );
  if (!post) return { title: "Article introuvable" };
  const plainText = Array.isArray(post.body)
    ? post.body
        .map((block: any) =>
          typeof block.children !== "undefined"
            ? block.children.map((child: any) => child.text).join(" ")
            : ""
        )
        .join(" ")
    : "";
  const description =
    plainText.slice(0, 150) + (plainText.length > 150 ? "..." : "");
  const image = post.mainImage?.asset?.url;
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images: image
        ? [{ url: image, width: 800, height: 400, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: image ? [image] : [],
    },
  };
}
