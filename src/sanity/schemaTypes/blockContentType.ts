import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon, BlockElementIcon, ThLargeIcon, LinkIcon} from '@sanity/icons'

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
        {title: 'Large Text', value: 'largeText'},
        {title: 'Highlighted Text', value: 'highlightedText'},
        {title: 'Stylish Heading', value: 'stylishHeading'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
        {title: 'Check List', value: 'checkList'},
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
          {title: 'Highlight', value: 'highlight'},
          {title: 'Colored Text', value: 'color'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
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
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
          {
            title: 'Internal Link',
            name: 'internalLink',
            type: 'object',
            icon: LinkIcon,
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'post' }
                ]
              }
            ]
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {
        hotspot: true,
        storeOriginalFilename: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: Rule => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Displayed below the image',
        },
        {
          name: 'style',
          title: 'Image Style',
          type: 'string',
          options: {
            list: [
              { title: 'Default', value: 'default' },
              { title: 'Full Width', value: 'fullWidth' },
              { title: 'Float Left', value: 'floatLeft' },
              { title: 'Float Right', value: 'floatRight' },
              { title: 'Rounded', value: 'rounded' },
              { title: 'Circle', value: 'circle' },
              { title: 'Polaroid', value: 'polaroid' },
            ],
            layout: 'radio',
          },
          initialValue: 'default',
        },
      ]
    }),
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Callout Box',
      icon: BlockElementIcon,
      fields: [
        {
          name: 'text',
          type: 'text',
          title: 'Text',
        },
        {
          name: 'style',
          title: 'Style',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Success', value: 'success' },
              { title: 'Tip', value: 'tip' },
              { title: 'Note', value: 'note' },
              { title: 'Moroccan Style', value: 'moroccan' },
            ],
            layout: 'radio',
          },
          initialValue: 'info',
        },
      ],
      preview: {
        select: {
          text: 'text',
          style: 'style',
        },
        prepare({ text, style }) {
          const styleLabels: Record<string, string> = {
            info: 'ℹ️ Info',
            warning: '⚠️ Warning',
            success: '✅ Success',
            tip: '💡 Tip',
            note: '📝 Note',
            moroccan: '🔮 Moroccan',
          }
          // Use safer access with optional chaining or provide a default
          const label = style && styleLabels[style] ? styleLabels[style] : 'Callout'
          return {
            title: `${label}: ${text ? text.substring(0, 40) + (text.length > 40 ? '...' : '') : ''}`,
          }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'quote',
      title: 'Featured Quote',
      icon: BlockElementIcon,
      fields: [
        {
          name: 'text',
          type: 'text',
          title: 'Quote Text',
        },
        {
          name: 'author',
          type: 'string',
          title: 'Author',
        },
        {
          name: 'style',
          title: 'Style',
          type: 'string',
          options: {
            list: [
              { title: 'Simple', value: 'simple' },
              { title: 'Elegant', value: 'elegant' },
              { title: 'Bold', value: 'bold' },
              { title: 'Moroccan', value: 'moroccan' },
            ],
            layout: 'radio',
          },
          initialValue: 'simple',
        },
      ],
      preview: {
        select: {
          text: 'text',
          author: 'author',
        },
        prepare({ text, author }) {
          return {
            title: `Quote${author ? ` by ${author}` : ''}`,
            subtitle: text ? text.substring(0, 50) + (text.length > 50 ? '...' : '') : '',
          }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'table',
      title: 'Table',
      icon: ThLargeIcon,
      fields: [
        {
          name: 'rows',
          type: 'array',
          title: 'Rows',
          of: [
            {
              type: 'object',
              name: 'row',
              fields: [
                {
                  name: 'cells',
                  type: 'array',
                  of: [{ type: 'text' }],
                },
              ],
              preview: {
                select: {
                  cells: 'cells',
                },
                prepare({ cells }) {
                  return {
                    title: `Row: ${(cells || []).map((cell: string | null) => 
                      cell ? cell.substring(0, 10) : ''
                    ).join(' | ')}`,
                  }
                },
              },
            },
          ],
        },
        {
          name: 'hasHeaderRow',
          title: 'Has Header Row',
          type: 'boolean',
          description: 'Is the first row a header?',
          initialValue: true,
        },
        {
          name: 'style',
          title: 'Table Style',
          type: 'string',
          options: {
            list: [
              { title: 'Simple', value: 'simple' },
              { title: 'Striped', value: 'striped' },
              { title: 'Bordered', value: 'bordered' },
              { title: 'Elegant', value: 'elegant' },
              { title: 'Moroccan', value: 'moroccan' },
            ],
            layout: 'radio',
          },
          initialValue: 'simple',
        },
      ],
      preview: {
        prepare() {
          return {
            title: 'Table',
          }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'divider',
      title: 'Divider',
      icon: BlockElementIcon,
      fields: [
        {
          name: 'style',
          title: 'Style',
          type: 'string',
          options: {
            list: [
              { title: 'Line', value: 'line' },
              { title: 'Dots', value: 'dots' },
              { title: 'Stars', value: 'stars' },
              { title: 'Moroccan Pattern', value: 'moroccan' },
            ],
            layout: 'radio',
          },
          initialValue: 'line',
        },
      ],
      preview: {
        prepare() {
          return {
            title: '--- Divider ---',
          }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'button',
      title: 'Button',
      icon: BlockElementIcon,
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Button Text',
        },
        {
          name: 'url',
          type: 'url',
          title: 'URL',
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
              { title: 'Moroccan', value: 'moroccan' },
            ],
            layout: 'radio',
          },
          initialValue: 'primary',
        },
        {
          name: 'align',
          title: 'Alignment',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'right' },
            ],
            layout: 'radio',
          },
          initialValue: 'center',
        },
      ],
      preview: {
        select: {
          text: 'text',
        },
        prepare({ text }) {
          return {
            title: `Button: ${text || 'No text'}`,
          }
        },
      },
    }),
  ],
})
