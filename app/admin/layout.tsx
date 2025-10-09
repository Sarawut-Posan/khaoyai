'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Info, Clock, Activity, Utensils, Image as ImageIcon, Menu, X } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/trip-info', icon: Info, label: 'ข้อมูลทริป' },
    { href: '/admin/timeline', icon: Clock, label: 'ตารางเวลา' },
    { href: '/admin/activities', icon: Activity, label: 'กิจกรรม' },
    { href: '/admin/restaurants', icon: Utensils, label: 'ร้านอาหาร' },
    { href: '/admin/images', icon: ImageIcon, label: 'รูปภาพ' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-sand">
      {/* Navigation Header */}
      <nav className="bg-deep-forest text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Desktop Nav */}
            <div className="flex items-center space-x-4 lg:space-x-8">
              <Link 
                href="/admin" 
                className="text-xl font-kanit font-bold hover:text-sage transition-colors whitespace-nowrap"
              >
                Admin Panel
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-2 lg:space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                        isActive(item.href)
                          ? 'bg-white/20 text-white'
                          : 'hover:bg-deep-forest/80'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="hidden lg:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-terracotta rounded-md hover:bg-terracotta/90 transition-colors"
              >
                <Home size={18} />
                <span className="hidden md:inline">กลับสู่หน้าหลัก</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-deep-forest/80 transition-colors"
                aria-label="เปิดเมนู"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                        isActive(item.href)
                          ? 'bg-white/20 text-white'
                          : 'hover:bg-deep-forest/80'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 bg-terracotta rounded-md hover:bg-terracotta/90 transition-colors sm:hidden"
                >
                  <Home size={20} />
                  <span>กลับสู่หน้าหลัก</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
