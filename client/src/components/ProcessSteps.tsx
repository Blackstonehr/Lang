import { Check } from "lucide-react";

export default function ProcessSteps() {
  const steps = [
    {
      number: 1,
      title: "Free Consultation",
      description: "Book a free consultation with our education counselors to discuss your goals and interests."
    },
    {
      number: 2,
      title: "Choose Your Program",
      description: "Browse our programs and select the destination and experience that fits your dreams."
    },
    {
      number: 3,
      title: "Application & Documentation",
      description: "We'll guide you through the application process and help with all required documentation."
    },
    {
      number: 4,
      title: "Pre-Departure Preparation",
      description: "Attend orientation sessions and receive comprehensive support before your journey."
    },
    {
      number: 5,
      title: "Begin Your Adventure",
      description: "Embark on your life-changing study abroad experience with 24/7 support from our team."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Application Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Journey in
            <span className="block text-primary">5 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make studying abroad simple and stress-free with our streamlined application process.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-border"></div>

            <div className="grid grid-cols-5 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="relative" data-testid={`step-${step.number}`}>
                  {/* Circle */}
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-lg relative z-10">
                    {step.number}
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground mb-2" data-testid={`text-step-title-${step.number}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-step-description-${step.number}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Vertical Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-4" data-testid={`step-mobile-${step.number}`}>
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-4"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg text-foreground mb-2" data-testid={`text-step-title-mobile-${step.number}`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-step-description-mobile-${step.number}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
