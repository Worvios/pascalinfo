import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 via-background/80 to-background/90">
      <Image
        src="/loading_gif.gif"
        alt="Chargement..."
        width={320}
        height={320}
        className="mb-8"
        priority
      />
      <h2 className="text-2xl font-bold text-primary mb-2">Chargement...</h2>
      <p className="text-muted-foreground text-lg">
        Merci de patienter pendant le chargement du contenu.
      </p>
    </div>
  );
}
