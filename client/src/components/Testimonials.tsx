import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export default function Testimonials() {
  // todo: remove mock functionality
  const testimonials = [
    {
      name: "Sarah Chen",
      program: "Tokyo Summer Language Immersion",
      year: "2024",
      quote: "The Tokyo program exceeded all my expectations. I not only learned Japanese but gained a deep appreciation for Japanese culture. The host family experience was incredible!",
      initials: "SC"
    },
    {
      name: "Marcus Johnson",
      program: "Seoul K-Culture & Business",
      year: "2024",
      quote: "Studying in Seoul opened so many doors for me. The business workshops and tech company visits gave me invaluable insights into Asia's tech industry. Highly recommended!",
      initials: "MJ"
    },
    {
      name: "Emma Rodriguez",
      program: "Barcelona Arts & Spanish",
      year: "2023",
      quote: "This program changed my life. Living in Barcelona while studying Spanish and art history was a dream come true. The connections I made will last forever.",
      initials: "ER"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Student Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Hear from Our
            <span className="block text-primary">Global Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from students who've transformed their lives through our study abroad programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`card-testimonial-${index}`}>
              <CardContent className="p-8 space-y-6">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary" />
                </div>

                {/* Quote */}
                <p className="text-foreground leading-relaxed italic" data-testid={`text-quote-${index}`}>
                  "{testimonial.quote}"
                </p>

                {/* Student Info */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground" data-testid={`text-name-${index}`}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-program-${index}`}>
                      {testimonial.program}
                    </div>
                    <div className="text-xs text-muted-foreground">{testimonial.year}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
