export interface Organization {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  mission?: string;
  vision?: string;
  org_category: string;
  location_name?: string;
  contact_us?: string;
  cover_url?: string;
  logo_url?: string;
  dashboard_logo?: string;
  primary_color?: string;
  secondary_color?: string;
  gallery_urls?: string[];
  donations_enabled?: boolean;
  donation_account_name?: string;
  donation_mtn_number?: string;
  donation_airtel_number?: string;
  is_public_directory?: boolean;
  allow_public_joining?: boolean;
  public_page_enabled?: boolean;
  show_goals_publicly?: boolean;
  show_impact_publicly?: boolean;
  marketplace_enabled?: boolean;
  created_at?: string;
}

export interface Member {
  id: string;
  org_id: string;
  user_id?: string;
  full_name: string;
  email?: string;
  phone?: string;
  role?: string;
  avatar_url?: string;
  status?: string;
}

export interface NewsPost {
  id: string;
  org_id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  cover_url?: string;
  visibility: 'public' | 'internal';
  published_at?: string;
  likes_count?: number;
  comments_count?: number;
}

export interface Goal {
  id: string;
  org_id: string;
  title: string;
  description?: string;
  period_type?: 'monthly' | 'quarterly' | 'yearly';
  period_label?: string;
  achievement_percentage?: number;
  status?: 'in_progress' | 'completed' | 'paused';
}

export interface Donation {
  id: string;
  org_id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  message?: string;
  payment_method: 'mtn' | 'airtel';
  proof_url?: string;
  status: 'pending' | 'confirmed' | 'rejected';
  created_at?: string;
}

export interface EventItem {
  id: string;
  org_id: string;
  title: string;
  description?: string;
  date_time: string;
  location_name?: string;
  location_type?: 'on-site' | 'online';
  latitude?: number;
  longitude?: number;
  radius_meters?: number;
}

export interface MeetingItem {
  id: string;
  org_id: string;
  title: string;
  description?: string;
  date_time: string;
  location_name?: string;
  location_type?: 'on-site' | 'online';
  latitude?: number;
  longitude?: number;
  radius_meters?: number;
}

export interface ActivityLog {
  id: string;
  org_id: string;
  user_name: string;
  action: string;
  details?: string;
  created_at: string;
}

export interface MarketplaceProduct {
  id: string;
  org_id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image_url?: string;
  available_stock?: number;
  contact_phone?: string;
}
