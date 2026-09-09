import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { getStoragePublicUrl } from '../../lib/storageService';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs md:text-sm gap-2',
    lg: 'px-6 py-2.5 text-sm md:text-base gap-2.5 shadow-sm',
  };

  const variantStyles = {
    primary:
      'bg-[#15803D] hover:bg-[#166534] text-white shadow-xs hover:shadow border border-transparent',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-xs',
    outline:
      'bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-3xs',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-xs',
    ghost:
      'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  prefixIcon,
  suffixIcon,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label && (
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {prefixIcon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center">
            {prefixIcon}
          </div>
        )}
        <input
          className={`w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl py-2 px-3 text-xs md:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-[#15803D] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#15803D] dark:focus:ring-emerald-500 transition-all ${
            prefixIcon ? 'pl-9' : ''
          } ${suffixIcon ? 'pr-9' : ''} ${error ? 'border-rose-500' : ''} ${className}`}
          {...props}
        />
        {suffixIcon && (
          <div className="absolute right-3 text-slate-400 pointer-events-none flex items-center">
            {suffixIcon}
          </div>
        )}
      </div>
      {error && <span className="text-xxs text-rose-500 font-medium">{error}</span>}
    </div>
  );
};

export interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  padding?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  padding = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-3xs hover:shadow-xs transition-all ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            {typeof title === 'string' ? (
              <h3 className="font-display font-bold text-sm md:text-base text-slate-900 dark:text-white">
                {title}
              </h3>
            ) : (
              title
            )}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={padding ? 'p-5' : ''}>{children}</div>
    </div>
  );
};

export interface BadgeProps {
  children: React.ReactNode;
  color?: 'green' | 'blue' | 'amber' | 'red' | 'purple' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'green',
  className = '',
}) => {
  const colors = {
    green:
      'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/80',
    blue:
      'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800/80',
    amber:
      'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/80',
    red:
      'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/80',
    purple:
      'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/80',
    slate:
      'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider border font-mono select-none ${colors[color]} ${className}`}
    >
      {children}
    </span>
  );
};

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name = 'User',
  src,
  size = 'md',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const sizes = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
  };

  const resolved = src ? getStoragePublicUrl(src, 'avatars') : '';

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-tr from-emerald-600 to-teal-500 overflow-hidden shrink-0 select-none ${sizes[size]} ${className}`}
    >
      {resolved && !hasError ? (
        <img
          src={resolved}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span>{initials || 'U'}</span>
      )}
    </div>
  );
};

export const ProgressBar: React.FC<{ progress: number; color?: string }> = ({
  progress,
  color = 'bg-emerald-600',
}) => {
  const clamped = Math.min(100, Math.max(0, progress));
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-300`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-3xs max-w-lg mx-auto">
      {icon && <div className="mb-4 text-slate-400">{icon}</div>}
      <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="text-xs text-slate-500 mt-1 max-w-sm leading-relaxed">
        {message}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  size = 'md',
  children,
}) => {
  if (!open) return null;

  const maxW = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className={`relative w-full ${maxW} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col`}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          {title && (
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <LucideIcons.X className="h-4.5 w-4.5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export interface TabsProps {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, active, onChange }) => {
  return (
    <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto select-none">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-xs md:text-sm font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
            active === tab.id
              ? 'border-[#15803D] dark:border-emerald-500 text-[#15803D] dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export function getLucideIcon(name: string, props: any = {}) {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Sparkles;
  return <IconComponent {...props} />;
}
