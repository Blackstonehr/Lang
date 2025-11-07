import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

const defaultTitle = "languBridge Education Centre - Study Abroad Programs";
const defaultDescription = "Transform your future through international education. Explore study abroad programs in Asia, Europe, and beyond. Expert guidance, curated programs, and 24/7 support.";
const defaultImage = "/assets/Students_in_Tokyo_hero_366c34fa.png";
const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://langubridge.org";

export default function SEO({
  title = defaultTitle,
  description = defaultDescription,
  image = defaultImage,
  url = typeof window !== "undefined" ? window.location.href : siteUrl,
  type = "website",
  keywords = "study abroad, international education, study in Japan, study in Korea, study in Europe, language immersion, cultural exchange, study abroad programs",
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph tags
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", image.startsWith("http") ? image : `${siteUrl}${image}`, "property");
    updateMetaTag("og:url", url, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:site_name", "languBridge Education Centre", "property");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image.startsWith("http") ? image : `${siteUrl}${image}`);

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Structured Data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "languBridge Education Centre",
      description: description,
      url: siteUrl,
      logo: `${siteUrl}/favicon.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-555-123-4567",
        contactType: "Customer Service",
        email: "info@langubridge.org",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Education Ave, Suite 100",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10001",
        addressCountry: "US",
      },
    };

    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [title, description, image, url, type, keywords]);

  return null;
}

