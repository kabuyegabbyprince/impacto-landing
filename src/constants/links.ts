/**
 * External and internal links configuration for Impacto Portal.
 * Update sign-in, sign-up, and registration links here.
 */

export const PORTAL_LINKS = {
  SIGN_IN: 'https://impacto-portal.vercel.app/',
  SIGN_UP: 'https://impacto-portal.vercel.app/signup',
  DASHBOARD: 'https://impacto-portal.vercel.app/',
  REGISTER_ORG: (orgId?: string) =>
    orgId
      ? `https://impacto-portal.vercel.app/signup?org_id=${encodeURIComponent(orgId)}`
      : 'https://impacto-portal.vercel.app/signup',
  CONTACT_SUPPORT_EMAIL: 'support@impact-o.app',
  DOMAIN_PREFIX: 'impact-o.app',
};
