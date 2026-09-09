import React from 'react';
import { Modal, Button } from '../ui';

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="ImpactO Terms of Service & Member Agreement"
      size="lg"
    >
      <div className="flex flex-col gap-4 text-xs font-sans text-gray-700 dark:text-slate-300 select-none leading-relaxed overflow-y-auto max-h-[70vh] pr-1">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 font-semibold text-[11px]">
          Official Operating Regulations for Cooperatives, Unions, Associations & Non-Profits using the
          ImpactO SaaS Management Platform (Regulated under Rwandan Law N° 058/2021).
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white border-b pb-1">
            1. Acceptance of Terms & Governance Framework
          </h4>
          <p>
            By registering an organization or logging into an active cooperative workspace on ImpactO,
            officers, administrators, and members agree to comply with these Terms of Service. ImpactO
            provides SaaS software infrastructure for member directories, financial ledgers, assembly
            votes, and grant tracking in accordance with Rwanda Development Board (RDB) and Rwanda
            Cooperative Agency (RCA) guidelines.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white border-b pb-1">
            2. Organizational Accuracy & Ledger Responsibility
          </h4>
          <p>
            Cooperative leaders and designated accountants are solely responsible for ensuring that member
            rosters, share contribution records, and Mobile Money deposit slips uploaded to the platform
            reflect legitimate transaction histories. Falsification of audit records or improper manual
            balance adjustments constitutes a breach of platform terms.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white border-b pb-1">
            3. Subscription Plans & Mobile Money Billing
          </h4>
          <p>
            Platform licensing (Starter, Growth, Pro / Enterprise) is billed on a monthly or annual
            auto-recurring cycle via Mobile Money (MTN MoMo / Airtel Money) or international card
            processing. Plan upgrades apply immediately. Cancellations must be initiated prior to the
            renewal date; paid subscription periods remain active until term expiry.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white border-b pb-1">
            4. Anti-Fraud & Compliance Assurance
          </h4>
          <p>
            Organizations are strictly prohibited from using the platform for unauthorized crowdfunding,
            Ponzi schemes, unverified public donor requests, or illicit money transfers. ImpactO reserves
            the right to suspend workspaces flagged by regulators or anti-money laundering automated
            monitors.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white border-b pb-1">
            5. Uptime SLA & Data Backups
          </h4>
          <p>
            ImpactO guarantees a 99.9% platform uptime SLA, backed by automated hourly encrypted database
            snapshot backups and geo-redundant storage.
          </p>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button onClick={onClose} className="bg-emerald-700 text-white font-bold">
            I Understand & Accept
          </Button>
        </div>
      </div>
    </Modal>
  );
};
