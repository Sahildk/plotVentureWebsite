import { Container } from "./container";
import {
  getSiteSettings,
  getStrapiImageUrl,
  getNavbarPages,
} from "@/lib/strapi";
import { formatPhone, getEmailLink, getWhatsAppLink } from "@/lib/helpers";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export async function Footer() {
  const settings = await getSiteSettings();
  const navbarPages = await getNavbarPages();
  const logoUrl = settings?.logo
    ? getStrapiImageUrl(settings.logo)
    : "/logo.png";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-600 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="relative h-12 w-32 mb-6">
              <Image
                src={logoUrl}
                alt="Plot Venture Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {settings?.siteDescription || "Premium real estate development for your dream home. Building exceptional living spaces since 1999."}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                  aria-label={social.icon.name}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {/* Static links (always visible) */}
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  Location
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  Contact
                </Link>
              </li>

              {/* Dynamic links from Strapi (extra pages) */}
              {navbarPages
                .filter((page) => {
                  const slug = page.slug?.toLowerCase() || "";
                  const staticSlugs = [
                    "",
                    "about",
                    "location",
                    "gallery",
                    "contact",
                  ];
                  return !staticSlugs.includes(slug) && page.show_in_navbar && page.publishedAt;
                })
                .map((page) => (
                  <li key={page.id}>
                    <Link
                      href={`/${page.slug}`}
                      className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                    >
                       <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                      {page.nav_label || page.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {[
                "Property Sales",
                "Property Management",
                "Investment Consultation",
                "Site Visits",
                "Legal Assistance",
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group cursor-pointer">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              {settings?.contactPhone && (
                <li>
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="hover:text-gold transition-colors duration-300 flex items-start gap-3 group"
                  >
                    <Phone className="w-5 h-5 text-gold mt-0.5 group-hover:scale-110 transition-transform" />
                    <span>{formatPhone(settings.contactPhone)}</span>
                  </a>
                </li>
              )}
              {settings?.contactEmail && (
                <li>
                  <a
                    href={getEmailLink(settings.contactEmail)}
                    className="hover:text-gold transition-colors duration-300 flex items-start gap-3 group"
                  >
                    <Mail className="w-5 h-5 text-gold mt-0.5 group-hover:scale-110 transition-transform" />
                    <span>{settings.contactEmail}</span>
                  </a>
                </li>
              )}
               {/* Note: whatsapp_number is not in new SiteSettings type yet, but logic is fine to omit if undefined */}
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-0.5" />
                <span>{settings?.address || "123 Real Estate Avenue, City Center, Country"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 pb-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Plot Venture. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link
                href="#"
                className="hover:text-gold transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-gold transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="hover:text-gold transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
