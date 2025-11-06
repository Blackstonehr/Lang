import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProgramCard from "@/components/ProgramCard";
import { type Program } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function ProgramsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");

  const { data: allPrograms, isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  // Filter programs based on selections
  const filteredPrograms = allPrograms?.filter(program => {
    const levelMatch = selectedLevel === "all" || program.level.includes(selectedLevel);
    const countryMatch = selectedCountry === "all" || program.country === selectedCountry;
    return levelMatch && countryMatch;
  }) || [];

  // Get unique countries from programs
  const countries = Array.from(new Set(allPrograms?.map(p => p.country) || [])).sort();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Study Abroad Programs
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our comprehensive range of international education programs designed to transform your academic journey and broaden your global perspective.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b sticky top-20 z-40 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span data-testid="text-results-count">
                {filteredPrograms.length} {filteredPrograms.length === 1 ? 'program' : 'programs'} found
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="College">College</SelectItem>
                  <SelectItem value="18+">18+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(selectedLevel !== "all" || selectedCountry !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedLevel("all");
                    setSelectedCountry("all");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-card border rounded-xl animate-pulse" data-testid={`skeleton-program-${i}`}></div>
              ))}
            </div>
          ) : filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20" data-testid="no-programs">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No Programs Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to see more programs.
              </p>
              <Button
                onClick={() => {
                  setSelectedLevel("all");
                  setSelectedCountry("all");
                }}
                data-testid="button-reset-filters"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our education counselors can help you find the perfect program that matches your goals and interests.
          </p>
          <Button size="lg" data-testid="button-contact-counselor">
            Contact Our Counselors
          </Button>
        </div>
      </section>
    </div>
  );
}
