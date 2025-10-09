import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  message = 'กำลังโหลด...',
  size = 'md',
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerClasses = fullScreen
    ? 'flex flex-col items-center justify-center min-h-screen'
    : 'flex flex-col items-center justify-center min-h-[400px]';

  return (
    <div className={containerClasses}>
      <Loader2 className={`${sizeClasses[size]} text-deep-forest animate-spin mb-3`} />
      <div className="text-charcoal/70">{message}</div>
    </div>
  );
}
