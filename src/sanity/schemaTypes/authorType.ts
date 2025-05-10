import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: '👤 Full name of the author',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: '🔗 URL-friendly identifier',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: '🖼️ Author profile image',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: '🎖️ Author&apos;s role or title',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Biography',
      type: 'text',
      rows: 3,
      description: '📝 Brief biography (150 chars max)',
      validation: Rule => Rule.max(150),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H4', value: 'h4'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
      description: '✍️ Detailed author biography',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: '📧 Author&apos;s email address',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'twitter', type: 'url', title: 'Twitter' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'website', type: 'url', title: 'Website' },
      ],
      description: '🌐 Author&apos;s social media profiles',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Author',
      type: 'boolean',
      description: '⭐ Highlight this author on the site',
      initialValue: false,
    }),
    defineField({
      name: 'specialty',
      title: 'Specialty',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: '🏆 Author&apos;s areas of expertise',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: '📍 Author&apos;s location',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: subtitle || 'Author',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'name', direction: 'asc'}
      ]
    }
  ],
})
