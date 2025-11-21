import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";

// Code splitting - lazy load pages
const HomePage = lazy(() => import("@/pages/home"));
const ProgramsPage = lazy(() => import("@/pages/programs"));
const ProgramDetailPage = lazy(() => import("@/pages/program-detail"));
const ContactPage = lazy(() => import("@/pages/contact"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/programs" component={ProgramsPage} />
        <Route path="/program-detail" component={ProgramDetailPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SkipLink />
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
