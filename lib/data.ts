import { Flight, Airport } from './types';

export const airports: Airport[] = [
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
  { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
  { code: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'USA' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'USA' },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
  { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
  { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' },
];

export const generateFlights = (origin: string, destination: string, date: string): Flight[] => {
  const airlines = [
    { name: 'SkyWings Airlines', code: 'SW' },
    { name: 'Global Air', code: 'GA' },
    { name: 'Pacific Express', code: 'PE' },
    { name: 'Atlantic Airways', code: 'AA' },
    { name: 'Emirates Connect', code: 'EC' },
    { name: 'Star Alliance', code: 'SA' },
  ];

  const originAirport = airports.find((a) => a.code === origin) || airports[0];
  const destAirport = airports.find((a) => a.code === destination) || airports[1];

  const flights: Flight[] = [];
  const baseDate = date || new Date().toISOString().split('T')[0];

  const flightData = [
    { dep: '06:00', arr: '09:30', dur: '3h 30m', stops: 0, price: 299, seats: 12 },
    { dep: '08:15', arr: '14:45', dur: '6h 30m', stops: 1, price: 189, seats: 5 },
    { dep: '10:30', arr: '13:45', dur: '3h 15m', stops: 0, price: 349, seats: 8 },
    { dep: '12:00', arr: '20:30', dur: '8h 30m', stops: 2, price: 149, seats: 20 },
    { dep: '14:45', arr: '18:00', dur: '3h 15m', stops: 0, price: 399, seats: 3 },
    { dep: '16:30', arr: '22:00', dur: '5h 30m', stops: 1, price: 229, seats: 15 },
    { dep: '18:00', arr: '21:30', dur: '3h 30m', stops: 0, price: 279, seats: 9 },
    { dep: '20:15', arr: '06:45', dur: '10h 30m', stops: 1, price: 199, seats: 25 },
  ];

  flightData.forEach((fd, index) => {
    const airline = airlines[index % airlines.length];
    flights.push({
      id: `${origin}-${destination}-${index + 1}`,
      airline: airline.name,
      airlineCode: airline.code,
      flightNumber: `${airline.code}${100 + index * 37}`,
      origin: originAirport,
      destination: destAirport,
      departureTime: `${baseDate}T${fd.dep}:00`,
      arrivalTime: `${baseDate}T${fd.arr}:00`,
      duration: fd.dur,
      stops: fd.stops,
      price: fd.price,
      seatsAvailable: fd.seats,
      cabinClass: 'Economy',
      amenities: [
        ...(fd.stops === 0 ? ['Direct Flight'] : []),
        'In-flight Entertainment',
        'Meal Included',
        ...(fd.price > 300 ? ['Extra Legroom', 'Priority Boarding'] : []),
      ],
    });
  });

  return flights;
};
