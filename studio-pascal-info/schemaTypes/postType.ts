import { defineField, defineType } from "sanity";
import { DocumentTextIcon, ImageIcon, StarIcon } from '@sanity/icons';

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
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
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
            { title: "Large Text", value: "largeText" },
            { title: "Highlighted Text", value: "highlightedText" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
            { title: "Check List", value: "checkList" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
              { title: "Highlight", value: "highlight" },
              { title: "Colored Text", value: "color" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                  {
                    title: "Open in new tab",
                    name: "blank",
                    type: "boolean",
                  },
                ],
              },
            ],
          },
        },
        { 
          type: "image", 
          icon: ImageIcon,
          options: { 
            hotspot: true,
            storeOriginalFilename: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Important for SEO and accessibility",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Display caption below the image",
            },
            {
              name: "style",
              title: "Image Style",
              type: "string",
              options: {
                list: [
                  { title: "Regular", value: "regular" },
                  { title: "Full Width", value: "fullWidth" },
                  { title: "Float Left", value: "floatLeft" },
                  { title: "Float Right", value: "floatRight" },
                  { title: "Rounded", value: "rounded" },
                  { title: "Circle", value: "circle" },
                ],
              },
            },
          ],
        },
        {
          type: "object",
          name: "callout",
          title: "Callout Box",
          fields: [
            {
              name: "text",
              type: "text",
              title: "Text",
            },
            {
              name: "style",
              title: "Style",
              type: "string",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Success", value: "success" },
                  { title: "Tip", value: "tip" },
                ],
              },
            },
          ],
          preview: {
            select: {
              text: "text",
              style: "style",
            },
            prepare({ text, style }) {
              return {
                title: `${style || "Info"} Callout`,
                subtitle: text,
              };
            },
          },
        },
        {
          type: "object",
          name: "quote",
          title: "Featured Quote",
          fields: [
            {
              name: "text",
              type: "text",
              title: "Quote Text",
            },
            {
              name: "author",
              type: "string",
              title: "Author",
            },
            {
              name: "style",
              title: "Style",
              type: "string",
              options: {
                list: [
                  { title: "Simple", value: "simple" },
                  { title: "Elegant", value: "elegant" },
                  { title: "Bold", value: "bold" },
                  { title: "Moroccan", value: "moroccan" },
                ],
              },
            },
          ],
          preview: {
            select: {
              text: "text",
              author: "author",
            },
            prepare({ text, author }) {
              return {
                title: `Quote: ${author || "Unknown"}`,
                subtitle: text,
              };
            },
          },
        },
        {
          type: "object",
          name: "table",
          title: "Table",
          fields: [
            {
              name: "rows",
              type: "array",
              title: "Rows",
              of: [
                {
                  type: "object",
                  name: "row",
                  fields: [
                    {
                      name: "cells",
                      type: "array",
                      of: [{ type: "text" }],
                    },
                  ],
                  preview: {
                    select: {
                      cells: "cells",
                    },
                    prepare({ cells }) {
                      return {
                        title: `Row: ${(cells || []).join(" | ")}`,
                      };
                    },
                  },
                },
              ],
            },
            {
              name: "hasHeaderRow",
              title: "Has Header Row",
              type: "boolean",
              description: "Is the first row a header?",
            },
            {
              name: "style",
              title: "Table Style",
              type: "string",
              options: {
                list: [
                  { title: "Simple", value: "simple" },
                  { title: "Striped", value: "striped" },
                  { title: "Bordered", value: "bordered" },
                  { title: "Elegant", value: "elegant" },
                ],
              },
            },
          ],
          preview: {
            prepare() {
              return {
                title: "Table",
              };
            },
          },
        },
        {
          type: "object",
          name: "divider",
          title: "Divider",
          fields: [
            {
              name: "style",
              title: "Style",
              type: "string",
              options: {
                list: [
                  { title: "Line", value: "line" },
                  { title: "Dots", value: "dots" },
                  { title: "Stars", value: "stars" },
                  { title: "Moroccan Pattern", value: "moroccan" },
                ],
              },
            },
          ],
          preview: {
            prepare() {
              return {
                title: "Divider",
              };
            },
          },
        },
        {
          type: "object",
          name: "interactiveElement",
          title: "Interactive Element",
          icon: StarIcon,
          fields: [
            {
              name: "type",
              title: "Element Type",
              type: "string",
              options: {
                list: [
                  { title: "Quiz Question", value: "quiz" },
                  { title: "Poll", value: "poll" },
                  { title: "Expandable Section", value: "expandable" },
                  { title: "Interactive Checklist", value: "checklist" },
                ],
              },
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "content",
              title: "Content",
              type: "text",
            },
            {
              name: "options",
              title: "Options",
              type: "array",
              of: [{ type: "string" }],
              hidden: ({ parent }) => 
                parent?.type !== "quiz" && parent?.type !== "poll" && parent?.type !== "checklist",
            },
          ],
          preview: {
            select: {
              title: "title",
              type: "type",
            },
            prepare({ title, type }) {
              return {
                title: title || "Interactive Element",
                subtitle: `Type: ${type || "Unknown"}`,
              };
            },
          },
        },
      ],
      description:
        "📖 The main body of your article. Supports rich text, images, and more. (translatable)",
      group: "main",
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { 
        hotspot: true,
        metadata: ["palette", "lqip", "blurhash"],
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
      description: "🖼️ A beautiful image to represent your article",
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      description: "📸 Add multiple images to create a gallery",
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
      name: "authorBio",
      title: "Author Bio",
      type: "text",
      rows: 2,
      description: "✍️ Short biography of the author",
      group: "meta",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "🏷️ Add relevant tags for search and filtering",
      group: "meta",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      description: "📁 Categorize your post",
      group: "meta",
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "datetime",
      description: "📅 Publication date",
      group: "meta",
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time",
      type: "number",
      description: "⏱️ Estimated reading time in minutes",
      group: "meta",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "🔍 Custom title for search engines (optional)",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "🔍 Custom description for search engines",
      group: "seo",
    }),
    defineField({
      name: "socialImage",
      title: "Social Media Image",
      type: "image",
      description: "📱 Image displayed when shared on social media",
      group: "seo",
    }),
    defineField({
      name: "layout",
      title: "Layout Style",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Wide", value: "wide" },
          { title: "Full Width", value: "fullWidth" },
          { title: "Magazine", value: "magazine" },
          { title: "Moroccan", value: "moroccan" },
        ],
      },
      description: "🎨 Choose the layout style for this post",
      group: "display",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Blue", value: "blue" },
          { title: "Green", value: "green" },
          { title: "Red", value: "red" },
          { title: "Purple", value: "purple" },
          { title: "Orange", value: "orange" },
          { title: "Moroccan Blue", value: "moroccanBlue" },
          { title: "Moroccan Red", value: "moroccanRed" },
        ],
      },
      description: "🎭 Color theme for this post",
      group: "display",
    }),
    defineField({
      name: "featuredPost",
      title: "Featured Post",
      type: "boolean",
      description: "⭐ Mark this as a featured post",
      group: "display",
    }),
  ],
  groups: [
    { name: "main", title: "Main Content" },
    { name: "media", title: "Media" },
    { name: "meta", title: "Meta & Tags" },
    { name: "seo", title: "SEO & Sharing" },
    { name: "display", title: "Display Options" },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "author",
      date: "date",
      excerpt: "excerpt",
    },
    prepare(selection) {
      const { title, media, subtitle, date, excerpt } = selection;
      const formattedDate = date ? new Date(date).toLocaleDateString() : '';
      
      return {
        title: title || "Untitled Post",
        media: media,
        subtitle: [
          subtitle ? `By ${subtitle}` : "",
          formattedDate,
          excerpt ? (excerpt.length > 50 ? excerpt.substring(0, 50) + '...' : excerpt) : "",
        ].filter(Boolean).join(' • '),
      };
    },
  },
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'dateDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    },
    {
      title: 'Publication Date, Old',
      name: 'dateAsc',
      by: [
        {field: 'date', direction: 'asc'}
      ]
    },
    {
      title: 'Title',
      name: 'title',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ],
});
