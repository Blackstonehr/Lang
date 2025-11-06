import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Features() {
  const features = [
    {
      title: "Lightning Speed",
      description: "Experience unprecedented performance with our optimized infrastructure. Load times reduced by 90% compared to traditional solutions.",
      highlight: "90% faster"
    },
    {
      title: "Smart Automation",
      description: "Automate repetitive tasks and workflows with intelligent AI-powered automation that learns from your patterns.",
      highlight: "AI-powered"
    },
    {
      title: "Real-time Analytics",
      description: "Get instant insights into your business performance with comprehensive dashboards and real-time data visualization.",
      highlight: "Live insights"
    },
    {
      title: "Enterprise Security",
      description: "Bank-level encryption and security protocols protect your data with end-to-end encryption and compliance standards.",
      highlight: "Bank-level security"
    },
    {
      title: "Seamless Integration",
      description: "Connect with 500+ popular tools and services through our robust API and pre-built integrations ecosystem.",
      highlight: "500+ integrations"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock expert support from our dedicated team ensures you never face downtime or technical issues alone.",
      highlight: "Always available"
    }
  ]

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Everything you need to
            <span className="block text-primary">succeed faster</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Powerful features designed to streamline your workflow and accelerate your business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="relative group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 hover:border-primary/30"
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </CardTitle>
                <div className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md inline-block">
                  {feature.highlight}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Card>
          ))}
        </div>

        {/* Feature Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
              99.9%
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Uptime</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
              &lt;100ms
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Response Time</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
              10k+
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Happy Customers</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
              500+
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Integrations</div>
          </div>
        </div>
      </div>
    </section>
  )
}