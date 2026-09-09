import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Modal, Input, Button } from '../ui';
import { useSubmitErrorReport } from '../../hooks/useImpactoData';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ open, onClose }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const submitErrorReport = useSubmitErrorReport();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactLoading(true);

    try {
      await submitErrorReport.mutateAsync({
        org_id: 'system',
        title: `Landing Contact: ${contactSubject || contactName}`,
        description: `Sender: ${contactName} (${contactEmail})\nSubject: ${
          contactSubject || 'N/A'
        }\n\nMessage:\n${contactMessage}`,
        priority: 'high',
      });
      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setContactSuccess(true);
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Contact support & registration desk">
      {contactSuccess ? (
        <div className="flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in zoom-in duration-200">
          <span className="p-3 bg-emerald-50 dark:bg-slate-900/40 text-emerald-600 rounded-full mb-4">
            <Check className="h-6 w-6" />
          </span>
          <h3 className="font-display font-extrabold text-sm text-gray-900 dark:text-white uppercase">
            Message submitted successfully!
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mt-2 leading-relaxed">
            Murakoze! Your registration or system inquiry has been dispatched to our support managers in
            Kigali. We will follow up via email within 24 hours.
          </p>
          <Button
            className="mt-6 font-bold"
            onClick={() => {
              setContactSuccess(false);
              onClose();
            }}
          >
            Back to landing page
          </Button>
        </div>
      ) : (
        <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 text-xs font-semibold">
          <p className="text-gray-500 dark:text-slate-400 font-medium leading-relaxed mb-1">
            Have complex questions about setting up your Organization, custom local workflows, or Mobile
            Money integrations? Fill in the form and our team in Kigali will respond promptly.
          </p>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 dark:text-slate-300">Full Name *</label>
            <Input
              type="text"
              name="name"
              placeholder="e.g. Jean Damascene"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 dark:text-slate-300">Email Address *</label>
            <Input
              type="email"
              name="email"
              placeholder="e.g. contact@cooperative.org"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 dark:text-slate-300">Subject (Optional)</label>
            <Input
              type="text"
              name="subject"
              placeholder="e.g. Setup support, Upgrade request"
              value={contactSubject}
              onChange={(e) => setContactSubject(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 dark:text-slate-300">Message / Inquiry *</label>
            <textarea
              name="message"
              placeholder="How can we help your social workspace?"
              required
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-gray-250 dark:border-slate-850 rounded-xl p-3 text-xs outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:ring-1 focus:ring-emerald-600 dark:focus:ring-emerald-400 transition min-h-[90px] resize-y text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={contactLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
              disabled={contactLoading}
            >
              {contactLoading ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
