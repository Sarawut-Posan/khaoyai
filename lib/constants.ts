// Design system constants for the Khao Yai Presentation App
import { TimelineItem, ActivityCard, RestaurantInfo, ShoppingCategory } from './types';

// Color constants
export const COLORS = {
  deepForest: '#2F6B3C',
  sage: '#A8C3A1',
  terracotta: '#D17A47',
  sand: '#E8DCC8',
  charcoal: '#2B2B2B',
  white: '#FFFFFF',
} as const;

// Trip information
export const TRIP_INFO = {
  title: 'Khao Yai Getaway',
  subtitle: '14 Friends, 2D1N',
  dates: 'เสาร์ 8 - อาทิตย์ 9 พฤศจิกายน 2568',
  location: 'DN Poolvilla Khaoyai',
  teamSize: 14,
} as const;

// External image URLs (Unsplash - free for personal use)
export const IMAGE_URLS = {
  // Hero and backgrounds
  hero: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', // Mountain landscape

  // Activities
  atv: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', // ATV riding
  zipline: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80', // Zipline adventure
  paintball: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&q=80', // Paintball action
  archery: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=800&q=80', // Archery target
  horseRiding: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80', // Horse riding
  buggy: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80', // Off-road buggy

  // Restaurants and cafes
  midwinter: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', // Modern cafe
  chocolate: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80', // Chocolate cafe
  kruaKhaoYai: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', // Thai restaurant
  cafeAmazon: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80', // Coffee shop
  breakfastKrua: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', // Thai breakfast

  // Villa and accommodation
  villa: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80', // Pool villa
  villaPool: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80', // Swimming pool
  villaInterior: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', // Villa interior

  // Dress code / Fashion
  outfit1: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80', // Fashion woman
  outfit2: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80', // Fashion style
  outfit3: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', // Casual outfit
  outfit4: 'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=600&q=80', // Men fashion
  outfit5: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80', // Outdoor style
  outfit6: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80', // Group fashion

  // Day 2 options
  cafeBloom: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80', // Garden cafe
  viewpoint: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', // Mountain viewpoint
  shopping: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', // Shopping area

  // Nature and scenery
  forest: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&q=80', // Forest path
  grassField: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80', // Grass field
} as const;

// Timeline data for Slide 02
export const TIMELINE_DATA: TimelineItem[] = [
  {
    time: 'วันที่ 1',
    title: 'เสาร์ 8 พ.ย. 2568',
    icon: 'calendar',
    description: 'วันแรกของการเดินทาง',
    isDayMarker: true,
  },
  {
    time: '10:00',
    title: 'พบกันที่ Tathamplaphow Restaurant',
    icon: 'map-pin',
    description: 'นัดพบที่ร้าน Tathamplaphow Restaurant',
    image: IMAGE_URLS.breakfastKrua,
  },
  {
    time: '11:00',
    title: 'เดินทางสู่เขาใหญ่',
    icon: 'car',
    description: 'เดินทางด้วยรถตู้ ระยะทาง ~130 กม.',
    image: IMAGE_URLS.hero,
  },
  {
    time: '13:00',
    title: 'ทานอาหารกลางวัน',
    icon: 'utensils',
    description: 'ร้านอาหารในเขาใหญ่',
    image: IMAGE_URLS.kruaKhaoYai,
  },
  {
    time: '14:30',
    title: 'กิจกรรมที่ Thong Somboon Club',
    icon: 'activity',
    description: 'ATV, Zipline, Paintball และอื่นๆ',
    image: IMAGE_URLS.atv,
  },
  {
    time: '17:00',
    title: 'ช้อปปิ้งที่ Makro',
    icon: 'shopping-cart',
    description: 'ซื้อของทำอาหารเย็นและของว่าง',
    image: IMAGE_URLS.shopping,
  },
  {
    time: '18:30',
    title: 'เช็คอินวิลล่า',
    icon: 'home',
    description: 'DN Poolvilla Khaoyai - แบ่งห้องและพักผ่อน',
    image: IMAGE_URLS.villa,
  },
  {
    time: '20:00',
    title: 'ปาร์ตี้ริมสระ & ปิ้งย่าง',
    icon: 'flame',
    description: 'ทำอาหารเย็น คาราโอเกะ เล่นน้ำ',
    image: IMAGE_URLS.villaPool,
  },
  {
    time: 'วันที่ 2',
    title: 'อาทิตย์ 9 พ.ย. 2568',
    icon: 'calendar',
    description: 'วันที่สองและเดินทางกลับ',
    isDayMarker: true,
  },
  {
    time: '08:00',
    title: 'อาหารเช้าที่วิลล่า',
    icon: 'coffee',
    description: 'ทานอาหารเช้าพร้อมกัน',
    image: IMAGE_URLS.breakfastKrua,
  },
  {
    time: '10:00',
    title: 'กิจกรรมเช้า (ตัวเลือก)',
    icon: 'sun',
    description: 'คาเฟ่ จุดชมวิว หรือช้อปปิ้งของฝาก',
    image: IMAGE_URLS.cafeBloom,
  },
  {
    time: '12:00',
    title: 'เช็คเอาท์และทานอาหารกลางวัน',
    icon: 'utensils',
    description: 'เก็บของและเตรียมตัวเดินทางกลับ',
    image: IMAGE_URLS.kruaKhaoYai,
  },
  {
    time: '14:00',
    title: 'เดินทางกลับกรุงเทพฯ',
    icon: 'car',
    description: 'ถึงกรุงเทพฯประมาณ 17:00 น.',
    image: IMAGE_URLS.forest,
  },
];

