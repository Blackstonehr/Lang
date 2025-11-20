import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";
import { type Program } from "@shared/schema";
import { ArrowLeft, Clock, MapPin, Users, DollarSign, Check, Calendar } from "lucide-react";
import tokyoHero from "@assets/generated_images/Students_in_Tokyo_hero_366c34fa.png";
import koreaHero from "@assets/generated_images/Students_in_Korea_hero_f1ab5dd2.png";
import studentsHero from "@assets/generated_images/Students_studying_together_hero_65ed8f9a.png";

export default function ProgramDetailPage() {
  const [location, setLocation] = useLocation();
  const programId = new URLSearchParams(location.split("?")[1] || "").get("id") || 
                    location.split("/").pop() || "";

  const { data: program, isLoading, error } = useQuery<Program>({
    queryKey: [`/api/programs/${programId}`],
  });

  const getImageSrc = (imageUrl: string) => {
    if (imageUrl.includes("Tokyo")) return tokyoHero;
    if (imageUrl.includes("Korea")) return koreaHero;
    return studentsHero;
  };

  if (isLoading) {
    return (
      <>
        <SEO title="Loading Program..." />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </>
    );
  }

  if (error || !program) {
    return (
      <>
        <SEO title="Program Not Found - languBridge Education Centre" />
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Program Not Found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The program you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/programs">
                <Button className="w-full">Browse All Programs</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${program.title} - languBridge Education Centre`}
        description={program.description}
        keywords={`${program.destination}, ${program.country}, study abroad, ${program.level}`}
      />
      <div className="min-h-screen">
        {/* Header with Back Button */}
        <section className="py-8 bg-card border-b">
          <div className="container mx-auto px-4">
            <Link href="/programs">
              <Button variant="ghost" className="mb-4" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Programs
              </Button>
            </Link>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <OptimizedImage
            src={getImageSrc(program.imageUrl)}
            alt={`${program.destination} study abroad program`}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {program.featured === "true" && (
                  <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                )}
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {program.level}
                </Badge>
                {program.spotsAvailable <= 5 && (
                  <Badge variant="destructive">Only {program.spotsAvailable} spots left!</Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2" data-testid="text-title">
                {program.title}
              </h1>
              <div className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5" />
                <span data-testid="text-destination">{program.destination}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Program Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-description">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Highlights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Program Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {program.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3" data-testid={`highlight-${index}`}>
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Program Details Card */}
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Program Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3" data-testid="detail-duration">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-semibold">{program.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3" data-testid="detail-dates">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Dates</div>
                        <div className="font-semibold">
                          {program.startDate} - {program.endDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3" data-testid="detail-spots">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Availability</div>
                        <div className="font-semibold">{program.spotsAvailable} spots available</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3" data-testid="detail-price">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Price</div>
                        <div className="text-2xl font-bold text-primary">
                          ${program.price.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t space-y-3">
                      <Link href={`/contact?program=${encodeURIComponent(program.title)}`}>
                        <Button className="w-full" size="lg" data-testid="button-apply">
                          Apply Now
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" className="w-full" data-testid="button-contact">
                          Contact Counselor
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a free consultation with our education counselors to learn more about this program and how we can help you achieve your study abroad goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/contact?program=${encodeURIComponent(program.title)}`}>
                <Button size="lg" data-testid="button-cta-apply">
                  Apply for This Program
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="outline" size="lg" data-testid="button-cta-browse">
                  Browse Other Programs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
