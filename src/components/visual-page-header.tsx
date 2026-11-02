import Image from "next/image";
import type { ReactNode } from "react";

export function VisualPageHeader({
  eyebrow,
  title,
  description,
  image = "/images/brand/screenshot-2.png",
  imagePosition = "center",
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  image?: string;
  imagePosition?: string;
}) {
  return (
    <div className="relative -mx-5 mb-8 overflow-hidden border-b rule">
      <Image
        src={image}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 bg-background/75 md:bg-gradient-to-r md:from-background md:via-background/80 md:to-background/20" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
      <header className="relative px-5 pt-14 pb-10">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-[22ch] text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">{description}</p>
      </header>
    </div>
  );
}
