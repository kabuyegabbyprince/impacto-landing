import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureShowcase } from './components/FeatureShowcase';
import { RoiCalculator } from './components/RoiCalculator';
import { InteractiveLiveDemo } from './components/InteractiveLiveDemo';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LeadCaptureModal } from './components/LeadCaptureModal';

export function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const handleOpenDemoModal = (planId?: string) => {
    setSelectedPlan(planId);
    setDemoModalOpen(true);
  };

  const handleCloseDemoModal = () => {
    setDemoModalOpen(false);
    setSelectedPlan(undefined);
  };

  return (
    <div id="impacto-landing-root" className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top sticky Navigation */}
      <Navbar onOpenDemoModal={handleOpenDemoModal} />

      {/* Main Landing Sections */}
      <main className="flex-1">
        {/* 1. Hero with live telemetry and benchmark preview */}
        <Hero onOpenDemoModal={handleOpenDemoModal} />

        {/* 2. Interactive Feature Deep Dive */}
        <FeatureShowcase onOpenDemoModal={handleOpenDemoModal} />

        {/* 3. Interactive ROI and Revenue Estimator */}
        <RoiCalculator onOpenDemoModal={handleOpenDemoModal} />

        {/* 4. Live Funnel Studio / Interactive Sandbox */}
        <InteractiveLiveDemo onOpenDemoModal={handleOpenDemoModal} />

        {/* 5. Case Studies with verified metrics */}
        <CaseStudies onOpenDemoModal={handleOpenDemoModal} />

        {/* 6. Customer Testimonials and Trust */}
        <Testimonials />

        {/* 7. Transparent Pricing with Annual/Monthly toggle */}
        <Pricing onOpenDemoModal={handleOpenDemoModal} />

        {/* 8. Searchable FAQ Accordion */}
        <FaqSection onOpenDemoModal={() => handleOpenDemoModal()} />
      </main>

      {/* Comprehensive Footer */}
      <Footer onOpenDemoModal={handleOpenDemoModal} />

      {/* Interactive Modal */}
      <LeadCaptureModal
        isOpen={demoModalOpen}
        onClose={handleCloseDemoModal}
        selectedPlanId={selectedPlan}
      />
    </div>
  );
}

export default App;
