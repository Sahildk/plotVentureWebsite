import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return "";
  return phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

/**
 * Generate WhatsApp link
 */
export function getWhatsAppLink(phone: string | null | undefined, message: string = ""): string {
  if (!phone) return "#";
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ""}`;
}

/**
 * Generate email link
 */
export function getEmailLink(email: string | null | undefined, subject: string = "", body: string = ""): string {
  if (!email) return "#";
  const params = new URLSearchParams();
  if (subject) params.append("subject", subject);
  if (body) params.append("body", body);
  return `mailto:${email}${params.toString() ? `?${params.toString()}` : ""}`;
}

/**
 * Get Strapi image URL (for client components)
 */
export function getImageUrl(url: string | null | undefined): string {
  if (!url) return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  if (url.startsWith("http")) return url;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return `${strapiUrl}${url}`;
}

