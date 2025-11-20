import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === href;
    return location.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center space-x-3 hover-elevate transition-all rounded-md px-2 py-1" data-testid="link-home">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xl">
              L
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight">languBridge</span>
              <span className="text-xs text-muted-foreground leading-tight">Education Centre</span>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-foreground"
                }`}
                data-testid={`link-${link.label.toLowerCase()}`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <Link href="/contact">
            <Button data-testid="button-apply" aria-label="Apply for study abroad program">Apply Now</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover-elevate rounded-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          data-testid="button-menu-toggle"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="absolute top-20 left-0 right-0 bg-background border-b md:hidden shadow-lg" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-4 p-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive(link.href) ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
              <Link href="/contact">
                <Button className="w-full" onClick={() => setIsOpen(false)} data-testid="button-mobile-apply" aria-label="Apply for study abroad program">
                  Apply Now
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </nav>
  );
}
