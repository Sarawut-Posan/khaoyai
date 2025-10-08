'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from './Image';

export interface CardProps {
  title: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  title,
  description,
  image,
  icon,
  footer,
  onClick,
  className = '',
}: CardProps) {
  const isClickable = !!onClick;
  
  const baseStyles = 'bg-white rounded-xl shadow-md overflow-hidden';
  const hoverStyles = isClickable ? 'cursor-pointer' : '';
  const combinedClassName = `${baseStyles} ${hoverStyles} ${className}`;
  
  return (
    <motion.div
      className={combinedClassName}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.3 },
      }}
      whileTap={isClickable ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image section */}
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="w-full h-full"
          />
        </div>
      )}
      
      {/* Content section */}
      <div className="p-4 sm:p-6">
        {/* Icon and title */}
        <div className="flex items-start gap-3 mb-2">
          {icon && (
            <div className="flex-shrink-0 text-terracotta">
              {icon}
            </div>
          )}
          <h3 className="font-kanit text-xl font-semibold text-charcoal">
            {title}
          </h3>
        </div>
        
        {/* Description */}
        {description && (
          <p className="font-sarabun text-base text-charcoal/80 mt-2">
            {description}
          </p>
        )}
      </div>
      
      {/* Footer section */}
      {footer && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
          {footer}
        </div>
      )}
    </motion.div>
  );
}
