import React from 'react';

export const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const baseStyles = "animate-pulse bg-brand-seafoam-mist/80 border border-ocean-100/60";

  const variantStyles = {
    rectangular: "rounded-2xl",
    circular: "rounded-full",
    text: "rounded-md h-4 w-full",
  };

  const inlineStyles = {};
  if (width) inlineStyles.width = width;
  if (height) inlineStyles.height = height;

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={inlineStyles}
      aria-hidden="true"
    />
  );
};
