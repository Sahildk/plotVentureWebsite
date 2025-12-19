import { Page, SiteSettings, GalleryImage, StrapiImage, StrapiImageData } from "./types";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

/**
 * Fetch page by slug from Strapi
 */
export async function getPage(slug: string): Promise<Page | null> {
  try {
    // First, try to fetch all pages to see what we get
    // Construct populate query manually since we don't have qs
    // We need to populate the sections dynamic zone and its nested components (images, buttons, etc.)
    // Construct populate query manually since we don't have qs
    // Use wildcard populate for the dynamic zone to ensure all components are fetched
    const populateQuery = "populate[sections][populate]=*";

    const url = `${STRAPI_URL}/api/pages?filters[slug][$eq]=${slug}&${populateQuery}`;
    
      console.log(`[Strapi] Fetching page with slug: "${slug}"`);
      console.log(`[Strapi] API URL: ${url}`);
    
    // Always log in production too for debugging this issue
    console.log(`[Strapi DEBUG] Fetching URL: ${url}`);

    const res = await fetch(url, { 
      next: { revalidate: 0 }, // Disable cache temporarily
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', 
    });

    if (!res.ok) {
      console.error(`[Strapi] Failed to fetch page: ${res.status} ${res.statusText}`);
      const errorText = await res.text();
      console.error(`[Strapi] Error response:`, errorText);
      return null;
    }

    const json = await res.json();
    
    // Debug: log the response structure
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Strapi] Response status: ${res.status}`);
      console.log(`[Strapi] Response data:`, JSON.stringify(json, null, 2));
      console.log(`[Strapi] Data array length:`, json.data?.length || 0);
    }
    
    // Handle both array and single object responses
    let page: Page | null = null;
    if (Array.isArray(json.data)) {
      // Filter for published pages only - Strapi v5 returns flat objects in data array
      page = json.data.find((p: Page) => p.publishedAt) || json.data[0] || null;
    } else if (json.data) {
      page = json.data;
    }
    
    if (!page) {
      console.warn(`[Strapi] No page found with slug: "${slug}"`);
      console.warn(`[Strapi] Available pages:`, json.data?.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        published: !!p.publishedAt
      })) || []);
      return null;
    }
    
    // In Strapi v5, attributes are merged into the object
    // Check if page is published
    if (!page.publishedAt) {
      console.warn(`[Strapi] Page "${slug}" exists but is not published`);
      return null;
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Strapi] Successfully found page:`, {
        id: page.id,
        slug: page.slug,
        title: page.title,
        published: !!page.publishedAt
      });
    }
    
    return page;
  } catch (error) {
    console.error("[Strapi] Error fetching page:", error);
    if (error instanceof Error) {
      console.error("[Strapi] Error message:", error.message);
      console.error("[Strapi] Error stack:", error.stack);
    }
    return null;
  }
}

/**
 * Fetch all published pages from Strapi (for debugging/verification)
 */
export async function getAllPages(): Promise<Page[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/pages?populate=*&sort=nav_order:asc`,
      {
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch pages: ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    // Filter for published pages only
    return (json.data || []).filter((page: Page) => page.publishedAt) || [];
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

/**
 * Fetch pages that should appear in navbar
 */
export async function getNavbarPages(): Promise<Page[]> {
  try {
    // Fetch all published pages, then filter client-side for better compatibility
    console.log(`[Strapi DEBUG] Fetching navbar pages from: ${STRAPI_URL}/api/pages?populate=*&sort=nav_order:asc`);
    const res = await fetch(
      `${STRAPI_URL}/api/pages?populate=*&sort=nav_order:asc`,
      {
        next: { revalidate: 0 },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      console.error(`[Strapi ERROR] Failed to fetch navbar pages: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    
    // Filter for published pages that should show in navbar, then sort by nav_order
    const pages = (json.data || [])
      .filter((page: Page) => {
        return (
          page.publishedAt && 
          page.show_in_navbar === true
        );
      })
      .sort((a: Page, b: Page) => {
        const orderA = a.nav_order ?? 999;
        const orderB = b.nav_order ?? 999;
        return orderA - orderB;
      });
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Strapi] Found ${pages.length} pages for navbar:`, 
        pages.map((p: Page) => ({ slug: p.slug, label: p.nav_label || p.title, order: p.nav_order }))
      );
    }
    
    return pages;
  } catch (error) {
    console.error("Error fetching navbar pages:", error);
    return [];
  }
}

/**
 * Fetch all gallery images from Strapi
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/gallery?populate=images`,
      {
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch gallery: ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    return json.data?.images || []; // v5 likely returns images directly
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
}

/**
 * Fetch site settings from Strapi
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/site-settings?populate=*`,
      {
        next: { revalidate: 300 },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch site settings: ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

/**
 * Get image URL from Strapi image object
 */
/**
 * Get image URL from Strapi image object
 */
export function getStrapiImageUrl(image: StrapiImage | null | undefined): string {
  if (!image?.url) {
    return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }
  
  const url = image.url;
  if (url.startsWith("http")) {
    return url;
  }
  
  return `${STRAPI_URL}${url}`;
}

