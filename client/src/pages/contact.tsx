import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import SEO from "@/components/SEO";
import FAQ from "@/components/FAQ";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [location] = useLocation();
  const programParam = new URLSearchParams(location.split("?")[1] || "").get("program") || "";

  const { data: programs } = useQuery<Array<{ id: string; title: string }>>({
    queryKey: ["/api/programs"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    setValue,
    watch,
  } = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      programInterest: programParam || "",
      message: "",
    }
  });

  // Auto-fill program interest from URL
  useEffect(() => {
    if (programParam) {
      setValue("programInterest", programParam);
    }
  }, [programParam, setValue]);

  // Calculate form completion percentage
  const formValues = watch();
  const requiredFields = ["name", "email", "message"];
  const completedFields = requiredFields.filter(
    (field) => formValues[field as keyof InsertContactSubmission] && 
    formValues[field as keyof InsertContactSubmission]?.toString().trim() !== ""
  ).length;
  const completionPercentage = (completedFields / requiredFields.length) * 100;

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitMutation.mutate(data);
  };

  return (
    <>
      <SEO
        title="Contact Us - languBridge Education Centre"
        description="Get in touch with our expert education counselors. Book a free consultation to discuss your study abroad options. We're here to help you every step of the way."
        keywords="contact study abroad, study abroad consultation, education counselor, study abroad help"
      />
      <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to start your study abroad journey? Our expert counselors are here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card data-testid="card-office-hours">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-contact-info">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3" data-testid="contact-email">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">info@langubridge.org</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3" data-testid="contact-phone">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3" data-testid="contact-address">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Office</div>
                      <div className="text-sm text-muted-foreground">
                        123 Education Ave, Suite 100<br />
                        New York, NY 10001
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3" data-testid="message-success">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-green-800 dark:text-green-200 font-medium mb-1">
                          Thank you for your message!
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          We'll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Form Progress Indicator */}
                  {!isSubmitted && (
                    <div className="mb-6 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Form Progress</span>
                        <span className="font-medium">{Math.round(completionPercentage)}%</span>
                      </div>
                      <Progress value={completionPercentage} className="h-2" data-testid="progress-form" />
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        {...register("name")}
                        className={errors.name ? "border-destructive" : touchedFields.name && !errors.name ? "border-green-500" : ""}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "error-name" : undefined}
                        data-testid="input-name"
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive" id="error-name" data-testid="error-name" role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : touchedFields.email && !errors.email ? "border-green-500" : ""}
                          aria-invalid={errors.email ? "true" : "false"}
                          aria-describedby={errors.email ? "error-email" : undefined}
                          data-testid="input-email"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive" id="error-email" data-testid="error-email" role="alert">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          {...register("phone")}
                          data-testid="input-phone"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="programInterest">Program Interest (Optional)</Label>
                      <Select
                        value={formValues.programInterest || ""}
                        onValueChange={(value) => setValue("programInterest", value)}
                      >
                        <SelectTrigger data-testid="select-program">
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs?.map((program) => (
                            <SelectItem key={program.id} value={program.title}>
                              {program.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">Other / General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="message">Message *</Label>
                        <span className="text-xs text-muted-foreground">
                          {formValues.message?.length || 0} / 1000 characters
                        </span>
                      </div>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your interests and how we can help you..."
                        rows={6}
                        maxLength={1000}
                        {...register("message")}
                        className={errors.message ? "border-destructive" : touchedFields.message && !errors.message ? "border-green-500" : ""}
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={errors.message ? "error-message" : "message-help"}
                        data-testid="input-message"
                      />
                      <p id="message-help" className="text-xs text-muted-foreground">
                        Minimum 10 characters required
                      </p>
                      {errors.message && (
                        <p className="text-sm text-destructive" id="error-message" data-testid="error-message" role="alert">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit"
                    >
                      {submitMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
    </>
  );
}
