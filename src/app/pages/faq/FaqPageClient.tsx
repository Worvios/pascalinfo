"use client";
import { useTranslation } from "react-i18next";
import { HelpCircle, ChevronDown, Search } from "lucide-react";
import { useState, useMemo } from "react";
import SvgDivider from "@/components/SvgDivider";

function highlight(text: string, term: string) {
  if (!term) return text;
  const regex = new RegExp(
    `(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        className="bg-yellow-200 dark:bg-yellow-600 text-primary px-1 rounded"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function FaqPageClient() {
  const { t } = useTranslation();
  const categories = t("footer.resources.faq.categories", {
    returnObjects: true,
  }) as {
    name: string;
    items: { question: string; answer: string }[];
  }[];
  const subtitle = t("footer.resources.faq.subtitle");
  const [open, setOpen] = useState<{ [catIdx: number]: number | null }>({});
  const [search, setSearch] = useState("");

  // Filtered categories/questions by search
  const filtered = useMemo(() => {
    if (!search.trim()) return categories;
    const term = search.trim().toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(term) ||
            item.answer.toLowerCase().includes(term)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, search]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-100 via-background/80 to-background/90 py-0 px-2 overflow-x-hidden">
      {/* Hero/Intro Section */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 pb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/20 p-4 shadow-lg">
            <HelpCircle className="h-10 w-10 text-primary" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary drop-shadow-lg text-center">
            {t("footer.resources.faq.title")}
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto font-medium">
          {subtitle}
        </p>
      </div>
      <SvgDivider direction="down" color="#a855f7" />
      {/* Main Content Card */}
      <main className="relative z-10 max-w-4xl mx-auto mb-16 p-6 md:p-10 bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-2xl border border-primary/10">
        {/* Search Bar */}
        <div className="mb-8 flex items-center gap-3 bg-primary/5 dark:bg-primary/10 rounded-xl px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-primary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une question..."
            className="w-full bg-transparent outline-none text-lg text-foreground placeholder:text-muted-foreground"
            aria-label="Rechercher une question"
          />
        </div>
        {/* Accordions by Category */}
        {filtered.length === 0 ? (
          <div className="text-center text-lg text-muted-foreground py-12">
            Aucun r&eacute;sultat pour &quot;{search}&quot;.
          </div>
        ) : (
          filtered.map((cat, catIdx) => (
            <div key={cat.name} className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="text-xl">📂</span> {cat.name}
              </h2>
              <div className="divide-y divide-primary/10 rounded-xl overflow-hidden">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="bg-primary/5 dark:bg-primary/10">
                    <button
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none transition-colors group hover:bg-primary/10"
                      onClick={() =>
                        setOpen((o) => ({
                          ...o,
                          [catIdx]: o[catIdx] === idx ? null : idx,
                        }))
                      }
                      aria-expanded={open[catIdx] === idx}
                      aria-controls={`faq-panel-${catIdx}-${idx}`}
                    >
                      <span className="flex items-center gap-2 text-lg font-semibold text-primary">
                        <span className="text-xl">💬</span>
                        {highlight(item.question, search)}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-primary transition-transform duration-300 ${
                          open[catIdx] === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      id={`faq-panel-${catIdx}-${idx}`}
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        open[catIdx] === idx
                          ? "max-h-96 opacity-100 py-3 px-5"
                          : "max-h-0 opacity-0 py-0 px-5"
                      }`}
                      aria-hidden={open[catIdx] !== idx}
                    >
                      <div className="text-base text-foreground/90 dark:text-foreground/80 leading-relaxed">
                        {highlight(item.answer, search)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        {/* Info box example */}
        <div className="mt-10 p-5 rounded-xl bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 flex items-start gap-3 shadow-sm">
          <span className="text-2xl">💡</span>
          <div>
            <div className="font-semibold text-green-700 dark:text-green-300 mb-1">
              Besoin d&apos;aide suppl&eacute;mentaire ?
            </div>
            <div className="text-green-800 dark:text-green-200 text-base">
              Contactez notre &eacute;quipe p&eacute;dagogique &agrave;{" "}
              <a
                href="mailto:contact@pascalinfo.ma"
                className="underline hover:text-primary transition-colors"
              >
                contact@pascalinfo.ma
              </a>{" "}
              ou rendez-vous &agrave; l&apos;accueil de
              l&apos;&eacute;tablissement.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
