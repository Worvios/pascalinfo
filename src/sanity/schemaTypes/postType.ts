import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
    { name: 'meta', title: 'Meta & Categories' },
    { name: 'seo', title: 'SEO & Sharing' },
    { name: 'display', title: 'Display Options' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: '✨ A catchy title for your blog post',
      validation: Rule => Rule.required().min(5).max(100),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: '🔗 URL-friendly identifier (auto-generated from title)',
      validation: Rule => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: '📝 A brief summary displayed in previews (150-200 characters)',
      validation: Rule => Rule.max(200),
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      description: '👤 Who wrote this post?',
      validation: Rule => Rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['palette', 'lqip', 'blurhash'],
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Displayed below the image',
        }),
      ],
      description: '🖼️ The featured image for this post',
      group: 'media',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
      description: '📁 Categorize your post',
      group: 'meta',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: '🏷️ Add relevant tags for search and filtering',
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description: '📅 When should this post be published?',
      group: 'meta',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'number',
      description: '⏱️ Estimated reading time in minutes',
      validation: Rule => Rule.min(1),
      group: 'meta',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: '📄 The main content of your post',
      group: 'content',
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: Rule => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      description: '📸 Add multiple images to create a gallery',
      group: 'media',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: '🔍 Custom title for search engines (optional)',
      validation: Rule => Rule.max(60),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: '🔍 Custom description for search engines',
      validation: Rule => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Media Image',
      type: 'image',
      description: '📱 Image displayed when shared on social media',
      group: 'seo',
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Wide', value: 'wide' },
          { title: 'Full Width', value: 'fullWidth' },
          { title: 'Magazine', value: 'magazine' },
          { title: 'Moroccan', value: 'moroccan' },
        ],
        layout: 'radio',
      },
      description: '🎨 Choose the layout style for this post',
      initialValue: 'standard',
      group: 'display',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Red', value: 'red' },
          { title: 'Purple', value: 'purple' },
          { title: 'Orange', value: 'orange' },
          { title: 'Moroccan Blue', value: 'moroccanBlue' },
          { title: 'Moroccan Red', value: 'moroccanRed' },
        ],
      },
      description: '🎭 Color theme for this post',
      initialValue: 'default',
      group: 'display',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: '⭐ Mark this as a featured post',
      initialValue: false,
      group: 'display',
    }),
    defineField({
      name: 'hideTitle',
      title: 'Hide Title',
      type: 'boolean',
      description: '🙈 Hide the title (useful for custom layouts)',
      initialValue: false,
      group: 'display',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
      featured: 'featured',
    },
    prepare(selection) {
      const {title, author, media, date, featured} = selection
      const formattedDate = date ? new Date(date).toLocaleDateString() : ''
      
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: [
          author && `by ${author}`,
          formattedDate,
        ].filter(Boolean).join(' • '),
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'publishedAt', direction: 'desc'}
      ]
    }
  ],
})
