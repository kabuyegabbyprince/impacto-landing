import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, FileCheck } from 'lucide-react';
import { useLocalTranslation } from '../locales/additional-translations';
import { useOrganization, useCreateDonation } from '../hooks/useImpactoData';
import { Button, Input, Card, Avatar, EmptyState } from '../components/ui';

export const DonatePage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useLocalTranslation();

  const cleanSlug = slug?.startsWith('@') ? slug.slice(1) : slug;
  const { data: org, isLoading } = useOrganization(cleanSlug);
  const donationMutation = useCreateDonation();

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [amount, setAmount] = useState<number>(5000);
  const [msg, setMsg] = useState('');
  const [momoMethod, setMomoMethod] = useState<'mtn' | 'airtel'>('mtn');
  const [proofSent, setProofSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const presets = [1000, 5000, 10000, 25000];

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail || !amount) {
      setErrorMsg(t('Please fill in Name, Email and select Amount.'));
      return;
    }

    try {
      await donationMutation.mutateAsync({
        org_id: org?.id || '',
        amount,
        donor_name: donorName,
        donor_email: donorEmail,
        message: msg,
        payment_method: momoMethod,
        proof_url: '',
      });
      setProofSent(true);
    } catch {
      setErrorMsg(t('Failed to upload receipt record.'));
    }
  };

  if (isLoading)
    return <div className="p-16 text-center text-sm">{t('Validating Portal...')}</div>;
  if (!org)
    return <div className="p-16 text-center text-sm">{t('Organization workspace is offline.')}</div>;

  if (!org.donations_enabled) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <EmptyState
          title="Donations Not Active"
          message="This organization currently has public donations disabled."
          action={
            <Link to={`/@${org.slug}`}>
              <Button>Return to Profile</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const momoNumber =
    momoMethod === 'mtn' ? org.donation_mtn_number : org.donation_airtel_number;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-16 pt-8 px-4 font-sans select-none">
      <div className="w-full max-w-xl mx-auto flex flex-col gap-6 animate-in fade-in duration-150">
        <div className="flex flex-col gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
          <Link
            to={`/@${org.slug}`}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-600 font-bold mb-2 w-fit bg-white dark:bg-slate-900 border border-gray-250 dark:border-slate-800 px-3.5 py-1.5 rounded-full transition shadow-3xs cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Profile
          </Link>
          <div className="flex items-center gap-3">
            <Avatar name={org.name} size="xs" src={org.logo_url} />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-slate-900 dark:text-white leading-none">
                {org.name}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                {t('Branded Donation System')}
              </span>
            </div>
          </div>
        </div>

        {proofSent ? (
          <Card
            title={t('Donation Submitted')}
            className="text-center font-display flex flex-col items-center"
          >
            <div className="p-3 bg-emerald-50 rounded-full text-emerald-600 mb-4 h-12 w-12 flex items-center justify-center">
              <FileCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base md:text-lg">
              {t('Donation Submitted!')}
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mt-2">
              {t('Our administration at')} <strong>{org.name}</strong>{' '}
              {t(
                'has received your pledge. Your name will be approved and placed on our public wall shortly.'
              )}
            </p>
            <div className="flex gap-4 mt-8 w-full md:w-3/4 shrink-0 justify-center">
              <Button onClick={() => navigate(`/@${slug}`)} className="w-1/2">
                {t('Back to Profile')}
              </Button>
            </div>
          </Card>
        ) : (
          <form onSubmit={handleSubmitProof} className="flex flex-col gap-6">
            <Card title={t('MoMo Donation Options')}>
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-150 font-semibold mb-4 leading-normal">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label={t('Full Name (for Wall)')}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder={t('e.g. Alphonse Nshuti')}
                  />
                  <Input
                    label={t('Email (Auditable)')}
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="alphonse@work.rw"
                  />
                </div>

                {/* Amount presets */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">
                    {t('Donation Amount (RWF)')}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {presets.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setAmount(p)}
                        className={`py-2 text-xs font-bold rounded-lg border transition cursor-pointer ${
                          amount === p
                            ? 'bg-[var(--org-primary,#15803D)] border-[var(--org-primary,#15803D)] text-white shadow'
                            : 'bg-white dark:bg-slate-800 border-gray-250 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50'
                        }`}
                      >
                        {p.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 w-full">
                    <Input
                      type="number"
                      placeholder={t('Or enter custom amount in RWF')}
                      value={amount || ''}
                      onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <Input
                  label={t('Optional message')}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder={t('e.g. Keep up the high effort reforestation guides!')}
                />
              </div>
            </Card>

            {/* Merchant info */}
            <Card title={t('Rwandan Mobile Money Instructions')}>
              <div className="flex flex-col gap-4 text-xs font-medium">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setMomoMethod('mtn')}
                    className={`p-3.5 border rounded-xl font-bold font-display flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      momoMethod === 'mtn'
                        ? 'border-[#15803D] bg-emerald-50/40 text-[#15803D] dark:bg-emerald-950/40 dark:text-emerald-400'
                        : 'border-gray-250 dark:border-slate-800 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {t('MTN Mobile Money')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMomoMethod('airtel')}
                    className={`p-3.5 border rounded-xl font-bold font-display flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      momoMethod === 'airtel'
                        ? 'border-[#15803D] bg-emerald-50/40 text-[#15803D] dark:bg-emerald-950/40 dark:text-emerald-400'
                        : 'border-gray-250 dark:border-slate-800 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {t('Airtel Money')}
                  </button>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col gap-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-gray-500 leading-none">{t('Registered Name:')}</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {org.donation_account_name || org.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-gray-500 leading-none">{t('Registered Number:')}</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {momoNumber || t('Not Configured')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center leading-none">
                    <span className="text-gray-500">{t('Estimated confirm window:')}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {t('Instant — 2 hours')}
                    </span>
                  </div>
                </div>

                {/* Dial instructions */}
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-amber-800 dark:text-amber-300 text-[11px] leading-relaxed select-none">
                  <span className="font-bold text-amber-900 dark:text-amber-200 block">
                    {t('Dial to Deposit Instructions:')}
                  </span>
                  {t('Dial')}{' '}
                  <span className="font-bold font-mono text-gray-900 dark:text-white">*182#</span>{' '}
                  {t('on your mobile device. Pay Amount of')}{' '}
                  <strong>{amount.toLocaleString()} RWF</strong>{' '}
                  {t('directly to merchant code/phone listed above.')}
                </div>
              </div>
            </Card>

            <Button
              type="submit"
              loading={donationMutation.isPending}
              className="w-full py-3 text-sm font-bold shadow-md bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              {t('Confirm Donation')}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
