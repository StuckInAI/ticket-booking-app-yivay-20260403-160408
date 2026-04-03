'use client';

import Link from 'next/link';
import { Plane, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Plane className="w-6 h-6" />
            <span>SkyBook</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Flights
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              My Bookings
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Help
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Sign In
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Register
            </button>
          </div>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link href="/search" className="text-gray-600 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
                Flights
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
                My Bookings
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
                Help
              </Link>
              <div className="flex gap-3 pt-2">
                <button className="text-blue-600 font-semibold">Sign In</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">Register</button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
