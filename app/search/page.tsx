import { Suspense } from 'react';
import Header from '@/components/Header';
import SearchResults from '@/components/SearchResults';
import Footer from '@/components/Footer';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
