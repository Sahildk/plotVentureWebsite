export interface StrapiImageData {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export interface StrapiImage {
  // Strapi v5 often returns the image object directly or in a wrapper depending on populate
  // But based on observation, let's support the flat structure primarily
  // However, for consistency with our previous strict typing, let's see.
  // In v5, a single media field is usually an object.
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

// Helper to handle the potential lack of 'data' wrapper in v5 response for single types
// or keeping it if the API still uses it for lists.
// Observations: API returns { data: [ { id, ...fields } ] } for lists.
// For single relation, it might return { id, ...fields } directly or null.

export interface Link {
  id: number;
  label: string;
  url: string;
  variant: "primary" | "secondary" | "outline";
  is_external: boolean;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  id: number;
  number: string;
  label: string;
}

export interface HeroSection {
  __component: "sections.hero";
  id: number;
  badge?: string;
  title: string;
  subtitle: string;
  image: StrapiImage | null;
  buttons: Link[];
}

export interface FeaturesSection {
  __component: "sections.features";
  id: number;
  title: string;
  subtitle: string;
  features: Feature[];
}

export interface AboutSection {
  __component: "sections.about";
  id: number;
  badge: string;
  title: string;
  content: string; // rich text
  image: StrapiImage | null;
  stats: Stat[];
  buttons: Link[];
}

export interface StatsSection {
  __component: "sections.stats";
  id: number;
  stats: Stat[];
}

export interface CTASection {
  __component: "sections.cta";
  id: number;
  badge: string;
  title: string;
  description: string;
  buttons: Link[];
}

export type PageSection = 
  | HeroSection 
  | FeaturesSection 
  | AboutSection 
  | StatsSection 
  | CTASection;

export interface Page {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string; // Added missing field
  description?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sections: PageSection[];
  meta_title?: string;
  meta_description?: string;
  show_in_navbar?: boolean;
  nav_order?: number;
  nav_label?: string;
  // Legacy support for hero_image until fully migrated
  hero_image?: StrapiImage | null;
  content?: string; // Rich text for pages that don't use sections yet
}

export interface GalleryImage {
  id: number;
  documentId: string;
  name: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logo: StrapiImage | null;
}
