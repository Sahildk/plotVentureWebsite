import { Container } from "../components/container";
import { SectionHeading } from "../components/section-heading";
import { ContactForm } from "../components/contact-form";
import { getPage, getSiteSettings } from "@/lib/strapi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { formatPhone, getEmailLink, getWhatsAppLink } from "@/lib/helpers";

export default async function ContactPage() {
  const page = await getPage("contact");
  const settings = await getSiteSettings();
  
  const title = page?.attributes?.title || "Contact Us";
  const subtitle = page?.attributes?.subtitle || "Get in touch with our team";

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <div className="inline-block mb-6 px-4 py-2 glass-dark rounded-full text-sm font-medium text-gold border border-gold/30 backdrop-blur-md">
              Let's Connect
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">{title}</h1>
            {subtitle && (
              <p className="text-xl md:text-2xl text-teal-100 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Information Cards */}
            {settings?.contact_phone && (
              <Card className="border-0 shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal/10 to-teal/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7 text-teal" />
                  </div>
                  <CardTitle className="text-xl font-display">Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={`tel:${settings.contact_phone}`}
                    className="text-lg text-gray-700 hover:text-teal transition-colors font-medium"
                  >
                    {formatPhone(settings.contact_phone)}
                  </a>
                </CardContent>
              </Card>
            )}

            {settings?.contact_email && (
              <Card className="border-0 shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/10 to-gold/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-7 h-7 text-gold" />
                  </div>
                  <CardTitle className="text-xl font-display">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={getEmailLink(settings.contact_email)}
                    className="text-lg text-gray-700 hover:text-gold transition-colors font-medium break-all"
                  >
                    {settings.contact_email}
                  </a>
                </CardContent>
              </Card>
            )}

            {settings?.whatsapp_number && (
              <Card className="border-0 shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <CardTitle className="text-xl font-display">WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={getWhatsAppLink(settings.whatsapp_number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-gray-700 hover:text-green-600 transition-colors font-medium"
                  >
                    {formatPhone(settings.whatsapp_number)}
                  </a>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="mb-8">
                <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-semibold">
                  Send Message
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Get In Touch
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              <Card className="border-0 shadow-soft p-8">
                <ContactForm
                  whatsappNumber={settings?.whatsapp_number}
                  email={settings?.contact_email}
                />
              </Card>
            </div>

            {/* Additional Information */}
            <div className="space-y-8">
              <Card className="border-0 shadow-soft p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Office Address</h3>
                    <p className="text-gray-600">
                      123 Real Estate Avenue<br />
                      City Center, Country 12345
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-soft p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Business Hours</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-gold/10 p-8 border border-teal/20">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  Why Choose Us?
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1">✓</span>
                    <span>Expert real estate consultants</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1">✓</span>
                    <span>Quick response time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1">✓</span>
                    <span>Free property consultation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1">✓</span>
                    <span>Flexible viewing schedules</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
