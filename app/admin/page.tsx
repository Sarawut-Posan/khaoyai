import Link from 'next/link';
import { Info, Clock, Activity, Utensils, Image as ImageIcon, ArrowRight } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  color: string;
}

const sections: Section[] = [
  {
    id: 'trip-info',
    title: 'ข้อมูลทริป',
    description: 'แก้ไขชื่อ วันที่ สถานที่ และจำนวนคน',
    icon: Info,
    href: '/admin/trip-info',
    color: 'bg-deep-forest',
  },
  {
    id: 'timeline',
    title: 'ตารางเวลา',
    description: 'จัดการกำหนดการและกิจกรรมตลอดทริป',
    icon: Clock,
    href: '/admin/timeline',
    color: 'bg-sage',
  },
  {
    id: 'activities',
    title: 'กิจกรรม',
    description: 'แก้ไขรายการกิจกรรมที่ Thongsomboon Club',
    icon: Activity,
    href: '/admin/activities',
    color: 'bg-terracotta',
  },
  {
    id: 'restaurants',
    title: 'ร้านอาหาร',
    description: 'จัดการข้อมูลร้านอาหารและติดต่อ',
    icon: Utensils,
    href: '/admin/restaurants',
    color: 'bg-deep-forest',
  },
  {
    id: 'images',
    title: 'รูปภาพ',
    description: 'อัพโหลดและจัดการรูปภาพทั้งหมด',
    icon: ImageIcon,
    href: '/admin/images',
    color: 'bg-sage',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-kanit font-bold text-deep-forest">
          Admin Dashboard
        </h1>
        <p className="text-lg text-charcoal/70">
          จัดการเนื้อหาและข้อมูลของ Khao Yai Presentation
        </p>
      </div>

      {/* Section Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.id}
              href={section.href}
              className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-deep-forest"
            >
              <div className="p-6 space-y-4">
                {/* Icon */}
                <div className={`${section.color} w-14 h-14 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h2 className="text-xl font-kanit font-bold text-charcoal group-hover:text-deep-forest transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    {section.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center text-deep-forest font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm">แก้ไข</span>
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-deep-forest">
        <h3 className="text-lg font-kanit font-bold text-charcoal mb-2">
          📝 คำแนะนำ
        </h3>
        <ul className="space-y-2 text-charcoal/70">
          <li>• คลิกที่การ์ดด้านบนเพื่อแก้ไขข้อมูลในแต่ละส่วน</li>
          <li>• การเปลี่ยนแปลงจะถูกบันทึกทันทีเมื่อกดปุ่ม &quot;บันทึก&quot;</li>
          <li>• รีเฟรชหน้า Presentation เพื่อดูการเปลี่ยนแปลง</li>
          <li>• รูปภาพควรมีขนาดไม่เกิน 5MB (รองรับ JPG, PNG, WebP)</li>
        </ul>
      </div>
    </div>
  );
}
