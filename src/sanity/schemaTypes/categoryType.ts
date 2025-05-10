import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: '📂 Name of the category',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: '🔗 URL-friendly identifier',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: '📝 Brief description of this category',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: '🎭 Emoji or icon name for this category',
    }),
    defineField({
      name: 'color',
      title: 'Color',
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
        layout: 'radio',
      },
      description: '🎨 Color associated with this category',
      initialValue: 'default',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: { hotspot: true },
      description: '🖼️ Image representing this category',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Category',
      type: 'boolean',
      description: '⭐ Show this category prominently on the site',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
      icon: 'icon',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, icon, featured }) {
      return {
        title: icon ? `${icon} ${title}` : (featured ? `⭐ ${title}` : title),
        subtitle: subtitle ? (subtitle.length > 50 ? subtitle.substring(0, 50) + '...' : subtitle) : '',
        media: media,
      }
    },
  },
  orderings: [
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
        {field: 'title', direction: 'asc'}
      ]
    }
  ],
})
