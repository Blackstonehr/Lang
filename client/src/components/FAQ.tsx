import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I apply for a study abroad program?",
    answer: "Applying is simple! Start by browsing our programs, then book a free consultation with our education counselors. They'll guide you through the application process, help you choose the right program, and assist with all required documentation. You can also apply directly through our contact form.",
  },
  {
    question: "What are the eligibility requirements?",
    answer: "Eligibility varies by program, but generally includes: age requirements (varies by program level), academic standing, language proficiency (if applicable), and completion of required documentation. Our counselors will help you determine your eligibility during your free consultation.",
  },
  {
    question: "How much do study abroad programs cost?",
    answer: "Program costs vary depending on destination, duration, and program type. Prices typically range from $4,500 to $6,200 and include tuition, accommodation, some meals, cultural activities, and support services. Financial aid and payment plans may be available - contact us to learn more.",
  },
  {
    question: "What's included in the program fee?",
    answer: "Program fees typically include: language classes or academic courses, accommodation (host family or student housing), some meals, cultural activities and excursions, airport pickup, orientation sessions, 24/7 support, and program materials. Specific inclusions vary by program - check individual program pages for details.",
  },
  {
    question: "Do I need to speak the local language?",
    answer: "Language requirements vary by program. Some programs are designed for beginners and include intensive language classes, while others require intermediate or advanced proficiency. Our counselors will help you find a program that matches your language level and learning goals.",
  },
  {
    question: "What kind of accommodation is provided?",
    answer: "Accommodation options vary by program and destination. Most programs offer either host family stays (for authentic cultural immersion) or student apartments/dorms. All accommodations are vetted for safety and quality. Specific details are available on each program page.",
  },
  {
    question: "Is financial aid available?",
    answer: "Yes! We offer various financial aid options including scholarships, payment plans, and early-bird discounts. We also help students explore external scholarship opportunities. Contact our counselors to discuss your financial situation and available options.",
  },
  {
    question: "What support do you provide during the program?",
    answer: "We provide comprehensive 24/7 support throughout your entire journey. This includes pre-departure orientation, on-site support staff, emergency assistance, academic support, cultural adjustment help, and ongoing communication with our team. You're never alone during your study abroad experience.",
  },
  {
    question: "Can I get academic credit for my program?",
    answer: "Many of our programs offer academic credit that can be transferred to your home institution. Credit transfer depends on your home school's policies. We provide detailed course descriptions and transcripts to facilitate credit transfer. Discuss this with your academic advisor and our counselors.",
  },
  {
    question: "What happens if I need to cancel?",
    answer: "We understand that plans can change. Our cancellation policy varies by program and timing. Generally, cancellations made well in advance receive full or partial refunds, while last-minute cancellations may have different terms. Review the specific program terms or contact us to discuss your situation.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-background" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Have Questions?
            <span className="block text-primary">We Have Answers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our study abroad programs, application process, and more.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                <AccordionTrigger className="text-left" data-testid={`faq-question-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed" data-testid={`faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <a href="/contact" className="text-primary hover:underline font-medium">
              Contact our counselors →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
