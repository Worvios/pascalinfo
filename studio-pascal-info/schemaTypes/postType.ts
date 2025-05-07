import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "✨ A beautiful, catchy title for your article (translatable)",
      validation: (Rule) => Rule.required().min(5).max(120),
      group: "main",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description:
        "🔗 URL-friendly identifier (auto-generated from title, translatable)",
      validation: (Rule) => Rule.required(),
      group: "main",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "📝 A short summary for previews and SEO (translatable)",
      group: "main",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      description:
        "📖 The main body of your article. Supports rich text, images, and more. (translatable)",
      group: "main",
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      description: "🖼️ A beautiful image to represent your article",
      group: "media",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "👤 Name of the article author",
      group: "meta",
    }),
    defineField({
      name: "authorAvatar",
      title: "Author Avatar",
      type: "image",
      options: { hotspot: true },
      description: "🧑‍🎨 Photo or avatar of the author",
      group: "meta",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "🏷️ Add relevant tags for search and filtering",
      group: "meta",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      description: "📅 Publication date",
      group: "meta",
    }),
  ],
  groups: [
    { name: "main", title: "Main Content" },
    { name: "media", title: "Media" },
    { name: "meta", title: "Meta & Tags" },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "author",
    },
    prepare(selection) {
      const { title, media, subtitle } = selection;
      return {
        title,
        media,
        subtitle: subtitle ? `By ${subtitle}` : "",
      };
    },
  },
});
