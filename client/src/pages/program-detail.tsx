import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { type Program } from "@shared/schema";
import SEO from "@/components/SEO";
import ProgramCard from "@/components/ProgramCard";
import { getProgramImage } from "@/lib/programImages";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe2,
  MapPin,
  ShieldCheck,
  Users,
  UserCheck,
  Plane,
} from "lucide-react";

type ProgramDetailPageProps = {
  params: {
    id?: string;
  };
};

export default function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const programId = params?.id ?? "";

  const {
    data: program,
    isLoading,
    isError,
    error,
  } = useQuery<Program>({
    queryKey: ["/api/programs", programId],
    enabled: Boolean(programId),
  });

  const { data: allPrograms } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
    enabled: Boolean(programId),
  });

  const relatedPrograms = useMemo(() => {
    if (!program || !allPrograms) {
      return [];
    }

    return allPrograms
      .filter((candidate) => candidate.id !== program.id)
      .sort((a, b) => {
        const score = (candidate: Program) => {
          let value = 0;
          if (candidate.country === program.country) value += 2;
          if (candidate.level === program.level) value += 1;
          if (candidate.featured === "true") value += 0.5;
          return value;
        };

        return score(b) - score(a);
      })
      .slice(0, 3);
  }, [allPrograms, program]);

  if (isLoading) {
    return <ProgramDetailSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load program details"
        description={error instanceof Error ? error.message : "Something went wrong while fetching this program."}
      />
    );
  }

  if (!program) {
    return (
      <ErrorState
        title="Program not found"
        description="The study abroad program you're looking for may have been updated or removed."
      />
    );
  }

  const heroImage = getProgramImage(program.imageUrl);
  const heroStats = [
    { label: "Duration", value: program.duration },
    { label: "Spots left", value: `${program.spotsAvailable}` },
    { label: "Tuition", value: `$${program.price.toLocaleString()}` },
  ];

  const supportHighlights = [
    {
      title: "Dedicated Program Advisor",
      description: "Personalized support before departure to help with paperwork, visa guidance, and packing lists.",
      icon: UserCheck,
    },
    {
      title: "24/7 On-site Team",
      description: "Local coordinators are available at any time during the experience for emergencies or quick questions.",
      icon: ShieldCheck,
    },
    {
      title: "Immersive Excursions",
      description: "Weekend trips, cultural workshops, and industry visits curated specifically for this destination.",
      icon: Globe2,
    },
    {
      title: "All-Inclusive Orientation",
      description: "Arrival orientation covers safety, transportation, academics, and cultural etiquette so you feel prepared.",
      icon: Plane,
    },
  ];

  return (
    <>
      <SEO
        title={`${program.title} | ${program.destination} Study Abroad Program`}
        description={program.description}
        image={heroImage}
        type="article"
        keywords={`${program.destination}, ${program.title}, study abroad, international education`}
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={`${program.destination} program hero`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-20 text-white">
            <Breadcrumb>
              <BreadcrumbList className="text-white/70">
                <BreadcrumbItem>
                  <Link href="/">
                    <BreadcrumbLink className="text-white/80 hover:text-white">Home</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/70" />
                <BreadcrumbItem>
                  <Link href="/programs">
                    <BreadcrumbLink className="text-white/80 hover:text-white">Programs</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/70" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{program.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-5 max-w-3xl">
                <div className="inline-flex items-center gap-3">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {program.level}
                  </Badge>
                  {program.featured === "true" && (
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{program.title}</h1>
                <p className="text-lg md:text-xl text-white/80">{program.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                    <MapPin className="h-4 w-4" />
                    {program.destination}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                    <Calendar className="h-4 w-4" />
                    {program.startDate} – {program.endDate}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                    <Clock className="h-4 w-4" />
                    {program.duration}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 lg:w-[420px]">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center">
                    <div className="text-2xl font-semibold">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wide text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-16">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-10">
              <Card>
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-2xl">Program Overview</CardTitle>
                    <p className="text-muted-foreground">
                      Everything you need to know before you submit your application.
                    </p>
                  </div>
                  <Link href="/programs">
                    <Button variant="ghost" className="w-full sm:w-auto" size="sm">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Programs
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoRow icon={Calendar} label="Start / End Dates" value={`${program.startDate} – ${program.endDate}`} />
                    <InfoRow icon={Clock} label="Program Length" value={program.duration} />
                    <InfoRow icon={MapPin} label="Location" value={program.destination} />
                    <InfoRow icon={Users} label="Spots Available" value={`${program.spotsAvailable} students`} />
                    <InfoRow icon={DollarSign} label="Program Fee" value={`$${program.price.toLocaleString()} USD`} />
                    <InfoRow icon={Globe2} label="Program Level" value={program.level} />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">What you'll experience</h3>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {program.highlights.map((highlight, index) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Comprehensive Support</CardTitle>
                  <p className="text-muted-foreground">
                    Our team handles the details so you can stay focused on learning and exploration.
                  </p>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  {supportHighlights.map((item) => (
                    <div key={item.title} className="rounded-xl border p-4">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-6 w-6 text-primary" />
                        <h4 className="font-semibold">{item.title}</h4>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Day-to-Day Snapshot</CardTitle>
                  <p className="text-muted-foreground">A balanced blend of academics, cultural immersion, and exploration.</p>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      title: "Mornings",
                      description: "Language & academic sessions led by accredited instructors.",
                    },
                    {
                      title: "Afternoons",
                      description: "Industry visits, studio workshops, or guided city explorations.",
                    },
                    {
                      title: "Evenings",
                      description: "Group dinners, reflection circles, and optional social activities.",
                    },
                  ].map((block) => (
                    <div key={block.title} className="rounded-2xl bg-muted/60 p-5">
                      <h4 className="font-semibold">{block.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{block.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <Card className="border-primary/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Secure Your Spot</CardTitle>
                  <p className="text-muted-foreground">
                    Apply now to reserve one of the limited seats in this program.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-xl bg-muted/70 p-4">
                    <div className="text-sm text-muted-foreground">Program Investment</div>
                    <div className="text-3xl font-bold tracking-tight">
                      ${program.price.toLocaleString()}
                      <span className="text-base font-medium text-muted-foreground"> USD</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Flexible payment plans available upon request.</p>
                  </div>

                  {program.spotsAvailable <= 5 && (
                    <Alert className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900">
                      <AlertTitle>Limited Availability</AlertTitle>
                      <AlertDescription>
                        Only {program.spotsAvailable} spots remain for this cohort. Submit your application soon to avoid the waitlist.
                      </AlertDescription>
                    </Alert>
                  )}

                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Personalized counselor call after submission
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Visa & documentation coaching
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Emergency support line during travel
                    </li>
                  </ul>

                  <div className="space-y-3">
                    <Link href={`/contact?program=${program.id}`}>
                      <Button className="w-full text-base py-6">Apply for {program.destination}</Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full" data-testid="button-talk-counselor">
                        Talk to a Counselor
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Program Snapshot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <SnapshotRow label="Destination" value={program.destination} />
                  <SnapshotRow label="Level" value={program.level} />
                  <SnapshotRow label="Dates" value={`${program.startDate} – ${program.endDate}`} />
                  <SnapshotRow label="Duration" value={program.duration} />
                  <SnapshotRow label="Availability" value={`${program.spotsAvailable} seats`} />
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>

        {relatedPrograms.length > 0 && (
          <section className="bg-muted/40 py-20">
            <div className="container mx-auto px-4">
              <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Explore Similar Programs</h2>
                  <p className="text-muted-foreground">
                    Looking for more options? Discover other destinations students also consider.
                  </p>
                </div>
                <Link href="/programs">
                  <Button variant="outline">Browse All Programs</Button>
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPrograms.map((related) => (
                  <ProgramCard key={related.id} program={related} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-muted/60 p-4">
      <Icon className="mt-0.5 h-5 w-5 text-primary" />
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function SnapshotRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function ProgramDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="relative h-[60vh] bg-muted">
        <div className="absolute inset-0">
          <Skeleton className="h-full w-full rounded-none" />
        </div>
      </div>
      <section className="py-16">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-60 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}

function ErrorState({ title, description }: { title: string; description: string }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/programs">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Programs
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </section>
  );
}
