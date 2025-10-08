// TypeScript interfaces for the Khao Yai Presentation App

export interface SlideProps {
  isActive?: boolean;
  onNavigate?: (slideIndex: number) => void;
}

export interface NavigationState {
  currentSlide: number;
  totalSlides: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export interface ActivityCard {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
}

export interface RestaurantInfo {
  name: string;
  type: string;
  phone: string;
  mapUrl: string;
  image: string;
  notes?: string;
}

export interface ShoppingCategory {
  icon: string;
  name: string;
  note: string;
}

export interface VillaZone {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface TimelineItem {
  time: string;
  title: string;
  icon: string;
  description?: string;
}