// Activities data for Slide 04
export const ACTIVITIES: ActivityCard[] = [
  {
    id: 'atv',
    title: 'ATV ขับรถ 4 ล้อ',
    description: 'ขับรถ ATV ผ่านเส้นทางธรรมชาติ สนุกและท้าทาย',
    image: IMAGE_URLS.atv,
    icon: 'bike',
  },
  {
    id: 'zipline',
    title: 'Zipline บินผ่านป่า',
    description: 'บินชมวิวป่าเขาใหญ่จากมุมสูง ตื่นเต้นเร้าใจ',
    image: IMAGE_URLS.zipline,
    icon: 'zap',
  },
  {
    id: 'paintball',
    title: 'Paintball ยิงสี',
    description: 'เกมยิงสีแบบทีม สนุกและสร้างความสามัคคี',
    image: IMAGE_URLS.paintball,
    icon: 'target',
  },
  {
    id: 'archery',
    title: 'ยิงธนู',
    description: 'ฝึกสมาธิและความแม่นยำด้วยการยิงธนู',
    image: IMAGE_URLS.archery,
    icon: 'crosshair',
  },
  {
    id: 'horseriding',
    title: 'ขี่ม้า',
    description: 'ขี่ม้าชมธรรมชาติรอบ ๆ สนาม',
    image: IMAGE_URLS.horseRiding,
    icon: 'heart',
  },
  {
    id: 'buggy',
    title: 'Buggy Car',
    description: 'ขับรถบั๊กกี้ผ่านเส้นทางออฟโรด',
    image: IMAGE_URLS.buggy,
    icon: 'truck',
  },
];

// Restaurant data for Slide 05
export const RESTAURANTS: RestaurantInfo[] = [
  {
    name: 'Midwinter Green',
    type: 'คาเฟ่และอาหารฝรั่ง',
    phone: '044-365-999',
    mapUrl: 'https://maps.google.com/?q=Midwinter+Green+Khao+Yai',
    image: IMAGE_URLS.midwinter,
    notes: 'จองล่วงหน้าสำหรับกลุ่มใหญ่',
  },
  {
    name: 'Chocolate Factory',
    type: 'ร้านช็อกโกแลตและเบเกอรี่',
    phone: '044-297-555',
    mapUrl: 'https://maps.google.com/?q=Chocolate+Factory+Khao+Yai',
    image: IMAGE_URLS.chocolate,
    notes: 'มีที่นั่งกลุ่มใหญ่',
  },
  {
    name: 'Krua Khao Yai',
    type: 'อาหารไทยและอีสาน',
    phone: '086-123-4567',
    mapUrl: 'https://maps.google.com/?q=Krua+Khao+Yai',
    image: IMAGE_URLS.kruaKhaoYai,
    notes: 'อาหารอร่อย ราคาไม่แพง',
  },
];

