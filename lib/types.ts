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
  image?: string;
  isDayMarker?: boolean;
}

// Admin Panel Data Types
export interface TripInfo {
  title: string;
  subtitle: string;
  dates: string;
  location: string;
  teamSize: number;
}

export interface ImageUrls {
  [key: string]: string;
}

// Additional types for content data
export interface ThongsomboonPackage {
  id: string;
  price: string;
  name: string;
  duration: string;
  activities: string;
  highlight: string;
  includes: string[];
  recommended?: boolean;
}

export interface HouseRule {
  id: string;
  title: string;
  content: string;
}

export interface EveningActivity {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface Day2Option {
  id: string;
  title: string;
  description: string;
  icon: string;
  options: string[];
}

export interface DressCodeColor {
  name: string;
  hex: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface MakroChecklistItem {
  name: string;
  minQty: number | null;
  maxQty: number | null;
  unit: string;
  notes: string | null;
}

export interface MakroChecklistCategory {
  category: string;
  icon: string;
  items: MakroChecklistItem[];
}

export interface ThongsomboonPromotion {
  icon: string;
  title: string;
  description: string;
}

export interface DepartureInfo {
  meetingPoint: string;
  meetingTime: string;
  estimatedArrival: string;
  mapUrl: string;
}

export interface MenuHighlight {
  id: string;
  name: string;
  description: string;
  price: number;
  weight?: string;
  image: string;
  isSignature?: boolean;
}

export interface TathamplaphowInfo {
  name: string;
  englishName: string;
  description: string;
  phone: string;
  address: string;
  hours: string;
  mapUrl: string;
  atmosphere: {
    aircon: boolean;
    spacious: boolean;
    parking: string;
    highlight: string;
  };
  menuHighlights: MenuHighlight[];
  specialties: string[];
  tips: string[];
}

export interface BreakfastSpot {
  id: string;
  name: string;
  description: string;
  image: string;
  mapUrl: string;
}

export interface ExternalLinks {
  villaMap: string;
  thongSomboonMap: string;
  makroMap: string;
  shoppingChecklist: string;
  villaPhone: string;
}

export interface ContentData {
  version: string;
  lastModified: string;
  tripInfo: TripInfo;
  imageUrls: ImageUrls;
  timeline: TimelineItem[];
  activities: ActivityCard[];
  restaurants: RestaurantInfo[];
  thongsomboonPackages: ThongsomboonPackage[];
  villaZones: VillaZone[];
  houseRules: HouseRule[];
  eveningActivities: EveningActivity[];
  day2Options: Day2Option[];
  dressCodeColors: DressCodeColor[];
  checklistItems: ChecklistItem[];
  makroChecklist: MakroChecklistCategory[];
  shoppingCategories: ShoppingCategory[];
  thongsomboonPromotions: ThongsomboonPromotion[];
  departureInfo: DepartureInfo;
  tathamplaphowInfo: TathamplaphowInfo;
  breakfastSpots: BreakfastSpot[];
  externalLinks: ExternalLinks;
}
