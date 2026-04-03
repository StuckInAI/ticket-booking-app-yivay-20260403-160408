import { Shield, Clock, CreditCard, Headphones, Award, Globe } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Your data and payments are protected with industry-standard encryption',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: Clock,
    title: 'Best Price Guarantee',
    description: 'Find a lower price? We will match it and give you an extra 10% off',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: CreditCard,
    title: 'Easy Payments',
    description: 'Multiple payment options including cards, PayPal, and more',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our customer support team is available around the clock to help you',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    icon: Award,
    title: 'Top Rated',
    description: 'Rated #1 flight booking platform by millions of travelers worldwide',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Access to flights from over 500 airlines across 150+ countries',
    color: 'text-teal-500',
    bg: 'bg-teal-50',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Why Choose SkyBook?</h2>
          <p className="text-gray-500 text-lg">Trusted by millions of travelers worldwide</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className={`${feature.bg} rounded-xl w-12 h-12 flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
