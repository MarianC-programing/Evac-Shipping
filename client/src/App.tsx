import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { TooltipProvider } from "@/components/ui/tooltip";

import HomePage from "@/pages/home";
import PlansPage from "@/pages/plans";
import LocationPage from "@/pages/location";
import LoginPage from "@/pages/login";
import TrackingPage from "@/pages/tracking";
import ContactPage from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/plans" component={PlansPage} />
      <Route path="/location" component={LocationPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/tracking" component={TrackingPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          <Router />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
