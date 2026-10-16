import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  Camera,
  Train,
  TreePine,
  Ship,
  CheckCircle2,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';
import { useSavedTrips } from '../context/SavedTripsContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

const SERVICES = [
  {
    id: "private-chauffeur",
    title: "Chauffeured Private Vehicle & Guide",
    category: "Transport & Guidance",
    icon: Car,
    tagline: "Dedicated English-speaking certified tourist chauffeur with modern A/C vehicle throughout your stay.",
    pricePerDayUSD: 75,
    pricingNote: "Includes vehicle, fuel, highway tolls, driver accommodation & meals",
    rating: 4.98,
    reviews: 620,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    features: [
      "Modern Toyota Prius / KDH Van with climate control & Wi-Fi",
      "SLTDA-licensed driver with extensive route expertise",
      "Flexible daily departures; stop anywhere for photos or tea",
      "Full passenger insurance & 24/7 roadside assistance"
    ],
    details: "Your private chauffeur meets you directly at Colombo Bandaranaike International Airport (CMB) and stays with your party for the duration of your custom itinerary. Drivers are hand-selected for route safety, punctuality, and deep local knowledge of scenic viewpoints and authentic eateries."
  },
  {
    id: "scenic-train",
    title: "Highland Scenic Train Reserved Tickets",
    category: "Scenic Rail",
    icon: Train,
    tagline: "Guaranteed reserved observation car tickets for the legendary Kandy to Ella blue train journey.",
    pricePerDayUSD: 35,
    pricingNote: "Per reserved ticket (First Class Observation Carriage)",
    rating: 4.95,
    reviews: 1140,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    features: [
      "Guaranteed seat bookings 30 days in advance (bypasses sellouts)",
      "Reserved First Class observation or Second Class window seating",
      "Physical ticket delivery to your hotel or airport greeting",
      "Luggage transfer directly to your destination hotel by vehicle"
    ],
    details: "The railway line connecting Kandy, Nanu Oya (Nuwara Eliya), and Ella is universally acclaimed as one of the world's most breathtaking train journeys. Seats routinely sell out minutes after release; our concierge secures your seats well in advance."
  },
  {
    id: "yala-safari-jeep",
    title: "VIP 4x4 Leopard Safari with Naturalist",
    category: "Wildlife Excursions",
    icon: Camera,
    tagline: "Open-top modified Toyota Land Cruiser with dedicated wildlife tracker in Yala or Wilpattu.",
    pricePerDayUSD: 140,
    pricingNote: "Includes private 4x4 jeep, park tracker, & bottled water (tickets excluded)",
    rating: 4.92,
    reviews: 580,
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80",
    features: [
      "Raised 6-seat viewing platform with camera charging ports",
      "Experienced native wildlife naturalist tracker",
      "Early entrance queue positioning for prime dawn sightings",
      "Binoculars provided for high-canopy birdwatching"
    ],
    details: "Experience the wilderness of Yala Block 1 or Wilpattu National Park in comfort. Our customized jeeps offer high clearance, quiet suspension, and wide canopy covers to maximize photography opportunities while respecting park regulations."
  },
  {
    id: "ayurveda-retreat",
    title: "Authentic Ceylon Ayurveda Immersion",
    category: "Wellness & Spa",
    icon: TreePine,
    tagline: "Centuries-old herbal medicine, therapeutic warm oil Shirodhara, and physician consultation.",
    pricePerDayUSD: 95,
    pricingNote: "Includes 2.5 hr full-body herbal therapy & physician intake",
    rating: 4.89,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    features: [
      "1-on-1 consultation with certified Ayurvedic doctor (BAMS)",
      "Herbal body wrap, warm herbal steam bath & head massage",
      "Customized organic dosha-balancing herbal infusions",
      "Set in tranquil colonial garden estates in Kandy or Galle"
    ],
    details: "Rooted in 3,000 years of indigenous medicine, authentic Sri Lankan Ayurveda balances mind, body, and spirit. Sessions use cold-pressed sesame oils infused with local wild herbs, bark, and lotus blossoms."
  },
  {
    id: "whale-charter",
    title: "Pelagic Blue Whale Marine Expedition",
    category: "Marine Corridors",
    icon: Ship,
    tagline: "Eco-certified boat voyage with marine biologist to observe migrating Blue Whales off Mirissa.",
    pricePerDayUSD: 65,
    pricingNote: "Per passenger with breakfast & hydrophone audio on board",
    rating: 4.86,
    reviews: 420,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    features: [
      "Strict compliance with whale-watching sanctuary distance codes",
      "Onboard marine biologist providing scientific commentary",
      "Life jackets, morning refreshments & motion-sickness remedies",
      "92% sighting success rate between November and April"
    ],
    details: "The continental shelf off Mirissa drops sharply into deep oceanic trenches, bringing the largest creatures on earth within miles of the coastline. Cruise ethically with experienced crews committed to marine conservation."
  }
];

