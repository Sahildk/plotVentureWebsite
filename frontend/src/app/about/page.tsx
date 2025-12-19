import { Container } from "../components/container";
import { SectionHeading } from "../components/section-heading";
import { getPage, getStrapiImageUrl } from "@/lib/strapi";
import Image from "next/image";

// Force dynamic rendering to ensure CMS updates are reflected immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AboutPage() {
  const page = await getPage("about");
  
  const title = page?.title || "About Plot Venture";
  const subtitle = page?.subtitle || "Building Dreams, Creating Communities";
  const content = page?.content || `
    <p>Plot Venture is a leading real estate development company with a vision to create exceptional living spaces that combine luxury, comfort, and sustainability.</p>
    <p>With years of experience in the industry, we have successfully delivered numerous projects that have transformed communities and enriched lives.</p>
    <p>Our commitment to quality, innovation, and customer satisfaction sets us apart in the real estate market.</p>
  `;
  
  const heroImage = page?.hero_image
    ? getStrapiImageUrl(page.hero_image)
    : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover scale-105"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70" />
        </div>
        <Container className="relative z-10 py-20">
          <div className="text-center text-white max-w-4xl mx-auto animate-fade-in-up">
            <div className="inline-block mb-6 px-4 py-2 glass-dark rounded-full text-sm font-medium text-gold border border-gold/30 backdrop-blur-md">
              Our Story
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">{title}</h1>
            {subtitle && (
              <p className="text-xl md:text-2xl text-gray-200">{subtitle}</p>
            )}
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group shadow-2xl">
              <Image
                src={heroImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="space-y-6">
              <div
                className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <Container>
          <SectionHeading
            title="Our Core Values"
            subtitle="What drives us forward every day"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We strive for excellence in every project, ensuring the highest standards of quality and craftsmanship.",
                icon: "✨",
              },
              {
                title: "Integrity",
                description: "We conduct our business with honesty, transparency, and ethical practices.",
                icon: "🤝",
              },
              {
                title: "Innovation",
                description: "We embrace innovative design and technology to create sustainable and modern living spaces.",
                icon: "💡",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 group-hover:text-gold transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
