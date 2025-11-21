import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProgramCard from "@/components/ProgramCard";
import SEO from "@/components/SEO";
import { type Program } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, X } from "lucide-react";

export default function ProgramsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: allPrograms, isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  const filteredPrograms = useMemo(() => {
    if (!allPrograms) return [];

    return allPrograms.filter((program) => {
      const levelMatch =
        selectedLevel === "all" || program.level.includes(selectedLevel);
      const countryMatch =
        selectedCountry === "all" || program.country === selectedCountry;

      const searchMatch =
        searchQuery === "" ||
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase());

      return levelMatch && countryMatch && searchMatch;
    });
  }, [allPrograms, selectedLevel, selectedCountry, searchQuery]);

  const countries = Array.from(
    new Set(allPrograms?.map((p) => p.country) || [])
  ).sort();

  const hasFilters =
    selectedLevel !== "all" || selectedCountry !== "all" || Boolean(searchQuery);

  return (
    <>
      <SEO
        title="Study Abroad Programs - languBridge Education Centre"
        description="Browse our comprehensive range of study abroad programs. Filter by destination, education level, and duration. Find the perfect international education program for you."
        keywords="study abroad programs, international education programs, study abroad destinations, high school study abroad, college study abroad"
      />

      <div className="min-h-screen">
        {/* Header */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10 border-b">
          <div className="container mx-auto max-w-6xl px-4 text-center space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
              Discover your next chapter
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Study Abroad Programs Curated for You
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Filter by destination, study level, and experience to find the
              international program that strengthens your growth, boosts your
              resume, and deepens your worldview.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section
          aria-label="Program filters"
          className="py-12 border-b bg-background"
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="rounded-[32px] border border-border bg-card/70 p-6 shadow-sm shadow-primary/10 backdrop-blur">
              <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Filter className="h-4 w-4" />
                    <span>
                      {filteredPrograms.length}{" "}
                      {filteredPrograms.length === 1 ? "program" : "programs"}{" "}
                      available
                    </span>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search programs by destination, title, or keyword..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="pl-11 pr-10"
                      aria-label="Search programs"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full p-1"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <p className="text-sm text-muted-foreground">
                    Refine by level or country to surface tailored programs.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Select
                  value={selectedLevel}
                  onValueChange={setSelectedLevel}
                  aria-label="Filter by education level"
                >
                  <SelectTrigger
                    className="w-full"
                    data-testid="select-level"
                  >
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="High School">High School</SelectItem>
                    <SelectItem value="College">College</SelectItem>
                    <SelectItem value="18+">18+</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                  aria-label="Filter by country"
                >
                  <SelectTrigger
                    className="w-full"
                    data-testid="select-country"
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-end gap-4">
                  {hasFilters && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedLevel("all");
                        setSelectedCountry("all");
                        setSearchQuery("");
                      }}
                      data-testid="button-clear-filters"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
                  Programs
                </p>
                <h2 className="text-3xl font-bold text-foreground">
                  Explore immersive learning experiences
                </h2>
              </div>
              <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
                Showing {filteredPrograms.length} curated{" "}
                {filteredPrograms.length === 1 ? "program" : "programs"}.
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-96 bg-card border rounded-[28px] animate-pulse"
                    data-testid={`skeleton-program-${i}`}
                  ></div>
                ))}
              </div>
            ) : filteredPrograms.length > 0 ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                aria-live="polite"
              >
                {filteredPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No Programs Found</h3>
                <p className="text-muted-foreground mb-6">
                  Try updating your filters or remove keywords to find relevant
                  programs.
                </p>
                <Button
                  onClick={() => {
                    setSelectedLevel("all");
                    setSelectedCountry("all");
                    setSearchQuery("");
                  }}
                  data-testid="button-reset-filters"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Can't find exactly what you're looking for?
            </h2>
            <p className="text-lg text-muted-foreground">
              Our counselors can co-create a custom experience or recommend
              upcoming programs that suit your goals.
            </p>
            <Link href="/contact">
              <Button size="lg" className="px-10 py-4">
                Contact Our Counselors
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
