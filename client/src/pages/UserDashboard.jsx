import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  Calendar,
  Heart,
  Car,
  Award,
  CreditCard,
  MapPin,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSavedTrips } from '../context/SavedTripsContext';
import { destinationsData } from '../data/destinationsData';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const UserDashboard = () => {
  const { user } = useAuth();
  const { savedDestinationIds, savedTrips } = useSavedTrips();
  const navigate = useNavigate();

  const savedDestinationsList = destinationsData.filter(d => savedDestinationIds.includes(d.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-deep-ocean via-ocean-900 to-brand-ocean-teal rounded-3xl p-8 sm:p-10 text-white shadow-luxury relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
              alt={user?.name || "Traveler"}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-luxury"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-brand-tropical-aqua text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>                Welcome</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-black text-white">
                {user?.name || "Distinguished Traveler"}
              </h1>
              <p className="text-xs sm:text-sm text-brand-seafoam-mist/80 mt-0.5">
                Member from {user?.country || "Switzerland"} • Joined {user?.joinedDate || "2026"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="coral"
              size="md"
              icon={Sparkles}
              onClick={() => navigate('/planner')}
            >
              Build Sample Itinerary
            </Button>
            <Button
              variant="outline-white"
              size="md"
              onClick={() => navigate('/destinations')}
            >
              Explore Destinations
            </Button>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-brand-tropical-aqua/15 blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal block">
              Saved Spots
            </span>
            <div className="text-2xl font-serif font-bold text-brand-deep-ocean mt-0.5">
              {savedDestinationIds.length}
            </div>
            <Link to="/my-trips" className="text-[11px] text-brand-coral-energy font-semibold hover:underline">
              View bucket list →
            </Link>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal">
            <Heart className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal block">
              Custom Itineraries
            </span>
            <div className="text-2xl font-serif font-bold text-brand-deep-ocean mt-0.5">
              {savedTrips.length}
            </div>
            <Link to="/my-trips" className="text-[11px] text-brand-coral-energy font-semibold hover:underline">
              Review day plans →
            </Link>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal block">
              Travel Credits
            </span>
            <div className="text-2xl font-serif font-bold text-brand-deep-ocean mt-0.5">
              ${user?.travelCredits || 120} <span className="text-xs font-sans font-normal text-brand-deep-ocean/60">USD</span>
            </div>
            <span className="text-[11px] text-brand-deep-ocean/60">Applicable to tours</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal block">
              Trips Completed
            </span>
            <div className="text-2xl font-serif font-bold text-brand-deep-ocean mt-0.5">
              {user?.tripsCompleted || 2}
            </div>
            <span className="text-[11px] text-brand-ocean-teal font-semibold">Ceylon Explorer</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Active Trip & Seasonal Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Active Itinerary Preview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ocean-100 shadow-luxury space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-ocean-100 gap-3">
              <div>
                <Badge variant="aqua" size="sm" className="mb-1">Upcoming Journey</Badge>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-deep-ocean">
                  {savedTrips[0]?.title || "7-Day Cultural Triangle & Hill Country Expedition"}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-brand-deep-ocean/60 block">Status:</span>
                <span className="text-xs font-bold text-brand-ocean-teal flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-tropical-aqua" />
                  <span>Ready for Booking</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-deep-ocean/80 leading-relaxed">
              Route: Sigiriya Lion Rock Fortress → Sacred Kandy Temple → Scenic Highland Blue Train → Ella Gap → Yala Wildlife Safari → Galle Dutch Fort.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-brand-seafoam-mist/50 border border-ocean-100">
                <span className="text-brand-deep-ocean/60 block text-[11px]">Private Chauffeur</span>
                <strong className="text-brand-deep-ocean font-semibold">Reserved Hybrid A/C Sedan</strong>
              </div>
              <div className="p-3 rounded-xl bg-brand-seafoam-mist/50 border border-ocean-100">
                <span className="text-brand-deep-ocean/60 block text-[11px]">Scenic Train</span>
                <strong className="text-brand-deep-ocean font-semibold">1st Class Observation Carriage</strong>
              </div>
              <div className="p-3 rounded-xl bg-brand-seafoam-mist/50 border border-ocean-100">
                <span className="text-brand-deep-ocean/60 block text-[11px]">Est. Tour Budget</span>
                <strong className="text-brand-coral-energy font-serif text-sm">${savedTrips[0]?.estimatedBudgetUSD || 1450} USD</strong>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                variant="coral"
                size="md"
                onClick={() => navigate('/my-trips')}
              >
                Inspect Day-by-Day Timeline
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>

          {/* Quick Bucket List Snippet */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ocean-100 shadow-luxury space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-ocean-100">
              <h3 className="text-lg font-serif font-bold text-brand-deep-ocean">
                Your Saved Locations ({savedDestinationsList.length})
              </h3>
              <Link to="/my-trips" className="text-xs font-bold text-brand-ocean-teal hover:underline">
                View all saved →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {savedDestinationsList.slice(0, 3).map((dest) => (
                <Link
                  key={dest.id}
                  to={`/destinations/${dest.id}`}
                  className="group rounded-xl overflow-hidden border border-ocean-100 bg-brand-seafoam-mist/20 hover:border-brand-ocean-teal transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold text-brand-ocean-teal uppercase block">
                      {dest.region}
                    </span>
                    <h4 className="text-xs font-bold text-brand-deep-ocean truncate mt-0.5">
                      {dest.name}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Seasonal Insights & Local Support */}
        <div className="lg:col-span-4 space-y-6">
          {/* Seasonal Advisory */}
          <div className="bg-white p-6 rounded-3xl border border-ocean-100 shadow-luxury space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ocean-teal">
              <Clock className="w-4 h-4" />
              <span>Current Travel Season</span>
            </div>
            <h4 className="text-base font-serif font-bold text-brand-deep-ocean">
              Optimal Season Approaching
            </h4>
            <p className="text-xs text-brand-deep-ocean/70 leading-relaxed">
              November through April brings calm turquoise seas to the Southern Coast (Mirissa, Galle) and crisp, clear mornings to the Central Highlands (Sigiriya, Ella). Ideal for whale watching and rock climbs.
            </p>
            <div className="pt-2">
              <Link
                to="/destinations?region=Southern+Coast"
                className="text-xs font-bold text-brand-coral-energy hover:underline flex items-center gap-1"
              >
                <span>View Southern Coast spots</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Concierge Assistance */}
          <div className="bg-brand-deep-ocean text-white p-6 rounded-3xl shadow-luxury space-y-4">
            <div className="flex items-center gap-2 text-brand-tropical-aqua text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Pearl Concierge</span>
            </div>
            <h4 className="text-lg font-serif font-bold text-white">
              Need Native Travel Assistance?
            </h4>
            <p className="text-xs text-brand-seafoam-mist/80 leading-relaxed">
              Our Colombo-based travel advisors are available 7 days a week for customized private chauffeur logistics and train seat queries.
            </p>
            <Button
              variant="coral"
              size="sm"
              className="w-full"
              onClick={() => navigate('/services')}
            >
              Browse Certified Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
