import React from 'react';
import { 
  Car, Coffee, Activity, Utensils, ShoppingCart, 
  Home, Moon, Sun, Bike, Zap, Target, Crosshair, 
  Heart, Truck 
} from 'lucide-react';

export interface TimelineItem {
  time: string;
  title: string;
  icon: string;
  description?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  car: Car,
  coffee: Coffee,
  activity: Activity,
  utensils: Utensils,
  'shopping-cart': ShoppingCart,
  home: Home,
  moon: Moon,
  sun: Sun,
  bike: Bike,
  zap: Zap,
  target: Target,
  crosshair: Crosshair,
  heart: Heart,
  truck: Truck,
};

export default function Timeline({
  items,
  orientation = 'horizontal',
  className = '',
}: TimelineProps) {
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Activity;
    return <IconComponent className="w-5 h-5" />;
  };
  
  if (orientation === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {items.map((item, index) => (
          <div key={index} className="flex gap-4">
            {/* Icon and line */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sage text-white flex-shrink-0">
                {getIcon(item.icon)}
              </div>
              {index < items.length - 1 && (
                <div className="w-0.5 h-full min-h-[40px] bg-sage/30 mt-2" />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="font-sarabun text-sm text-sage font-semibold mb-1">
                {item.time}
              </div>
              <h4 className="font-kanit text-lg font-semibold text-charcoal mb-1">
                {item.title}
              </h4>
              {item.description && (
                <p className="font-sarabun text-sm text-charcoal/70">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Horizontal orientation
  return (
    <div className={`relative ${className}`}>
      {/* Progress line */}
      <div className="absolute top-6 left-0 right-0 h-0.5 bg-sage/30 hidden md:block" />
      <div 
        className="absolute top-6 left-0 h-0.5 bg-sage transition-all duration-500 hidden md:block"
        style={{ width: '100%' }}
      />
      
      {/* Timeline items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-between gap-6 md:gap-4">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center relative group"
          >
            {/* Icon */}
            <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-sage text-white mb-3 transition-transform duration-300 group-hover:scale-110">
              {getIcon(item.icon)}
            </div>
            
            {/* Time */}
            <div className="font-sarabun text-xs md:text-sm text-sage font-semibold mb-1">
              {item.time}
            </div>
            
            {/* Title */}
            <h4 className="font-kanit text-sm md:text-base font-semibold text-charcoal mb-1 px-2">
              {item.title}
            </h4>
            
            {/* Description - shown on hover */}
            {item.description && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 p-3 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                <p className="font-sarabun text-xs text-charcoal">
                  {item.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
