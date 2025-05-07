import { client } from "../src/lib/sanityClient";
// @ts-ignore
const fs = require("fs/promises");
// @ts-ignore
const path = require("path");

const SITE_URL = "https://pascalinfo.ma";

async function getBlogPosts() {
  return client.fetch(`*[_type == "post"] | order(date desc){
    _id,
    title,
    slug,
    date,
    body,
    mainImage { asset->{url, alt}, alt }
  }`);
}

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function generateSitemap(posts: any[]) {
  const staticPages = [
    "",
    "/pages/blog",
    "/pages/about",
    "/pages/faq",
    "/pages/programs",
  ];
  const urls = [
    ...staticPages.map(
      (page) =>
        `<url><loc>${SITE_URL}${page}</loc><changefreq>weekly</changefreq></url>`
    ),
    ...posts.map(
      (post) =>
        `<url><loc>${SITE_URL}/pages/blog/${post.slug.current || post.slug}</loc><lastmod>${post.date}</lastmod><changefreq>monthly</changefreq></url>`
    ),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}\n</urlset>`;
}

async function generateRSS(posts: any[]) {
  const items = posts.slice(0, 20).map((post) => {
    const url = `${SITE_URL}/pages/blog/${post.slug.current || post.slug}`;
    const plainText = Array.isArray(post.body)
      ? post.body
          .map((block: any) =>
            typeof block.children !== "undefined"
              ? block.children.map((child: any) => child.text).join(" ")
              : ""
          )
          .join(" ")
      : "";
    const description = escapeXml(plainText.slice(0, 200));
    return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  <description>${description}</description>
</item>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Blog Éducatif - Pascal Info</title>
  <link>${SITE_URL}/pages/blog</link>
  <description>Conseils, actualités et ressources pour réussir votre parcours scolaire et professionnel.</description>
  <language>fr</language>
${items.join("\n")}\n</channel>
</rss>`;
}

async function main() {
  const posts = await getBlogPosts();
  const sitemap = await generateSitemap(posts);
  const rss = await generateRSS(posts);
  await fs.writeFile(path.join("public", "sitemap.xml"), sitemap, "utf8");
  await fs.writeFile(path.join("public", "rss.xml"), rss, "utf8");
  console.log("✅ sitemap.xml and rss.xml generated in public/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
