import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/lib/types";
import Link from "next/link";

interface CTAProps {
  data: CTASection;
}

export function CTA({ data }: CTAProps) {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {data.badge && (
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-semibold">
              {data.badge}
            </div>
          )}
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-gray-900">
            {data.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {data.buttons?.map((button) => (
              <Link key={button.id} href={button.url}>
                <Button 
                  size="lg" 
                  variant={button.variant === "outline" ? "outline" : "default"}
                  className={
                    button.variant === "outline"
                    ? "border-2 border-gray-300 hover:border-teal text-gray-700 hover:text-teal hover:bg-teal/5 font-semibold text-lg px-12 py-8 rounded-full transition-all duration-300 hover:scale-105"
                    : "group relative bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black font-bold text-lg px-12 py-8 rounded-full shadow-glow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 overflow-hidden"
                  }
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {button.label}
                    {button.variant !== "outline" && (
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    )}
                  </span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
