// FILE: sanity.config.ts
'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio$$[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env' // This will now import with fallbacks
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId, // Uses projectId from src/sanity/env (with fallback)
  dataset,   // Uses dataset from src/sanity/env (with fallback)
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
