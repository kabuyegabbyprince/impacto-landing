import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { FeatureBentoGrid } from '../components/landing/FeatureBentoGrid';
import { OrgDiscoveryFeed } from '../components/landing/OrgDiscoveryFeed';
import { PricingSection } from '../components/landing/PricingSection';
import { FaqsSection } from '../components/landing/FaqsSection';
import { FooterSection } from '../components/landing/FooterSection';
import { ContactModal } from '../components/landing/ContactModal';
import { TermsModal } from '../components/landing/TermsModal';
import { PrivacyModal } from '../components/landing/PrivacyModal';

export const LandingPage: React.FC = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Impacto — Next-Generation Platform Solutions';
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://impacto.rw/');
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm font-sans flex flex-col justify-between">
      {/* Dynamic Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection />
        <FeatureBentoGrid />
        <OrgDiscoveryFeed />
        <PricingSection />
        <FaqsSection onOpenContact={() => setContactModalOpen(true)} />
      </main>

      {/* Footer */}
      <FooterSection
        onOpenContact={() => setContactModalOpen(true)}
        onOpenTerms={() => setTermsModalOpen(true)}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
      />

      {/* Modals */}
      <ContactModal open={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      <TermsModal open={termsModalOpen} onClose={() => setTermsModalOpen(false)} />
      <PrivacyModal open={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
    </div>
  );
};
