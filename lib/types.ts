export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  seatsAvailable: number;
  cabinClass: string;
  amenities: string[];
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
  tripType: 'one-way' | 'round-trip';
}

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  nationality: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  flight: Flight;
  passengers: Passenger[];
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  contactEmail: string;
  contactPhone: string;
}
