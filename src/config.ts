/**
 * Global Application Configuration (Impacto Platform)
 *
 * Centralized variables for deployment, portal authentication, database,
 * storage, financial conversion rates, and contact endpoints.
 * Modify these settings or provide environment variables (VITE_*) to adjust globally.
 */

// Helper to safely access environment variables in Vite/browser environments
const getEnv = (key: string, fallback: string = ''): string => {
  try {
    return (import.meta as any).env?.[key] || fallback;
  } catch {
    return fallback;
  }
};

export const APP_CONFIG = {
  // Brand & General Metadata
  APP_NAME: 'Impacto',
  APP_TAGLINE: 'Empower Rwandan Cooperatives & Communities',
  APP_DOMAIN: getEnv('VITE_APP_DOMAIN', 'impacto.rw'),
  OFFICE_LOCATION: 'Kigali Office • Rwanda',
  COPYRIGHT_HOLDER: 'Virellix Inc.',

  // Supabase Backend & Cloud Storage
  SUPABASE: {
    URL: getEnv('VITE_SUPABASE_URL', 'https://jyluwvwghtirdmazhhym.supabase.co'),
    ANON_KEY: getEnv(
      'VITE_SUPABASE_ANON_KEY',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bHV3dndnaHRpcmRtYXpoaHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NjM5MjYsImV4cCI6MjA5NTAzOTkyNn0.KcV_8RXSnoNVObFqgeLm-9r3fBbRf7FSEM6woVjhG3Q'
    ),
    PROJECT_ID: getEnv('VITE_SUPABASE_PROJECT_ID', 'jyluwvwghtirdmazhhym'),
    DEFAULT_BUCKET: 'avatars',
  },

  // External Portal & Authentication Links
  PORTAL: {
    BASE_URL: getEnv('VITE_PORTAL_BASE_URL', 'https://impacto.rw/'),
    SIGN_IN_URL: getEnv('VITE_PORTAL_SIGN_IN_URL', 'https://app.impacto.rw/'),
    SIGN_UP_URL: getEnv('VITE_PORTAL_SIGN_UP_URL', 'https://app.impacto.rw/'),
    DASHBOARD_URL: getEnv('VITE_PORTAL_DASHBOARD_URL', 'https://app.impacto.rw/'),
    GET_REGISTER_ORG_URL: (orgId?: string) => {
      const base = getEnv('VITE_PORTAL_SIGN_UP_URL', 'https://app.impacto.rw');
      const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
      return orgId ? `${cleanBase}/?org_id=${encodeURIComponent(orgId)}` : `${cleanBase}/`;
    },
  },

  // Contact & Support Info
  SUPPORT: {
    EMAIL: getEnv('VITE_SUPPORT_EMAIL', 'support@impacto.rw'),
  },

  // Financial & Currency Settings
  CURRENCY: {
    BASE_CURRENCY: 'USD',
    DISPLAY_CURRENCY: 'RWF',
    USD_TO_RWF_RATE: 1420,
    EUR_TO_RWF_RATE: 1530,
  },
};

export default APP_CONFIG;
