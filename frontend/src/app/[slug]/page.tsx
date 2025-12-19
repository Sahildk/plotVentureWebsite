import { BlockRenderer } from "../components/block-renderer";
import { getPage } from "@/lib/strapi";
import { notFound } from "next/navigation";

// Force dynamic rendering to ensure CMS updates are reflected immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Skip dynamic route for static routes (these have their own pages)
  const staticRoutes = ['about', 'contact', 'location', 'gallery', 'admin', 'api'];
  if (staticRoutes.includes(slug.toLowerCase())) {
    notFound();
  }
  
  console.log(`[Next.js] Rendering dynamic page for slug: "${slug}"`);
  
  const page = await getPage(slug);

  // If page doesn't exist, show 404
  if (!page) {
    console.log(`[Next.js] Page not found for slug: "${slug}", showing 404`);
    notFound();
  }
  
  console.log(`[Next.js] Successfully rendering page:`, page.title);

  const sections = page.sections || [];

  return (
    <div className="pt-24 lg:pt-32">
       <BlockRenderer blocks={sections} />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.meta_title || page.title || "Page",
    description: page.meta_description || page.subtitle || "",
  };
}
