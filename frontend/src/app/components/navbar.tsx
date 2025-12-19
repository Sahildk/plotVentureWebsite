"use client";

import Link from "next/link";
import { Container } from "./container";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Page } from "@/lib/types";

interface NavbarProps {
  logoUrl?: string;
  dynamicPages?: Page[];
}

export function Navbar({ logoUrl = "https://via.placeholder.com/192x48/1E3A8A/FFFFFF?text=Plot+Venture", dynamicPages = [] }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Home page has dark hero, so navbar can be transparent initially
  // Other pages start with light backgrounds, so navbar should have background from start
  const isHomePage = pathname === "/";
  const shouldShowTransparent = isHomePage && !scrolled;

  useEffect(() => {
    // On non-home pages, start with scrolled state
    if (!isHomePage) {
      setScrolled(true);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Only listen to scroll on home page, or always listen but handle differently
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Static links that always appear (these are the basic pages)
  const staticLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/location", label: "Location" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  // Dynamic links from Strapi CMS (additional pages)
  const dynamicLinks = (dynamicPages || [])
    .filter(page => {
      // Only include if it's not already a static route
      const slug = page.slug;
      const staticSlugs = ['about', 'location', 'gallery', 'contact'];
      return (
        page.show_in_navbar && 
        page.publishedAt &&
        !staticSlugs.includes(slug?.toLowerCase() || '')
      );
    })
    .map(page => ({
      href: `/${page.slug}`,
      label: page.nav_label || page.title || page.slug,
    }));

  // Combine static and dynamic links
  const navLinks = [...staticLinks, ...dynamicLinks];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      shouldShowTransparent
        ? "bg-transparent"
        : "glass-dark shadow-lg backdrop-blur-xl bg-white/90"
    }`}>
      <Container>
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link href="/" className="flex items-center group">
            <div className={`relative h-10 w-40 lg:h-12 lg:w-48 transition-transform duration-300 group-hover:scale-105`}>
              <Image
                src={logoUrl}
                alt="Plot Venture Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  shouldShowTransparent
                    ? "text-white hover:text-gold"
                    : "text-gray-800 hover:text-gold hover:bg-gold/10"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {!shouldShowTransparent && (
                  <span className="absolute inset-0 bg-gold/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
            ))}
          </div>

          <Link 
            href="/contact"
            className={`hidden lg:block px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
              shouldShowTransparent
                ? "glass border border-gold/30 text-gold hover:bg-gold/10"
                : "bg-gold text-black hover:bg-gold-dark hover:shadow-glow"
            }`}
          >
            Get Started
          </Link>

          <div className="lg:hidden relative">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                shouldShowTransparent 
                  ? "text-white hover:bg-white/10" 
                  : "text-gray-800 hover:bg-gray-100"
              }`}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              )}
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  style={{ top: '80px' }}
                  onClick={() => setMobileMenuOpen(false)}
                />
                
                {/* Menu Dropdown */}
                <div className="fixed left-0 right-0 z-50 bg-white shadow-xl border-t border-gray-200 animate-slide-down" style={{ top: '80px' }}>
                  <div className="px-4 py-6 space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          pathname === link.href
                            ? "bg-gold/10 text-gold"
                            : "text-gray-800 hover:bg-gold/10 hover:text-gold"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block mt-4 px-6 py-3 rounded-full bg-gold text-black font-semibold text-center hover:bg-gold-dark transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}
