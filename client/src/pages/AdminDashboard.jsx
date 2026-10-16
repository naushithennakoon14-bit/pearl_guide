import React, { useState } from 'react';
import {
  Shield,
  Layers,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  TrendingUp,
  Plus,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';
import { destinationsData } from '../data/destinationsData';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { useToast } from '../context/ToastContext';

export const AdminDashboard = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('destinations'); // 'destinations' | 'bookings' | 'telemetry'
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sample admin destination creation form state
  const [newDestName, setNewDestName] = useState('');
  const [newDestRegion, setNewDestRegion] = useState('Cultural Triangle');
  const [newDestCategory, setNewDestCategory] = useState('Heritage');
  const [newDestFee, setNewDestFee] = useState(25);

  const [destinationsList, setDestinationsList] = useState(destinationsData);

  const sampleBookings = [
    {
      id: "CEYLON-2026-9102",
      customer: "Elena Rostova",
      country: "Switzerland",
      service: "7-Day Cultural Triangle & Hill Country",
      travelers: 2,
      totalUSD: 1450,
      status: "Confirmed",
      date: "Nov 14, 2026",
    },
    {
      id: "CEYLON-2026-8849",
      customer: "David Sterling",
      country: "United Kingdom",
      service: "Highland Blue Train Observation Passes",
      travelers: 4,
      totalUSD: 140,
      status: "Pending Chauffeur",
      date: "Nov 18, 2026",
    },
    {
      id: "CEYLON-2026-7731",
      customer: "Amara & Rohan Patel",
      country: "Singapore",
      service: "Yala VIP Leopard Safari & Glamping",
      travelers: 2,
      totalUSD: 420,
      status: "Confirmed",
      date: "Dec 02, 2026",
    },
    {
      id: "CEYLON-2026-6450",
      customer: "Sophie Martin",
      country: "France",
      service: "Chauffeured Hybrid Tour (5 Days)",
      travelers: 2,
      totalUSD: 375,
      status: "In Review",
      date: "Dec 10, 2026",
    }
  ];

  const handleAddDestination = (e) => {
    e.preventDefault();
    if (!newDestName) return;

    const newDest = {
      id: newDestName.toLowerCase().replace(/\s+/g, '-'),
      name: newDestName,
      tagline: "Newly curated destination awaiting full editorial review.",
      region: newDestRegion,
      category: newDestCategory,
      rating: 5.0,
      reviewCount: 1,
      priceTier: "$$",
      entryFeeUSD: Number(newDestFee),
      duration: "1 Day",
      bestTime: "Year Round",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Custom destination highlight"],
      overview: "Newly added Sri Lankan destination managed through admin console.",
      weatherNotes: "Tropical pleasant.",
      coordinates: { lat: 7.8731, lng: 80.7718 },
      featured: false,
    };

    setDestinationsList([newDest, ...destinationsList]);
    setIsAddModalOpen(false);
    setNewDestName('');
    addToast(`Added ${newDest.name} to destination catalog!`, 'success');
  };

  const filteredDestinations = destinationsList.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-brand-deep-ocean rounded-3xl p-8 sm:p-10 text-white shadow-luxury relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-coral-energy/20 text-brand-coral-energy text-xs font-bold border border-brand-coral-energy/30 mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Operations Management Console</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white">
              Pearl Guide Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-brand-seafoam-mist/80 mt-1">
              Sample admin interface for destination content, booking records, and itinerary planning.
            </p>
          </div>

          <Button
            variant="coral"
            size="md"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Destination
          </Button>
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-brand-tropical-aqua/15 blur-3xl pointer-events-none" />
      </div>

      {/* KPI Metrics */}
      <p className="text-xs text-brand-deep-ocean/65">
        Preview data only — metrics and booking records shown here are not live.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal block">
            Published Destinations
          </span>
          <div className="text-3xl font-serif font-bold text-brand-deep-ocean mt-1">
            {destinationsList.length}
          </div>
          <span className="text-[11px] text-brand-ocean-teal font-semibold mt-1 block">
            5 Provincial Regions
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal block">
            Monthly Visitors
          </span>
          <div className="text-3xl font-serif font-bold text-brand-deep-ocean mt-1">
            24,800
          </div>
          <span className="text-[11px] text-brand-ocean-teal font-semibold mt-1 block flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-brand-ocean-teal" />
            +18.4% this month
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal block">
            Active Booking Queue
          </span>
          <div className="text-3xl font-serif font-bold text-brand-coral-energy mt-1">
            18
          </div>
          <span className="text-[11px] text-brand-deep-ocean/60 mt-1 block">
            4 awaiting driver allocation
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ocean-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal block">
            Sample Itineraries Built
          </span>
          <div className="text-3xl font-serif font-bold text-brand-deep-ocean mt-1">
            1,420
          </div>
          <span className="text-[11px] text-brand-ocean-teal font-bold mt-1 block">
            Illustrative metric · not live data
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ocean-100 gap-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('destinations')}
          className={`pb-3 text-sm font-serif font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'destinations'
              ? 'border-brand-ocean-teal text-brand-ocean-teal'
              : 'border-transparent text-brand-deep-ocean/60 hover:text-brand-deep-ocean'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Destinations Directory ({destinationsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 text-sm font-serif font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'border-brand-ocean-teal text-brand-ocean-teal'
              : 'border-transparent text-brand-deep-ocean/60 hover:text-brand-deep-ocean'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Inquiries & Reservations ({sampleBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('telemetry')}
          className={`pb-3 text-sm font-serif font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'telemetry'
              ? 'border-brand-ocean-teal text-brand-ocean-teal'
              : 'border-transparent text-brand-deep-ocean/60 hover:text-brand-deep-ocean'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Planner Preview Data</span>
        </button>
      </div>

      {/* Tab 1: Destination Inventory Table */}
      {activeTab === 'destinations' && (
        <div className="bg-white rounded-3xl border border-ocean-100 shadow-luxury overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-brand-ocean-teal absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="admin-dest-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter destination name or region..."
                aria-label="Filter destination name or region"
                className="w-full pl-10 pr-3 py-2 bg-brand-seafoam-mist/40 border border-ocean-100 rounded-xl text-xs text-brand-deep-ocean focus:outline-none focus:border-brand-ocean-teal"
              />
            </div>
            <span className="text-xs text-brand-deep-ocean/60">
              Showing {filteredDestinations.length} verified landmarks
            </span>
          </div>

          <div className="overflow-x-auto">
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-10 text-xs text-brand-deep-ocean/70">
                No landmarks matching "{searchTerm}". Try another search term.
              </div>
            ) : (
              <table className="w-full text-left text-xs text-brand-deep-ocean">
                <thead className="bg-brand-seafoam-mist/60 text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal border-b border-ocean-100">
                  <tr>
                    <th className="py-3 px-4">Landmark Name</th>
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Entry Fee</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ocean-50">
                  {filteredDestinations.map((dest) => (
                    <tr key={dest.id} className="hover:bg-brand-seafoam-mist/20 transition-colors">
                      <td className="py-3.5 px-4 font-bold flex items-center gap-3">
                        <img src={dest.image} alt={dest.name} className="w-8 h-8 rounded-lg object-cover" />
                        <span>{dest.name}</span>
                      </td>
                      <td className="py-3.5 px-4">{dest.region}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant="teal" size="sm">{dest.category}</Badge>
                      </td>
                      <td className="py-3.5 px-4 font-semibold">
                        {dest.entryFeeUSD === 0 ? 'Free' : `$${dest.entryFeeUSD} USD`}
                      </td>
                      <td className="py-3.5 px-4">
                        ★ {dest.rating.toFixed(1)}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant="teal" size="sm" icon={CheckCircle2}>
                          Published
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Bookings Queue */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-ocean-100 shadow-luxury overflow-hidden p-6 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-brand-deep-ocean">
              <thead className="bg-brand-seafoam-mist/60 text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal border-b border-ocean-100">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Traveler</th>
                  <th className="py-3 px-4">Origin</th>
                  <th className="py-3 px-4">Service Package</th>
                  <th className="py-3 px-4">Travelers</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ocean-50">
                {sampleBookings.map((bk) => (
                  <tr key={bk.id} className="hover:bg-brand-seafoam-mist/20 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-deep-ocean">{bk.id}</td>
                    <td className="py-3.5 px-4 font-bold">{bk.customer}</td>
                    <td className="py-3.5 px-4">{bk.country}</td>
                    <td className="py-3.5 px-4">{bk.service}</td>
                    <td className="py-3.5 px-4">{bk.travelers}</td>
                    <td className="py-3.5 px-4 font-bold text-brand-coral-energy">${bk.totalUSD} USD</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={bk.status === 'Confirmed' ? 'teal' : 'sand'} size="sm">
                        {bk.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Telemetry */}
      {activeTab === 'telemetry' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-ocean-100 shadow-luxury space-y-4">
            <h3 className="text-base font-serif font-bold text-brand-deep-ocean">
              Most Requested Itinerary Routes
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-brand-seafoam-mist/50 flex justify-between items-center">
                <span>1. Cultural Triangle + Ella Highland Train + Galle Fort</span>
                <Badge variant="coral" size="sm">52% of users</Badge>
              </div>
              <div className="p-3 rounded-xl bg-brand-seafoam-mist/50 flex justify-between items-center">
                <span>2. Yala Wildlife Leopard Safari + Weligama Coast</span>
                <Badge variant="teal" size="sm">26% of users</Badge>
              </div>
              <div className="p-3 rounded-xl bg-brand-seafoam-mist/50 flex justify-between items-center">
                <span>3. Trincomalee Marine & Nilaveli East Coast</span>
                <Badge variant="sand" size="sm">14% of users</Badge>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-ocean-100 shadow-luxury space-y-4">
            <h3 className="text-base font-serif font-bold text-brand-deep-ocean">
              Preferred Travel Group Configurations
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span>Couples / Honeymooners</span>
                <strong className="text-brand-ocean-teal">48%</strong>
              </div>
              <div className="w-full bg-ocean-50 rounded-full h-2">
                <div className="bg-brand-ocean-teal h-2 rounded-full w-[48%]" />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Families with Children</span>
                <strong className="text-brand-ocean-teal">28%</strong>
              </div>
              <div className="w-full bg-ocean-50 rounded-full h-2">
                <div className="bg-brand-coral-energy h-2 rounded-full w-[28%]" />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Solo Explorers</span>
                <strong className="text-brand-ocean-teal">24%</strong>
              </div>
              <div className="w-full bg-ocean-50 rounded-full h-2">
                <div className="bg-brand-warm-sand h-2 rounded-full w-[24%]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Destination Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Sri Lankan Destination"
        subtitle="Catalog Entry for Editorial Moderation"
      >
        <form onSubmit={handleAddDestination} className="space-y-4 text-xs">
          <div>
            <label htmlFor="admin-new-dest-name" className="block font-bold text-brand-deep-ocean mb-1">
              Destination / Landmark Name
            </label>
            <input
              id="admin-new-dest-name"
              type="text"
              required
              value={newDestName}
              onChange={(e) => setNewDestName(e.target.value)}
              placeholder="e.g. Pidurangala Rock, Dambulla"
              className="w-full px-3 py-2 bg-brand-seafoam-mist/40 border border-ocean-100 rounded-xl text-brand-deep-ocean focus:outline-none focus:border-brand-ocean-teal"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="admin-new-dest-region" className="block font-bold text-brand-deep-ocean mb-1">
                Region
              </label>
              <select
                id="admin-new-dest-region"
                value={newDestRegion}
                onChange={(e) => setNewDestRegion(e.target.value)}
                className="w-full px-3 py-2 bg-brand-seafoam-mist/40 border border-ocean-100 rounded-xl text-brand-deep-ocean focus:outline-none focus:border-brand-ocean-teal"
              >
                <option value="Cultural Triangle">Cultural Triangle</option>
                <option value="Central Highlands">Central Highlands</option>
                <option value="Southern Coast">Southern Coast</option>
                <option value="Eastern Coast">Eastern Coast</option>
                <option value="Western Coast">Western Coast</option>
              </select>
            </div>

            <div>
              <label htmlFor="admin-new-dest-category" className="block font-bold text-brand-deep-ocean mb-1">
                Category
              </label>
              <select
                id="admin-new-dest-category"
                value={newDestCategory}
                onChange={(e) => setNewDestCategory(e.target.value)}
                className="w-full px-3 py-2 bg-brand-seafoam-mist/40 border border-ocean-100 rounded-xl text-brand-deep-ocean focus:outline-none focus:border-brand-ocean-teal"
              >
                <option value="Heritage">Heritage</option>
                <option value="Adventure">Adventure</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Coastal">Coastal</option>
                <option value="Wellness">Wellness</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="admin-new-dest-fee" className="block font-bold text-brand-deep-ocean mb-1">
              Foreign Entry Fee (USD)
            </label>
            <input
              id="admin-new-dest-fee"
              type="number"
              min="0"
              value={newDestFee}
              onChange={(e) => setNewDestFee(e.target.value)}
              className="w-full px-3 py-2 bg-brand-seafoam-mist/40 border border-ocean-100 rounded-xl text-brand-deep-ocean focus:outline-none focus:border-brand-ocean-teal"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="coral" type="submit">
              Save Landmark
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
