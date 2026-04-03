import Link from 'next/link';
import { Plane, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Plane className="w-6 h-6 text-blue-400" />
              <span>SkyBook</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted partner for finding the best flight deals worldwide.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@skybook.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/search" className="hover:text-blue-400 transition-colors">Search Flights</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">My Bookings</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Check-in Online</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Flight Status</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Cancellation Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Baggage Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Travel Insurance</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2024 SkyBook. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <span>🔒 Secure Payments</span>
            <span>✈️ 500+ Airlines</span>
            <span>🌍 150+ Countries</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
