/**
 * Impacto App Configuration
 *
 * This file centralizes variables that can change across development,
 * staging, and production deployments.
 */

export const CONFIG = {
  // Application details
  APP_NAME: 'Impacto',
  APP_DOMAIN: 'impact-o.app',
  OFFICE_LOCATION: 'Kigali Office • Rwanda',
  COPYRIGHT_HOLDER: 'Virellix Inc.',

  // Supabase Backend Credentials & URL
  SUPABASE: {
    URL: 'https://jyluwvwghtirdmazhhym.supabase.co',
    PROJECT_ID: 'jyluwvwghtirdmazhhym',
    DEFAULT_BUCKET: 'avatars',
  },

  // External Portal & Authentication Links
  PORTAL: {
    BASE_URL: 'https://impacto-portal.vercel.app',
    SIGN_IN_URL: 'https://impacto-portal.vercel.app/',
    SIGN_UP_URL: 'https://impacto-portal.vercel.app/signup',
    DASHBOARD_URL: 'https://impacto-portal.vercel.app/',
  },

  // Contact
  SUPPORT_EMAIL: 'support@impact-o.app',

  // Currency & Rates
  CURRENCY: {
    USD_TO_RWF_RATE: 1420,
    EUR_TO_RWF_RATE: 1530,
  },
};

export default CONFIG;
