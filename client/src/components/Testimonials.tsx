import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Sarah Chen",
    program: "Tokyo Summer Language Immersion",
    year: "2024",
    quote:
      "The Tokyo program exceeded all my expectations. I not only learned Japanese but gained a deep appreciation for Japanese culture. The host family experience was incredible!",
    initials: "SC",
  },
  {
    name: "Marcus Johnson",
    program: "Seoul K-Culture & Business",
    year: "2024",
    quote:
      "Studying in Seoul opened so many doors for me. The business workshops and tech company visits gave me invaluable insights into Asia's tech industry. Highly recommended!",
    initials: "MJ",
  },
  {
    name: "Emma Rodriguez",
    program: "Barcelona Arts & Spanish",
    year: "2023",
    quote:
      "This program changed my life. Living in Barcelona while studying Spanish and art history was a dream come true. The connections I made will last forever.",
    initials: "ER",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Student testimonials"
      className="py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge className="mx-auto bg-primary/10 text-primary border border-primary/40 text-xs uppercase tracking-[0.3em]">
            Student stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Hear from our global community
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real students share their experiences from Tokyo, Seoul, Barcelona, and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name}>
              <Card className="rounded-[28px] border border-border bg-white/80 shadow-lg shadow-primary/10">
                <CardContent className="p-8 space-y-6">
                  <div className="inline-flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary">
                    <Quote className="h-6 w-6" />
                  </div>
                  <p className="text-foreground italic leading-relaxed">
                    “{testimonial.quote}”
                  </p>
                  <footer className="flex flex-col gap-2 border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.program} · {testimonial.year}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="self-start rounded-full px-4 py-1 text-[11px] tracking-[0.2em]"
                    >
                      Verified Journey
                    </Badge>
                  </footer>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
