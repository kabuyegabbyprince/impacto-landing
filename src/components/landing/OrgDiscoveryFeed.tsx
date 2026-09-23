import React from 'react';
import { Download, Smartphone, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '../ui';

export const OrgDiscoveryFeed: React.FC = () => {
  return (
    <section
      id="discovery"
      className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-t border-gray-200 dark:border-slate-800 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-4 border border-emerald-200 dark:border-emerald-800">
          <Smartphone className="h-4 w-4" />
          <span>Official Mobile App Release</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black font-display text-gray-900 dark:text-white tracking-tight">
          Download Impacto for Android
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed">
          Access your cooperative workspace, record MoMo donations, verify credentials, and manage community projects directly from your Android device.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Android Download Card */}
          <Card className="p-8 border-2 border-emerald-500/40 bg-white dark:bg-slate-900 shadow-xl rounded-3xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-4 shadow-lg">
                <Download className="h-6 w-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
                Android APK v1.0
              </span>
              <h3 className="text-xl font-black font-display text-gray-900 dark:text-white mt-1">
                Impacto Android App
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-400 mt-2 leading-relaxed">
                Direct installation package optimized for all Android smartphones and tablets (Android 8.0+).
              </p>
              
              <ul className="mt-5 space-y-2.5 text-xs text-gray-700 dark:text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Offline sync & fast mobile access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Push notifications for meetings & goals</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
              <a
                href="/impacto.apk"
                download="impacto.apk"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-2xl shadow-md transition transform hover:-translate-y-0.5 cursor-pointer text-center"
              >
                <Download className="h-4 w-4" />
                <span>Download impacto.apk</span>
              </a>
              <span className="text-[10px] text-gray-400 text-center block mt-2 font-mono">
                Verified secure installation file (~18.4 MB)
              </span>
            </div>
          </Card>

          {/* iPhone / iOS Coming Soon Card */}
          <Card className="p-8 border border-gray-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 shadow-sm rounded-3xl flex flex-col justify-between opacity-90">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                iOS Platform
              </span>
              <h3 className="text-xl font-black font-display text-gray-900 dark:text-white mt-1">
                iPhone App Coming Soon
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-400 mt-2 leading-relaxed">
                Our native iOS application for iPhone and iPad is currently undergoing Apple App Store review and testing.
              </p>

              <div className="mt-5 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs text-gray-600 dark:text-slate-300">
                <span className="font-bold text-gray-900 dark:text-white block mb-1">Web Access Available</span>
                In the meantime, you can easily use Impacto on any iPhone via Safari by visiting our responsive web portal.
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800">
              <div className="w-full py-3 px-6 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-bold rounded-2xl text-center cursor-not-allowed select-none flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                <span>iPhone Version Coming Soon</span>
              </div>
              <span className="text-[10px] text-slate-400 text-center block mt-2 font-mono">
                Expected Q2 2026 on App Store
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
