import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { FeatureCard } from "./feature-card";
import { FeaturesSection } from "@/lib/types";
import { Home, MapPin, Shield, TrendingUp, Users, Award } from "lucide-react";
import * as Icons from "lucide-react";

interface FeaturesProps {
  data: FeaturesSection;
}

// Helper to resolve icon string to component
const getIcon = (name: string) => {
  const Icon = (Icons as any)[name];
  return Icon ? <Icon className="w-6 h-6" /> : <Home className="w-6 h-6" />;
};

export function Features({ data }: FeaturesProps) {
  const features = data.features || [];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
      <Container>
        <SectionHeading
          title={data.title}
          subtitle={data.subtitle}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FeatureCard
                icon={getIcon(feature.icon)}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
