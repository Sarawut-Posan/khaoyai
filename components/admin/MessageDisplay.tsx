import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export type MessageType = 'success' | 'error' | 'info' | 'warning';

interface MessageDisplayProps {
  type: MessageType;
  message: string;
  onClose?: () => void;
  className?: string;
}

export default function MessageDisplay({
  type,
  message,
  onClose,
  className = '',
}: MessageDisplayProps) {
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
    },
  };

  const { icon: Icon, bgColor, textColor, borderColor, iconColor } = config[type];

  return (
    <div
      className={`p-4 rounded-lg flex items-center space-x-3 border ${bgColor} ${textColor} ${borderColor} ${className}`}
      role="alert"
    >
      <Icon size={20} className={iconColor} />
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-black/5 rounded transition-colors"
          aria-label="ปิดข้อความ"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
