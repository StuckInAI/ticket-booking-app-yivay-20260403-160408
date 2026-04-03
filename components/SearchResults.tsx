'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { generateFlights } from '@/lib/data';
import { Flight } from '@/lib/types';
import FlightCard from './FlightCard';
import SearchFilters from './SearchFilters';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const departureDate = searchParams.get('departureDate') || '';
  const passengers = Number(searchParams.get('passengers') || 1);
  const cabinClass = searchParams.get('cabinClass') || 'Economy';

  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [stopsFilter, setStopsFilter] = useState<number[]>([0, 1, 2]);
  const [showFilters, setShowFilters] = useState(false);

  const flights = useMemo(() => {
    return generateFlights(origin, destination, departureDate);
  }, [origin, destination, departureDate]);

  const filteredAndSorted = useMemo(() => {
    let result = flights.filter(
      (f) => f.price <= maxPrice && stopsFilter.includes(f.stops)
    );

    result.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'departure')
        return a.departureTime.localeCompare(b.departureTime);
      return a.duration.localeCompare(b.duration);
    });

    return result;
  }, [flights, maxPrice, stopsFilter, sortBy]);

  const handleBookFlight = (flight: Flight) => {
    const params = new URLSearchParams({
      flightId: flight.id,
      origin,
      destination,
      departureDate,
      passengers: passengers.toString(),
      cabinClass,
      price: flight.price.toString(),
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      duration: flight.duration,
      stops: flight.stops.toString(),
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {origin} → {destination}
          </h1>
          <p className="text-gray-500">
            {departureDate} · {passengers} {passengers === 1 ? 'passenger' : 'passengers'} · {cabinClass}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <SearchFilters
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            stopsFilter={stopsFilter}
            setStopsFilter={setStopsFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters & Sort
          </button>
          {showFilters && (
            <div className="mt-4">
              <SearchFilters
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                stopsFilter={stopsFilter}
                setStopsFilter={setStopsFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 font-medium">
              {filteredAndSorted.length} flights found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'duration' | 'departure')}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="price">Price</option>
                <option value="duration">Duration</option>
                <option value="departure">Departure Time</option>
              </select>
            </div>
          </div>

          {filteredAndSorted.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow">
              <div className="text-6xl mb-4">✈️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No flights found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSorted.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  passengers={passengers}
                  onBook={() => handleBookFlight(flight)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
