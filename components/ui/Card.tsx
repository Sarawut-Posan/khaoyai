import React from 'react';

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
  
  const baseStyles = 'bg-white rounded-xl shadow-md transition-shadow duration-300 overflow-hidden';
  const hoverStyles = isClickable ? 'hover:shadow-lg cursor-pointer' : '';
  const combinedClassName = `${baseStyles} ${hoverStyles} ${className}`;
  
  return (
    <div
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
    >
      {/* Image section */}
      {image && (
        <div className="relative w-full h-48 bg-sand overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
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
    </div>
  );
}
