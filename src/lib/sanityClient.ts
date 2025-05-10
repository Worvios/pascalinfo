import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fp9441ce", // Add fallback here
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", // Add fallback here
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-05-07", // Add fallback here
  useCdn: process.env.NODE_ENV === 'production',
});
