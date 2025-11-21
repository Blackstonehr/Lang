import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Programs",
      links: [
        { href: "/programs", label: "All Programs" },
        { href: "/programs?level=high-school", label: "High School" },
        { href: "/programs?level=college", label: "College & University" },
        { href: "/programs?level=18+", label: "Adult Programs" },
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "/contact#faq", label: "FAQs" },
        { href: "/contact", label: "Application Guide" },
        { href: "/contact", label: "Visa Support" },
        { href: "/#testimonials", label: "Testimonials" },
      ]
    },
    {
      title: "Company",
      links: [
        { href: "/contact", label: "About Us" },
        { href: "/contact", label: "Contact" },
        { href: "/contact", label: "Careers" },
        { href: "/contact", label: "Partner Universities" },
      ]
    }
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/">
              <a className="flex items-center space-x-3 mb-4" data-testid="link-footer-home">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xl">
                  L
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold leading-tight">languBridge</span>
                  <span className="text-xs text-muted-foreground leading-tight">Education Centre</span>
                </div>
              </a>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Connecting students with world-class study abroad opportunities. Transform your future through international education experiences.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground" data-testid="contact-email">
                <Mail className="w-4 h-4" />
                <span>info@langubridge.org</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground" data-testid="contact-phone">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground" data-testid="contact-address">
                <MapPin className="w-4 h-4" />
                <span>123 Education Ave, Suite 100</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href}>
                      <a
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
              <p>© {currentYear} languBridge Education Centre. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy">
                  <a className="hover:text-primary transition-colors">Privacy Policy</a>
                </Link>
                <Link href="/terms">
                  <a className="hover:text-primary transition-colors">Terms of Service</a>
                </Link>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
