import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, ShieldCheck, Sparkles, HeadphonesIcon } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import tokyoHero from "@assets/generated_images/Students_in_Tokyo_hero_366c34fa.png";

export default function Hero() {
  return (
    <section
      role="banner"
      aria-label="Hero introduction with call to action"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={tokyoHero}
          alt="Students studying abroad in Tokyo"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 text-center md:text-left">
        <div className="max-w-4xl space-y-8">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Badge className="bg-white/10 text-white border border-white/30 uppercase text-xs tracking-[0.3em]">
              <Globe className="h-3.5 w-3.5" />
              Study Abroad 2025
            </Badge>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
            Your Global Education Journey Starts Here
          </h1>

          <p className="text-xl md:text-2xl leading-relaxed text-white/90">
            Language immersion, cultural mentorship, and professional development
            tailored to ambitious students who want more than just a semester abroad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/programs">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl shadow-2xl shadow-primary/40"
                data-testid="button-explore-programs"
              >
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 rounded-2xl border-white/80 text-white hover:border-white hover:bg-white/10"
                data-testid="button-book-consultation"
              >
                Book Free Consultation
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-white/80">
            <div className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-white" />
              Personalized program matching
            </div>
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-white" />
              Safety-first placements
            </div>
            <div className="inline-flex items-center gap-2">
              <HeadphonesIcon className="h-4 w-4 text-white" />
              Counselors on call 24/7
            </div>
          </div>
        </div>
      </div>

      {/* Grounded gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
