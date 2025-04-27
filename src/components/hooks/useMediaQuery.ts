// hooks/useMediaQuery.ts
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  // Default to false on server to avoid hydration mismatch
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      // Set initial value
      const media = window.matchMedia(query);
      setMatches(media.matches);

      // Handle changes
      const listener = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
      };

      // Add listener
      media.addEventListener("change", listener);

      // Clean up
      return () => {
        media.removeEventListener("change", listener);
      };
    }
  }, [query]);

  return matches;
}
