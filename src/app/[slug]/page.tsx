import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  mainImage,
  body,
  "authorName": author->name,
  "authorAvatar": author->avatar,
  "categories": categories[]->title
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: any) =>
  projectId && dataset && source
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : undefined;

const options = { next: { revalidate: 30 } };

const components = {
  types: {
    image: ({ value }: { value: any }) => {
      const builder = urlFor(value);
      return builder ? (
        <img
          src={builder.width(800).url()}
          alt={value.alt || "Blog image"}
          className="rounded-xl my-4"
        />
      ) : null;
    },
    // Fallback for unknown block types
    default: ({ value }: { value: any }) => (
      <pre style={{ color: "red" }}>Unknown block: {JSON.stringify(value)}</pre>
    ),
  },
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch(POST_QUERY, { slug: params.slug }, options);
  const postImageUrl =
    post.mainImage && post.mainImage.asset
      ? urlFor(post.mainImage).width(550).height(310).url()
      : null;

  // Debug log for post data
  console.log("POST DATA", JSON.stringify(post, null, 2));

  if (!post) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/" className="hover:underline">
          ← Back to posts
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.mainImage.alt || post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <div className="flex items-center gap-3 mb-4">
        {post.authorAvatar &&
          urlFor(post.authorAvatar) &&
          (() => {
            const builder = urlFor(post.authorAvatar);
            return builder ? (
              <img
                src={builder.width(40).height(40).url()}
                alt={post.authorName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : null;
          })()}
        <span className="font-medium">{post.authorName}</span>
        {post.categories && post.categories.length > 0 && (
          <span className="ml-2 text-xs text-primary">
            {post.categories.join(", ")}
          </span>
        )}
      </div>
      <div className="prose">
        {Array.isArray(post.body) ? (
          <PortableText value={post.body} components={components} />
        ) : (
          <p>No content available.</p>
        )}
      </div>
    </main>
  );
}
