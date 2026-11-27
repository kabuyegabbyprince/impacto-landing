import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Minus } from 'lucide-react';
import { Button } from '../ui';
import { PartnersSection } from '../PartnersSection';

interface FaqsSectionProps {
  onOpenContact: () => void;
}

export const FaqsSection: React.FC<FaqsSectionProps> = ({ onOpenContact }) => {
  const { t, i18n } = useTranslation();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const isRw = i18n.language?.startsWith('rw');
  const isFr = i18n.language?.startsWith('fr');

  const rwFaqs = [
    {
      id: 1,
      question: 'Impacto ni iki kandi ese ni uburyo bwo gucunga imiryango ku buntu?',
      answer:
        'Yego! Impacto ni uburyo bwuzuye bwo gucunga amakoperative n\'imiryango ku buntu 100%. Butanga ibikoresho byose by\'ingenzi — urutonde rw\'abanyamuryango, ibitabo by\'imari bya Mobile Money, ibiro by\'amabaruwa afite ikirango, kwandika abitabiriye na QR Code, n\'amatora mu mucyo ku buntu.',
    },
    {
      id: 2,
      question: 'Ibitabo by\'imari bya Mobile Money bikora bite kuri Impacto?',
      answer:
        'Impacto itanga igitabo cy\'imari gikurikirana inkunga n\'inkunga z\'abaturage. Abayobozi bashobora kwandika ibikorwa by\'imari byemejwe na nimero ya gihamya (MTN MoMo cyangwa Airtel Money ID), hagamijwe umucyo wa 100%.',
    },
    {
      id: 3,
      question: 'Ese mbuga z\'imiryango ziba ziri kuri Google / moteri zishakisha?',
      answer:
        'Yego! Buri muryango wemejwe uhabwa urubuga rwawo kuri app.impacto.rw/@slug. Uru rubuga rugaragaza ibikorwa bihari, impeshyi z\'inkunga zakusanyijwe, amatangazo, n\'inkunga zose mu buryo bugaragarira buri wese.',
    },
    {
      id: 4,
      question: 'Twaba dushobora gutumira abayobozi bacu cyangwa abakozi mu nzego zo mukarere?',
      answer:
        'Yego rwose. Impacto ifite inshingano zinyuranye: Ubuyobozi bushobora gucunga porogaramu, guhindura ibitabo by\'imari, no gutangaza amakuru, mu gihe abanyamuryango basanzwe bashobora kwerekana ko bahari bakokesheje QR code, cyangwa bagatunganya ibijyanye n\'amatora.',
    },
    {
      id: 5,
      question: 'Agasanduku ko kwandikisha abantu hakoreshejwe QR kodi ni iki?',
      answer:
        'Kugira ngo hemezwe ko inama rusange cyangwa amahugurwa byabayeho koko, abayobozi bashobora kurema QR kodi yihariye. Abanyamuryango bascaninga iyo kodi bakoresheje terefone zabo kugira ngo bandikwe ku rutonde rw\'ababonetse.',
    },
    {
      id: 6,
      question: 'Twakorera gute ihererekanya ry\'ifatabuguzi?',
      answer:
        'Ushobora guhindura ifatabuguzi mu buryo bworoshye unyuze ku kiganiro cy\'Igenamiterere ryawe. Ifatabuguzi ryishyurwa buri kwezi (agaciro mu mafaranga y\'u Rwanda - RWF kaboneka mu buryo bworoshye), kandi umwanya wo kubika ukaba wagera kuri 20GB ku rwego rwa Pro.',
    },
    {
      id: 7,
      question: 'Impacto yaba ifasha gukoresha indimi zinyuranye?',
      answer:
        'Yego kaboneka! urubuga ndetse n\'ibikorwa byarwo byose bikorwa mu ndimi eshatu: Ikinyarwanda (RW), Icyongereza (EN), ndetse n\'Igifaransa (FR), byorohereza abakozi gukora mu rurimi rwo guhitamo kwabo.',
    },
  ];

  const frFaqs = [
    {
      id: 1,
      question: 'Qu\'est-ce qu\'Impacto et est-ce un système de gestion d\'organisation gratuit ?',
      answer:
        'Impacto est un système complet et 100% gratuit de gestion d\'organisation conçu pour les coopératives, les ONG et les associations communautaires. Tous les modules essentiels — répertoires des membres, registres Mobile Money, studio de lettres à en-tête, pointage QR et vote numérique — sont inclus gratuitement.',
    },
    {
      id: 2,
      question: 'Comment fonctionnent les registres Mobile Money sur Impacto ?',
      answer:
        'Impacto propose un registre manuel et numérique auditable qui suit les campagnes de dons et le soutien local. Les administrateurs peuvent enregistrer les transactions vérifiées par rapport aux références de paiement officielles (MTN MoMo ou Airtel Money ID).',
    },
    {
      id: 3,
      question: 'Les pages publiques sous @slug sont-elles indexées par les moteurs de recherche ?',
      answer:
        'Oui ! Chaque espace de travail vérifié reçoit un profil public sur app.impacto.rw/@slug. Cette page présente les programmes civiques actifs, les jalons de campagne en temps réel, les annonces publiques et un mur de donateurs.',
    },
    {
      id: 4,
      question: 'Pouvons-nous inviter les membres de notre conseil d\'administration et nos agents de terrain ?',
      answer:
        'Absolument. Impacto dispose de rôles granulaires : les administrateurs peuvent coordonner les programmes, modifier les registres et publier des bulletins d\'information, tandis que les membres peuvent s\'enregistrer avec des codes QR.',
    },
    {
      id: 5,
      question: 'Qu\'est-ce que le registre de présence par QR Code ?',
      answer:
        'Pour vérifier les réunions physiques et les sessions de formation, les administrateurs peuvent générer des codes QR spécifiques. Les membres scannent simplement le code avec leur appareil mobile pour signer le registre de présence.',
    },
    {
      id: 6,
      question: 'Comment pouvons-nous mettre à niveau notre abonnement ?',
      answer:
        'Vous pouvez effectuer la transition entre les plans dans vos paramètres d\'administration. Les abonnements sont facturés mensuellement (avec des prix convertis en Francs Rwandais - RWF).',
    },
    {
      id: 7,
      question: 'Impacto prend-il en charge la traduction multilingue ?',
      answer:
        'Oui ! La plateforme et les processus de travail sont entièrement traduits pour prendre en charge l\'anglais, le français (FR) et le kinyarwanda (RW).',
    },
  ];

  const enFaqs = [
    {
      id: 1,
      question: 'What is Impacto and is it really a free organization management system?',
      answer:
        'Yes! Impacto is a complete, 100% free organization management system designed specifically for cooperatives, NGOs, and community associations. It provides all core modules — from member directories and Mobile Money dues to official letterhead document studios, dynamic QR attendance, and democratic voting — completely free forever.',
    },
    {
      id: 2,
      question: 'How do Mobile Money ledgers work on Impacto?',
      answer:
        'Impacto provides an auditable manual and digital ledger that tracks donor campaigns and local support. Administrators can log transactions, verified against official payment references (such as MTN MoMo or Airtel Money receipt IDs), ensuring 100% transparency in local fundraising.',
    },
    {
      id: 3,
      question: 'Are the public organization pages under @slug search-engine indexed?',
      answer:
        'Yes! Every verified workspace receives a public profile at app.impacto.rw/@slug. This public page showcases active civic programs, real-time campaign milestones, public announcements, and a donor wall to securely verify impact to the community and global partners.',
    },
    {
      id: 4,
      question: 'Can we invite our board members and field workers into the workspace?',
      answer:
        'Absolutely. Impacto has granular roles: Workspace Administrators can coordinate programs, edit ledger books, and publish news bulletins, while Field Members can check-in on-site using QR codes, upload documents, and participate in votes and decisions.',
    },
    {
      id: 5,
      question: 'What is the QR Attendance Register capability?',
      answer:
        'To verify physical community meetings and cooperative training sessions, admins can dynamically generate session-specific QR codes. Members simply scan the code with their mobile devices to sign the attendance log with a verified date stamp, keeping community operations honest and auditable.',
    },
    {
      id: 6,
      question: 'How can we upgrade our workspace subscription plan?',
      answer:
        'You can seamlessly transition between plans inside your Admin Panel Settings. Subscriptions are billed monthly (with approximate prices shown in Rwandan Francs - RWF), and storage scales up to 20GB on our Pro tier with priority technical support.',
    },
    {
      id: 7,
      question: 'Does Impacto support multi-language translation?',
      answer:
        'Yes! The core platform and workflows are fully localized to support English, French (FR), and Kinyarwanda (RW), ensuring field coordinators and community groups can operate in their language of choice.',
    },
  ];

  const faqsData = isRw ? rwFaqs : isFr ? frFaqs : enFaqs;

  return (
    <section
      id="faqs"
      className="py-20 bg-white dark:bg-slate-900 border-t border-gray-150 dark:border-slate-800 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 select-none">
          <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 block uppercase font-bold">
            {t('landing.faq_badge')}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-display mt-1 text-gray-950 dark:text-white uppercase leading-tight">
            {t('landing.faq_title')}
          </h2>
          <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
            {t('landing.faq_desc')}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {faqsData.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div
                key={faq.id}
                className="border border-gray-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden transition-all duration-150 shadow-xs"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-xs md:text-sm text-gray-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition duration-150 focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 p-1 bg-slate-50 dark:bg-slate-800 rounded-full border border-gray-150 dark:border-slate-700">
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Plus className="h-3.5 w-3.5 text-gray-400 dark:text-slate-400 shrink-0" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-600 dark:text-slate-300 leading-relaxed border-t border-gray-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Partners Section */}
        <div className="mt-12">
          <PartnersSection />
        </div>

        {/* Still have questions? Block */}
        <div className="mt-12 bg-emerald-50/50 dark:bg-slate-900/60 border border-emerald-100/80 dark:border-slate-800 p-8 rounded-3xl text-center max-w-xl mx-auto select-none animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
            {t('landing.contact_box_title')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 leading-relaxed">
            {t('landing.contact_box_desc')}
          </p>
          <div className="mt-5">
            <Button
              onClick={onOpenContact}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl transition cursor-pointer"
            >
              {t('landing.contact_box_btn')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
