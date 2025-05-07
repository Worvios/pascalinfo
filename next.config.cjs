"use strict";
// next.config.js
/** @type {import('next').NextConfig} */
// This JavaScript function replicates the logic of your utils/slugify.ts
function slugify(text) {
    if (typeof text !== "string")
        return "";
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Removes non-word chars (letters, numbers, underscore), spaces, or hyphens. This will remove diacritics.
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/-+/g, "-") // Replace multiple - with single -
        .trim();
}
// Your program data based on the JSON provided
const programsData = [
    { id: 1, title: "Diplôme Bac+2 en Développement Informatique" },
    { id: 2, title: "Diplôme Bac+2 en Gestion d'Entreprise" },
    { id: 3, title: "Cours de Soutien" },
    { id: 4, title: "Cours de Langues" },
    { id: 5, title: "Formation Continue Professionnelle" },
    { id: 6, title: "Traduction" },
    { id: 7, title: "Inscription Enseignement Supérieur" },
    { id: 8, title: "Salles VIP et Équipées" },
];
// Generate redirect rules for all programs
const programRedirects = programsData.map((program) => {
    const currentSlug = slugify(program.title);
    return {
        // Assumes old URLs were /pages/programs/[slugified-title-without-id]
        source: `/pages/programs/${currentSlug}`,
        // New URLs are /pages/programs/[id]-[slugified-title]
        destination: `/pages/programs/${program.id}-${currentSlug}`,
        permanent: true, // Use 301 redirect for SEO
    };
});
const nextConfig = {
    // Your existing rewrites configuration
    async rewrites() {
        return [
            {
                source: "/api/subscribe",
                destination: "/api/subscribe", // Assuming internal API route
            },
        ];
    },
    // Add the redirects function here
    async redirects() {
        return [
            ...programRedirects,
            // You can add other general redirects here if needed
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                port: "",
                pathname: "/**",
            },
        ],
    },
    // Other Next.js config options can go here
    // reactStrictMode: true,
};
module.exports = nextConfig;