// Shopping categories for Slide 06
export const SHOPPING_CATEGORIES: ShoppingCategory[] = [
  {
    icon: 'beef',
    name: 'อาหารสด',
    note: 'เนื้อสัตว์ ผัก ผลไม้',
  },
  {
    icon: 'package',
    name: 'อาหารแห้ง',
    note: 'เครื่องปรุง น้ำมัน ซอส',
  },
  {
    icon: 'wine',
    name: 'เครื่องดื่ม',
    note: 'น้ำดื่ม น้ำอัดลม เบียร์',
  },
  {
    icon: 'utensils',
    name: 'อุปกรณ์',
    note: 'จาน ช้อน ถุงขยะ',
  },
  {
    icon: 'ice-cream',
    name: 'ของว่าง',
    note: 'ขนม ไอศกรีม ผลไม้',
  },
  {
    icon: 'flame',
    name: 'อุปกรณ์ปิ้งย่าง',
    note: 'ถ่าน ไม้จิ้ม ฟอยล์',
  },
];

// Day 1 departure data for Slide 03
export const DEPARTURE_INFO = {
  meetingPoint: 'Tathamplaphow Restaurant',
  meetingTime: '10:00 น.',
  estimatedArrival: 'ถึงเขาใหญ่ประมาณ 09:30 น.',
  mapUrl: 'https://www.google.com/maps/place/Tathamplaphow+Restaurant/@14.6989259,101.4056615,14.64z/data=!4m6!3m5!1s0x311c2a4c054e63e3:0xbc52c6e80e1e27ae!8m2!3d14.708138!4d101.4049904!16s%2Fg%2F1hm6h6xbh?authuser=0&entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D',
};

export const BREAKFAST_SPOTS = [
  {
    id: 'cafe-amazon',
    name: 'Café Amazon ปากช่อง',
    description: 'คาเฟ่สะดวก อาหารเช้าหลากหลาย',
    image: IMAGE_URLS.cafeAmazon,
    mapUrl: 'https://maps.google.com/?q=Cafe+Amazon+Pak+Chong',
  },
  {
    id: 'krua-khao-yai',
    name: 'ครัวเขาใหญ่',
    description: 'อาหารไทยรสชาติดี บรรยากาศดี',
    image: IMAGE_URLS.breakfastKrua,
    mapUrl: 'https://maps.google.com/?q=Krua+Khao+Yai+Restaurant',
  },
];

// External links
export const EXTERNAL_LINKS = {
  villaMap: 'https://maps.google.com/?q=DN+Poolvilla+Khaoyai',
  thongSomboonMap: 'https://maps.google.com/?q=Thong+Somboon+Club+Khao+Yai',
  makroMap: 'https://maps.google.com/?q=Makro+Pak+Chong',
  shoppingChecklist: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID',
  villaPhone: '081-234-5678',
} as const;

// Villa zones for Slide 07
export const VILLA_ZONES = [
  {
    id: 'kitchen',
    name: 'ครัว',
    icon: 'chef-hat',
    description: 'ครัวพร้อมอุปกรณ์ครบครัน',
  },
  {
    id: 'pool',
    name: 'สระว่ายน้ำ',
    icon: 'waves',
    description: 'สระว่ายน้ำส่วนตัว',
  },
  {
    id: 'karaoke',
    name: 'ห้องคาราโอเกะ',
    icon: 'mic',
    description: 'ห้องคาราโอเกะพร้อมระบบเสียง',
  },
  {
    id: 'living',
    name: 'ห้องนั่งเล่น',
    icon: 'sofa',
    description: 'พื้นที่นั่งเล่นกว้างขวาง',
  },
  {
    id: 'bedroom',
    name: 'ห้องนอน',
    icon: 'bed',
    description: 'ห้องนอน 5 ห้อง รองรับ 14 คน',
  },
];

