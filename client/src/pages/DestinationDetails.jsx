import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Star,
  Heart,
  Share2,
  Sparkles,
  Car,
  ChevronRight,
  Compass,
  CheckCircle2,
  AlertCircle,
  Camera,
  SunMedium
} from 'lucide-react';
import { destinationsData } from '../data/destinationsData';
import { useSavedTrips } from '../context/SavedTripsContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSaved, toggleSaveDestination, startBooking } = useSavedTrips();
  const { addToast } = useToast();

  const destination = destinationsData.find((d) => d.id === id) || destinationsData[0];
  const [activeImage, setActiveImage] = useState(destination.image);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'highlights' | 'tips' | 'climate'

  const saved = isSaved(destination.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Destination link copied to clipboard!', 'info');
    }
  };

  const handleBookTour = () => {
    startBooking({
      serviceType: "destination_tour",
      title: `${destination.name} Guided Expedition`,
      destination: destination.name,
      entryFeeUSD: destination.entryFeeUSD,
      basePriceUSD: destination.entryFeeUSD + 65, // guide fee included
      days: 1,
      travelers: 2,
    });
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-brand-deep-ocean/70" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-ocean-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/destinations" className="hover:text-brand-ocean-teal transition-colors">Explore</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-deep-ocean">{destination.name}</span>
      </nav>

      {/* Main Header & Media Showcase */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="ocean" size="sm">{destination.region}</Badge>
              <Badge variant="aqua" size="sm">{destination.category}</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-brand-deep-ocean tracking-tight">
              {destination.name}
            </h1>
            <p className="text-sm sm:text-base text-brand-deep-ocean/80 max-w-2xl mt-2 leading-relaxed">
              {destination.tagline}
            </p>
          </div>

          {/* Social & Save Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-ocean-200 bg-white text-brand-deep-ocean hover:bg-brand-seafoam-mist transition-all"
              aria-label="Share destination"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <Button
              variant={saved ? "coral" : "outline"}
              size="md"
              icon={Heart}
              onClick={() => toggleSaveDestination(destination.id, destination.name)}
            >
              {saved ? "Saved in Bucket List" : "Save Destination"}
            </Button>
          </div>
        </div>

        {/* Cinematic Imagery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 rounded-2xl overflow-hidden aspect-[16/10] bg-ocean-100 shadow-luxury">
            <img
              src={activeImage}
              alt={destination.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto">
            {destination.gallery?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                aria-label={`View photo ${idx + 1} of ${destination.name}`}
                className={`relative rounded-xl overflow-hidden aspect-[16/10] flex-1 lg:h-32 border-2 transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ocean-teal ${
                  activeImage === img ? 'border-brand-coral-energy ring-2 ring-brand-coral-energy/30' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${destination.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-ocean-100 shadow-luxury text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal shrink-0">
            <Star className="w-5 h-5 fill-brand-warm-sand text-brand-warm-sand" />
          </div>
          <div>
            <div className="text-brand-deep-ocean/60 font-semibold">Traveler Rating</div>
            <div className="text-sm font-bold text-brand-deep-ocean">{destination.rating} / 5.0 ({destination.reviewCount} reviews)</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-brand-deep-ocean/60 font-semibold">Recommended Time</div>
            <div className="text-sm font-bold text-brand-deep-ocean">{destination.duration}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-brand-deep-ocean/60 font-semibold">Best Travel Season</div>
            <div className="text-sm font-bold text-brand-deep-ocean">{destination.bestTime.split('(')[0]}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-brand-deep-ocean/60 font-semibold">Foreign Entry Fee</div>
            <div className="text-sm font-bold text-brand-deep-ocean">
              {destination.entryFeeUSD === 0 ? 'Free Public Access' : `$${destination.entryFeeUSD} USD`}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tabbed Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab Headers */}
          <div className="flex border-b border-ocean-100 overflow-x-auto gap-4" role="tablist" aria-label="Destination details tabs">
            <button
              role="tab"
              aria-selected={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ocean-teal rounded-t-lg px-2 ${
                activeTab === 'overview'
                  ? 'border-brand-ocean-teal text-brand-ocean-teal'
                  : 'border-transparent text-brand-deep-ocean/60 hover:text-brand-deep-ocean'
              }`}
            >
              Overview & Heritage
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'highlights'}
              onClick={() => setActiveTab('highlights')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ocean-teal rounded-t-lg px-2 ${
                activeTab === 'highlights'
                  ? 'border-brand-ocean-teal text-brand-ocean-teal'
                  : 'border-transparent text-brand-deep-ocean/60 hover:text-brand-deep-ocean'
              }`}
            >
              Key Highlights
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'tips'}
              onClick={() => setActiveTab('tips')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ocean-teal rounded-t-lg px-2 ${
                activeTab === 'tips'
                  ? 'border-brand-ocean-teal text-brand-ocean-teal'
                  : 'border-transparent text-brand-deep-ocean/60 hover:text-brand-deep-ocean'
              }`}
            >
              Insider Logistics
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'climate'}
              onClick={() => setActiveTab('climate')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ocean-teal rounded-t-lg px-2 ${
                activeTab === 'climate'
                  ? 'border-brand-ocean-teal text-brand-ocean-teal'
                  : 'border-transparent text-brand-deep-ocean/60 hover:text-brand-deep-ocean'
              }`}
            >
              Climate & Monsoon
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="bg-white p-6 rounded-2xl border border-ocean-100 shadow-luxury space-y-4 animate-fade-in">
              <h2 className="text-xl font-serif font-bold text-brand-deep-ocean">
                About {destination.name}
              </h2>
              <p className="text-sm text-brand-deep-ocean/80 leading-relaxed">
                {destination.overview}
              </p>
              <div className="p-4 rounded-xl bg-brand-seafoam-mist/60 border border-ocean-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-ocean-teal shrink-0 mt-0.5" />
                <div className="text-xs text-brand-deep-ocean leading-relaxed">
                  <strong>Cultural Courtesy Notice:</strong> When visiting religious or ancient heritage sites in Sri Lanka, visitors are requested to dress modestly covering shoulders and knees, and to remove footwear and hats before entering temple precincts.
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Highlights */}
          {activeTab === 'highlights' && (
            <div className="bg-white p-6 rounded-2xl border border-ocean-100 shadow-luxury space-y-4 animate-fade-in">
              <h2 className="text-xl font-serif font-bold text-brand-deep-ocean">
                Signature Experiences & Sights
              </h2>
              <ul className="space-y-3">
                {destination.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-brand-deep-ocean/85">
                    <span className="w-6 h-6 rounded-full bg-brand-ocean-teal/15 text-brand-ocean-teal flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tab 3: Tips */}
          {activeTab === 'tips' && (
            <div className="bg-white p-6 rounded-2xl border border-ocean-100 shadow-luxury space-y-4 animate-fade-in">
              <h2 className="text-xl font-serif font-bold text-brand-deep-ocean">
                Native Travel Secrets
              </h2>
              <div className="p-4 rounded-xl bg-brand-warm-sand/30 border border-brand-warm-sand flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-brand-coral-energy shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-brand-deep-ocean leading-relaxed">
                  <strong className="block text-brand-deep-ocean mb-1">Local Guide Insight:</strong>
                  {destination.insiderTips}
                </div>
              </div>
              <p className="text-xs text-brand-deep-ocean/70 leading-relaxed">
                Tuk-tuks are readily available outside the entrance gates, but we recommend booking a certified air-conditioned private vehicle or licensed guide through Pearl Guide for comfortable transfers across provinces.
              </p>
            </div>
          )}

          {/* Tab 4: Climate */}
          {activeTab === 'climate' && (
            <div className="bg-white p-6 rounded-2xl border border-ocean-100 shadow-luxury space-y-4 animate-fade-in">
              <h2 className="text-xl font-serif font-bold text-brand-deep-ocean">
                Seasonal Weather & Monsoons
              </h2>
              <div className="p-4 rounded-xl bg-brand-seafoam-mist border border-ocean-100 flex items-start gap-3">
                <SunMedium className="w-5 h-5 text-brand-ocean-teal shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-brand-deep-ocean leading-relaxed">
                  {destination.weatherNotes}
                </div>
              </div>
              <p className="text-xs text-brand-deep-ocean/70 leading-relaxed">
                Sri Lanka experiences two complementary monsoons: the Southwest monsoon (Yala) from May to September, and the Northeast monsoon (Maha) from October to January. This means at any given month of the year, one coast is gloriously sunny and calm.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Booking & Itinerary Actions Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Booking Box */}
          <div className="bg-white p-6 rounded-2xl border border-ocean-100 shadow-luxury space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal">
                Experience Sri Lanka
              </span>
              <h3 className="text-xl font-serif font-bold text-brand-deep-ocean mt-0.5">
                Book a Private Day Tour
              </h3>
            </div>

            <div className="p-3.5 rounded-xl bg-brand-seafoam-mist/50 border border-ocean-100 text-xs space-y-2">
              <div className="flex justify-between text-brand-deep-ocean">
                <span>Certified Chauffeur Guide</span>
                <span className="font-bold">Included</span>
              </div>
              <div className="flex justify-between text-brand-deep-ocean">
                <span>Official Entrance Tickets</span>
                <span className="font-bold">${destination.entryFeeUSD} USD</span>
              </div>
              <div className="flex justify-between text-brand-deep-ocean">
                <span>A/C Hybrid Sedan / Van</span>
                <span className="font-bold">Included</span>
              </div>
              <div className="border-t border-ocean-100 pt-2 flex justify-between font-bold text-brand-deep-ocean text-sm">
                <span>Estimated Tour Rate (2 travelers)</span>
                <span className="text-brand-coral-energy">${destination.entryFeeUSD + 65} USD</span>
              </div>
            </div>

            <Button
              variant="coral"
              size="lg"
              className="w-full shadow-coral-glow"
              onClick={handleBookTour}
            >
              Reserve Guided Tour
            </Button>

            <Button
              variant="outline"
              size="md"
              icon={Sparkles}
              className="w-full"
              onClick={() => navigate(`/planner?add=${destination.id}`)}
            >
              Add to Trip Planner
            </Button>

            <div className="pt-2 text-[11px] text-brand-deep-ocean/60 text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-tropical-aqua" />
              <span>Free cancellation up to 48 hours prior</span>
            </div>
          </div>

          {/* Coordinates & Region Info */}
          <div className="bg-brand-deep-ocean text-white p-5 rounded-2xl shadow-luxury space-y-3">
            <div className="flex items-center gap-2 text-brand-tropical-aqua text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Location Coordinates</span>
            </div>
            <div className="text-sm font-mono text-brand-warm-sand">
              LAT {destination.coordinates.lat.toFixed(4)}° N, LNG {destination.coordinates.lng.toFixed(4)}° E
            </div>
            <p className="text-xs text-brand-seafoam-mist/80">
              Region: {destination.region}, Sri Lanka. Easily accessible by private chauffeur car, scenic railway, or domestic sea-plane charter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
