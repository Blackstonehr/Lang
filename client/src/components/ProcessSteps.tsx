import { Check } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Free Consultation",
    description:
      "Book a complimentary conversation to share your goals and let our counselors recommend the best fit.",
  },
  {
    number: 2,
    title: "Choose Your Program",
    description:
      "Select from curated programs with small cohorts, academic focus, and cultural immersion built in.",
  },
  {
    number: 3,
    title: "Applications & Docs",
    description:
      "We guide you through every form, document, and timeline with proactive reminders and checklist support.",
  },
  {
    number: 4,
    title: "Pre-Departure Prep",
    description:
      "Prepare with visa coaching, cultural briefings, and safety planning to arrive confident and ready.",
  },
  {
    number: 5,
    title: "Begin Your Adventure",
    description:
      "Step into your study abroad experience with 24/7 support and check-ins throughout your journey.",
  },
];

export default function ProcessSteps() {
  return (
    <section
      id="process"
      aria-label="Application process steps"
      className="py-24 bg-background"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
            Application process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Your journey in five clear steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We transform a complex process into a guided timeline so you focus on learning and adventure.
          </p>
        </div>

        <div className="mt-16">
          <div className="hidden lg:block relative">
            <div className="absolute left-10 right-10 top-10 h-px bg-border"></div>
            <div className="grid grid-cols-5 gap-6">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="relative rounded-3xl border border-border bg-card/80 p-6 text-center shadow-sm"
                  aria-label={`Step ${step.number}: ${step.title}`}
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:hidden space-y-8 mt-8">
            {steps.map((step, index) => (
              <article
                key={step.number}
                className="flex gap-4 rounded-3xl border border-border bg-card/80 p-6 shadow-sm"
                aria-label={`Step ${step.number}: ${step.title}`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="h-full w-px bg-border"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-primary" />
          <span>We stay with you through every milestone.</span>
        </div>
      </div>
    </section>
  );
}
