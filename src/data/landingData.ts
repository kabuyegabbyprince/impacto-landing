import { Feature, PricingPlan, Testimonial, FaqItem, CaseStudy } from '../types';

export const TRUSTED_COMPANIES = [
  { name: 'ApexDynamics', symbol: '▲ Apex' },
  { name: 'Vortex Cloud', symbol: '◎ Vortex' },
  { name: 'PulseMetrics', symbol: '∿ Pulse' },
  { name: 'HyperScale', symbol: '✦ HyperScale' },
  { name: 'Stratum AI', symbol: '❖ Stratum' },
  { name: 'Lumina Global', symbol: '◇ Lumina' },
];

export const CORE_METRICS = [
  { value: '340%', label: 'Average ROI in 90 Days', detail: 'Based on 450+ enterprise rollouts' },
  { value: '99.99%', label: 'Uptime SLA Guarantee', detail: 'Global edge deployment across 24 regions' },
  { value: '4.2x', label: 'Faster Time-to-Market', detail: 'Pre-optimized workflow pipelines' },
  { value: '18M+', label: 'Monthly User Touchpoints', detail: 'Processed securely at sub-50ms latency' },
];

export const FEATURES: Feature[] = [
  {
    id: 'ai-optimization',
    title: 'Autonomous Growth Engine',
    shortDesc: 'AI-driven multivariate testing that self-tunes page layouts, copy, and offers in real-time.',
    description: 'Impacto continuously optimizes user funnels using predictive heuristics, boosting conversions without manual A/B split setup.',
    iconName: 'Sparkles',
    category: 'intelligence',
    highlight: '+48% Conversion Lift',
    previewData: {
      metric: '48.6%',
      metricLabel: 'Conversion Lift',
      change: '+14.2% this week',
      chartTrend: [32, 36, 42, 45, 48.6],
      tags: ['Autonomous Bandit ML', 'Dynamic Micro-Copy', 'Adaptive CTA Hierarchy'],
    },
  },
  {
    id: 'ultra-speed',
    title: 'Sub-Millisecond Edge Delivery',
    shortDesc: 'Lightning-fast global asset delivery backed by intelligent smart edge caches and geo-routing.',
    description: 'Deliver crisp 100/100 Core Web Vitals everywhere in the world with instant server-side streaming and Brotli compression.',
    iconName: 'Zap',
    category: 'performance',
    highlight: '< 42ms TTFB',
    previewData: {
      metric: '38ms',
      metricLabel: 'Global TTFB Average',
      change: '99.8% cache hit ratio',
      chartTrend: [120, 85, 52, 41, 38],
      tags: ['Edge Workers', 'Zero Layout Shift', 'Next-Gen Image Pipeline'],
    },
  },
  {
    id: 'deep-analytics',
    title: 'High-Fidelity Telemetry',
    shortDesc: 'Actionable heatmaps, rage-click detection, and drop-off forensic telemetry with zero cookie bloat.',
    description: 'Pinpoint friction points instantly. Inspect customer journeys down to every scroll depth and micro-interaction.',
    iconName: 'Activity',
    category: 'conversion',
    highlight: 'Real-time telemetry',
    previewData: {
      metric: '94.2%',
      metricLabel: 'Funnel Completion Rate',
      change: '+22% vs baseline',
      chartTrend: [64, 72, 81, 89, 94.2],
      tags: ['Rage-Click Forensics', 'Session Flow Replay', 'Attribution Matrix'],
    },
  },
  {
    id: 'workflows',
    title: 'Unified Lead Orchestration',
    shortDesc: 'Automate CRM synchronization, qualification scoring, and instant personalized sales outreach.',
    description: 'Sync high-intent leads straight into Salesforce, HubSpot, or Slack with automated enrichment and custom webhooks.',
    iconName: 'Layers',
    category: 'automation',
    highlight: 'Instant Sync',
    previewData: {
      metric: '100%',
      metricLabel: 'Automated Routing',
      change: '0 manual handoffs',
      chartTrend: [40, 65, 80, 95, 100],
      tags: ['HubSpot & Salesforce', 'Slack Alerts', 'Instant Calendar Booking'],
    },
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech-apex',
    company: 'FinPulse Capital',
    logoText: 'FinPulse',
    industry: 'Financial Technology',
    challenge: 'High user acquisition costs ($180 CPA) and sluggish 4.2-second initial landing page load times on mobile devices.',
    solution: 'Migrated landing funnel to Impacto Edge Engine with automated personalization and progressive conversion steps.',
    results: [
      { metric: '64%', label: 'CPA Reduction' },
      { metric: '3.8x', label: 'Mobile Signup Rate' },
      { metric: '0.4s', label: 'Global Load Time' },
    ],
  },
  {
    id: 'saas-stratum',
    company: 'Stratum Logistics',
    logoText: 'Stratum',
    industry: 'Supply Chain SaaS',
    challenge: 'Enterprise sales demos were dropping off due to a complicated multi-step scheduling sequence.',
    solution: 'Deployed Impacto Interactive Preview & 1-Click Interactive demo scheduler with automated territory assignment.',
    results: [
      { metric: '+185%', label: 'Qualified Demo Bookings' },
      { metric: '48%', label: 'Shorter Sales Cycle' },
      { metric: '$2.4M', label: 'Pipeline Generated' },
    ],
  },
  {
    id: 'health-lumina',
    company: 'Lumina Health',
    logoText: 'Lumina',
    industry: 'Digital Health & Biotech',
    challenge: 'Struggling to articulate clinical value propositions to both healthcare providers and enterprise buyers.',
    solution: 'Implemented Impacto Dynamic Segmentation which dynamically serves customized narrative tracks.',
    results: [
      { metric: '91%', label: 'Engagement Score' },
      { metric: '2.4x', label: 'Provider Conversions' },
      { metric: '99.99%', label: 'HIPAA compliant uptime' },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Elena Rostova',
    role: 'Chief Marketing Officer',
    company: 'Apex Logistics Global',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: 'Impacto transformed our go-to-market execution. We cut our lead acquisition cost in half while boosting demo requests by 240% within our first 6 weeks.',
    metric: '240%',
    metricLabel: 'Increase in inbound leads',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'VP of Growth & Revenue',
    company: 'CloudNova Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'The speed and real-time behavioral personalization are unparalleled. Our engineering team loves the zero-maintenance edge architecture.',
    metric: '42ms',
    metricLabel: 'Global latency achieved',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'Director of Product Growth',
    company: 'Veritas Analytics',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'The ROI calculator and live interactive components immediately gave us credibility with enterprise buyers. It pays for itself 10x over every single month.',
    metric: '12.4x',
    metricLabel: 'ROI achieved year-to-date',
    rating: 5,
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Launch',
    tagline: 'Ideal for fast-moving startups and emerging brands seeking immediate traction.',
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      'Up to 50,000 monthly visitors',
      'Autonomous Conversion Engine (Standard)',
      'Sub-50ms Global Edge CDN',
      'Built-in Heatmap & Dropoff Analytics',
      'Standard CRM Integrations (HubSpot, Zapier)',
      'Community & Email Support (24hr SLA)',
    ],
    ctaText: 'Start Free 14-Day Trial',
  },
  {
    id: 'growth',
    name: 'Scale & Growth',
    tagline: 'Engineered for scaling teams demanding multivariate automation and enterprise speed.',
    monthlyPrice: 149,
    annualPrice: 119,
    popular: true,
    badge: 'Most Popular',
    features: [
      'Up to 250,000 monthly visitors',
      'Advanced Autonomous Bandit ML',
      'Dynamic Micro-Copy Personalization',
      'Full Multi-Domain Support & Custom SSL',
      'Real-time CRM Bi-directional Sync',
      'Priority 24/7 Slack & Video Support (1hr SLA)',
      'Dedicated Funnel Architecture Review',
    ],
    ctaText: 'Accelerate Growth Now',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Ultra',
    tagline: 'Custom architectures, dedicated edge nodes, and tailored compliance for global leaders.',
    monthlyPrice: 399,
    annualPrice: 319,
    features: [
      'Unlimited monthly visitors & bandwidth',
      'Custom AI Training on Brand Corpus',
      'Isolated Edge Cluster & 99.999% SLA',
      'SOC2 Type II & HIPAA Compliance Mode',
      'Custom Webhooks & On-Premises Proxy',
      'Dedicated Growth Strategist & Account Exec',
      'Custom Security Audits & IP Whitelisting',
    ],
    ctaText: 'Speak With Solutions Team',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: '1',
    category: 'Product & Performance',
    question: 'How does Impacto increase conversion rates compared to standard landing builders?',
    answer: 'Impacto uses intelligent edge routing and continuous bandit algorithms to dynamically adjust copy, imagery, and CTAs based on visitor origin, intent, and historical engagement signals, achieving an average conversion uplift of 38% to 64%.',
  },
  {
    id: '2',
    category: 'Integration',
    question: 'Can I integrate Impacto with my existing CRM and marketing stack?',
    answer: 'Yes! Impacto natively integrates with HubSpot, Salesforce, Marketo, Segment, Google Analytics 4, Meta Pixel, Slack, and over 1,000+ tools via Webhooks and Zapier.',
  },
  {
    id: '3',
    category: 'Security',
    question: 'What security certifications and uptime guarantees are provided?',
    answer: 'Impacto is built on SOC2 Type II compliant infrastructure, provides end-to-end TLS 1.3 encryption, DDoS mitigation by default, and a 99.99% uptime SLA backed by financial commitments.',
  },
  {
    id: '4',
    category: 'Billing',
    question: 'Can I switch plans or cancel at any time?',
    answer: 'Absolutely. You can upgrade, downgrade, or cancel your subscription whenever you wish without penalty. Annual plans include a 20% discount and a 30-day money-back satisfaction guarantee.',
  },
  {
    id: '5',
    category: 'Implementation',
    question: 'How fast can our team deploy our first high-impact landing page?',
    answer: 'Most customers go live within 20 to 45 minutes using our pre-built high-converting layout blueprints, or under an hour when importing custom brand guidelines.',
  },
];
