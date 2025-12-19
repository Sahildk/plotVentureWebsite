import { Container } from "../components/container";
import { SectionHeading } from "../components/section-heading";
import { GalleryGrid } from "../components/gallery-grid";
import { getGalleryImages } from "@/lib/strapi";

// Force dynamic rendering to ensure CMS updates are reflected immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse" />
        </div>
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <div className="inline-block mb-6 px-4 py-2 glass-dark rounded-full text-sm font-medium text-gold border border-gold/30 backdrop-blur-md">
              Visual Showcase
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Gallery
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-2xl mx-auto">
              Explore our beautiful properties and developments through stunning
              photography
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
        <Container>
          <GalleryGrid images={images} />
        </Container>
      </section>
    </div>
  );
}
