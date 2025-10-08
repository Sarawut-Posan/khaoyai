import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-sarabun font-medium rounded-full';
  
  // Variant styles
  const variantStyles = {
    default: 'bg-sand text-charcoal',
    success: 'bg-sage text-white',
    warning: 'bg-terracotta text-white',
    info: 'bg-deepForest text-white',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <span className={combinedClassName}>
      {children}
    </span>
  );
}
