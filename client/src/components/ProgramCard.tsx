import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Program } from "@shared/schema";
import OptimizedImage from "@/components/OptimizedImage";
import tokyoHero from "@assets/generated_images/Students_in_Tokyo_hero_366c34fa.png";
import koreaHero from "@assets/generated_images/Students_in_Korea_hero_f1ab5dd2.png";
import studentsHero from "@assets/generated_images/Students_studying_together_hero_65ed8f9a.png";

interface ProgramCardProps {
  program: Program;
}

// Helper function to get country flag emoji
function getCountryFlag(country: string): string {
  const flagMap: Record<string, string> = {
    Japan: "🇯🇵",
    Korea: "🇰🇷",
    "South Korea": "🇰🇷",
    China: "🇨🇳",
    Spain: "🇪🇸",
    France: "🇫🇷",
    Germany: "🇩🇪",
    Italy: "🇮🇹",
    "United Kingdom": "🇬🇧",
    UK: "🇬🇧",
    Australia: "🇦🇺",
    Canada: "🇨🇦",
    "United States": "🇺🇸",
    USA: "🇺🇸",
  };
  return flagMap[country] || "📍";
}

export default function ProgramCard({ program }: ProgramCardProps) {
  // Map image URLs to actual imported images
  const getImageSrc = (imageUrl: string) => {
    if (imageUrl.includes("Tokyo")) return tokyoHero;
    if (imageUrl.includes("Korea")) return koreaHero;
    return studentsHero;
  };

  return (
    <article
      className="group flex flex-col h-full bg-card border border-card-border rounded-xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 overflow-hidden"
      data-testid={`card-program-${program.id}`}
    >
      {/* Image - 16:9 aspect ratio, rounded-xl top corners */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
        <OptimizedImage
          src={getImageSrc(program.imageUrl)}
          alt={`${program.destination} study abroad program`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
          aspectRatio="16/9"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {program.featured === "true" && (
          <Badge
            className="absolute top-4 right-4 bg-primary text-primary-foreground"
            data-testid="badge-featured"
          >
            Featured
          </Badge>
        )}
        {program.spotsAvailable <= 5 && (
          <Badge
            variant="destructive"
            className="absolute top-4 left-4"
            data-testid="badge-limited-spots"
          >
            Only {program.spotsAvailable} spots left!
          </Badge>
        )}
      </div>

      {/* Content - p-6 with gap-4 for internal elements */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Destination flag + name */}
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            {getCountryFlag(program.country)}
          </span>
          <span
            className="text-sm font-medium text-muted-foreground"
            data-testid="text-destination"
          >
            {program.destination}
          </span>
        </div>

        {/* Program title */}
        <h3
          className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
          data-testid="text-title"
        >
          {program.title}
        </h3>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="detail-duration">
          <span className="font-medium">Duration:</span>
          <span>{program.duration}</span>
        </div>

        {/* Price/Tuition */}
        <div className="flex items-center gap-2" data-testid="detail-price">
          <span className="text-sm font-medium text-foreground">Tuition:</span>
          <span className="text-lg font-bold text-primary">
            ${program.price.toLocaleString()}
          </span>
        </div>

        {/* Highlights - 3-4 bullets */}
        <div className="space-y-2 flex-1">
          <h4 className="text-sm font-semibold text-foreground">Highlights:</h4>
          <ul className="space-y-1.5" aria-label="Program highlights">
            {program.highlights.slice(0, 4).map((highlight, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
                data-testid={`highlight-${index}`}
              >
                <span className="text-primary mt-1.5 flex-shrink-0" aria-hidden="true">
                  •
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Link href={`/program-detail?id=${program.id}`}>
            <Button 
              className="w-full group-hover:scale-[1.02] transition-transform duration-300" 
              data-testid="button-view-details"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
