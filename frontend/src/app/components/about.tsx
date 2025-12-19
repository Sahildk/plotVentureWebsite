import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { getStrapiImageUrl } from "@/lib/strapi";

interface AboutProps {
  data: AboutSection;
}

export function About({ data }: AboutProps) {
  const imageUrl = data.image 
    ? getStrapiImageUrl(data.image)
    : "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80";

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal/5 to-transparent" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-fade-in-up">
            {data.badge && (
              <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-semibold">
                {data.badge}
              </div>
            )}
            <h2 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              {data.title}
            </h2>
            <div 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.content }} 
            />
            <div className="flex flex-wrap gap-4">
              {data.buttons?.map((button) => (
                <Link key={button.id} href={button.url}>
                  <Button 
                    size="lg" 
                    variant={button.variant === "outline" ? "outline" : "default"}
                    className={
                      button.variant === "outline"
                      ? "border-2 border-gray-300 hover:border-gold text-gray-700 hover:text-gold text-lg px-8 py-7 rounded-full transition-all duration-300 hover:scale-105"
                      : "bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-white text-lg px-8 py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    }
                  >
                    {button.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group shadow-2xl">
            <Image
              src={imageUrl}
              alt={data.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Floating badge for stats if any */}
            {data.stats && data.stats.length > 0 && (
              <div className="absolute bottom-8 left-8 right-8 glass-dark rounded-2xl p-6 backdrop-blur-md border border-white/20">
                <div className="flex items-center justify-between">
                  {data.stats.map((stat) => (
                    <div key={stat.id}>
                      <p className="text-white/80 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.number}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
