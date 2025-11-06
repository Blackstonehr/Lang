import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import ProgramCard from "@/components/ProgramCard";
import Testimonials from "@/components/Testimonials";
import ProcessSteps from "@/components/ProcessSteps";
import SEO from "@/components/SEO";
import { type Program } from "@shared/schema";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Award, HeadphonesIcon } from "lucide-react";

export default function HomePage() {
  const { data: programs, isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs/featured"],
  });

  return (
    <>
      <SEO
        title="languBridge Education Centre - Study Abroad Programs 2025"
        description="Transform your future through international education. Explore study abroad programs in Tokyo, Seoul, Barcelona, and more. Expert guidance, curated programs, and 24/7 support for your study abroad journey."
        keywords="study abroad, international education, study in Japan, study in Korea, study in Spain, Tokyo study abroad, Seoul study abroad, Barcelona study abroad"
      />
      <div className="min-h-screen">
      <Hero />

      {/* Why Choose Us Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
              Why Choose languBridge
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your Success is
              <span className="block text-primary">Our Mission</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive support at every step of your study abroad journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-xl bg-card border hover:shadow-lg transition-shadow" data-testid="benefit-expert">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Guidance</h3>
              <p className="text-muted-foreground">
                Our experienced counselors have helped over 1,200 students achieve their international education dreams.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-card border hover:shadow-lg transition-shadow" data-testid="benefit-programs">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Curated Programs</h3>
              <p className="text-muted-foreground">
                Every program is carefully selected and vetted to ensure quality education and authentic cultural experiences.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-card border hover:shadow-lg transition-shadow" data-testid="benefit-support">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <HeadphonesIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-muted-foreground">
                From application to return home, our team provides round-the-clock support to ensure your safety and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
              Featured Programs
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Popular Study Abroad
              <span className="block text-primary">Destinations for 2025</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our most sought-after programs combining language learning, cultural immersion, and unforgettable experiences.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-card border rounded-xl animate-pulse" data-testid={`skeleton-program-${i}`}></div>
              ))}
            </div>
          ) : programs && programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12" data-testid="no-programs">
              <p className="text-muted-foreground">No programs available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/programs">
              <Button size="lg" className="group" data-testid="button-view-all">
                View All Programs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <ProcessSteps />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Book a free consultation with our education counselors and take the first step toward your international education adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all px-8 py-6 text-lg"
                data-testid="button-cta-contact"
              >
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/programs">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg"
                data-testid="button-cta-programs"
              >
                Browse Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
