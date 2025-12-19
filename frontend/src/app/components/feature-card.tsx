import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  index?: number;
}

export function FeatureCard({ icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden border-0 bg-white shadow-soft hover:shadow-xl transition-all duration-500 rounded-2xl hover:-translate-y-2">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/20 transition-colors duration-500" />
      
      <CardHeader className="relative z-10 pb-4">
        <div className="mb-4 w-14 h-14 rounded-xl bg-gradient-to-br from-gold/10 to-teal/10 flex items-center justify-center text-gold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
        <CardTitle className="text-2xl font-display font-bold text-gray-900 group-hover:text-gold transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className="text-base text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
}
