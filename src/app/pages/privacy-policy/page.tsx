"use client";
import { useTranslation } from "react-i18next";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();
  // Split content into sections by <h2> for card styling
  const content = t("footer.resources.privacyPolicy.content");
  // Regex to split by <h2> and keep the headers
  const sections = content.split(/(<h2>.*?<\/h2>)/g).filter(Boolean);

  // Helper to render section with card styling
  const renderSections = () => {
    let currentHeader = null;
    const result = [];
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].startsWith("<h2>")) {
        currentHeader = sections[i];
      } else if (currentHeader) {
        // Add emoji/icon based on section title
        let icon = "🔒";
        if (currentHeader.includes("Collecte")) icon = "📋";
        else if (currentHeader.includes("Utilisation")) icon = "💡";
        else if (currentHeader.includes("Protection")) icon = "🛡️";
        else if (currentHeader.includes("Droits")) icon = "📝";
        result.push(
          <section key={i} className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{icon}</span>
              <div
                className="text-2xl font-semibold text-primary drop-shadow-sm"
                dangerouslySetInnerHTML={{
                  __html: currentHeader
                    .replace("<h2>", "")
                    .replace("</h2>", ""),
                }}
              />
            </div>
            <div className="bg-primary/5 dark:bg-primary/10 rounded-xl shadow-md p-5 prose prose-neutral dark:prose-invert max-w-none text-lg">
              <div dangerouslySetInnerHTML={{ __html: sections[i] }} />
            </div>
          </section>
        );
        currentHeader = null;
      }
    }
    return result;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary/10 via-background/80 to-background/90 py-0 px-2 overflow-x-hidden">
      {/* Artistic floating shapes */}
      <div className="absolute top-0 left-0 w-full h-64 pointer-events-none z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-full opacity-30">
          <path
            fill="#6366f1"
            fillOpacity="0.2"
            d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 pb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/20 p-4 shadow-lg">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary drop-shadow-lg text-center">
            {t("footer.resources.privacyPolicy.title")}
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto font-medium">
          &quot;Votre confidentialit&eacute;, notre priorit&eacute; :
          d&eacute;couvrez comment nous prot&eacute;geons vos
          donn&eacute;es.&quot;
        </p>
      </div>
      {/* Main Content Card */}
      <main className="relative z-10 max-w-3xl mx-auto mb-16 p-6 md:p-10 bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-2xl border border-primary/10">
        {renderSections()}
        {/* Info box example */}
        <div className="mt-10 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 flex items-start gap-3 shadow-sm">
          <span className="text-2xl">ℹ️</span>
          <div>
            <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
              Besoin d&apos;aide ?
            </div>
            <div className="text-blue-800 dark:text-blue-200 text-base">
              Pour toute question relative &agrave; la confidentialit&eacute;,
              contactez-nous &agrave;{" "}
              <a
                href="mailto:contact@pascalinfo.com"
                className="underline hover:text-primary transition-colors"
              >
                contact@pascalinfo.com
              </a>
              .
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
