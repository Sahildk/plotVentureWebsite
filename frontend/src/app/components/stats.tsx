import { Container } from "./container";
import { StatsSection } from "@/lib/types";

interface StatsProps {
  data: StatsSection;
}

export function Stats({ data }: StatsProps) {
  return (
    <section className="section-padding bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <Container className="relative z-10">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12`}>
          {data.stats.map((stat, index) => (
            <div 
              key={stat.id}
              className="text-center animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gold bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-lg text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
