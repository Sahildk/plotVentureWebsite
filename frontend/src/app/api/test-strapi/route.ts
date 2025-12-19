import { NextResponse } from "next/server";
import { getAllPages, getPage } from "@/lib/strapi";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  // Debug: Log environment variable
  const strapiUrl = process.env.STRAPI_URL || "http://localhost:1337";
  
  try {
    if (slug) {
      // Test fetching a specific page
      const page = await getPage(slug);
      return NextResponse.json({
        success: true,
        slug,
        strapiUrl,
        page: page ? {
          id: page.id,
          slug: page.slug,
          title: page.title,
          published: !!page.publishedAt,
        } : null,
      });
    } else {
      // Test fetching all pages
      const pages = await getAllPages();
      return NextResponse.json({
        success: true,
        strapiUrl,
        count: pages.length,
        pages: pages.map((page) => ({
          id: page.id,
          slug: page.slug,
          title: page.title,
          published: !!page.publishedAt,
        })),
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

