import { Plane } from 'lucide-react';

const destinations = [
  { from: 'New York', to: 'London', code: 'JFK → LHR', price: 299, img: '🇬🇧', duration: '7h 30m' },
  { from: 'Los Angeles', to: 'Tokyo', code: 'LAX → HND', price: 599, img: '🇯🇵', duration: '11h 45m' },
  { from: 'Chicago', to: 'Paris', code: 'ORD → CDG', price: 349, img: '🇫🇷', duration: '8h 20m' },
  { from: 'Miami', to: 'Dubai', code: 'MIA → DXB', price: 499, img: '🇦🇪', duration: '14h 00m' },
  { from: 'New York', to: 'Singapore', code: 'JFK → SIN', price: 649, img: '🇸🇬', duration: '18h 30m' },
  { from: 'London', to: 'Sydney', code: 'LHR → SYD', price: 799, img: '🇦🇺', duration: '21h 00m' },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Popular Destinations</h2>
          <p className="text-gray-500 text-lg">Explore our most-booked routes with great prices</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <div
              key={i}
              className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-blue-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-3xl mb-2">{dest.img}</div>
                  <div className="font-bold text-gray-800">{dest.from} → {dest.to}</div>
                  <div className="text-sm text-gray-500">{dest.code}</div>
                </div>
                <Plane className="w-6 h-6 text-blue-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="text-sm font-medium text-gray-700">{dest.duration}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">From</div>
                  <div className="text-2xl font-bold text-blue-600">${dest.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
