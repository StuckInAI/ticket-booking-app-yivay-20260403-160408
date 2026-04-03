import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div
        className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white"
        style={{ minHeight: '500px' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-96 h-96 bg-blue-400 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-10"></div>
        </div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Flight
            </h1>
            <p className="text-xl text-blue-100">
              Search hundreds of airlines to find the best deals
            </p>
          </div>
          <SearchForm />
        </div>
      </div>
      <FeaturedDestinations />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
