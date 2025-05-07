"use client";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function BackToBlogLink() {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center mt-10 mb-8">
      <Link
        href="/pages/blog"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-primary transition-all duration-300 text-lg group"
      >
        <svg
          className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {t("footer.resources.blog.title")}
      </Link>
    </div>
  );
}
