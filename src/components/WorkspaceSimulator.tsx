import React, { useState } from 'react';
import {
  Shield,
  FileText,
  DollarSign,
  QrCode,
  Lock,
  Eye,
  Settings,
  Clock,
  Copy,
  Download,
  User,
  Award,
} from 'lucide-react';
import { evaluateSubscription, OrganizationSubscription } from '../lib/subscriptionMatrix';

export const WorkspaceSimulator: React.FC<{ orgName: string; orgSlug: string }> = ({ orgName, orgSlug }) => {
  // 1. Simulation State
  const [tier, setTier] = useState<'free' | 'starter' | 'growth' | 'pro' | 'vip'>('starter');
  const [memberCount, setMemberCount] = useState(124);
  const [storageMb, setStorageMb] = useState(240);
  const [expiryDaysOffset, setExpiryDaysOffset] = useState(12); // positive = active, negative = expired
  const [eventPack, setEventPack] = useState(true);
  const [financePack, setFinancePack] = useState(true);
  const [docPack, setDocPack] = useState(true);

  // Selected sub-report type for Section 2
  const [selectedReport, setSelectedReport] = useState<'resolution' | 'momo_ledger' | 'attendance' | 'signing'>('resolution');
  
  // Selected MoMo SMS evidence item
  const [selectedSms, setSelectedSms] = useState<{
    id: string;
    phone: string;
    name: string;
    amount: number;
    code: string;
    sms: string;
  } | null>(null);

  const [copiedText, setCopiedText] = useState<string | null>(null);

  // 2. Build mock subscription state based on parameters
  const now = new Date();
  const endsAt = new Date(now.getTime() + expiryDaysOffset * 24 * 60 * 60 * 1000).toISOString();
  
  const simulatedOrg: OrganizationSubscription = {
    id: 'simulated_id',
    name: orgName,
    slug: orgSlug,
    plan_tier: tier,
    subscription_ends_at: endsAt,
    grace_period_ends_at: new Date(now.getTime() + (expiryDaysOffset + 3) * 24 * 60 * 60 * 1000).toISOString(),
    member_count: memberCount,
    storage_bytes_used: storageMb * 1024 * 1024,
    packages_data: {
      active_packages: [
        ...(eventPack ? ['event_pack'] : []),
        ...(financePack ? ['finance_pack'] : []),
        ...(docPack ? ['document_pack'] : []),
      ],
      packages_data: {
        event_pack: {
          purchased_at: now.toISOString(),
          expires_at: new Date(now.getTime() + (expiryDaysOffset > 0 ? 15 : -5) * 24 * 60 * 60 * 1000).toISOString(),
        },
        finance_pack: {
          purchased_at: now.toISOString(),
          expires_at: new Date(now.getTime() + (expiryDaysOffset > 0 ? 15 : -5) * 24 * 60 * 60 * 1000).toISOString(),
        },
        document_pack: {
          purchased_at: now.toISOString(),
          expires_at: new Date(now.getTime() + (expiryDaysOffset > 0 ? 15 : -5) * 24 * 60 * 60 * 1000).toISOString(),
        },
      },
    },
  };

  const status = evaluateSubscription(simulatedOrg);

  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Mock ledger data for Section 2.2
  const mockPayments = [
    { id: '1', phone: '0788123456', name: 'Jean Bosco Nsengiyumva', amount: 5000, code: 'TXN889102A', status: 'APPROVED', date: '2026-10-01 09:34', sms: 'TxId: TXN889102A. You have received 5,000 RWF from Jean Bosco Nsengiyumva (0788123456) on 01/10/2026 09:34. Balance: 420,500 RWF.' },
    { id: '2', phone: '0799876543', name: 'Marie Jeanne Uwimana', amount: 15000, code: 'TXN552190B', status: 'APPROVED', date: '2026-10-01 10:12', sms: 'TxId: TXN552190B. You have received 15,000 RWF from Marie Jeanne Uwimana (0799876543) on 01/10/2026 10:12. Balance: 435,500 RWF.' },
    { id: '3', phone: '0755432109', name: 'Emmanuel Hategekimana', amount: 5000, code: 'TXN112039C', status: 'AWAITING REVIEW', date: '2026-10-01 14:45', sms: 'TxId: TXN112039C. You have received 5,000 RWF from Emmanuel Hategekimana (0755432109) on 01/10/2026 14:45. Balance: 440,500 RWF.' },
    { id: '4', phone: '0788556677', name: 'Clarisse Umutoni', amount: 5000, code: 'TXN994411D', status: 'REJECTED', date: '2026-09-29 16:20', sms: 'TxId: TXN994411D. Failed transaction reference mismatch from Clarisse Umutoni.' },
  ];

  // Mock attendance rosters for Section 2.3
  const mockAttendance = [
    { name: 'Jean Bosco Nsengiyumva', role: 'Board Member', time: '08:45 AM', checkedIn: true },
    { name: 'Marie Jeanne Uwimana', role: 'Treasurer', time: '08:52 AM', checkedIn: true },
    { name: 'Emmanuel Hategekimana', role: 'Member', time: '09:02 AM', checkedIn: true },
    { name: 'Anicet Ruzindana', role: 'Member', time: '09:05 AM', checkedIn: true },
    { name: 'Vestine Mukakigeli', role: 'Member', time: '09:15 AM', checkedIn: true },
    { name: 'Sylvestre Ndayisaba', role: 'Auditor', time: '--', checkedIn: false },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Simulation Controls Console */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
              <Settings className="h-6 w-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base md:text-lg">Workspace Engine Simulator</h3>
              <p className="text-[11px] text-slate-400 font-medium">Configure subscription thresholds, grace periods, and modular add-on status in real-time</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-mono uppercase font-bold text-slate-300">
              <Clock className="h-3.5 w-3.5" /> 2026 Production Spec
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {/* Col 1: Base Tier & Days Offset */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">1. Base Subscription Tier</label>
              <select 
                value={tier} 
                onChange={(e) => setTier(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 outline-none focus:border-emerald-500"
              >
                <option value="free">Free Forever (Max 30 members)</option>
                <option value="starter">Starter Plan (Max 100 members)</option>
                <option value="growth">Growth Plan (Max 500 members)</option>
                <option value="pro">Pro Plan (Max 2,500 members)</option>
                <option value="vip">VIP Plan (Max 10,000 members)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">2. Expiration Date Offset</label>
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min="-15" 
                  max="30" 
                  value={expiryDaysOffset}
                  onChange={(e) => setExpiryDaysOffset(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <span className="font-mono bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 shrink-0 font-bold text-slate-200">
                  {expiryDaysOffset >= 0 ? `+${expiryDaysOffset} Days` : `${expiryDaysOffset} Days (Expired)`}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Simulates grace periods (0 to -3 days) and full lockouts (&lt; -3 days).</p>
            </div>
          </div>

          {/* Col 2: Quota Limits Controls */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">3. Workspace Member Count</label>
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min="5" 
                  max="600" 
                  value={memberCount}
                  onChange={(e) => setMemberCount(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <span className="font-mono bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 shrink-0 font-bold text-slate-200">
                  {memberCount} Members
                </span>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider text-[10px]">4. Database File Storage</label>
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min="10" 
                  max="1200" 
                  value={storageMb}
                  onChange={(e) => setStorageMb(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <span className="font-mono bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 shrink-0 font-bold text-slate-200">
                  {storageMb} MB
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Add-on Modular Features */}
          <div className="space-y-3">
            <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">5. Modular Add-On Status ($4/mo Each)</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-slate-200 hover:text-white">
                <input 
                  type="checkbox" 
                  checked={eventPack} 
                  onChange={(e) => setEventPack(e.target.checked)}
                  className="rounded border-slate-700 accent-emerald-500 h-4 w-4"
                />
                <span>Event Attendance Pack (`event_pack`)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-slate-200 hover:text-white">
                <input 
                  type="checkbox" 
                  checked={financePack} 
                  onChange={(e) => setFinancePack(e.target.checked)}
                  className="rounded border-slate-700 accent-emerald-500 h-4 w-4"
                />
                <span>MoMo Finance Auditor Pack (`finance_pack`)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-slate-200 hover:text-white">
                <input 
                  type="checkbox" 
                  checked={docPack} 
                  onChange={(e) => setDocPack(e.target.checked)}
                  className="rounded border-slate-700 accent-emerald-500 h-4 w-4"
                />
                <span>Digital Resolutions Pack (`document_pack`)</span>
              </label>
            </div>
          </div>
        </div>

        {/* 2. Interactive Status Badges Bar */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-850 grid grid-cols-2 md:grid-cols-4 gap-4 text-center items-center">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Plan State</span>
            {status.isExpired ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">EXPIRED LOCKED</span>
            ) : status.isGracePeriod ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">GRACE PERIOD</span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">ACTIVE SECURED</span>
            )}
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Max Member Quota</span>
            <span className="text-xs font-mono font-bold text-slate-200">
              {memberCount} / {status.maxMembers}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Max Storage Quota</span>
            <span className="text-xs font-mono font-bold text-slate-200">
              {storageMb}MB / {status.maxStorageMb}MB
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Operating Mode</span>
            {status.readOnlyMode ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" /> SAFE READ-ONLY
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center gap-1">
                <Eye className="h-3 w-3" /> FULL WRITE-MODE
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Interactive Workspace Viewport (with Glassmorphic Peek lock overlay) */}
      <div className="relative border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm min-h-[500px] flex flex-col justify-between">
        
        {/* Background Workspace Ledger Area (Visible behind glass) */}
        <div className="p-6 md:p-8 flex-1 space-y-6">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 block uppercase">COOPERATIVE LEDGER PORTAL</span>
              <h4 className="text-lg font-black text-slate-800 dark:text-white font-display">
                {orgName} Internal Dashboard
              </h4>
            </div>
            <div className="flex gap-1.5">
              <button 
                onClick={() => setSelectedReport('resolution')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${selectedReport === 'resolution' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
              >
                <FileText className="h-3.5 w-3.5" /> Resolution Dossier
              </button>
              <button 
                onClick={() => setSelectedReport('momo_ledger')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${selectedReport === 'momo_ledger' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
              >
                <DollarSign className="h-3.5 w-3.5" /> MoMo Audit Logs
              </button>
              <button 
                onClick={() => setSelectedReport('attendance')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${selectedReport === 'attendance' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
              >
                <QrCode className="h-3.5 w-3.5" /> Attendance Roster
              </button>
              <button 
                onClick={() => setSelectedReport('signing')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${selectedReport === 'signing' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
              >
                <Award className="h-3.5 w-3.5" /> Signing Stamp
              </button>
            </div>
          </div>

          {/* RENDER REPORT TYPES */}
          {selectedReport === 'resolution' && (
            <div className="p-6 bg-slate-50 dark:bg-slate-900 border rounded-2xl relative overflow-hidden font-sans space-y-4 max-w-2xl mx-auto">
              {/* Watermark Section 2.4 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                <div className="rounded-full border-[18px] border-slate-900 h-64 w-64 flex items-center justify-center text-4xl font-extrabold text-slate-900">
                  IMPACTO
                </div>
              </div>

              <div className="text-center border-b pb-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-700 block">OFFICIAL ASSEMBLY RESOLUTION REPORT</span>
                <h2 className="text-xl font-extrabold font-display text-slate-900 dark:text-white mt-1 uppercase">{orgName}</h2>
                <p className="text-[10px] text-slate-400 font-medium">Approved in Alignment with RCA & RGB Audits • Kigali, Rwanda</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-medium bg-white dark:bg-slate-850 p-3.5 rounded-xl border">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Date & Duration</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{now.toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Quorum Attendance</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">84.3% Present (Verified)</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white border-l-4 border-emerald-600 pl-2">Executive Motion Resolution:</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  It was unanimously resolved by the general assembly of cooperative members that the financial ledger of 2026 Q3 transaction receipts stands approved. The treasury is hereby authorized to release immediate digital micro-disbursements for local agricultural inputs over verified MTN and Airtel APIs.
                </p>
              </div>

              <div className="pt-4 border-t border-dashed flex justify-between items-center text-[10px] font-mono">
                <div>
                  <span className="text-slate-400 block">Cryptographic Reference Hash:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">SIG-VERIFIED-4A9F2026B</span>
                </div>
                <button 
                  onClick={() => triggerCopy('SIG-VERIFIED-4A9F2026B', 'hash')}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition"
                >
                  {copiedText === 'hash' ? 'Copied!' : 'Copy Hash'}
                </button>
              </div>
            </div>
          )}

          {selectedReport === 'momo_ledger' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">MoMo Receipts Audit Ledger</h4>
                <span className="text-xxs font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 px-2.5 py-1 rounded-md border">
                  Direct Sandbox Gateway
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-850">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-850 text-slate-400 uppercase tracking-wider font-bold text-[10px]">
                      <th className="p-3.5">Payer Name / Phone</th>
                      <th className="p-3.5">Transaction Code</th>
                      <th className="p-3.5">Amount (RWF)</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Reconciliation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y font-medium text-slate-700 dark:text-slate-300">
                    {mockPayments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 dark:text-white">{p.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{p.phone}</div>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-[11px] text-slate-600 dark:text-slate-300">
                          {p.code}
                        </td>
                        <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white">
                          {p.amount.toLocaleString()} RWF
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            p.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                            p.status === 'AWAITING REVIEW' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                            'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <button 
                            onClick={() => setSelectedSms(p)}
                            className="text-xxs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            Verify MoMo SMS
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedReport === 'attendance' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3.5">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Contactless Roll Call Stamps</h4>
                  <p className="text-xxs text-slate-400">Section 2.3 Contactless Attendance Quorum Ledger</p>
                </div>
                <button 
                  onClick={() => triggerCopy(JSON.stringify(mockAttendance, null, 2), 'attendance_csv')}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="h-3.5 w-3.5" /> {copiedText === 'attendance_csv' ? 'JSON Copied!' : 'Export Ledger Data'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {mockAttendance.map((attendee, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border bg-slate-50/50 dark:bg-slate-850/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-xs text-slate-900 dark:text-white block truncate">{attendee.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded font-semibold">{attendee.role}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {attendee.checkedIn ? (
                        <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block mr-1" />
                          {attendee.time}
                        </div>
                      ) : (
                        <div className="text-[10px] font-semibold text-slate-400 font-mono">
                          ABSENT
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedReport === 'signing' && (
            <div className="p-6 bg-white dark:bg-slate-900 border rounded-2xl relative overflow-hidden font-sans space-y-4 max-w-xl mx-auto text-center">
              {/* 3-Circle Brand Watermark - Section 2.4 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
                <div className="relative w-40 h-40">
                  <div className="absolute top-0 left-0 w-24 h-24 rounded-full border border-emerald-600" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full border border-amber-600" />
                  <div className="absolute top-8 left-8 w-24 h-24 rounded-full border border-slate-600" />
                </div>
              </div>

              <div className="flex justify-center mb-2">
                <Award className="h-12 w-12 text-emerald-600" />
              </div>

              <h2 className="text-lg font-extrabold font-display text-slate-900 dark:text-white uppercase tracking-wider">
                Cryptographic Assembly Approval Stamp
              </h2>

              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                This resolution, generated for <strong className="text-slate-800 dark:text-slate-200">{orgName}</strong>, is signed with official cooperative cryptographic key signatures. Fully validated under standard protocol rules.
              </p>

              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-dashed text-left font-mono text-xxs space-y-1 max-w-md mx-auto">
                <div><span className="text-slate-400">ISSUER:</span> IMPACTO SYSTEM CORE</div>
                <div><span className="text-slate-400">VERIFIER ID:</span> RCA-REG-2026-99381</div>
                <div><span className="text-slate-400">SIGNATURE CHECKSUM:</span> SHA256-4a9f...e6b</div>
              </div>

              <div className="text-[10px] font-mono text-emerald-600 font-bold tracking-widest uppercase">
                ✓ CRYPTOGRAPHICALLY SECURED & READY FOR REGULATORY AUDITING
              </div>
            </div>
          )}
        </div>

        {/* 3. Glassmorphic Locking Shield Overlay (Satisfies Section 1.4 & 3.1 Expiry visual rules) */}
        {status.readOnlyMode && (
          <div className="absolute inset-0 bg-white/20 dark:bg-slate-950/20 backdrop-blur-md flex flex-col justify-end p-6 z-40">
            <div className="bg-slate-900/95 text-white p-6 rounded-3xl border border-slate-800 shadow-2xl max-w-2xl mx-auto w-full text-center space-y-5 animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600 animate-pulse" />
              
              <div className="flex flex-col items-center gap-2">
                <div className="h-11 w-11 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm md:text-base text-white tracking-wide uppercase">
                    Safe Read-Only Mode Active (Lockdown Safeguard)
                  </h4>
                  <p className="text-[11px] text-slate-400 max-w-lg mx-auto leading-relaxed mt-1">
                    Your trial subscription for <span className="font-extrabold text-white">@{orgSlug}</span> workspace has expired. In alignment with **Section 3.1**, no historical member lists or transaction data are deleted. Re-activate workspace to resume writing operations.
                  </p>
                </div>
              </div>

              {/* Safe Peek Settlement USSD Dock Bar (Section 1.4) */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-left space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400">SETTLEMENT DOCK BAR</span>
                  <span className="text-xxs font-mono text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                    Grace Period Ended
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Standard Renewal USSD Handset String:</span>
                    <span className="text-xs font-mono font-black text-emerald-400 block tracking-wide select-all">
                      *182*8*1*880099#
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => triggerCopy('*182*8*1*880099#', 'ussd')}
                      className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xxs font-bold text-slate-200 flex items-center gap-1.5 transition active:scale-95"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copiedText === 'ussd' ? 'Copied USSD!' : 'Copy String'}
                    </button>
                    <button
                      onClick={() => {
                        alert('Simulating direct handset trigger for *182*8*1*880099#. MTN / Airtel Mobile Money prompt pushed to linked administrator number.');
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-xxs font-extrabold text-white transition active:scale-95"
                    >
                      Trigger Dial Handler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Verified SMS Evidence Vault Modal (Section 2.2) */}
      {selectedSms && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">MoMo Evidence SMS Vault</span>
              </div>
              <button 
                onClick={() => setSelectedSms(null)}
                className="text-xs text-slate-400 hover:text-white font-bold"
              >
                Close
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 relative overflow-hidden font-mono text-xs text-emerald-400">
                {/* Embedded Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                  <div className="text-lg font-black tracking-widest uppercase">VERIFIED SECURE</div>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap font-semibold">
                  {selectedSms.sms}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3.5 text-xs">
                <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider">SMS Sender Phone:</span>
                  <span className="font-bold text-slate-200">{selectedSms.phone}</span>
                </div>
                <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Sender Name:</span>
                  <span className="font-bold text-slate-200 truncate block">{selectedSms.name}</span>
                </div>
                <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Receipt Reference:</span>
                  <span className="font-bold text-slate-200 font-mono">{selectedSms.code}</span>
                </div>
                <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Verified Auditor:</span>
                  <span className="font-bold text-emerald-400">✓ SEC-KEY-0938</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button 
                onClick={() => setSelectedSms(null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition"
              >
                Close Vault
              </button>
              <button 
                onClick={() => alert(`MoMo transaction receipt ${selectedSms.code} approved & persistent in Rwanda Revenue Authority / RCA ledger`)}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-750 text-white rounded-xl text-xs font-bold transition"
              >
                Approve Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
