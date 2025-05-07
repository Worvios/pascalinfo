// FILE: src/sanity/env.ts

// The Project ID and Dataset to connect to.
// Defaults are provided from your sanity.cli.ts settings.
// These can be overridden by environment variables if needed.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fp9441ce"; // Fallback to your projectId

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production"; // Fallback to 'production'

// API version to use. See /docs/api-versioning
// We use a YYYY-MM-DD format for the version.
// You should change this to the latest version when Sanity releases updates.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-07'; // Your specified API version

// Optional: Set to true to use the Content Delivery Network (CDN) for faster responses.
// Read more: /docs/using-the-cdn
export const useCdn = process.env.NODE_ENV === 'production';

// Helper function to ensure that a value is defined.
// You might not need this if you provide direct fallbacks for projectId and dataset above.
// However, it can be useful for other required environment variables.
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    // Instead of throwing an error that crashes the studio build for these specific vars,
    // we rely on the fallbacks above.
    // If you have OTHER critical env vars that DON'T have fallbacks,
    // then throwing an error here would still be appropriate for them.
    // For projectId and dataset, the fallbacks above should prevent this from being an issue.
    console.warn(errorMessage + " Using fallback or default value if available.");
    // If you absolutely must have it and there's no fallback, then:
    // throw new Error(errorMessage);
  }
  return v as T; // Type assertion might be needed if v could truly be undefined here
}

// Example of using assertValue for a variable that *must* be set and has no fallback
// export const SOME_OTHER_CRITICAL_ENV_VAR = assertValue(
//   process.env.SOME_OTHER_CRITICAL_ENV_VAR,
//   'Missing critical environment variable: SOME_OTHER_CRITICAL_ENV_VAR'
// );

