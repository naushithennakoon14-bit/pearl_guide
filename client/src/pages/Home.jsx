import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Award,
  Train,
  Camera,
  TreePine
} from 'lucide-react';
import { destinationsData } from '../data/destinationsData';
import { DestinationCard } from '../components/destination/DestinationCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const Home = () => {
  const navigate = useNavigate();
  const [searchRegion, setSearchRegion] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const featuredDestinations = destinationsData.filter(d => d.featured).slice(0, 4);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchRegion) params.append('region', searchRegion);
    if (searchCategory) params.append('category', searchCategory);
    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[640px] sm:min-h-[700px] lg:min-h-[calc(100vh-6rem)] flex items-center overflow-hidden bg-brand-deep-ocean text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=2000&q=85"
            alt="Sigiriya Rock Fortress in Sri Lanka"
            className="w-full h-full object-cover object-[center_45%] brightness-[0.86]"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-brand-deep-ocean/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-deep-ocean/20 via-transparent to-brand-deep-ocean/55" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <h1 className="max-w-5xl mx-auto text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.08] mb-6 text-white">
            The Wonder of <span className="text-brand-warm-sand italic">Ceylon</span>,<br className="hidden lg:block" /> Curated for Discerning Travelers.
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-white/95 font-normal leading-relaxed mb-8">
            Discover ancient landmarks, misty tea country, wildlife, and quiet coastlines. Find inspiration and shape a journey around the places you want to see.
          </p>

          <form
            onSubmit={handleHeroSearch}
            className="w-full max-w-5xl mx-auto bg-white p-3 sm:p-4 rounded-2xl shadow-luxury-hover border border-white/70 text-brand-deep-ocean grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_auto] gap-2 sm:gap-3 text-left"
          >
            <div className="px-3 py-2 border-b sm:border-b-0 sm:border-r border-ocean-100">
              <label htmlFor="hero-search-region" className="block text-xs font-bold text-brand-ocean-teal cursor-pointer">
                Destination Region
              </label>
              <select
                id="hero-search-region"
                value={searchRegion}
                onChange={(e) => setSearchRegion(e.target.value)}
                className="w-full min-h-9 bg-transparent font-semibold text-sm text-brand-deep-ocean focus:outline-none cursor-pointer mt-0.5"
              >
                <option value="">All Sri Lankan Regions</option>
                <option value="Cultural Triangle">Cultural Triangle (Sigiriya, Kandy)</option>
                <option value="Central Highlands">Central Highlands (Ella, Nuwara Eliya)</option>
                <option value="Southern Coast">Southern Coast (Galle, Mirissa, Yala)</option>
                <option value="Eastern Coast">Eastern Coast (Trincomalee)</option>
              </select>
            </div>

            <div className="px-3 py-2 border-b sm:border-b-0 sm:border-r lg:border-r-0 border-ocean-100">
              <label htmlFor="hero-search-category" className="block text-xs font-bold text-brand-ocean-teal cursor-pointer">
                Experience Style
              </label>
              <select
                id="hero-search-category"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full min-h-9 bg-transparent font-semibold text-sm text-brand-deep-ocean focus:outline-none cursor-pointer mt-0.5"
              >
                <option value="">Any Travel Category</option>
                <option value="Heritage">UNESCO Heritage</option>
                <option value="Adventure">Highland Adventure</option>
                <option value="Wildlife">Leopard & Marine Safari</option>
                <option value="Coastal">Golden Coastal Beaches</option>
                <option value="Wellness">Ayurveda & Tea Wellness</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-1 flex items-center">
              <Button
                type="submit"
                variant="coral"
                size="lg"
                icon={Search}
                className="w-full h-full min-h-[46px]"
              >
                Explore Now
              </Button>
            </div>
          </form>

        </div>
      </section>

      {/* Curated Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ocean-teal mb-2">
              <Award className="w-4 h-4" />
              <span>Handpicked Destinations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-deep-ocean">
              Iconic Sri Lankan Landmarks
            </h2>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-ocean-teal hover:text-brand-coral-energy transition-colors group"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Featured Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* Trip Planner Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-deep-ocean rounded-3xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-luxury">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Start shaping your Sri Lankan journey.
              </h2>

              <p className="text-brand-seafoam-mist/85 text-sm sm:text-base leading-relaxed">
                Use the sample itinerary builder to explore a day-by-day route, then save it as a starting point for your own plans.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                  <div className="text-lg font-bold text-brand-warm-sand font-serif">Choose a pace</div>
                  <div className="text-sm text-brand-seafoam-mist/85">Set the length and rhythm of your trip</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                  <div className="text-lg font-bold text-brand-tropical-aqua font-serif">Explore regions</div>
                  <div className="text-sm text-brand-seafoam-mist/85">See a route across the island</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                  <div className="text-lg font-bold text-brand-warm-sand font-serif">Save for later</div>
                  <div className="text-sm text-brand-seafoam-mist/85">Keep an itinerary in My Trips</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Button
                  variant="coral"
                  size="lg"
                  icon={ArrowRight}
                  onClick={() => navigate('/planner')}
                >
                  Open the sample planner
                </Button>
                <Button
                  variant="outline-white"
                  size="lg"
                  onClick={() => navigate('/my-trips')}
                >
                  View Sample 7-Day Plan
                </Button>
              </div>
            </div>

            {/* Interactive Preview Card Mockup */}
            <div className="lg:col-span-5 bg-white text-brand-deep-ocean p-6 rounded-2xl shadow-luxury-hover border border-ocean-100">
              <div className="flex items-center justify-between pb-3 border-b border-ocean-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-coral-energy"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-ocean-teal">Sample itinerary</span>
                </div>
                <Badge variant="sand" size="sm">7 Days • Balanced</Badge>
              </div>

              <div className="py-4 space-y-3">
                <div className="p-3 rounded-xl bg-brand-seafoam-mist/70 border border-ocean-100">
                  <div className="text-xs font-bold text-brand-deep-ocean">Day 1-2: Cultural Triangle</div>
                  <div className="text-[11px] text-brand-deep-ocean/70">Sigiriya Rock dawn climb & Minneriya wild elephants</div>
                </div>
                <div className="p-3 rounded-xl bg-brand-seafoam-mist/70 border border-ocean-100">
                  <div className="text-xs font-bold text-brand-deep-ocean">Day 3-4: Central Highlands</div>
                  <div className="text-[11px] text-brand-deep-ocean/70">Kandy Temple of Tooth & Iconic Blue Train to Ella</div>
                </div>
                <div className="p-3 rounded-xl bg-brand-seafoam-mist/70 border border-ocean-100">
                  <div className="text-xs font-bold text-brand-deep-ocean">Day 5-7: Southern Escarpment</div>
                  <div className="text-[11px] text-brand-deep-ocean/70">Yala leopard game drive & Galle Fort ramparts sunset</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-brand-deep-ocean/70">Estimated Budget: <strong className="text-brand-deep-ocean">$1,450 USD</strong></span>
                <span className="text-brand-ocean-teal font-bold">Preview only</span>
              </div>
              <p className="mt-3 text-xs text-brand-deep-ocean/65 leading-relaxed">
                This example is illustrative. The planner uses built-in sample content, not live AI, weather, transport, or booking data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Sri Lankan Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="teal" size="md" className="mb-3">Unmissable Moments</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-deep-ocean">
            Signature Ceylon Experiences
          </h2>
          <p className="text-brand-deep-ocean/70 text-sm mt-3">
            Explore distinct ways to experience Sri Lanka, from scenic rail journeys to wildlife and tea country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Experience 1 */}
          <div className="bg-white rounded-2xl p-6 border border-ocean-100 shadow-luxury card-lift flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal mb-4">
                <Train className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-deep-ocean mb-2">
                Highland Scenic Blue Train
              </h3>
              <p className="text-sm text-brand-deep-ocean/75 leading-relaxed mb-4">
                Traverse misty tea hills, cascading viaduct waterfalls, and eucalyptus forests between Kandy, Nanu Oya, and Ella in reserved observation class.
              </p>
            </div>
            <Link to="/services" className="text-xs font-bold text-brand-coral-energy hover:underline flex items-center gap-1">
              <span>View Train Booking Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Experience 2 */}
          <div className="bg-white rounded-2xl p-6 border border-ocean-100 shadow-luxury card-lift flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal mb-4">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-deep-ocean mb-2">
                Dawn Leopard Tracking Safari
              </h3>
              <p className="text-sm text-brand-deep-ocean/75 leading-relaxed mb-4">
                Accompanied by a veteran wildlife tracker in an open-top modified 4x4 jeep through Yala Block 1 to photograph leopards, sloth bears, and crocodiles.
              </p>
            </div>
            <Link to="/services" className="text-xs font-bold text-brand-coral-energy hover:underline flex items-center gap-1">
              <span>View Safari Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Experience 3 */}
          <div className="bg-white rounded-2xl p-6 border border-ocean-100 shadow-luxury card-lift flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal mb-4">
                <TreePine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-deep-ocean mb-2">
                Artisan Ceylon Tea & Ayurveda
              </h3>
              <p className="text-sm text-brand-deep-ocean/75 leading-relaxed mb-4">
                Private single-estate tea picking demonstrations in Nuwara Eliya followed by centuries-old herbal oil massages in colonial heritage bungalows.
              </p>
            </div>
            <Link to="/services" className="text-xs font-bold text-brand-coral-energy hover:underline flex items-center gap-1">
              <span>View Wellness Retreats</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Verified Traveler Testimonials */}
      <section className="bg-white py-16 border-t border-b border-ocean-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-ocean-teal">Sample traveler stories</span>
            <h2 className="text-3xl font-serif font-bold text-brand-deep-ocean mt-1">
              Stories to inspire your trip
            </h2>
            <p className="mt-2 text-sm text-brand-deep-ocean/70">
              Illustrative preview content, not verified customer reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-brand-seafoam-mist/40 border border-ocean-100">
              <p className="text-sm text-brand-deep-ocean/80 leading-relaxed italic mb-5">
                "The sample route suggested arriving at Sigiriya at 6:45 AM. Climbing in the crisp morning air before the crowds arrived was the highlight of our 2-week journey."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-ocean-teal/20 flex items-center justify-center font-bold text-brand-deep-ocean text-xs">
                  MR
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-deep-ocean">Marcus & Renee</div>
                  <div className="text-xs text-brand-ocean-teal">Melbourne, Australia</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-seafoam-mist/40 border border-ocean-100">
              <p className="text-sm text-brand-deep-ocean/80 leading-relaxed italic mb-5">
                "Having a certified private chauffeur booked through Pearl Guide made our hill country travels so effortless. Our driver knew every scenic waterfall stop along the route."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-ocean-teal/20 flex items-center justify-center font-bold text-brand-deep-ocean text-xs">
                  SL
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-deep-ocean">Sophie Laurent</div>
                  <div className="text-xs text-brand-ocean-teal">Lyon, France</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-seafoam-mist/40 border border-ocean-100">
              <p className="text-sm text-brand-deep-ocean/80 leading-relaxed italic mb-5">
                "We spotted a mother leopard and two cubs in Yala Block 1! The guide assigned through Pearl Guide was a trained naturalist who respected animal space."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-ocean-teal/20 flex items-center justify-center font-bold text-brand-deep-ocean text-xs">
                  KT
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-deep-ocean">Kenji Tanaka</div>
                  <div className="text-xs text-brand-ocean-teal">Tokyo, Japan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
