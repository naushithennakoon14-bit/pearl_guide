import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart, ArrowUpRight } from 'lucide-react';
import { useSavedTrips } from '../../context/SavedTripsContext';
import { Badge } from '../common/Badge';

export const DestinationCard = ({ destination }) => {
  const { isSaved, toggleSaveDestination } = useSavedTrips();
  const saved = isSaved(destination.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-ocean-100 shadow-luxury card-lift flex flex-col h-full">
      {/* Media & Badge Header */}
      <div className="relative aspect-[16/10] overflow-hidden img-zoom-container bg-ocean-100">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-ocean/80 via-transparent to-black/20 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant="ocean" size="sm" className="bg-brand-deep-ocean/80 backdrop-blur-md text-white border border-white/20">
            {destination.region}
          </Badge>
          <Badge variant="aqua" size="sm" className="backdrop-blur-md font-bold text-brand-deep-ocean">
            {destination.category}
          </Badge>
        </div>

        {/* Bookmark Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveDestination(destination.id, destination.name);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral-energy ${
            saved
              ? 'bg-brand-coral-energy text-white shadow-coral-glow scale-110'
              : 'bg-white/80 text-brand-deep-ocean hover:bg-white hover:text-brand-coral-energy'
          }`}
          aria-label={saved ? `Remove ${destination.name} from saved` : `Save ${destination.name}`}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Overlay Title & Tag */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between text-white">
          <div>
            <h3 className="text-lg font-serif font-bold leading-snug drop-shadow-sm text-white group-hover:text-brand-tropical-aqua transition-colors">
              {destination.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-brand-deep-ocean/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-brand-warm-sand border border-brand-warm-sand/30 shrink-0 ml-2">
            <Star className="w-3.5 h-3.5 fill-brand-warm-sand text-brand-warm-sand" />
            <span>{destination.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Card Content & Logistics */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          <p className="text-sm text-brand-deep-ocean/75 line-clamp-2 leading-relaxed mb-4">
            {destination.tagline}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs text-brand-deep-ocean/80 py-2.5 border-t border-b border-ocean-50 my-2">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-ocean-teal shrink-0" />
              <span className="truncate">{destination.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 justify-end font-medium">
              <span className="text-brand-deep-ocean/60">Entry:</span>
              <span className="font-bold text-brand-deep-ocean">
                {destination.entryFeeUSD === 0 ? 'Free' : `$${destination.entryFeeUSD}`}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 flex items-center justify-between">
          <span className="text-xs text-brand-ocean-teal font-semibold">
            {destination.bestTime.split('(')[0]}
          </span>
          <Link
            to={`/destinations/${destination.id}`}
            aria-label={`Explore ${destination.name} travel guide`}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-ocean-teal hover:text-brand-coral-energy group-hover:translate-x-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ocean-teal rounded-lg px-1.5 py-0.5"
          >
            <span>Explore Guide</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
