import React from 'react';

export const Badge = ({
  children,
  variant = 'teal',
  size = 'md',
  className = '',
  icon: Icon,
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase gap-1",
    md: "px-2.5 py-1 text-xs font-semibold tracking-editorial uppercase gap-1.5",
    lg: "px-3.5 py-1.5 text-xs font-bold tracking-editorial uppercase gap-2",
  };

  const variantStyles = {
    teal: "bg-brand-ocean-teal/10 text-brand-deep-ocean border border-brand-ocean-teal/30",
    aqua: "bg-brand-tropical-aqua/15 text-brand-deep-ocean border border-brand-tropical-aqua/40",
    coral: "bg-brand-coral-energy/10 text-brand-coral-energy border border-brand-coral-energy/30 font-semibold",
    sand: "bg-brand-warm-sand/35 text-brand-deep-ocean border border-sand-400/60",
    ocean: "bg-brand-deep-ocean text-white border border-brand-deep-ocean/20",
    seafoam: "bg-brand-seafoam-mist text-brand-deep-ocean border border-ocean-200/80",
    editorial: "bg-white/90 text-brand-deep-ocean border border-brand-deep-ocean/15 shadow-sm",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md font-sans transition-colors ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.teal} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

