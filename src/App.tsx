import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { OrgPublicPage } from './pages/OrgPublicPage';
import { DonatePage } from './pages/DonatePage';
import { EventCheckinPage } from './pages/EventCheckinPage';
import { PORTAL_LINKS } from './constants/links';

// Redirect helper component for external portal links
const ExternalRedirect: React.FC<{ url: string }> = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Redirecting to Impacto Portal...
      </p>
      <a href={url} className="mt-3 text-xs text-emerald-600 underline font-bold">
        Click here if not redirected automatically
      </a>
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Discovery and Landing Home */}
        <Route path="/" element={<LandingPage />} />

        {/* Portal direct auth redirects */}
        <Route path="/login" element={<ExternalRedirect url={PORTAL_LINKS.SIGN_IN} />} />
        <Route path="/signin" element={<ExternalRedirect url={PORTAL_LINKS.SIGN_IN} />} />
        <Route path="/register" element={<ExternalRedirect url={PORTAL_LINKS.SIGN_UP} />} />
        <Route path="/signup" element={<ExternalRedirect url={PORTAL_LINKS.SIGN_UP} />} />
        <Route path="/dashboard" element={<ExternalRedirect url={PORTAL_LINKS.DASHBOARD} />} />

        {/* White-Labeled Organization Public Profile Page */}
        <Route path="/:slug" element={<OrgPublicPage />} />

        {/* Integrated Mobile Money Donation Execution Page */}
        <Route path="/:slug/donate" element={<DonatePage />} />

        {/* Dynamic QR & Geofenced Attendance Check-In Screen */}
        <Route path="/:slug/checkin" element={<EventCheckinPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
