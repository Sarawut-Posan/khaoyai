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

// External image URLs
export const IMAGE_URLS = {
  // Hero and backgrounds
  hero: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', // Mountain landscape

  // Activities - Thongsomboon Club
  thongsomboonMain: 'https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/7749363751758/Thongsomboon-Club-Ticket-884d86f3-59d7-44bf-9a7d-053321937325.jpeg',
  atv: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', // ATV riding
  zipline: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80', // Zipline adventure
  luge: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80', // Luge track
  goKart: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=800&q=80', // Go Kart racing
  paintball: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&q=80', // Paintball action
  archery: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=800&q=80', // Archery target
  horseRiding: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80', // Horse riding
  rafting: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80', // Water rafting
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
    time: '07:30',
    title: 'พบกันที่ บ้านพักเด็กและครอบครัว',
    icon: 'map-pin',
    description: 'จุดนัดพบที่บ้านพักเด็กและครอบครัว จ.สระบุรี',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
  },
  {
    time: '10:00',
    title: 'กิจกรรมบริจาค',
    icon: 'heart',
    description: 'กิจกรรมบริจาคที่บ้านพักเด็กและครอบครัว (30 นาที)',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
  },
  {
    time: '10:30',
    title: 'เดินทางสู่เขาใหญ่',
    icon: 'car',
    description: 'เดินทางจากสระบุรีสู่เขาใหญ่',
    image: IMAGE_URLS.hero,
  },
  {
    time: '12:00',
    title: 'ทานอาหารกลางวัน',
    icon: 'utensils',
    description: 'ครัวบ้านนายพล (1-1.5 ชม.)',
    image: IMAGE_URLS.kruaKhaoYai,
  },
  {
    time: '14:00',
    title: 'กิจกรรมที่ Rapsodia Park Khao Yai',
    icon: 'activity',
    description: 'ATV และนั่งชิล (1-2 ชม.)',
    image: IMAGE_URLS.atv,
  },
  {
    time: '16:30',
    title: 'ช้อปปิ้งที่ Makro Foodservice',
    icon: 'shopping-cart',
    description: 'ซื้อของทำอาหารเย็นและของว่าง',
    image: IMAGE_URLS.shopping,
  },
  {
    time: '18:00',
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

// Activities data for Slide 04 - Thongsomboon Club
export const ACTIVITIES: ActivityCard[] = [
  {
    id: 'atv',
    title: 'ATV ขับรถ 4 ล้อ',
    description: 'ลุยเส้นทาง 1,500 เมตร เหมาะกับทุกวัย',
    image: IMAGE_URLS.atv,
    icon: 'bike',
  },
  {
    id: 'zipline',
    title: 'Flying Fox (Zipline)',
    description: 'บินผ่านป่า ชมวิวสวยงามจากมุมสูง',
    image: IMAGE_URLS.zipline,
    icon: 'zap',
  },
  {
    id: 'luge',
    title: 'Luge สายรุ้ง',
    description: 'ลูจสุดมันส์กับเส้นทางสายรุ้ง',
    image: IMAGE_URLS.luge,
    icon: 'zap',
  },
  {
    id: 'gokart',
    title: 'Go Kart แข่งรถ',
    description: 'แข่งรถโกคาร์ทสนุกระทึกใจ',
    image: IMAGE_URLS.goKart,
    icon: 'truck',
  },
  {
    id: 'rafting',
    title: 'ล่องแก่ง',
    description: 'ล่องแก่งสนุกสนาน เย็นฉ่ำ',
    image: IMAGE_URLS.rafting,
    icon: 'zap',
  },
  {
    id: 'horseriding',
    title: 'ขี่ม้า',
    description: 'ขี่ม้าชมธรรมชาติรอบสวน (999฿)',
    image: IMAGE_URLS.horseRiding,
    icon: 'heart',
  },
  {
    id: 'archery',
    title: 'ยิงธนู',
    description: 'ฝึกสมาธิและความแม่นยำ',
    image: IMAGE_URLS.archery,
    icon: 'crosshair',
  },
  {
    id: 'paintball',
    title: 'Paintball ยิงสี',
    description: 'เกมยิงสีแบบทีม สร้างความสามัคคี',
    image: IMAGE_URLS.paintball,
    icon: 'target',
  },
];

// Thongsomboon Club pricing packages
export const THONGSOMBOON_PACKAGES = [
  {
    id: 'basic',
    price: '399',
    name: 'แพ็คเกจ Basic',
    duration: '3 ชั่วโมง',
    activities: '13 กิจกรรม',
    highlight: 'เล่นไม่จำกัดรอบ',
    includes: ['น้ำอัดลม 1 แก้ว'],
  },
  {
    id: 'premium',
    price: '499',
    name: 'แพ็คเกจ Premium',
    duration: '3 ชั่วโมง',
    activities: '13 กิจกรรม',
    highlight: 'เล่นไม่จำกัดรอบ + ATV',
    includes: ['บัตร ATV 1 ใบ', 'น้ำอัดลม 1 แก้ว', 'ไอศกรีม 1 โคน'],
    recommended: true,
  },
  {
    id: 'vip',
    price: '999',
    name: 'แพ็คเกจ VIP',
    duration: '4 ชั่วโมง',
    activities: '17 กิจกรรม',
    highlight: 'ครบทุกกิจกรรม + ขี่ม้า',
    includes: ['ขี่ม้า 1 รอบ', 'น้ำอัดลม 1 แก้ว', 'ไอศกรีม 1 โคน', 'Relax Zone'],
  },
];

// Promotions
export const THONGSOMBOON_PROMOTIONS = [
  {
    icon: 'baby',
    title: 'เด็กเล็กเข้าฟรี',
    description: 'ส่วนสูงต่ำกว่า 100 ซม.',
  },
  {
    icon: 'user',
    title: 'ผู้สูงอายุเข้าฟรี',
    description: 'อายุ 70 ปีขึ้นไป (แสดงบัตรประชาชน)',
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
  meetingPoint: 'บ้านพักเด็กและครอบครัว',
  meetingTime: '07:30 น.',
  estimatedArrival: 'ถึงบ้านพักเด็กฯ ไม่เกิน 10:00 น.',
  mapUrl: 'https://maps.app.goo.gl/XoyzzALf47VfxwQ36',
  donationActivity: '10:00-10:30 น. (ประมาณ 30 นาที)',
};

// Charity location information
export const CHARITY_INFO = {
  name: 'บ้านพักเด็กและครอบครัว',
  location: 'จ.สระบุรี',
  description: 'กิจกรรมบริจาคและมอบของให้กับบ้านพักเด็กและครอบครัว',
  mapUrl: 'https://maps.app.goo.gl/XoyzzALf47VfxwQ36',
  activityTime: '10:00-10:30 น.',
  duration: 'ประมาณ 30 นาที',
};

// Krua Ban Nai Phon Restaurant information
export const KRUA_BAN_NAI_PHON_INFO = {
  name: 'ครัวบ้านนายพล',
  type: 'อาหารไทย',
  description: 'ร้านอาหารไทยในเขาใหญ่',
  mapUrl: 'https://maps.google.com/?q=ครัวบ้านนายพล+เขาใหญ่',
  mealTime: '12:00-13:30 น.',
  duration: '1-1.5 ชั่วโมง',
};

// Rapsodia Park information
export const RAPSODIA_INFO = {
  name: 'Rapsodia Park Khao Yai',
  activities: ['ATV', 'นั่งชิล'],
  duration: '1-2 ชั่วโมง',
  mapUrl: 'https://maps.google.com/?q=Rapsodia+Park+Khao+Yai',
  description: 'สวนสนุกและกิจกรรมกลางแจ้งในเขาใหญ่',
};

// Tathamplaphow Restaurant (ตาทำปลาเผา) detailed information - LEGACY (ไม่ใช้แล้ว)
export const TATHAMPLAPHOW_INFO = {
  name: 'ตาทำปลาเผา',
  englishName: 'Tathamplaphow Restaurant',
  description: 'ร้านอาหารไทย จีน อีสาน ต้นตำรับปลาช่อนเผาสูตรโบราณไม่ทาเกลือ',
  phone: '081-876-4232',
  address: '3 ถนนปากช่อง-สัตหีบ ต.ปากช่อง อ.ปากช่อง นครราชสีมา 30130',
  hours: '10:00 - 22:00 น.',
  mapUrl: 'https://www.google.com/maps/place/Tathamplaphow+Restaurant/@14.6989259,101.4056615,14.64z/data=!4m6!3m5!1s0x311c2a4c054e63e3:0xbc52c6e80e1e27ae!8m2!3d14.708138!4d101.4049904!16s%2Fg%2F1hm6h6xbh',
  atmosphere: {
    aircon: true,
    spacious: true,
    parking: 'ลานจอดรถกว้างขวาง',
    highlight: 'โซนห้องแอร์ เพดานสูง โล่งโปร่งสบาย ใกล้ชิดกับธรรมชาติ',
  },
  menuHighlights: [
    {
      id: 'grilled-fish',
      name: 'ปลาช่อนเผา',
      description: 'ต้นตำรับเผาสูตรโบราณไม่ทาเกลือ ใช้เปลือกมะพร้าวและฟางเผา',
      price: 250,
      weight: '8 ตาถึง 1 กก.',
      image: 'https://images.unsplash.com/photo-1580959375944-0b9e9d447047?w=800&q=80', // Grilled fish
      isSignature: true,
    },
    {
      id: 'grilled-chicken',
      name: 'ไก่ย่าง',
      description: 'ไก่ย่างสไตล์อีสาน หอมเครื่องเทศ',
      price: 190,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80', // Grilled chicken
    },
    {
      id: 'isaan-sausage',
      name: 'ไส้กรอกอีสาน',
      description: 'ไส้กรอกอีสานรสจัดจ้าน เด็ดมาก',
      price: 120,
      image: 'https://images.unsplash.com/photo-1607330289275-8a430e8a4b1f?w=800&q=80', // Thai sausage
    },
    {
      id: 'curry-hoi-khom',
      name: 'แกงคั่วหอยขม',
      description: 'แกงคั่วรสเข้มข้น กลมกล่อม',
      price: 120,
      image: 'https://images.unsplash.com/photo-1604908815879-f9d71e0e9b0c?w=800&q=80', // Thai curry
    },
    {
      id: 'yam-pla-kapong',
      name: 'ยำปลากะพงกรอบ',
      description: 'ยำปลากรอบ รสจัดจ้าน เปรี้ยว เผ็ด อร่อย',
      price: 300,
      image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&q=80', // Thai salad
    },
    {
      id: 'fried-cabbage',
      name: 'กะหล่ำปลีผัดน้ำปลา',
      description: 'ผักกะหล่ำปลีผัดสไตล์ไทย',
      price: 90,
      image: 'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=800&q=80', // Stir-fried vegetables
    },
  ],
  specialties: [
    'ปลาช่อนเผาต้นตำรับสูตรโบราณ',
    'อาหารไทย จีน อีสาน รสชาติต้นตำรับ',
    'วัตถุดิบสดใหม่ทุกวัน',
    'จานอาหารขนาดใหญ่ เหมาะกับกลุ่ม',
  ],
  tips: [
    '💡 แนะนำจองล่วงหน้าสำหรับกลุ่มใหญ่',
    '🍽️ จานอาหารขนาดใหญ่ เหมาะสำหรับแชร์',
    '⏰ ร้านเปิด 10:00 น. พอดีกับเวลานัดพบ',
  ],
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
  rapsodiaMap: 'https://maps.google.com/?q=Rapsodia+Park+Khao+Yai',
  makroMap: 'https://maps.google.com/?q=Makro+Foodservice+Pak+Chong',
  charityMap: 'https://maps.app.goo.gl/XoyzzALf47VfxwQ36',
  kruaBanNaiPhonMap: 'https://maps.google.com/?q=ครัวบ้านนายพล+เขาใหญ่',
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
