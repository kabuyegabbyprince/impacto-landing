import { useEffect, useState } from 'react';
import { Organization, Member } from '../types';

interface OrgState {
  activeOrg: Organization | null;
  activeMember: Member | null;
}

let state: OrgState = {
  activeOrg: null,
  activeMember: null,
};

const listeners = new Set<() => void>();

export const useOrgStore = () => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const setActiveOrg = (org: Organization | null) => {
    state.activeOrg = org;
    listeners.forEach((l) => l());
  };

  const setActiveMember = (member: Member | null) => {
    state.activeMember = member;
    listeners.forEach((l) => l());
  };

  return {
    activeOrg: state.activeOrg,
    activeMember: state.activeMember,
    setActiveOrg,
    setActiveMember,
  };
};
