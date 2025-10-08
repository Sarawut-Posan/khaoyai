import React from 'react';
import Link from 'next/link';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  onClick,
  href,
  disabled = false,
  className = '',
}: ButtonProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-sarabun font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-terracotta text-white hover:bg-terracotta/90 hover:scale-105 hover:shadow-lg',
    secondary: 'border-2 border-sage text-sage hover:bg-sage hover:text-white hover:scale-105',
    ghost: 'bg-transparent text-charcoal hover:bg-sand hover:scale-105',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }
  
  // Render as button
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      type="button"
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
