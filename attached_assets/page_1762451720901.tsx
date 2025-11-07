import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}