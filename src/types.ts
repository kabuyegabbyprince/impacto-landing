export interface Feature {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  iconName: string;
  category: 'performance' | 'automation' | 'intelligence' | 'conversion';
  highlight: string;
  previewData: {
    metric: string;
    metricLabel: string;
    change: string;
    chartTrend: number[];
    tags: string[];
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  metric: string;
  metricLabel: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  logoText: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
}
