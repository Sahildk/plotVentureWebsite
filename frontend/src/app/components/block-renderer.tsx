import { PageSection } from "@/lib/types";
import { Hero } from "./hero";
import { Features } from "./features";
import { About } from "./about";
import { Stats } from "./stats";
import { CTA } from "./cta";

interface BlockRendererProps {
  blocks: PageSection[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.__component) {
          case "sections.hero":
            return <Hero key={`${block.__component}-${index}`} data={block} />;
          case "sections.features":
            return <Features key={`${block.__component}-${index}`} data={block} />;
          case "sections.about":
            return <About key={`${block.__component}-${index}`} data={block} />;
          case "sections.stats":
            return <Stats key={`${block.__component}-${index}`} data={block} />;
          case "sections.cta":
            return <CTA key={`${block.__component}-${index}`} data={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
