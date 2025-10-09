import React from 'react';
import { Save, Loader2 } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function SaveButton({
  onClick,
  loading = false,
  disabled = false,
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}: SaveButtonProps) {
  const isDisabled = loading || disabled;

  const baseClasses = 'flex items-center justify-center space-x-2 rounded-lg transition-colors font-medium';

  const variantClasses = {
    primary: 'bg-deep-forest text-white hover:bg-deep-forest/90',
    secondary: 'bg-white text-deep-forest border-2 border-deep-forest hover:bg-deep-forest/5',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const disabledClasses = isDisabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClasses}`}
    >
      {loading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>กำลังบันทึก...</span>
        </>
      ) : (
        <>
          <Save size={20} />
          <span>{children || 'บันทึกข้อมูล'}</span>
        </>
      )}
    </button>
  );
}
