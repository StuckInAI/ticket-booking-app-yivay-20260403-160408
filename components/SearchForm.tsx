'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, ArrowLeftRight, Search } from 'lucide-react';
import { airports } from '@/lib/data';

export default function SearchForm() {
  const router = useRouter();
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [originSearch, setOriginSearch] = useState('');
  const [destSearch, setDestSearch] = useState('');
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const filteredOrigins = airports.filter(
    (a) =>
      a.city.toLowerCase().includes(originSearch.toLowerCase()) ||
      a.code.toLowerCase().includes(originSearch.toLowerCase()) ||
      a.country.toLowerCase().includes(originSearch.toLowerCase())
  );

  const filteredDests = airports.filter(
    (a) =>
      a.city.toLowerCase().includes(destSearch.toLowerCase()) ||
      a.code.toLowerCase().includes(destSearch.toLowerCase()) ||
      a.country.toLowerCase().includes(destSearch.toLowerCase())
  );

  const handleSwap = () => {
    const tempOrigin = origin;
    const tempOriginSearch = originSearch;
    setOrigin(destination);
    setOriginSearch(destSearch);
    setDestination(tempOrigin);
    setDestSearch(tempOriginSearch);
  };

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) return;
    const params = new URLSearchParams({
      origin,
      destination,
      departureDate,
      passengers: passengers.toString(),
      cabinClass,
      tripType,
      ...(returnDate && tripType === 'round-trip' ? { returnDate } : {}),
    });
    router.push(`/search?${params.toString()}`);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            tripType === 'one-way'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setTripType('one-way')}
        >
          One Way
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            tripType === 'round-trip'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setTripType('round-trip')}
        >
          Round Trip
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Origin */}
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            From
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="City or Airport"
              value={originSearch}
              onChange={(e) => {
                setOriginSearch(e.target.value);
                setShowOriginDropdown(true);
                if (!e.target.value) setOrigin('');
              }}
              onFocus={() => setShowOriginDropdown(true)}
              onBlur={() => setTimeout(() => setShowOriginDropdown(false), 200)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          {showOriginDropdown && filteredOrigins.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {filteredOrigins.map((airport) => (
                <button
                  key={airport.code}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
                  onMouseDown={() => {
                    setOrigin(airport.code);
                    setOriginSearch(`${airport.city} (${airport.code})`);
                    setShowOriginDropdown(false);
                  }}
                >
                  <div className="font-semibold text-gray-800">{airport.code}</div>
                  <div className="text-sm text-gray-500">{airport.city}, {airport.country}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap button + Destination */}
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            To
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="City or Airport"
              value={destSearch}
              onChange={(e) => {
                setDestSearch(e.target.value);
                setShowDestDropdown(true);
                if (!e.target.value) setDestination('');
              }}
              onFocus={() => setShowDestDropdown(true)}
              onBlur={() => setTimeout(() => setShowDestDropdown(false), 200)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button
              onClick={handleSwap}
              className="absolute -left-5 top-3 bg-blue-100 hover:bg-blue-200 rounded-full p-1 transition-colors z-10 hidden md:block"
            >
              <ArrowLeftRight className="w-3 h-3 text-blue-600" />
            </button>
          </div>
          {showDestDropdown && filteredDests.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {filteredDests.map((airport) => (
                <button
                  key={airport.code}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
                  onMouseDown={() => {
                    setDestination(airport.code);
                    setDestSearch(`${airport.city} (${airport.code})`);
                    setShowDestDropdown(false);
                  }}
                >
                  <div className="font-semibold text-gray-800">{airport.code}</div>
                  <div className="text-sm text-gray-500">{airport.city}, {airport.country}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Departure Date */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            Departure
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="date"
              min={today}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
        </div>

        {/* Return Date or Passengers */}
        {tripType === 'round-trip' ? (
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Return
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="date"
                min={departureDate || today}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Passengers & Class
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Users className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                  ))}
                </select>
              </div>
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm"
              >
                <option>Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {tripType === 'round-trip' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Passengers & Class
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Users className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                  ))}
                </select>
              </div>
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm"
              >
                <option>Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleSearch}
        disabled={!origin || !destination || !departureDate}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
      >
        <Search className="w-5 h-5" />
        Search Flights
      </button>
    </div>
  );
}