export const TravelServices = () => {
  const navigate = useNavigate();
  const { startBooking } = useSavedTrips();
  const [selectedService, setSelectedService] = useState(null);

  const handleBookService = (service) => {
    startBooking({
      serviceType: service.id,
      title: service.title,
      destination: service.category,
      entryFeeUSD: 0,
      basePriceUSD: service.pricePerDayUSD,
      days: 1,
      travelers: 2,
    });
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="bg-brand-deep-ocean rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-luxury">
        <div className="relative z-10 max-w-2xl space-y-3">
          <Badge variant="aqua" size="sm" className="mb-2">
            Certified Travel Marketplace
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
            Curated Travel Services
          </h1>
          <p className="text-brand-seafoam-mist/85 text-sm sm:text-base leading-relaxed">
            Eliminate travel uncertainty. Book vetted private chauffeurs, guaranteed observation train passes, and ethical wildlife guides licensed by the Sri Lanka Tourism Development Authority.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-brand-ocean-teal/20 blur-3xl pointer-events-none" />
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-brand-deep-ocean">100% Licensed & Insured</h4>
            <p className="text-xs text-brand-deep-ocean/70 mt-0.5">Every driver and naturalist holds verified national credentials.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-brand-deep-ocean">Transparent Upfront Pricing</h4>
            <p className="text-xs text-brand-deep-ocean/70 mt-0.5">No hidden road tolls, fuel surcharges, or forced commission stops.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-brand-deep-ocean">Flexible Free Cancellations</h4>
            <p className="text-xs text-brand-deep-ocean/70 mt-0.5">Cancel or modify bookings up to 48 hours before start date.</p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-6">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-ocean-100 shadow-luxury overflow-hidden card-lift grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image Preview */}
              <div className="lg:col-span-4 relative aspect-[16/10] lg:aspect-auto">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="ocean" size="sm" className="bg-brand-deep-ocean/80 backdrop-blur-md text-white">
                    {service.category}
                  </Badge>
                </div>
              </div>

              {/* Service Info */}
              <div className="lg:col-span-5 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-ocean-teal mb-1">
                    <Icon className="w-4 h-4" />
                    <span>Verified Concierge Service</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-brand-deep-ocean">
                    {service.title}
                  </h3>
                  <p className="text-xs text-brand-deep-ocean/70 mt-2 leading-relaxed">
                    {service.tagline}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-brand-deep-ocean/85">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-tropical-aqua shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-ocean-50 flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-bold text-brand-deep-ocean">
                    <Star className="w-4 h-4 fill-brand-warm-sand text-brand-warm-sand" />
                    <span>{service.rating}</span>
                    <span className="text-brand-deep-ocean/50 font-normal">({service.reviews} reviews)</span>
                  </div>
                  <button
                    onClick={() => setSelectedService(service)}
                    aria-label={`View details for ${service.title}`}
                    className="text-xs font-bold text-brand-ocean-teal hover:underline flex items-center gap-1 ml-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ocean-teal rounded-lg px-2 py-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Service Details</span>
                  </button>
                </div>
              </div>

              {/* Pricing & Booking Column */}
              <div className="lg:col-span-3 p-6 bg-brand-seafoam-mist/40 border-t lg:border-t-0 lg:border-l border-ocean-100 flex flex-col justify-center text-center lg:text-left space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal block">
                    Starting From
                  </span>
                  <div className="text-3xl font-serif font-black text-brand-deep-ocean mt-1">
                    ${service.pricePerDayUSD} <span className="text-xs font-normal text-brand-deep-ocean/60 font-sans">USD</span>
                  </div>
                  <span className="text-[11px] text-brand-deep-ocean/70 block mt-1 leading-tight">
                    {service.pricingNote}
                  </span>
                </div>

                <Button
                  variant="coral"
                  size="md"
                  className="w-full shadow-coral-glow"
                  onClick={() => handleBookService(service)}
                >
                  Reserve Service
                </Button>

                <p className="text-[10px] text-brand-deep-ocean/60 text-center">
                  Instant confirmation • No booking fees
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
          subtitle={selectedService.category}
        >
          <div className="space-y-4">
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="w-full h-48 object-cover rounded-xl"
            />
            <p className="text-sm text-brand-deep-ocean/85 leading-relaxed">
              {selectedService.details}
            </p>
            <div className="p-4 rounded-xl bg-brand-seafoam-mist border border-ocean-100 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-brand-ocean-teal">
                What's Included
              </h5>
              <ul className="space-y-1.5 text-xs text-brand-deep-ocean">
                {selectedService.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-ocean-teal" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setSelectedService(null)}>
                Close
              </Button>
              <Button variant="coral" onClick={() => { setSelectedService(null); handleBookService(selectedService); }}>
                Book This Service (${selectedService.pricePerDayUSD} USD)
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
