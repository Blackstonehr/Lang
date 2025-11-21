import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, DollarSign } from "lucide-react";
import { type Program } from "@shared/schema";
import OptimizedImage from "@/components/OptimizedImage";
import tokyoHero from "@assets/generated_images/Students_in_Tokyo_hero_366c34fa.png";
import koreaHero from "@assets/generated_images/Students_in_Korea_hero_f1ab5dd2.png";
import studentsHero from "@assets/generated_images/Students_studying_together_hero_65ed8f9a.png";

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  // Map image URLs to actual imported images
  const getImageSrc = (imageUrl: string) => {
    if (imageUrl.includes("Tokyo")) return tokyoHero;
    if (imageUrl.includes("Korea")) return koreaHero;
    return studentsHero;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden" data-testid={`card-program-${program.id}`}>
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <OptimizedImage
          src={getImageSrc(program.imageUrl)}
          alt={`${program.destination} study abroad program`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          aspectRatio="16/9"
        />
        {program.featured === "true" && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground" data-testid="badge-featured">
            Featured
          </Badge>
        )}
        {program.spotsAvailable <= 5 && (
          <Badge variant="destructive" className="absolute top-4 left-4" data-testid="badge-limited-spots">
            Only {program.spotsAvailable} spots left!
          </Badge>
        )}
      </div>

      {/* Content */}
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span data-testid="text-destination">{program.destination}</span>
          </div>
          <Badge variant="secondary" data-testid="badge-level">{program.level}</Badge>
        </div>
        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors" data-testid="text-title">
          {program.title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed line-clamp-3" data-testid="text-description">
          {program.description}
        </p>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2" data-testid="detail-duration">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center gap-2" data-testid="detail-price">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span>${program.price.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2" data-testid="detail-spots">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{program.spotsAvailable} spots available</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-1">
          {program.highlights.slice(0, 3).map((highlight, index) => (
            <div key={index} className="flex items-start gap-2 text-sm" data-testid={`highlight-${index}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
              <span className="text-muted-foreground">{highlight}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={`/program-detail?id=${program.id}`}>
          <Button className="w-full" data-testid="button-learn-more">
            Learn More & Apply
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
