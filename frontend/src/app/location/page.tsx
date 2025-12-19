import { Container } from "../components/container";
import { SectionHeading } from "../components/section-heading";
import { getPage, getSiteSettings } from "@/lib/strapi";
import { MapPin, School, Heart, ShoppingBag, Bus } from "lucide-react";

// Force dynamic rendering to ensure CMS updates are reflected immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LocationPage() {
  const page = await getPage("location");
  const settings = await getSiteSettings();
  
  const title = page?.title || "Location";
  const subtitle = page?.subtitle || "Prime Location, Perfect Connectivity";
  const content = page?.content || `
    <p>Our development is strategically located in one of the most sought-after areas, offering excellent connectivity and access to all essential amenities.</p>
    <p>The location provides easy access to major highways, business districts, educational institutions, healthcare facilities, and entertainment centers.</p>
  `;
  
  const googleMapsEmbed = settings?.google_maps_embed || "";

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse" />
        </div>
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <div className="inline-block mb-6 px-4 py-2 glass-dark rounded-full text-sm font-medium text-gold border border-gold/30 backdrop-blur-md">
              Prime Location
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">{title}</h1>
            {subtitle && (
              <p className="text-xl md:text-2xl text-teal-100 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-4xl mx-auto mb-16">
            <div
              className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <SectionHeading
            title="Find Us"
            subtitle="Visit us at our location"
          />
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
            {googleMapsEmbed ? (
              <div
                className="w-full h-[500px] md:h-[600px]"
                dangerouslySetInnerHTML={{ __html: googleMapsEmbed }}
              />
            ) : (
              <div className="w-full h-[500px] md:h-[600px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                <MapPin className="w-24 h-24 text-gray-400" />
                <p className="absolute bottom-8 text-gray-500">Google Maps embed will appear here</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Nearby Amenities */}
      <section className="section-padding bg-white relative overflow-hidden">
        <Container>
          <SectionHeading
            title="Nearby Amenities"
            subtitle="Everything you need is just minutes away"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: School, 
                title: "Schools", 
                description: "Top-rated educational institutions within 5km",
                bgClass: "bg-gradient-to-br from-teal-500/10 to-teal-600/20",
                iconClass: "text-teal-600"
              },
              { 
                icon: Heart, 
                title: "Hospitals", 
                description: "Leading healthcare facilities nearby",
                bgClass: "bg-gradient-to-br from-red-500/10 to-red-600/20",
                iconClass: "text-red-600"
              },
              { 
                icon: ShoppingBag, 
                title: "Shopping", 
                description: "Modern malls and retail centers",
                bgClass: "bg-gradient-to-br from-purple-500/10 to-purple-600/20",
                iconClass: "text-purple-600"
              },
              { 
                icon: Bus, 
                title: "Transport", 
                description: "Easy access to public transportation",
                bgClass: "bg-gradient-to-br from-green-500/10 to-green-600/20",
                iconClass: "text-green-600"
              },
            ].map((amenity, index) => (
              <div 
                key={index} 
                className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-xl ${amenity.bgClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <amenity.icon className={`w-7 h-7 ${amenity.iconClass}`} />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2 group-hover:text-gold transition-colors">
                  {amenity.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{amenity.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
