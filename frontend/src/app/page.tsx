import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Stats } from "./components/stats";
import { CTA } from "./components/cta";
import { getPage } from "@/lib/strapi";
import { notFound } from "next/navigation";

// Force dynamic rendering to ensure CMS updates are reflected immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const page = await getPage("home");

  // If page is not found, we can either return 404 or show a fallback.
  // Since this is the homepage, let's try to be graceful, but if content is missing,
  // it means Strapi is not setup with a "home" page yet.
  if (!page) {
    console.warn(
      "Homepage 'home' not found in Strapi. Please create a page with slug 'home'."
    );
    // You might want to remove this fallback once verified
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Plot Venture
          </h1>
          <p className="text-gray-600 mb-8">
            The homepage content is currently being updated. Please check back
            soon.
          </p>
          <p className="text-sm text-gray-400">
            Admin Note: Create a page with slug "home" in Strapi.
          </p>
        </div>
      </div>
    );
  }

  const sections = page.sections || [];

  return (
    <>
      {sections.map((section: any, index: number) => {
        switch (section.__component) {
          case "sections.hero":
            return (
              <Hero key={`${section.__component}-${index}`} data={section} />
            );
          case "sections.features":
            return (
              <Features
                key={`${section.__component}-${index}`}
                data={section}
              />
            );
          case "sections.about":
            return (
              <About key={`${section.__component}-${index}`} data={section} />
            );
          case "sections.stats":
            return (
              <Stats key={`${section.__component}-${index}`} data={section} />
            );
          case "sections.cta":
            return (
              <CTA key={`${section.__component}-${index}`} data={section} />
            );
          default:
            // Warn about unknown component types in development
            if (process.env.NODE_ENV === "development") {
              console.warn(`Unknown component type: ${section.__component}`);
            }
            return null;
        }
      })}
    </>
  );
}
