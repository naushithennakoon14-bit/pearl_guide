import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'coral',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg btn-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-200 select-none tracking-normal";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    coral: "bg-brand-coral-energy text-white hover:bg-coral-600 shadow-sm hover:shadow-editorial focus-visible:ring-brand-coral-energy border border-coral-600/30",
    teal: "bg-brand-ocean-teal text-white hover:bg-ocean-700 shadow-sm hover:shadow-editorial focus-visible:ring-brand-ocean-teal border border-ocean-700/30",
    ocean: "bg-brand-deep-ocean text-white hover:bg-ocean-900 shadow-editorial focus-visible:ring-brand-deep-ocean border border-ocean-900/40",
    sand: "bg-brand-warm-sand text-brand-deep-ocean hover:bg-sand-500 font-bold border border-sand-500/40 focus-visible:ring-brand-warm-sand",
    outline: "border border-brand-ocean-teal text-brand-deep-ocean hover:bg-brand-ocean-teal hover:text-white focus-visible:ring-brand-ocean-teal",
    'outline-white': "border border-white/80 text-white hover:bg-white hover:text-brand-deep-ocean focus-visible:ring-white",
    ghost: "text-brand-deep-ocean hover:bg-brand-ocean-teal/10 focus-visible:ring-brand-ocean-teal",
    aqua: "bg-brand-tropical-aqua text-brand-deep-ocean font-bold hover:bg-ocean-300 shadow-sm focus-visible:ring-brand-tropical-aqua border border-tropical-aqua/40",
    editorial: "bg-white text-brand-deep-ocean hover:bg-brand-seafoam-mist border border-brand-deep-ocean/20 shadow-paper focus-visible:ring-brand-deep-ocean",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        disabled || isLoading ? 'opacity-60 cursor-not-allowed transform-none' : ''
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
};
