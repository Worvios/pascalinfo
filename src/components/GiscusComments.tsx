"use client";
import { useEffect, useRef } from "react";

export default function GiscusComments() {
  const giscusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!giscusRef.current) return;
    if (giscusRef.current.querySelector("iframe")) return; // Already loaded
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "YOUR_GITHUB_USERNAME/YOUR_REPO");
    script.setAttribute("data-repo-id", "YOUR_REPO_ID");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "YOUR_CATEGORY_ID");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "fr");
    script.crossOrigin = "anonymous";
    script.async = true;
    giscusRef.current.appendChild(script);
  }, []);
  return (
    <div className="giscus" ref={giscusRef}>
      <noscript>
        Veuillez activer JavaScript pour voir les commentaires.
      </noscript>
    </div>
  );
}
