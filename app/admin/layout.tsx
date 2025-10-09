import Link from 'next/link';
import { Home, Info, Clock, Activity, Utensils, Image as ImageIcon } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sand">
      {/* Navigation Header */}
      <nav className="bg-deep-forest text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link 
                href="/admin" 
                className="text-xl font-kanit font-bold hover:text-sage transition-colors"
              >
                Admin Panel
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/admin/trip-info"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-deep-forest/80 transition-colors"
                >
                  <Info size={18} />
                  <span>ข้อมูลทริป</span>
                </Link>
                <Link
                  href="/admin/timeline"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-deep-forest/80 transition-colors"
                >
                  <Clock size={18} />
                  <span>ตารางเวลา</span>
                </Link>
                <Link
                  href="/admin/activities"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-deep-forest/80 transition-colors"
                >
                  <Activity size={18} />
                  <span>กิจกรรม</span>
                </Link>
                <Link
                  href="/admin/restaurants"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-deep-forest/80 transition-colors"
                >
                  <Utensils size={18} />
                  <span>ร้านอาหาร</span>
                </Link>
                <Link
                  href="/admin/images"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-deep-forest/80 transition-colors"
                >
                  <ImageIcon size={18} />
                  <span>รูปภาพ</span>
                </Link>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 bg-terracotta rounded-md hover:bg-terracotta/90 transition-colors"
            >
              <Home size={18} />
              <span>กลับสู่หน้าหลัก</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
