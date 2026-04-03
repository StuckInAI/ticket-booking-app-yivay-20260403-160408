import { Suspense } from 'react';
import Header from '@/components/Header';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <BookingForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
