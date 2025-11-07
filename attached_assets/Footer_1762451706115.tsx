export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Product",
      links: [
        { href: "#features", label: "Features" },
        { href: "#pricing", label: "Pricing" },
        { href: "#integrations", label: "Integrations" },
        { href: "#api", label: "API Documentation" },
      ]
    },
    {
      title: "Company",
      links: [
        { href: "#about", label: "About Us" },
        { href: "#careers", label: "Careers" },
        { href: "#blog", label: "Blog" },
        { href: "#press", label: "Press Kit" },
      ]
    },
    {
      title: "Support",
      links: [
        { href: "#help", label: "Help Center" },
        { href: "#contact", label: "Contact" },
        { href: "#status", label: "Status" },
        { href: "#community", label: "Community" },
      ]
    }
  ]

  const socialLinks = [
    { href: "https://twitter.com/quick", label: "Twitter" },
    { href: "https://linkedin.com/company/quick", label: "LinkedIn" },
    { href: "https://github.com/quick", label: "GitHub" },
    { href: "https://discord.gg/quick", label: "Discord" },
  ]

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-lg">
                Q
              </div>
              <span className="text-xl font-bold">Quick</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-sm">
              Lightning-fast solutions for modern businesses. Transform your workflow and boost productivity with our innovative platform.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.label}
                >
                  <div className="w-5 h-5 bg-slate-400 rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-white mb-2">Stay updated</h3>
            <p className="text-slate-300 mb-4">Get the latest news and updates from Quick.</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-slate-400 text-sm">
              © {currentYear} Quick. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-slate-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="text-slate-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#cookies" className="text-slate-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
          
          {/* Built with indicator */}
          <div className="text-slate-400 text-sm">
            Made with ❤️ for modern businesses
          </div>
        </div>
      </div>
    </footer>
  )
}