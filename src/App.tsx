import React, { useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { OrgPublicPage } from './pages/OrgPublicPage';
import { DonatePage } from './pages/DonatePage';
import { EventCheckinPage } from './pages/EventCheckinPage';
import { CertificateVerifyPage } from './pages/CertificateVerifyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PORTAL_LINKS } from './constants/links';
import { useMobileViewport } from './hooks/useMobileViewport';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-2xl font-bold text-rose-500 mb-2">Something went wrong</h1>
          <p className="text-xs text-slate-300 max-w-md mb-4">
            {this.state.error?.message || 'An unexpected error occurred in the application.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Redirect helper component for external portal links
const ExternalRedirect: React.FC<{ url: string }> = ({ url }) => {
  useEffect(() => {
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');
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
  useMobileViewport();
  return (
    <ErrorBoundary>
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

          {/* Certificate & Credential Public Verification */}
          <Route path="/verify" element={<CertificateVerifyPage />} />
          <Route path="/verify/:code" element={<CertificateVerifyPage />} />

          {/* White-Labeled Organization Public Profile Page */}
          <Route path="/:slug" element={<OrgPublicPage />} />

          {/* Integrated Mobile Money Donation Execution Page */}
          <Route path="/:slug/donate" element={<DonatePage />} />

          {/* Dynamic QR & Geofenced Attendance Check-In Screen */}
          <Route path="/:slug/checkin" element={<EventCheckinPage />} />

          {/* 404 Not Found Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
