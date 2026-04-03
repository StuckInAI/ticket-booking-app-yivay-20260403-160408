'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { User, Mail, Phone, CreditCard, Shield, ChevronRight } from 'lucide-react';
import { Passenger } from '@/lib/types';

export default function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const flightId = searchParams.get('flightId') || '';
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const departureDate = searchParams.get('departureDate') || '';
  const passengers = Number(searchParams.get('passengers') || 1);
  const price = Number(searchParams.get('price') || 0);
  const airline = searchParams.get('airline') || '';
  const flightNumber = searchParams.get('flightNumber') || '';
  const departureTime = searchParams.get('departureTime') || '';
  const arrivalTime = searchParams.get('arrivalTime') || '';
  const duration = searchParams.get('duration') || '';
  const stops = Number(searchParams.get('stops') || 0);

  const [step, setStep] = useState(1);
  const [passengerData, setPassengerData] = useState<Passenger[]>(
    Array.from({ length: passengers }, (_, i) => ({
      id: `p${i + 1}`,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      passportNumber: '',
      nationality: '',
      email: '',
      phone: '',
    }))
  );
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [loading, setLoading] = useState(false);

  const totalPrice = price * passengers;
  const taxes = Math.round(totalPrice * 0.12);
  const grandTotal = totalPrice + taxes;

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengerData];
    updated[index] = { ...updated[index], [field]: value };
    setPassengerData(updated);
  };

  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const isStep1Valid = passengerData.every(
    (p) => p.firstName && p.lastName && p.dateOfBirth && p.passportNumber && p.nationality
  );

  const isStep2Valid = contactEmail && contactPhone;

  const isStep3Valid = cardNumber.length >= 16 && cardName && cardExpiry && cardCvv.length >= 3;

  const handleConfirmBooking = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const bookingId = `BK${Date.now().toString().slice(-8)}`;
    const params = new URLSearchParams({
      bookingId,
      origin,
      destination,
      departureDate,
      airline,
      flightNumber,
      departureTime,
      arrivalTime,
      duration,
      stops: stops.toString(),
      passengers: passengers.toString(),
      totalPrice: grandTotal.toString(),
      contactEmail,
      passengerName: `${passengerData[0].firstName} ${passengerData[0].lastName}`,
    });
    router.push(`/confirmation?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Flight Summary */}
      <div className="bg-blue-600 text-white rounded-xl p-5 mb-6">
        <h2 className="font-bold text-lg mb-3">Flight Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-blue-200">Route</div>
            <div className="font-semibold">{origin} → {destination}</div>
          </div>
          <div>
            <div className="text-blue-200">Date</div>
            <div className="font-semibold">{departureDate}</div>
          </div>
          <div>
            <div className="text-blue-200">Flight</div>
            <div className="font-semibold">{airline} {flightNumber}</div>
          </div>
          <div>
            <div className="text-blue-200">Time</div>
            <div className="font-semibold">{formatTime(departureTime)} - {formatTime(arrivalTime)}</div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </div>
            <div className="ml-2 hidden md:block">
              <div className={`text-sm font-medium ${step >= s ? 'text-blue-600' : 'text-gray-400'}`}>
                {s === 1 ? 'Passenger Info' : s === 2 ? 'Contact Details' : 'Payment'}
              </div>
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 mx-4 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          {/* Step 1: Passenger Info */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Passenger Information
              </h3>
              {passengerData.map((passenger, index) => (
                <div key={passenger.id} className="mb-8">
                  {passengers > 1 && (
                    <h4 className="font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
                      Passenger {index + 1}
                    </h4>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={passenger.firstName}
                        onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                        className="input-field"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={passenger.lastName}
                        onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                        className="input-field"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        value={passenger.dateOfBirth}
                        onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number *</label>
                      <input
                        type="text"
                        value={passenger.passportNumber}
                        onChange={(e) => updatePassenger(index, 'passportNumber', e.target.value)}
                        className="input-field"
                        placeholder="AB1234567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
                      <input
                        type="text"
                        value={passenger.nationality}
                        onChange={(e) => updatePassenger(index, 'nationality', e.target.value)}
                        className="input-field"
                        placeholder="American"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Continue to Contact Details
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Contact Details */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Contact Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="input-field pl-10"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Booking confirmation will be sent to this email</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="input-field pl-10"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!isStep2Valid}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Payment Details
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Your payment is secured with 256-bit SSL encryption</span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                      className="input-field pl-10"
                      placeholder="1234 5678 9012 3456"
                      maxLength={16}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name *</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="input-field"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                    <input
                      type="text"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="input-field"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!isStep3Valid || loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      Confirm & Pay ${grandTotal}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Price Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-5 sticky top-20">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Price Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Base fare ({passengers} {passengers === 1 ? 'passenger' : 'passengers'})</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes & fees (12%)</span>
                <span>${taxes}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-800 text-base">
                <span>Total</span>
                <span className="text-blue-600">${grandTotal}</span>
              </div>
            </div>

            <div className="mt-5 p-3 bg-blue-50 rounded-lg">
              <div className="text-xs font-semibold text-blue-700 mb-2">Booking Details</div>
              <div className="space-y-1 text-xs text-blue-600">
                <div>{origin} → {destination}</div>
                <div>{departureDate}</div>
                <div>{airline} · {flightNumber}</div>
                <div>{stops === 0 ? 'Direct Flight' : `${stops} Stop${stops > 1 ? 's' : ''}`}</div>
                <div>{duration}</div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3 text-green-500" />
                <span>Free cancellation within 24h</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3 text-green-500" />
                <span>Secure payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
