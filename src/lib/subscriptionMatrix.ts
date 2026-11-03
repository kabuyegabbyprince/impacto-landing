/**
 * IMPACTO Subscription Evaluation Engine
 * Matches Sections 1.4 & 3 of the Technical Specification Document
 */

export interface OrganizationSubscription {
  id: string;
  name: string;
  slug: string;
  plan_tier: 'free' | 'starter' | 'growth' | 'pro' | 'vip';
  subscription_ends_at: string | null; // null represents Free Forever
  grace_period_ends_at?: string;
  member_count: number;
  storage_bytes_used: number;
  packages_data?: {
    active_packages: string[];
    packages_data: Record<string, {
      purchased_at: string;
      expires_at: string;
    }>;
  };
}

export interface SubscriptionStatus {
  isExpired: boolean;
  isGracePeriod: boolean;
  isActive: boolean;
  daysRemaining: number;
  maxMembers: number;
  maxStorageMb: number;
  readOnlyMode: boolean;
  activePackages: string[];
}

/**
 * Evaluates the comprehensive subscription and add-on packaging limits
 * for a cooperative workspace.
 */
export function evaluateSubscription(org: OrganizationSubscription): SubscriptionStatus {
  const now = Date.now();
  let isExpired = false;
  let isGracePeriod = false;
  let isActive = true;
  let daysRemaining = 9999;

  // 1. Calculate Base Plan Expiry
  if (org.subscription_ends_at) {
    const endsAt = new Date(org.subscription_ends_at).getTime();
    const graceEndsAt = org.grace_period_ends_at
      ? new Date(org.grace_period_ends_at).getTime()
      : endsAt + 3 * 24 * 60 * 60 * 1000; // default 3 days grace period

    if (now > graceEndsAt) {
      isExpired = true;
      isActive = false;
    } else if (now > endsAt) {
      isGracePeriod = true;
      isActive = true;
      daysRemaining = Math.max(0, Math.ceil((graceEndsAt - now) / (1000 * 60 * 60 * 24)));
    } else {
      daysRemaining = Math.ceil((endsAt - now) / (1000 * 60 * 60 * 24));
    }
  }

  // 2. Parse Valid Non-Expired Modular Add-On Packages
  const activePackages: string[] = [];
  if (org.packages_data?.packages_data) {
    Object.entries(org.packages_data.packages_data).forEach(([pkgId, data]) => {
      const expiresAt = new Date(data.expires_at).getTime();
      if (now <= expiresAt) {
        activePackages.push(pkgId);
      }
    });
  }

  // 3. Define Base Quota Matrices
  const baseMemberQuotas: Record<string, number> = {
    free: 30,
    starter: 100,
    growth: 500,
    pro: 999999, // Unlimited
    vip: 999999,
  };

  const baseStorageQuotas: Record<string, number> = {
    free: 100, // MB
    starter: 500,
    growth: 5000, // 5 GB
    pro: 999999, // Unlimited
    vip: 999999,
  };

  const tier = org.plan_tier || 'free';
  let maxMembers = baseMemberQuotas[tier] || 30;
  let maxStorageMb = baseStorageQuotas[tier] || 100;

  // Add +20 member slots per active add-on package (Section 3.2 specification)
  maxMembers += activePackages.length * 20;

  // 4. Determine Safe Read-Only Mode Lockdown
  const memberQuotaExceeded = org.member_count > maxMembers;
  const storageQuotaExceeded = (org.storage_bytes_used / (1024 * 1024)) > maxStorageMb;
  const readOnlyMode = isExpired || memberQuotaExceeded || storageQuotaExceeded;

  return {
    isExpired,
    isGracePeriod,
    isActive,
    daysRemaining,
    maxMembers,
    maxStorageMb,
    readOnlyMode,
    activePackages,
  };
}

/**
 * Checks whether a specific modular feature keys can be accessed
 */
export function canAccessFeature(org: OrganizationSubscription, featureKey: string): boolean {
  const status = evaluateSubscription(org);
  if (status.readOnlyMode && featureKey !== 'read_data') {
    return false;
  }

  // Map features to specific module packages
  const packageFeatureMap: Record<string, string> = {
    qr_attendance: 'event_pack',
    mo_mo_ledgers: 'finance_pack',
    assemblies: 'document_pack',
    certificates: 'document_pack',
  };

  const requiredPackage = packageFeatureMap[featureKey];
  if (requiredPackage) {
    return status.activePackages.includes(requiredPackage);
  }

  return true;
}
