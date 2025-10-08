'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-sarabun font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-terracotta text-white',
    secondary: 'border-2 border-sage text-sage',
    ghost: 'bg-transparent text-charcoal',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  // Animation variants
  const hoverVariants = {
    primary: {
      scale: 1.05,
      backgroundColor: 'rgba(209, 122, 71, 0.9)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    secondary: {
      scale: 1.05,
      backgroundColor: '#A8C3A1',
      color: '#FFFFFF',
    },
    ghost: {
      scale: 1.05,
      backgroundColor: '#E8DCC8',
    },
  };
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        <motion.span
          className="flex items-center justify-center gap-2 w-full h-full"
          whileHover={!disabled ? hoverVariants[variant] : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          transition={{ duration: 0.3 }}
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </motion.span>
      </Link>
    );
  }
  
  // Render as button
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      type="button"
      whileHover={!disabled ? hoverVariants[variant] : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ duration: 0.3 }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
