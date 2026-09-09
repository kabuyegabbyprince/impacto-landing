import React from 'react';
import { Modal, Button } from '../ui';

interface PrivacyModalProps {
  open: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="ImpactO Privacy Policy & Data Protection Notice"
      size="lg"
    >
      <div className="flex flex-col gap-4 text-xs font-sans text-gray-700 dark:text-slate-300 select-none leading-relaxed overflow-y-auto max-h-[70vh] pr-1">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-800 dark:text-blue-300 font-semibold text-[11px]">
          Comprehensive Data Privacy Guarantee aligned with Rwanda Law N° 058/2021 relating to the
          Protection of Personal Data and Privacy.
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white border-b pb-1">
            1. Information We Collect
          </h4>
          <p>To provide cooperative management services, we securely collect:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[11px]">
            <li>
              <strong>Member Identity Data</strong>: Full name, phone number, national ID/passport number,
              email address, and assigned cooperative role.
            </li>
            <li>
              <strong>Financial Logs</strong>: Mobile Money transaction references, member dues payment
              slips, grant allocation records, and donation receipts.
            </li>
            <li>
              <strong>Operational Media</strong>: Organization logos, bylaws, general assembly minutes,
              and public news releases.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white border-b pb-1">
            2. Purpose of Data Processing
          </h4>
          <p>
            Collected information is strictly processed to manage cooperative membership registers, compute
            financial dues, verify identity trust levels, compile RCA compliance reports, and enable
            real-time committee chat messaging.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white border-b pb-1">
            3. Data Ownership & Non-Disclosure Guarantee
          </h4>
          <p>
            Your organization maintains 100% ownership of all uploaded data. ImpactO does{' '}
            <strong>never</strong> sell, lease, or distribute member lists or financial records to
            third-party advertisers or data brokers.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white border-b pb-1">
            4. Member Rights & Data Access
          </h4>
          <p>
            Under Rwandan Data Protection laws, members have the right to request access to their stored
            personal data, request correction of inaccurate records through their organization
            administrator, or request export of their personal activity logs upon offboarding.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white border-b pb-1">
            5. Security Infrastructure
          </h4>
          <p>
            All traffic between your browser or mobile phone and ImpactO is encrypted using 256-bit
            SSL/TLS protocol. Member credentials and authorization tokens are protected using
            industry-standard salted hashing and role-based access control (RBAC).
          </p>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button onClick={onClose} className="bg-emerald-700 text-white font-bold">
            Close Privacy Notice
          </Button>
        </div>
      </div>
    </Modal>
  );
};
