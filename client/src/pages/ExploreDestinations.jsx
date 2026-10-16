import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, MapPin, X, RotateCcw } from 'lucide-react';
import { destinationsData, regionsList, categoriesList } from '../data/destinationsData';
import { DestinationCard } from '../components/destination/DestinationCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const ExploreDestinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'All Regions');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Categories');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'name' | 'price'

  // Sync state if query params change
  useEffect(() => {
    const reg = searchParams.get('region');
    const cat = searchParams.get('category');
    if (reg) setSelectedRegion(reg);
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredDestinations = useMemo(() => {
    return destinationsData
      .filter((dest) => {
        const matchesSearch =
          dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRegion =
          selectedRegion === 'All Regions' || dest.region === selectedRegion;

        const matchesCategory =
          selectedCategory === 'All Categories' || dest.category === selectedCategory;

        return matchesSearch && matchesRegion && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'price') return a.entryFeeUSD - b.entryFeeUSD;
        return 0;
      });
  }, [searchTerm, selectedRegion, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('All Regions');
    setSelectedCategory('All Categories');
    setSortBy('rating');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-brand-deep-ocean rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-luxury">
        <div className="relative z-10 max-w-2xl">
          <Badge variant="aqua" size="sm" className="mb-3">
            Sri Lanka Destination Directory
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white mb-3">
            Explore Sri Lanka
          </h1>
          <p className="text-brand-seafoam-mist/90 text-sm sm:text-base leading-relaxed">
            From the rock fortresses of the dry zone to the colonial ramparts and whale corridors of the south, browse hand-verified destinations with logistics, entry fees, and optimal travel windows.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-brand-ocean-teal/30 blur-3xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-white p-5 rounded-2xl shadow-luxury border border-ocean-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-brand-ocean-teal absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="explore-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by landmark, town, or experience..."
              aria-label="Search destinations by landmark, town, or experience"
              className="w-full pl-10 pr-4 py-2.5 bg-brand-seafoam-mist/50 border border-ocean-100 rounded-xl text-sm text-brand-deep-ocean placeholder:text-brand-deep-ocean/50 focus:outline-none focus:border-brand-ocean-teal"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-deep-ocean/50 hover:text-brand-deep-ocean"
                aria-label="Clear search text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              aria-label="Filter by region"
              className="w-full px-3.5 py-2.5 bg-brand-seafoam-mist/50 border border-ocean-100 rounded-xl text-sm font-semibold text-brand-deep-ocean focus:outline-none focus:border-brand-ocean-teal cursor-pointer"
            >
              {regionsList.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
              className="w-full px-3.5 py-2.5 bg-brand-seafoam-mist/50 border border-ocean-100 rounded-xl text-sm font-semibold text-brand-deep-ocean focus:outline-none focus:border-brand-ocean-teal cursor-pointer"
            >
              {categoriesList.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sort Control */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort destinations by attribute"
              className="w-full px-3.5 py-2.5 bg-brand-seafoam-mist/50 border border-ocean-100 rounded-xl text-sm font-semibold text-brand-deep-ocean focus:outline-none focus:border-brand-ocean-teal cursor-pointer"
            >
              <option value="rating">Top Rated</option>
              <option value="name">Alphabetical</option>
              <option value="price">Lowest Entry Fee</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Pill Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-ocean-50 text-xs">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Quick category filters">
            <span className="font-bold text-brand-ocean-teal flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Quick Categories:</span>
            </span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-ocean-teal text-white shadow-sm'
                    : 'bg-brand-seafoam-mist text-brand-deep-ocean hover:bg-ocean-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {(searchTerm || selectedRegion !== 'All Regions' || selectedCategory !== 'All Categories') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs font-bold text-brand-coral-energy hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-brand-deep-ocean font-medium">
        <span>
          Showing <strong className="text-brand-ocean-teal">{filteredDestinations.length}</strong> verified locations
        </span>
        <span className="text-xs text-brand-deep-ocean/60">
          All entry fees in USD ($) • Updated for 2026/2027 Season
        </span>
      </div>

      {/* Destination Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-ocean-100 max-w-lg mx-auto shadow-luxury">
          <MapPin className="w-12 h-12 text-brand-ocean-teal mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-serif font-bold text-brand-deep-ocean mb-1">
            No Destinations Found
          </h3>
          <p className="text-xs text-brand-deep-ocean/70 mb-6">
            We couldn't find any Sri Lankan locations matching your specific filters. Try expanding your search criteria or resetting filters.
          </p>
          <Button variant="teal" size="sm" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