// House rules for Slide 07
export const HOUSE_RULES = [
  {
    id: 'checkin',
    title: 'เช็คอิน-เช็คเอาท์',
    content: 'เช็คอิน 14:00 น. / เช็คเอาท์ 12:00 น.',
  },
  {
    id: 'noise',
    title: 'เสียงดัง',
    content: 'กรุณาลดเสียงหลัง 22:00 น. เพื่อเพื่อนบ้าน',
  },
  {
    id: 'smoking',
    title: 'การสูบบุหรี่',
    content: 'สูบบุหรี่ได้เฉพาะพื้นที่กลางแจ้ง',
  },
  {
    id: 'pets',
    title: 'สัตว์เลี้ยง',
    content: 'ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก',
  },
  {
    id: 'waste',
    title: 'การจัดการขยะ',
    content: 'แยกขยะตามถังที่จัดเตรียมไว้',
  },
];

// Evening activities for Slide 08
export const EVENING_ACTIVITIES = [
  {
    id: 'boardgames',
    title: 'บอร์ดเกม',
    icon: 'dice',
    description: 'เกมหลากหลายสำหรับกลุ่ม',
  },
  {
    id: 'karaoke',
    title: 'คาราโอเกะ',
    icon: 'mic',
    description: 'ร้องเพลงสนุก ๆ กัน',
  },
  {
    id: 'pool',
    title: 'เล่นน้ำ',
    icon: 'waves',
    description: 'สระว่ายน้ำเปิดถึง 22:00 น.',
  },
  {
    id: 'bbq',
    title: 'ปิ้งย่าง',
    icon: 'flame',
    description: 'ปิ้งย่างริมสระ',
  },
  {
    id: 'photos',
    title: 'ถ่ายรูป',
    icon: 'camera',
    description: 'มุมถ่ายรูปสวย ๆ',
  },
  {
    id: 'chill',
    title: 'พักผ่อน',
    icon: 'coffee',
    description: 'นั่งเล่นคุยกัน',
  },
];

// Day 2 morning options for Slide 09
export const DAY2_OPTIONS = [
  {
    id: 'cafe',
    title: 'คาเฟ่เช้า',
    description: 'แวะคาเฟ่ดัง ๆ ในเขาใหญ่',
    icon: 'coffee',
    options: ['Bloom by TV Pool', 'The Bloom', 'Baan Suan Pai'],
  },
  {
    id: 'viewpoint',
    title: 'จุดชมวิว',
    description: 'ชมวิวภูเขาและทุ่งหญ้า',
    icon: 'mountain',
    options: ['ทุ่งหญ้าสวนหิน', 'จุดชมวิวเขาใหญ่'],
  },
  {
    id: 'shopping',
    title: 'ช้อปปิ้งของฝาก',
    description: 'ซื้อของฝากติดไม้ติดมือ',
    icon: 'shopping-bag',
    options: ['ตลาดโชคชัย 4', 'ร้านของฝากเขาใหญ่'],
  },
];

// Dress code colors for Slide 10
export const DRESS_CODE_COLORS = [
  { name: 'Deep Forest', hex: '#2F6B3C' },
  { name: 'Sage', hex: '#A8C3A1' },
  { name: 'Terracotta', hex: '#D17A47' },
  { name: 'Sand', hex: '#E8DCC8' },
  { name: 'Cream', hex: '#F5F1E8' },
  { name: 'Brown', hex: '#8B6F47' },
];

// Checklist items for Slide 12
export const CHECKLIST_ITEMS = [
  { id: 'clothes', label: 'เสื้อผ้าตามธีม Forest Terracotta' },
  { id: 'swimsuit', label: 'ชุดว่ายน้ำ' },
  { id: 'toiletries', label: 'อุปกรณ์ส่วนตัว' },
  { id: 'medicine', label: 'ยาประจำตัว' },
  { id: 'camera', label: 'กล้องถ่ายรูป' },
  { id: 'charger', label: 'ที่ชาร์จโทรศัพท์' },
  { id: 'sunscreen', label: 'ครีมกันแดด' },
  { id: 'hat', label: 'หมวก/แว่นกันแดด' },
];
