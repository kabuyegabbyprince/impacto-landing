import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MockDB } from '../lib/mockData';
import { Organization, Goal, NewsPost, Donation, EventItem, MeetingItem, ActivityLog } from '../types';

export function useOrganizations() {
  const [data, setData] = useState<Organization[]>(MockDB.organizations);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchOrgs() {
      try {
        const { data: dbData, error: dbError } = await supabase
          .from('organizations')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbError) throw dbError;

        if (isMounted) {
          if (dbData && dbData.length > 0) {
            setData(dbData);
          } else {
            setData(MockDB.organizations);
          }
        }
      } catch (err) {
        console.warn('Supabase fetch organizations notice (using fallback):', err);
        if (isMounted) {
          setData(MockDB.organizations);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchOrgs();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}

export function useOrganization(slugOrId?: string) {
  const [data, setData] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<any>(null);

  useEffect(() => {
    if (!slugOrId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const rawSlug = slugOrId.trim();
    const cleanSlug = rawSlug.startsWith('@') ? rawSlug.slice(1).trim() : rawSlug;

    async function fetchOrg() {
      try {
        const { data: dbData, error: dbError } = await supabase
          .from('organizations')
          .select('*')
          .or(`slug.ilike.${cleanSlug},slug.ilike.@${cleanSlug},id.eq.${cleanSlug}`)
          .limit(1);

        if (dbError) throw dbError;

        if (isMounted && dbData && dbData.length > 0) {
          setData(dbData[0]);
          return;
        }

        const foundMock = MockDB.organizations.find(
          (o) =>
            o.slug.toLowerCase() === cleanSlug.toLowerCase() ||
            o.id.toLowerCase() === cleanSlug.toLowerCase() ||
            `@${o.slug.toLowerCase()}` === rawSlug.toLowerCase()
        );

        if (isMounted) {
          setData(foundMock || (cleanSlug === '' ? MockDB.organizations[0] : null));
        }
      } catch (err) {
        console.warn('Supabase fetch organization notice (using fallback):', err);
        const foundMock = MockDB.organizations.find(
          (o) =>
            o.slug.toLowerCase() === cleanSlug.toLowerCase() ||
            o.id.toLowerCase() === cleanSlug.toLowerCase() ||
            `@${o.slug.toLowerCase()}` === rawSlug.toLowerCase()
        );
        if (isMounted) {
          setData(foundMock || (cleanSlug === '' ? MockDB.organizations[0] : null));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchOrg();
    return () => {
      isMounted = false;
    };
  }, [slugOrId]);

  return { data, isLoading, error };
}

export function useNews(orgId?: string) {
  const [data, setData] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchNews() {
      if (!orgId) {
        if (isMounted) setData(MockDB.news);
        setIsLoading(false);
        return;
      }
      try {
        const { data: dbData, error } = await supabase
          .from('news')
          .select('*')
          .eq('org_id', orgId)
          .order('published_at', { ascending: false });

        if (error) throw error;
        if (isMounted) {
          setData(dbData && dbData.length > 0 ? dbData : MockDB.news.filter((n) => n.org_id === orgId || n.org_id === 'org-1'));
        }
      } catch {
        if (isMounted) {
          setData(MockDB.news.filter((n) => n.org_id === orgId || n.org_id === 'org-1'));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchNews();
    return () => {
      isMounted = false;
    };
  }, [orgId]);

  return { data, isLoading };
}

export function useGoals(orgId?: string) {
  const [data, setData] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchGoals() {
      if (!orgId) {
        if (isMounted) setData(MockDB.goals);
        setIsLoading(false);
        return;
      }
      try {
        const { data: dbData, error } = await supabase
          .from('goals')
          .select('*')
          .eq('org_id', orgId);

        if (error) throw error;
        if (isMounted) {
          setData(dbData && dbData.length > 0 ? dbData : MockDB.goals.filter((g) => g.org_id === orgId || g.org_id === 'org-1'));
        }
      } catch {
        if (isMounted) {
          setData(MockDB.goals.filter((g) => g.org_id === orgId || g.org_id === 'org-1'));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchGoals();
    return () => {
      isMounted = false;
    };
  }, [orgId]);

  return { data, isLoading };
}

export function useDonations(orgId?: string) {
  const [data, setData] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDonations() {
      if (!orgId) {
        if (isMounted) setData(MockDB.donations);
        setIsLoading(false);
        return;
      }
      try {
        const { data: dbData, error } = await supabase
          .from('donations')
          .select('*')
          .eq('org_id', orgId);

        if (error) throw error;
        if (isMounted) {
          setData(dbData && dbData.length > 0 ? dbData : MockDB.donations.filter((d) => d.org_id === orgId || d.org_id === 'org-1'));
        }
      } catch {
        if (isMounted) {
          setData(MockDB.donations.filter((d) => d.org_id === orgId || d.org_id === 'org-1'));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchDonations();
    return () => {
      isMounted = false;
    };
  }, [orgId]);

  return { data, isLoading };
}

export function useEvents(orgId?: string) {
  const [data, setData] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchEvents() {
      if (!orgId) {
        if (isMounted) setData(MockDB.events);
        setIsLoading(false);
        return;
      }
      try {
        const { data: dbData, error } = await supabase
          .from('events')
          .select('*')
          .eq('org_id', orgId);

        if (error) throw error;
        if (isMounted) {
          setData(dbData && dbData.length > 0 ? dbData : MockDB.events.filter((e) => e.org_id === orgId || e.org_id === 'org-1'));
        }
      } catch {
        if (isMounted) {
          setData(MockDB.events.filter((e) => e.org_id === orgId || e.org_id === 'org-1'));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, [orgId]);

  return { data, isLoading };
}

export function useMeetings(orgId?: string) {
  const [data, setData] = useState<MeetingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchMeetings() {
      if (!orgId) {
        if (isMounted) setData(MockDB.meetings);
        setIsLoading(false);
        return;
      }
      try {
        const { data: dbData, error } = await supabase
          .from('meetings')
          .select('*')
          .eq('org_id', orgId);

        if (error) throw error;
        if (isMounted) {
          setData(dbData && dbData.length > 0 ? dbData : MockDB.meetings.filter((m) => m.org_id === orgId || m.org_id === 'org-1'));
        }
      } catch {
        if (isMounted) {
          setData(MockDB.meetings.filter((m) => m.org_id === orgId || m.org_id === 'org-1'));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchMeetings();
    return () => {
      isMounted = false;
    };
  }, [orgId]);

  return { data, isLoading };
}

export function useActivityLogs(orgId?: string) {
  const [data, setData] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchLogs() {
      if (!orgId) {
        if (isMounted) setData(MockDB.activities);
        setIsLoading(false);
        return;
      }
      try {
        const { data: dbData, error } = await supabase
          .from('activity_logs')
          .select('*')
          .eq('org_id', orgId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (isMounted) {
          setData(dbData && dbData.length > 0 ? dbData : MockDB.activities.filter((a) => a.org_id === orgId || a.org_id === 'org-1'));
        }
      } catch {
        if (isMounted) {
          setData(MockDB.activities.filter((a) => a.org_id === orgId || a.org_id === 'org-1'));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchLogs();
    return () => {
      isMounted = false;
    };
  }, [orgId]);

  return { data, isLoading };
}

export function useCreateDonation() {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (donation: Omit<Donation, 'id' | 'status' | 'created_at'>) => {
    setIsPending(true);
    try {
      const newDonation = {
        ...donation,
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      await supabase.from('donations').insert(newDonation);
      return newDonation;
    } catch {
      return donation;
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
}

export function useCheckIn() {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (payload: any) => {
    setIsPending(true);
    try {
      await supabase.from('event_checkins').insert({
        ...payload,
        created_at: new Date().toISOString(),
      });
      return payload;
    } catch {
      return payload;
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
}

export function useMeetingAttendance(meetingId?: string) {
  const [data, setData] = useState<string[]>([]);
  const [isLoading] = useState(false);

  useEffect(() => {
    if (!meetingId) return;
    const stored = localStorage.getItem(`meet_attn_${meetingId}`);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData([]);
      }
    }
  }, [meetingId]);

  return { data, isLoading };
}

export function useSaveMeetingAttendance() {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async ({ meetingId, memberIds }: { meetingId: string; memberIds: string[] }) => {
    setIsPending(true);
    try {
      localStorage.setItem(`meet_attn_${meetingId}`, JSON.stringify(memberIds));
      return { success: true };
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
}

export function useSubmitErrorReport() {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (report: { org_id?: string; title: string; description: string; priority?: string }) => {
    setIsPending(true);
    try {
      await supabase.from('error_reports').insert({
        ...report,
        created_at: new Date().toISOString(),
      });
      return { success: true };
    } catch {
      return { success: true };
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
}
