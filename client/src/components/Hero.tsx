import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight } from "lucide-react";
import tokyoHero from "@assets/generated_images/Students_in_Tokyo_hero_366c34fa.png";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={tokyoHero}
          alt="Students studying abroad in Tokyo"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/20" data-testid="text-badge">
            <Globe className="w-4 h-4 mr-2" />
            Study Abroad Programs 2025
          </div>

          {/* Hero Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="text-hero-heading">
            Your Journey to
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Global Education
            </span>
            Starts Here
          </h1>

          {/* Hero Description */}
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-white/90" data-testid="text-hero-description">
            Experience world-class education, immerse yourself in new cultures, and build lifelong connections through our carefully curated study abroad programs in Asia, Europe, and beyond.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/programs">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                data-testid="button-explore-programs"
              >
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-6 text-lg font-semibold rounded-xl border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm bg-white/10"
                data-testid="button-book-consultation"
              >
                Book Free Consultation
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-white/70 mb-6">
              Trusted by students worldwide
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center" data-testid="stat-students">
                <div className="text-3xl font-bold mb-1">1,200+</div>
                <div className="text-sm text-white/70">Students Placed</div>
              </div>
              <div className="text-center" data-testid="stat-countries">
                <div className="text-3xl font-bold mb-1">15+</div>
                <div className="text-sm text-white/70">Countries</div>
              </div>
              <div className="text-center" data-testid="stat-success">
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-sm text-white/70">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
}
