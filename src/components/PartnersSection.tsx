import React from 'react';

export const PartnersSection: React.FC = () => {
  const partners = [
    {
      name: 'Rwanda Development Board (RDB)',
      imageUrl: '/RDB_Logo.png',
    },
    {
      name: 'Rwanda Cooperative Agency (RCA)',
      imageUrl: '/RCA-Rwanda-Cooperative-Agency.jpg',
    },
    {
      name: 'MTN Mobile Money Rwanda',
      imageUrl: '/mtn.jpg',
    },
    {
      name: 'Airtel Money Rwanda',
      imageUrl: '/airtel.jpg',
    },
  ];

  return (
    <div className="py-8 px-6 bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl">
      <div className="text-center mb-6">
        <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
          Built in alignment with Rwandan regulatory frameworks and mobile money rails
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="h-14 px-4 py-2 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition duration-300 w-full max-w-[200px]"
            title={partner.name}
          >
            <img
              src={partner.imageUrl}
              alt={partner.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
