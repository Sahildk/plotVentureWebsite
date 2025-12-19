import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Stats } from "./components/stats";
import { CTA } from "./components/cta";
import { HeroSection, FeaturesSection, AboutSection, StatsSection, CTASection } from "@/lib/types";

export default async function HomePage() {
  // Hardcoded Data to restore original look
  
  const heroData: HeroSection = {
    __component: "sections.hero",
    id: 0,
    title: "Welcome to Plot Venture",
    subtitle: "Your Dream Home Awaits",
    image: {
      id: 0,
      url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
      width: 1973,
      height: 1200
    },
    buttons: [
      { id: 1, label: "Book a Site Visit", url: "/contact", variant: "primary", is_external: false },
      { id: 2, label: "Learn More", url: "/about", variant: "outline", is_external: false }
    ]
  };

  const featuresData: FeaturesSection = {
    __component: "sections.features",
    id: 0,
    title: "Why Choose Plot Venture",
    subtitle: "Discover the advantages of investing with us",
    features: [
      { id: 1, title: "Premium Locations", description: "Strategically located in prime areas with excellent connectivity and amenities.", icon: "Home" },
      { id: 2, title: "Secure Investment", description: "Trusted developer with a proven track record of successful projects.", icon: "Shield" },
      { id: 3, title: "High Returns", description: "Invest in properties with exceptional growth potential and value appreciation.", icon: "TrendingUp" },
      { id: 4, title: "Prime Location", description: "Close to schools, hospitals, shopping centers, and major business districts.", icon: "MapPin" },
      { id: 5, title: "Community Living", description: "Experience a vibrant community with modern amenities and facilities.", icon: "Users" },
      { id: 6, title: "Quality Assurance", description: "Built with premium materials and attention to detail in every aspect.", icon: "Award" }
    ]
  };

  const aboutData: AboutSection = {
    __component: "sections.about",
    id: 0,
    badge: "About Us",
    title: "Crafting Exceptional Living Spaces",
    content: "Plot Venture is a leading real estate developer committed to creating exceptional living spaces. With years of experience and a passion for excellence, we deliver premium properties that exceed expectations.",
    image: {
      id: 0,
      url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
      width: 2076,
      height: 1200
    },
    stats: [
        { id: 1, label: "Success Rate", number: "98%" },
        { id: 2, label: "Projects", number: "500+" }
    ],
    buttons: [
      { id: 1, label: "Learn More", url: "/about", variant: "primary", is_external: false },
      { id: 2, label: "View Gallery", url: "/gallery", variant: "outline", is_external: false }
    ]
  };

  const statsData: StatsSection = {
    __component: "sections.stats",
    id: 0,
    stats: [
      { id: 1, number: "500+", label: "Happy Clients" },
      { id: 2, number: "98%", label: "Satisfaction Rate" },
      { id: 3, number: "25+", label: "Years Experience" },
      { id: 4, number: "50+", label: "Awards Won" }
    ]
  };

  const ctaData: CTASection = {
    __component: "sections.cta",
    id: 0,
    badge: "Get Started Today",
    title: "Ready to Find Your Dream Home?",
    description: "Schedule a site visit today and experience the Plot Venture difference. Our team is ready to help you find the perfect property.",
    buttons: [
      { id: 1, label: "Book a Site Visit", url: "/contact", variant: "primary", is_external: false },
      { id: 2, label: "Explore Location", url: "/location", variant: "outline", is_external: false }
    ]
  };

  return (
    <>
      <Hero data={heroData} />
      <Features data={featuresData} />
      <About data={aboutData} />
      <Stats data={statsData} />
      <CTA data={ctaData} />
    </>
  );
}
