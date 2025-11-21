import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function getIsActive(location: string, href: string) {
  if (href === "/") return location === href;
  return location.startsWith(href);
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <nav
        role="navigation"
        aria-label="Primary navigation"
        className="h-20 w-full"
      >
        <div className="h-full w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo - Left */}
          <Link href="/">
            <a
              className="flex items-center space-x-3 hover-elevate transition-all rounded-md px-2 py-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              data-testid="link-home"
              aria-label="languBridge Education Centre - Home"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xl">
                L
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight">languBridge</span>
                <span className="text-xs text-muted-foreground leading-tight">
                  Education Centre
                </span>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div
            className="hidden lg:flex items-center justify-center space-x-8 flex-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = getIsActive(location, link.href);
              return (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`text-sm font-medium transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-3 py-2 ${
                      isActive
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                    data-testid={`link-${link.label.toLowerCase()}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button - Right */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact">
              <Button
                data-testid="button-apply"
                aria-label="Apply for study abroad program"
              >
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle - Right */}
          <div className="lg:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 hover-elevate rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label="Toggle navigation menu"
                  aria-expanded={isOpen}
                  aria-controls="mobile-navigation"
                  data-testid="button-menu-toggle"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-3/4 sm:max-w-sm"
                id="mobile-navigation"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => {
                    const isActive = getIsActive(location, link.href);
                    return (
                      <SheetClose key={link.href} asChild>
                        <Link href={link.href}>
                          <a
                            className={`text-lg font-medium transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-3 py-2 ${
                              isActive
                                ? "text-primary"
                                : "text-foreground"
                            }`}
                            onClick={() => setIsOpen(false)}
                            data-testid={`link-mobile-${link.label.toLowerCase()}`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {link.label}
                          </a>
                        </Link>
                      </SheetClose>
                    );
                  })}
                  <SheetClose asChild>
                    <Link href="/contact">
                      <Button
                        className="w-full mt-4"
                        onClick={() => setIsOpen(false)}
                        data-testid="button-mobile-apply"
                        aria-label="Apply for study abroad program"
                      >
                        Apply Now
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
