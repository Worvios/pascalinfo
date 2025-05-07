"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SvgDivider from "@/components/SvgDivider";
import { client } from "@/lib/sanityClient";

// Types for posts
interface Author {
  _id: string;
  name: string;
  image?: {
    asset?: {
      url: string;
      alt?: string;
    };
  };
}
interface Category {
  _id: string;
  title: string;
}
interface MainImage {
  asset?: {
    _id: string;
    url: string;
    alt?: string;
  };
  alt?: string;
}
interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  content?: string;
  mainImage?: MainImage;
  author?: Author;
  categories?: Category[];
  tags?: string[];
  date?: string;
}

export default function BlogPageClient() {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const lang = i18n.language || "fr";
    client
      .fetch(
        `*[_type == "post" && (!defined(__i18n_lang) || __i18n_lang == $lang)] | order(date desc){
          _id,
          title,
          slug,
          excerpt,
          content,
          mainImage {
            asset->{ _id, url },
            alt
          },
          author->{
            _id,
            name,
            image { asset->{url}, alt }
          },
          categories[]{
            _id,
            title
          },
          tags,
          date
        }`,
        { lang }
      )
      .then((data: BlogPost[]) => {
        setPosts(data);
        setLoading(false);
      });
  }, [i18n.language]);

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags || []))),
    [posts]
  );

  const filtered = useMemo(() => {
    let filteredPosts = posts;
    if (tag) {
      filteredPosts = filteredPosts.filter((p) =>
        (p.tags || []).includes(tag as string)
      );
    }
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      filteredPosts = filteredPosts.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(term) ||
          (p.excerpt || "").toLowerCase().includes(term) ||
          (p.content || "").toString().toLowerCase().includes(term)
      );
    }
    return filteredPosts;
  }, [search, tag, posts]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary/10 via-background/80 to-background/90 py-0 px-2 overflow-x-hidden">
      <ScrollToTopButton />
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
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 pb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/20 p-4 shadow-lg">
            <span className="text-3xl" role="img" aria-label="Journal">
              📰
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary drop-shadow-lg text-center">
            {t("footer.resources.blog.title")}
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto font-medium">
          Conseils, actualités et ressources pour réussir votre parcours
          scolaire et professionnel.
        </p>
      </div>
      <SvgDivider direction="down" color="#6366f1" />
      {/* Main Content Card */}
      <main className="relative z-10 max-w-4xl mx-auto mb-16 p-6 md:p-10 bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-2xl border border-primary/10">
        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center gap-3 bg-primary/5 dark:bg-primary/10 rounded-xl px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Search className="h-5 w-5 text-primary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un article..."
              className="w-full bg-transparent outline-none text-lg text-foreground placeholder:text-muted-foreground"
              aria-label="Rechercher un article"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0 md:ml-4">
            <button
              className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors ${
                tag === null
                  ? "bg-primary text-white border-primary"
                  : "bg-transparent border-primary/30 text-primary hover:bg-primary/10"
              }`}
              onClick={() => setTag(null)}
            >
              {t("blog.all", "Tous")}
            </button>
            {allTags.map((t: string) => (
              <button
                key={t}
                className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors ${
                  tag === t
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent border-primary/30 text-primary hover:bg-primary/10"
                }`}
                onClick={() => setTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <SvgDivider direction="down" color="#a855f7" />
        {/* Back to Home Button */}
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-primary transition-all duration-300 text-lg group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("navigation.home")}
          </Link>
        </div>
        {/* Blog Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-lg text-muted-foreground py-12">
            Aucun résultat pour "{search}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((post) => (
              <Link
                key={post._id}
                href={`/pages/blog/${post.slug.current}`}
                className="flex flex-col bg-primary/5 dark:bg-primary/10 rounded-xl shadow-md border border-primary/10 overflow-hidden hover:shadow-xl transition-shadow group"
              >
                {/* Featured Image */}
                {post.mainImage && post.mainImage.asset && (
                  <div className="h-48 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt || post.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      width={600}
                      height={192}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground">
                      {post.date &&
                        new Date(post.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                    </span>
                    <div className="flex flex-wrap gap-1 ml-auto">
                      {(post.tags || [])
                        .filter(Boolean)
                        .map((tag: string, idx: number) => (
                          <span
                            key={post._id + "-" + tag + "-" + idx}
                            className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold"
                          >
                            #{tag}
                          </span>
                        ))}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-primary mb-2 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-base text-foreground/90 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  {/* Author Info */}
                  <div className="flex items-center gap-3 mt-2">
                    {post.author &&
                      post.author.image &&
                      post.author.image.asset &&
                      post.author.image.asset.url && (
                        <Image
                          src={post.author.image.asset.url}
                          alt={post.author.name || "Auteur"}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover border border-primary/30"
                          loading="lazy"
                        />
                      )}
                    <span className="text-sm text-muted-foreground font-medium">
                      {post.author?.name}
                    </span>
                  </div>
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.categories
                        .filter(Boolean)
                        .map((cat: Category, idx: number) => (
                          <span
                            key={cat._id || cat.title || idx}
                            className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                          >
                            {cat.title}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
