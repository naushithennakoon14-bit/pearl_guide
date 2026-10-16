import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Heart,
  Sparkles,
  MapPin,
  Clock,
  Printer,
  Trash2,
  Car,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Compass
} from 'lucide-react';
import { useSavedTrips } from '../context/SavedTripsContext';
import { useToast } from '../context/ToastContext';
import { destinationsData } from '../data/destinationsData';
import { DestinationCard } from '../components/destination/DestinationCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const MyTrips = () => {
  const navigate = useNavigate();
  const { savedTrips, deleteTrip, savedDestinationIds, toggleSaveDestination, startBooking } = useSavedTrips();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('itineraries'); // 'itineraries' | 'saved'
  const [expandedTripId, setExpandedTripId] = useState(savedTrips[0]?.id || null);

  const savedDestinationsList = destinationsData.filter(d => savedDestinationIds.includes(d.id));

  const handlePrint = (tripTitle) => {
    window.print();
  };

  const handleBookTrip = (trip) => {
    startBooking({
      serviceType: "itinerary_package",
      title: trip.title,
      destination: trip.destinations.join(" → "),
      entryFeeUSD: 95,
      basePriceUSD: trip.estimatedBudgetUSD,
      days: trip.durationDays,
      travelers: 2,
    });
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-brand-deep-ocean rounded-3xl p-8 sm:p-10 text-white shadow-luxury relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <Badge variant="aqua" size="sm" className="mb-2">
            Your Personal Ceylon Collection
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white mb-2">
            My Trips & Bucket List
          </h1>
          <p className="text-brand-seafoam-mist/85 text-sm sm:text-base leading-relaxed">
            Review custom day-by-day itineraries, manage saved Sri Lankan landmarks, and transition your travel blueprints into confirmed private driver reservations.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-brand-ocean-teal/20 blur-3xl pointer-events-none" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ocean-100 gap-6 overflow-x-auto" role="tablist" aria-label="My trips categories">
        <button
          role="tab"
          aria-selected={activeTab === 'itineraries'}
          onClick={() => setActiveTab('itineraries')}
          className={`pb-4 text-base font-serif font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ocean-teal rounded-t-lg px-2 ${
            activeTab === 'itineraries'
              ? 'border-brand-ocean-teal text-brand-ocean-teal'
              : 'border-transparent text-brand-deep-ocean/60 hover:text-brand-deep-ocean'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Custom Itineraries ({savedTrips.length})</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'saved'}
          onClick={() => setActiveTab('saved')}
          className={`pb-4 text-base font-serif font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ocean-teal rounded-t-lg px-2 ${
            activeTab === 'saved'
              ? 'border-brand-ocean-teal text-brand-ocean-teal'
              : 'border-transparent text-brand-deep-ocean/60 hover:text-brand-deep-ocean'
          }`}
        >
          <Heart className="w-5 h-5 text-brand-coral-energy" />
          <span>Saved Destinations ({savedDestinationsList.length})</span>
        </button>
      </div>

      {/* Tab 1: Custom Itineraries */}
      {activeTab === 'itineraries' && (
        <div className="space-y-6">
          {savedTrips.length > 0 ? (
            savedTrips.map((trip) => {
              const isExpanded = expandedTripId === trip.id;
              return (
                <div
                  key={trip.id}
                  className="bg-white rounded-3xl border border-ocean-100 shadow-luxury overflow-hidden transition-all"
                >
                  {/* Trip Header Box */}
                  <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ocean-50">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="sand" size="sm">{trip.durationDays} Days</Badge>
                        <Badge variant="teal" size="sm">{trip.travelStyle}</Badge>
                        <span className="text-xs text-brand-deep-ocean/60">Saved on {trip.createdDate}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-deep-ocean">
                        {trip.title}
                      </h3>
                      <p className="text-xs text-brand-deep-ocean/70 mt-1">
                        Destinations: {trip.destinations.join(" → ")}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Printer}
                        onClick={() => handlePrint(trip.title)}
                        aria-label="Print itinerary"
                      >
                        Print
                      </Button>
                      <Button
                        variant="coral"
                        size="sm"
                        icon={Car}
                        onClick={() => handleBookTrip(trip)}
                      >
                        Book Chauffeur Package
                      </Button>
                      <button
                        onClick={() => deleteTrip(trip.id)}
                        className="p-2 text-brand-deep-ocean/40 hover:text-brand-coral-energy rounded-lg hover:bg-coral-50 transition-colors"
                        title="Delete itinerary"
                        aria-label="Delete itinerary"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Summary Bar */}
                  <div className="px-6 sm:px-8 py-3 bg-brand-seafoam-mist/40 flex items-center justify-between text-xs border-b border-ocean-50">
                    <div className="flex gap-4">
                      <span>Est. Total: <strong className="text-brand-coral-energy font-serif text-sm">${trip.estimatedBudgetUSD} USD</strong></span>
                      <span className="hidden sm:inline text-brand-deep-ocean/60">•</span>
                      <span className="hidden sm:inline">Tempo: <strong>{trip.pace || 'Balanced'}</strong></span>
                    </div>
                    <button
                      onClick={() => setExpandedTripId(isExpanded ? null : trip.id)}
                      className="font-bold text-brand-ocean-teal hover:underline flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Collapse Timeline' : 'Expand All Days'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Days Accordion */}
                  {isExpanded && (
                    <div className="p-6 sm:p-8 space-y-4 bg-brand-seafoam-mist/10 animate-fade-in">
                      {trip.days?.map((day) => (
                        <div key={day.dayNumber} className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-brand-deep-ocean text-white font-serif font-bold text-xs flex items-center justify-center shrink-0">
                              D{day.dayNumber}
                            </span>
                            <h4 className="text-sm font-serif font-bold text-brand-deep-ocean">
                              {day.title}
                            </h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-brand-seafoam-mist/30">
                              <span className="font-bold text-brand-ocean-teal block text-[10px] uppercase">Morning</span>
                              <p className="text-brand-deep-ocean/80 mt-0.5">{day.morning}</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-brand-seafoam-mist/30">
                              <span className="font-bold text-brand-ocean-teal block text-[10px] uppercase">Afternoon</span>
                              <p className="text-brand-deep-ocean/80 mt-0.5">{day.afternoon}</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-brand-seafoam-mist/30">
                              <span className="font-bold text-brand-ocean-teal block text-[10px] uppercase">Evening</span>
                              <p className="text-brand-deep-ocean/80 mt-0.5">{day.evening}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-ocean-100 shadow-luxury space-y-4 max-w-lg mx-auto">
              <Compass className="w-12 h-12 text-brand-ocean-teal mx-auto opacity-60" />
              <h3 className="text-xl font-serif font-bold text-brand-deep-ocean">
                No Itineraries Saved Yet
              </h3>
              <p className="text-xs text-brand-deep-ocean/70 leading-relaxed">
                Build an illustrative day-by-day route with the sample planner, then save it here for later.
              </p>
              <Button
                variant="coral"
                size="md"
                icon={Sparkles}
                onClick={() => navigate('/planner')}
              >
                Build Sample Itinerary
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Destinations */}
      {activeTab === 'saved' && (
        <div>
          {savedDestinationsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedDestinationsList.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-ocean-100 shadow-luxury space-y-4 max-w-lg mx-auto">
              <Heart className="w-12 h-12 text-brand-coral-energy mx-auto opacity-60" />
              <h3 className="text-xl font-serif font-bold text-brand-deep-ocean">
                Your Bucket List is Empty
              </h3>
              <p className="text-xs text-brand-deep-ocean/70 leading-relaxed">
                Explore iconic Sri Lankan citadels, tea estates, and coastal sanctuaries and click the heart icon on any destination to save it.
              </p>
              <Button
                variant="teal"
                size="md"
                onClick={() => navigate('/destinations')}
              >
                Browse Destinations
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
