'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Download, Home, Plane, Calendar, Users, Clock } from 'lucide-react';

export default function BookingConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bookingId = searchParams.get('bookingId') || '';
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const departureDate = searchParams.get('departureDate') || '';
  const airline = searchParams.get('airline') || '';
  const flightNumber = searchParams.get('flightNumber') || '';
  const departureTime = searchParams.get('departureTime') || '';
  const arrivalTime = searchParams.get('arrivalTime') || '';
  const duration = searchParams.get('duration') || '';
  const stops = Number(searchParams.get('stops') || 0);
  const passengers = Number(searchParams.get('passengers') || 1);
  const totalPrice = Number(searchParams.get('totalPrice') || 0);
  const contactEmail = searchParams.get('contactEmail') || '';
  const passengerName = searchParams.get('passengerName') || '';

  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Success Banner */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">Booking Confirmed!</h1>
        <p className="text-green-600 text-lg mb-4">Your flight has been successfully booked</p>
        <div className="inline-block bg-white border border-green-200 rounded-xl px-6 py-3">
          <span className="text-sm text-gray-500">Booking Reference</span>
          <div className="text-2xl font-bold text-gray-800 tracking-widest">{bookingId}</div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="bg-blue-600 text-white p-5">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Flight Details
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{formatTime(departureTime)}</div>
              <div className="text-xl font-semibold text-blue-600">{origin}</div>
            </div>
            <div className="flex-1 mx-6 flex flex-col items-center">
              <div className="text-sm text-gray-500 mb-1">{duration}</div>
              <div className="w-full flex items-center">
                <div className="flex-1 h-0.5 bg-gray-300"></div>
                <Plane className="mx-2 w-5 h-5 text-blue-500" />
                <div className="flex-1 h-0.5 bg-gray-300"></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {stops === 0 ? 'Direct' : `${stops} stop${stops > 1 ? 's' : ''}`}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{formatTime(arrivalTime)}</div>
              <div className="text-xl font-semibold text-blue-600">{destination}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                <Calendar className="w-3 h-3" />
                Date
              </div>
              <div className="font-semibold text-gray-800 text-sm">{departureDate}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                <Plane className="w-3 h-3" />
                Flight
              </div>
              <div className="font-semibold text-gray-800 text-sm">{flightNumber}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                <Users className="w-3 h-3" />
                Passengers
              </div>
              <div className="font-semibold text-gray-800 text-sm">{passengers}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                <Clock className="w-3 h-3" />
                Duration
              </div>
              <div className="font-semibold text-gray-800 text-sm">{duration}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Passenger & Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="font-bold text-gray-800 mb-3">Lead Passenger</h3>
          <div className="text-gray-600">{passengerName}</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="font-bold text-gray-800 mb-3">Contact</h3>
          <div className="text-gray-600 text-sm">{contactEmail}</div>
          <div className="text-xs text-gray-400 mt-1">Confirmation sent to this email</div>
        </div>
      </div>

      {/* Total Price */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-800 text-lg">Total Paid</span>
          <span className="text-2xl font-bold text-green-600">${totalPrice}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">Includes all taxes and fees · {airline}</div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl transition-colors"
        >
          <Download className="w-5 h-5" />
          Download E-Ticket
        </button>
        <button
          onClick={() => router.push('/')}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
