import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { getStrapiImageUrl } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/lib/types";

interface HeroProps {
  data: HeroSection;
}

export function Hero({ data }: HeroProps) {
  const heroImage = data.image
    ? getStrapiImageUrl(data.image)
    : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80";
  
  const title = data.title || "Welcome to Plot Venture";
  const subtitle = data.subtitle || "Your Dream Home Awaits";
  const buttons = data.buttons || [];

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-0">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover scale-105 transition-transform duration-[20s] ease-out"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white animate-fade-in-up">
          {data.badge && (
            <div className="inline-block mb-6 px-4 py-2 glass-dark rounded-full text-sm font-medium text-gold border border-gold/30 backdrop-blur-md">
              {data.badge}
            </div>
          )}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[1.1] tracking-tight text-balance " style={{ fontFamily: "Times New Roman" }}>
            <span className="block bg-gradient-to-r from-white via-gold-100 to-white bg-clip-text text-transparent">
              Welcome to
            </span>
            <span className="block bg-gradient-to-r from-white via-gold-100 to-white bg-clip-text text-transparent">
              Plot Venture
            </span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-gray-200 font-light max-w-2xl mx-auto leading-relaxed text-balance">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {buttons.map((button) => (
              <Link key={button.id} href={button.url}>
                <Button 
                  size="lg" 
                  variant={button.variant === "outline" ? "outline" : "default"}
                  className={
                    button.variant === "outline" 
                    ? "glass border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-10 py-7 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
                    : "group relative bg-gold hover:bg-gold-dark text-black font-semibold text-lg px-10 py-7 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
                  }
                >
                   {button.variant !== "outline" && <span className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                   <span className="relative z-10">{button.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
