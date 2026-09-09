import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenDemoModal: (plan?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Live Sandbox', href: '#interactive-demo' },
    { label: 'ROI Calculator', href: '#roi-calculator' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="navbar-brand-logo"
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Impacto
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono font-medium">
                v2.4
              </span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">High-Conversion Suite</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-indigo-400 after:absolute after:-bottom-1 after:left-0 after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            99.99% Edge Online
          </div>

          <button
            id="nav-action-demo-btn"
            onClick={() => onOpenDemoModal()}
            className="text-sm font-medium px-4 py-2 text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all duration-200 cursor-pointer"
          >
            Live Demo
          </button>

          <button
            id="nav-action-get-started-btn"
            onClick={() => onOpenDemoModal('growth')}
            className="text-sm font-semibold px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-lg shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-200 flex items-center gap-1.5 cursor-pointer group"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-panel"
          className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-6 py-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-slate-200 hover:text-indigo-400 py-1.5 border-b border-slate-800/50"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              id="mobile-nav-demo-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full text-center py-2.5 text-sm font-medium text-slate-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700"
            >
              Request 1-on-1 Walkthrough
            </button>
            <button
              id="mobile-nav-start-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal('starter');
              }}
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-500"
            >
              Start Free 14-Day Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
