'use client';

import { useState } from 'react';
import { Flight } from '@/lib/types';
import { Clock, Users, Wifi, Utensils, Star, ChevronDown, ChevronUp } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
  passengers: number;
  onBook: () => void;
}

export default function FlightCard({ flight, passengers, onBook }: FlightCardProps) {
  const [expanded, setExpanded] = useState(false);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const totalPrice = flight.price * passengers;

  const airlineColors: Record<string, string> = {
    'SW': 'bg-blue-500',
    'GA': 'bg-green-500',
    'PE': 'bg-purple-500',
    'AA': 'bg-red-500',
    'EC': 'bg-yellow-500',
    'SA': 'bg-indigo-500',
  };

  const bgColor = airlineColors[flight.airlineCode] || 'bg-gray-500';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Airline Info */}
          <div className="flex items-center gap-3 md:w-48">
            <div className={`${bgColor} text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold text-sm flex-shrink-0`}>
              {flight.airlineCode}
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">{flight.airline}</div>
              <div className="text-gray-500 text-xs">{flight.flightNumber}</div>
            </div>
          </div>

          {/* Flight Times */}
          <div className="flex-1 flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{formatTime(flight.departureTime)}</div>
              <div className="text-sm text-gray-500 font-medium">{flight.origin.code}</div>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="text-xs text-gray-400 mb-1">{flight.duration}</div>
              <div className="w-full flex items-center">
                <div className="flex-1 h-0.5 bg-gray-300"></div>
                <div className="mx-2 text-gray-400">✈</div>
                <div className="flex-1 h-0.5 bg-gray-300"></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {flight.stops === 0 ? (
                  <span className="text-green-600 font-medium">Direct</span>
                ) : (
                  <span>{flight.stops} stop{flight.stops > 1 ? 's' : ''}</span>
                )}
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{formatTime(flight.arrivalTime)}</div>
              <div className="text-sm text-gray-500 font-medium">{flight.destination.code}</div>
            </div>
          </div>

          {/* Price & Book */}
          <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 md:w-40">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">${flight.price}</div>
              <div className="text-xs text-gray-500">per person</div>
              {passengers > 1 && (
                <div className="text-sm text-gray-600 font-medium">Total: ${totalPrice}</div>
              )}
            </div>
            <button
              onClick={onBook}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Expand Details */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {expanded ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Flight Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {flight.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{flight.seatsAvailable} seats available</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="w-4 h-4" />
                  <span>{flight.cabinClass} Class</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Route</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">{flight.origin.code}</span> - {flight.origin.name}
                </div>
                <div className="pl-4 text-gray-400">↓ {flight.duration}</div>
                <div>
                  <span className="font-medium">{flight.destination.code}</span> - {flight.destination.name}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Amenities</h4>
              <div className="space-y-2">
                {flight.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    {amenity === 'In-flight Entertainment' ? (
                      <Wifi className="w-4 h-4 text-blue-500" />
                    ) : amenity === 'Meal Included' ? (
                      <Utensils className="w-4 h-4 text-green-500" />
                    ) : (
                      <Star className="w-4 h-4 text-yellow-500" />
                    )}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
