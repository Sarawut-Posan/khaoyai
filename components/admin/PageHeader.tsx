import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export default function PageHeader({ title, description, icon: Icon, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-start space-x-3">
        {Icon && (
          <div className="p-2 bg-deep-forest/10 rounded-lg">
            <Icon className="w-6 h-6 text-deep-forest" />
          </div>
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-kanit font-bold text-deep-forest">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-charcoal/70 mt-1">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
