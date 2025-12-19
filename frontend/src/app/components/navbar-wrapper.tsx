import { Navbar } from "./navbar";
import { getSiteSettings, getStrapiImageUrl, getNavbarPages } from "@/lib/strapi";

export async function NavbarWrapper() {
  const settings = await getSiteSettings();
  const logoUrl = settings?.logo 
    ? getStrapiImageUrl(settings.logo) 
    : "/logo.png";

  // Fetch pages that should appear in navbar
  const navbarPages = await getNavbarPages();

  return <Navbar logoUrl={logoUrl} dynamicPages={navbarPages} />;
}











