import { cn } from "@/lib/helpers";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeading({ title, subtitle, className, align = "center" }: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("mb-16 md:mb-20", alignClasses[align], className)}>
      <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-semibold">
        Featured
      </div>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      <div className="mt-8 w-24 h-1 bg-gradient-to-r from-gold to-teal mx-auto rounded-full" />
    </div>
  );
}
