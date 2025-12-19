/**
 * Plan:
 * 1. Refresh the homepage landing layout (hero, benefits, trust metrics, featured programs, CTA) with consistent containers,
 *    spacing, and responsive grids so that the next edits in Hero.tsx, ProcessSteps.tsx, Testimonials.tsx, pages/programs.tsx,
 *    and pages/contact.tsx can align with the same visual direction.
 * 2. Keep the existing API queries and navigation structure untouched while improving typography hierarchy, section rhythms,
 *    and CTA messaging to match the design guidelines.
 */

import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import ProgramCard from "@/components/ProgramCard";
import Testimonials from "@/components/Testimonials";
import ProcessSteps from "@/components/ProcessSteps";
import SEO from "@/components/SEO";
import { type Program } from "@shared/schema";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Globe,
  Award,
  HeadphonesIcon,
  ShieldCheck,
  Sparkles,
  Star
} from "lucide-react";

const benefits = [
  {
    title: "Expert Guidance",
    description:
      "Counselors with decades of study abroad experience simplify applications, visas, and post-departure support.",
    icon: Globe,
    accent: "bg-primary/10 border-primary"
  },
  {
    title: "Curated Programs",
    description:
      "Every program is vetted for quality academics, meaningful cultural immersion, and proven student satisfaction.",
    icon: Award,
    accent: "bg-purple-100 border-[#a855f7]"
  },
  {
    title: "24/7 Support",
    description:
      "We monitor your experience from application through homecoming with multilingual experts on call around the clock.",
    icon: HeadphonesIcon,
    accent: "bg-green-100 border-emerald-400"
  }
];

const metrics = [
  {
    title: "Students Placed",
    value: "1,200+",
    detail: "Across 15+ countries and counting",
    icon: ShieldCheck
  },
  {
    title: "Program Satisfaction",
    value: "98%",
    detail: "Rated highly for safety, academics, and cultural immersion",
    icon: Sparkles
  },
  {
    title: "Advisors On Call",
    value: "35+",
    detail: "Dedicated multilingual counselors helping every cohort",
    icon: Star
  }
];

const partnerLogos = [
  "Tokyo University of Foreign Studies",
  "Seoul Tech International",
  "Barcelona School of Arts",
  "Global STEM Exchange",
  "Pacific Language Alliance"
];

export default function HomePage() {
  const { data: programs, isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs/featured"]
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

        {/* Why Choose Us */}
        <section
          aria-label="Why choose languBridge"
          className="py-16 md:py-24 bg-background"
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Badge className="mx-auto bg-primary/10 text-primary border border-primary/40 uppercase tracking-[0.2em] text-[11px]">
                trusted advisors
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                A premium study abroad experience that prioritizes your
                safety, growth, and confidence.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We pair culturally aware counselors with culturally immersive
                programs, so you spend less time worrying and more time
                discovering new opportunities.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-3xl border border-border bg-card/80 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                >
                  <div
                    className={`inline-flex items-center justify-center rounded-2xl border p-3 text-foreground ${benefit.accent}`}
                  >
                    <benefit.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid gap-6 md:grid-cols-3">
              {metrics.map((metric) => (
                <article
                  key={metric.title}
                  className="rounded-3xl border border-primary/20 bg-gradient-to-br from-white to-white/80 p-6 text-center shadow"
                >
                  <div className="inline-flex items-center justify-center rounded-2xl border border-primary/30 bg-primary/5 p-3 mx-auto">
                    <metric.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mt-4 text-4xl font-bold text-foreground">
                    {metric.value}
                  </p>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {metric.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Logos */}
        <section
          aria-label="Partner universities"
          className="py-12 md:py-16 border-t border-b"
        >
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Global partners
            </p>
            <p className="text-2xl font-semibold text-foreground mt-2">
              Universities and academies we trust
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {partnerLogos.map((partner) => (
                <Badge
                  key={partner}
                  variant="outline"
                  className="rounded-full px-4 py-2 text-sm text-muted-foreground font-medium"
                >
                  {partner}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Programs */}
        <section
          id="featured-programs"
          aria-label="Featured study abroad programs"
          className="py-20 md:py-28 bg-white"
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
              <Badge className="mx-auto bg-primary/10 text-primary border border-primary/40 text-xs uppercase tracking-[0.2em]">
                Featured Programs
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                2025’s most sought-after study abroad experiences
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Explore curated programs designed for ambitious learners who
                want immersive culture, career-ready skills, and lifelong
                connections.
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-96 bg-card border rounded-[28px] animate-pulse"
                  ></div>
                ))}
              </div>
            ) : programs && programs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No programs available at the moment.
                </p>
              </div>
            )}

            <div className="mt-12 text-center">
              <Link href="/programs">
                <Button
                  size="lg"
                  className="group flex items-center justify-center gap-2 px-10 py-4 text-lg font-semibold"
                  variant="outline"
                  data-testid="button-view-all"
                >
                  View All Programs
                  <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <ProcessSteps />
        <Testimonials />

        {/* CTA Section */}
        <section className="py-24 md:py-28 bg-gradient-to-br from-primary to-primary/90 text-white">
          <div className="container mx-auto max-w-6xl px-4 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Book a complimentary counseling session and let us match you with
              a program that reflects your ambitions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="px-10 py-4 text-lg font-semibold text-white bg-white/90 text-foreground shadow-xl shadow-primary/30"
                  data-testid="button-cta-contact"
                >
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  size="lg"
                  className="px-10 py-4 text-lg font-semibold bg-transparent border border-white/60 text-white hover:border-white"
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
