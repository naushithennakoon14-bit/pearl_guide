import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Compass,
  Users,
  Zap,
  DollarSign,
  Clock,
  MapPin,
  Check,
  Bookmark,
  Share2,
  Printer,
  ChevronDown,
  ChevronUp,
  Loader2,
  Car
} from 'lucide-react';
import { useSavedTrips } from '../context/SavedTripsContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const AITripPlanner = () => {
  const navigate = useNavigate();
  const { saveCustomTrip, startBooking } = useSavedTrips();
  const { addToast } = useToast();

  const [duration, setDuration] = useState(7);
  const [style, setStyle] = useState('Cultural & Heritage');
  const [group, setGroup] = useState('Couple');
  const [pace, setPace] = useState('Balanced');
  const [budget, setBudget] = useState('Premium');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [expandedDay, setExpandedDay] = useState(1);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationStep('Preparing a sample route from your selections...');

    setTimeout(() => {
      setGenerationStep('Organizing the sample destinations into a day-by-day outline...');
    }, 800);

    setTimeout(() => {
      setGenerationStep('Finishing your itinerary preview...');
    }, 1600);

    setTimeout(() => {
      const newPlan = {
        title: `${duration}-Day ${style} Odyssey`,
        durationDays: duration,
        travelStyle: style,
        groupType: group,
        pace: pace,
        budgetTier: budget,
        destinations: duration <= 5 ? ["Sigiriya", "Kandy", "Ella"] : ["Sigiriya", "Kandy", "Ella", "Yala", "Galle Fort"],
        estimatedBudgetUSD: duration * (budget === 'Ultra-Luxury' ? 260 : budget === 'Premium' ? 180 : 110),
        days: Array.from({ length: duration }).map((_, index) => {
          const dayNum = index + 1;
          if (dayNum === 1) {
            return {
              dayNumber: 1,
              region: "Negombo & Cultural Triangle",
              title: "Arrival in Paradise & Chauffeur Transfer to Sigiriya",
              morning: "Private chauffeur greeting at Colombo International Airport (CMB). Welcome king coconut refreshments.",
              afternoon: "Scenic highway transfer to Habarana eco-lodge through coconut groves and rural paddy fields.",
              evening: "Traditional ayurvedic welcome herbal infusion and clay-pot dinner beside lotus lake."
            };
          } else if (dayNum === 2) {
            return {
              dayNumber: 2,
              region: "Sigiriya Citadel",
              title: "Dawn Ascent of Sigiriya Rock Fortress & Elephant Gathering",
              morning: "Early 6:30 AM climb to avoid heat; admire 5th-century frescoes and panoramic jungle summit.",
              afternoon: "Open 4x4 safari drive in Minneriya National Park observing wild Asian elephant herds.",
              evening: "Sunset drinks overlooking Pidurangala rock silhouette."
            };
          } else if (dayNum === 3) {
            return {
              dayNumber: 3,
              region: "Central Highlands (Kandy)",
              title: "Dambulla Golden Cave Temple & Temple of the Tooth",
              morning: "Ascend Dambulla rock caves to view 150+ gilded Buddha statues dating from the 1st century BCE.",
              afternoon: "Travel up into the misty mountains to Kandy; stroll around the scenic royal lake.",
              evening: "Attend the evening drum and relic ceremony at Sri Dalada Maligawa."
            };
          } else if (dayNum === 4) {
            return {
              dayNumber: 4,
              region: "Ceylon Tea Country",
              title: "The Scenic Highland Blue Train to Ella",
              morning: "Board the reserved First-Class observation train from Peradeniya to Ella.",
              afternoon: "Marvel at rolling emerald tea fields, waterfalls, and mountain tunnels.",
              evening: "Check into a cliffside boutique resort; dine with panoramic valley views."
            };
          } else if (dayNum === 5) {
            return {
              dayNumber: 5,
              region: "Ella Gap",
              title: "Nine Arch Bridge Viaduct & Little Adam's Peak",
              morning: "Morning stroll along railway tracks to watch the mountain train cross Nine Arch Bridge.",
              afternoon: "Gentle 45-minute hike up Little Adam's Peak; Ceylon artisan tea tasting factory tour.",
              evening: "Local dinner featuring handmade hoppers and coconut sambol."
            };
          } else if (dayNum === 6) {
            return {
              dayNumber: 6,
              region: "Southern Escarpment",
              title: "Descend to Yala National Park Leopard Safari",
              morning: "Private transfer through Ravana Falls toward the coastal wilderness of Yala.",
              afternoon: "Private 4x4 game safari tracking leopards, sloth bears, and mugger crocodiles.",
              evening: "Luxury safari glamping dinner beneath the southern constellations."
            };
          } else {
            return {
              dayNumber: dayNum,
              region: "Southern Coastline",
              title: "Galle Dutch Fort Ramparts & Coastal Return",
              morning: "Morning walk around 17th-century Dutch ramparts, lighthouse, and artisan boutique alleys.",
              afternoon: "Fresh seafood lunch overlooking the Indian Ocean surf; relax at Weligama or Mirissa.",
              evening: "Expressway transfer to Colombo CMB airport for departure flight."
            };
          }
        })
      };

      setGeneratedPlan(newPlan);
      setIsGenerating(false);
      setGenerationStep('');
      addToast('Sample itinerary ready to review.', 'success');
    }, 2400);
  };

  const handleSaveTrip = () => {
    if (!generatedPlan) return;
    saveCustomTrip(generatedPlan);
  };

  const handleBookAllServices = () => {
    if (!generatedPlan) return;
    startBooking({
      serviceType: "itinerary_package",
      title: generatedPlan.title,
      destination: generatedPlan.destinations.join(" → "),
      entryFeeUSD: 95,
      basePriceUSD: generatedPlan.estimatedBudgetUSD,
      days: generatedPlan.durationDays,
      travelers: group === 'Solo Explorer' ? 1 : group === 'Couple' ? 2 : 4,
    });
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-brand-deep-ocean via-ocean-900 to-brand-ocean-teal rounded-3xl p-8 sm:p-12 text-white shadow-luxury relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
            Sri Lanka Itinerary Planner
          </h1>
          <p className="text-brand-seafoam-mist/85 text-sm sm:text-base leading-relaxed">
            Create a sample route from your selections. This preview uses built-in content only; it does not use live AI, schedules, weather, availability, or booking data.
          </p>
        </div>
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-brand-tropical-aqua/20 blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls Column */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-ocean-100 shadow-luxury space-y-6">
          <div className="border-b border-ocean-50 pb-3">
            <h2 className="text-lg font-serif font-bold text-brand-deep-ocean flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-coral-energy" />
              <span>Define Your Journey</span>
            </h2>
            <p className="text-xs text-brand-deep-ocean/70 mt-0.5">
              Choose a trip length, style, and pace for an illustrative route.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5 text-xs">
            {/* Duration Slider */}
            <div>
              <div className="flex justify-between font-bold text-brand-deep-ocean mb-2">
                <label htmlFor="trip-duration-slider">Trip Duration</label>
                <span className="text-brand-coral-energy font-serif text-sm">{duration} Days</span>
              </div>
              <input
                id="trip-duration-slider"
                type="range"
                min="3"
                max="14"
                step="1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                aria-label="Trip duration in days"
                aria-valuemin="3"
                aria-valuemax="14"
                aria-valuenow={duration}
                className="w-full accent-brand-coral-energy cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-brand-deep-ocean/50 mt-1">
                <span>3 Days (Express)</span>
                <span>7 Days (Classic)</span>
                <span>14 Days (Grand Tour)</span>
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label htmlFor="trip-style-select" className="block font-bold text-brand-deep-ocean mb-1.5 uppercase tracking-wider text-[10px]">
                Travel Style & Focus
              </label>
              <select
                id="trip-style-select"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-2.5 bg-brand-seafoam-mist/60 border border-ocean-100 rounded-xl font-semibold text-brand-deep-ocean focus:outline-none focus:border-brand-ocean-teal cursor-pointer"
              >
                <option value="Cultural & Heritage">Cultural Triangle & UNESCO Citadels</option>
                <option value="Wildlife Safari">Wildlife Safari (Leopards & Elephants)</option>
                <option value="Active Adventure">Highland Trekking & Surfing</option>
                <option value="Coastal Relaxation">Golden Beach Hideaways & Whales</option>
                <option value="Ayurvedic Luxury">Ayurveda Wellness & Tea Estates</option>
                <option value="Honeymoon & Romance">Bespoke Romance & Private Villas</option>
              </select>
            </div>

            {/* Group Configuration */}
            <div>
              <span className="block font-bold text-brand-deep-ocean mb-1.5 uppercase tracking-wider text-[10px]">
                Group Configuration
              </span>
              <div className="grid grid-cols-2 gap-2" role="group" aria-label="Group configuration">
                {['Solo Explorer', 'Couple', 'Family with Kids', 'Friends Group'].map((grp) => (
                  <button
                    type="button"
                    key={grp}
                    onClick={() => setGroup(grp)}
                    aria-pressed={group === grp}
                    className={`p-2 rounded-xl text-center font-semibold border transition-all ${
                      group === grp
                        ? 'bg-brand-ocean-teal text-white border-brand-ocean-teal shadow-sm'
                        : 'bg-brand-seafoam-mist/40 text-brand-deep-ocean border-ocean-100 hover:border-brand-ocean-teal'
                    }`}
                  >
                    {grp}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Pace */}
            <div>
              <span className="block font-bold text-brand-deep-ocean mb-1.5 uppercase tracking-wider text-[10px]">
                Travel Pace
              </span>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Travel pace">
                {['Relaxed', 'Balanced', 'Action-Packed'].map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPace(p)}
                    aria-pressed={pace === p}
                    className={`p-2 rounded-xl text-center font-semibold border transition-all ${
                      pace === p
                        ? 'bg-brand-deep-ocean text-white border-brand-deep-ocean'
                        : 'bg-brand-seafoam-mist/40 text-brand-deep-ocean border-ocean-100 hover:border-brand-ocean-teal'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Tier */}
            <div>
              <span className="block font-bold text-brand-deep-ocean mb-1.5 uppercase tracking-wider text-[10px]">
                Comfort & Hotel Standard
              </span>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Budget tier">
                {['Boutique', 'Premium', 'Ultra-Luxury'].map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    aria-pressed={budget === b}
                    className={`p-2 rounded-xl text-center font-semibold border transition-all ${
                      budget === b
                        ? 'bg-brand-warm-sand text-brand-deep-ocean font-bold border-brand-warm-sand'
                        : 'bg-brand-seafoam-mist/40 text-brand-deep-ocean border-ocean-100 hover:border-brand-ocean-teal'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="coral"
              size="lg"
              isLoading={isGenerating}
              icon={Sparkles}
              className="w-full shadow-coral-glow"
            >
              Build sample itinerary
            </Button>
          </form>
        </div>

        {/* Results Showcase Column */}
        <div className="lg:col-span-8 space-y-6">
          {isGenerating ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-ocean-100 shadow-luxury space-y-6 animate-pulse-subtle">
              <div className="w-16 h-16 rounded-full bg-brand-ocean-teal/15 text-brand-ocean-teal flex items-center justify-center mx-auto">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-brand-deep-ocean">
                  Building your sample itinerary
                </h3>
                <p className="text-xs text-brand-ocean-teal font-semibold mt-2">
                  {generationStep}
                </p>
              </div>
              <div className="max-w-md mx-auto bg-brand-seafoam-mist rounded-full h-2 overflow-hidden">
                <div className="bg-brand-coral-energy h-full w-2/3 animate-pulse" />
              </div>
            </div>
          ) : generatedPlan ? (
            <div className="space-y-6 animate-slide-up">
              {/* Itinerary Header Summary */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-ocean-100 shadow-luxury">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-ocean-100 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="aqua" size="sm">Sample itinerary</Badge>
                      <Badge variant="sand" size="sm">{generatedPlan.durationDays} Days</Badge>
                      <Badge variant="teal" size="sm">{generatedPlan.travelStyle}</Badge>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-deep-ocean">
                      {generatedPlan.title}
                    </h2>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Bookmark}
                      onClick={handleSaveTrip}
                    >
                      Save to My Trips
                    </Button>
                    <Button
                      variant="coral"
                      size="sm"
                      icon={Car}
                      onClick={handleBookAllServices}
                    >
                      Book Tour Chauffeur
                    </Button>
                  </div>
                </div>

                {/* Logistics Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                  <div>
                    <span className="text-brand-deep-ocean/60 block">Route Covered</span>
                    <strong className="text-brand-deep-ocean">{generatedPlan.destinations.join(" → ")}</strong>
                  </div>
                  <div>
                    <span className="text-brand-deep-ocean/60 block">Illustrative budget</span>
                    <strong className="text-brand-coral-energy font-serif text-sm">${generatedPlan.estimatedBudgetUSD} USD</strong>
                  </div>
                  <div>
                    <span className="text-brand-deep-ocean/60 block">Travel Tempo</span>
                    <strong className="text-brand-deep-ocean">{generatedPlan.pace} Pace</strong>
                  </div>
                  <div>
                    <span className="text-brand-deep-ocean/60 block">Route status</span>
                    <strong className="text-brand-ocean-teal">Sample only</strong>
                  </div>
                </div>
                <p className="mt-4 border-t border-ocean-100 pt-3 text-xs text-brand-deep-ocean/70 leading-relaxed">
                  Illustrative route and budget based on built-in sample content. Confirm travel times, prices, availability, and conditions independently.
                </p>
              </div>

              {/* Day-by-Day Accordion / Timeline */}
              <div className="space-y-4">
                {generatedPlan.days.map((day) => {
                  const isExpanded = expandedDay === day.dayNumber;
                  return (
                    <div
                      key={day.dayNumber}
                      className="bg-white rounded-2xl border border-ocean-100 shadow-sm overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedDay(isExpanded ? null : day.dayNumber)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-brand-seafoam-mist/40 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-9 h-9 rounded-xl bg-brand-deep-ocean text-white font-serif font-bold text-sm flex items-center justify-center shrink-0">
                            D{day.dayNumber}
                          </span>
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal">
                              {day.region}
                            </div>
                            <h4 className="text-base font-serif font-bold text-brand-deep-ocean">
                              {day.title}
                            </h4>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-brand-deep-ocean/60 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-brand-deep-ocean/60 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-5 pt-0 border-t border-ocean-50 text-xs sm:text-sm text-brand-deep-ocean space-y-3 bg-brand-seafoam-mist/20">
                          <div className="p-3 rounded-xl bg-white border border-ocean-100">
                            <span className="font-bold text-brand-ocean-teal block text-xs uppercase mb-1">
                              🌅 Morning
                            </span>
                            <p className="text-brand-deep-ocean/80 leading-relaxed text-xs">
                              {day.morning}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-ocean-100">
                            <span className="font-bold text-brand-ocean-teal block text-xs uppercase mb-1">
                              ☀️ Afternoon
                            </span>
                            <p className="text-brand-deep-ocean/80 leading-relaxed text-xs">
                              {day.afternoon}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-ocean-100">
                            <span className="font-bold text-brand-ocean-teal block text-xs uppercase mb-1">
                              🌙 Evening
                            </span>
                            <p className="text-brand-deep-ocean/80 leading-relaxed text-xs">
                              {day.evening}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-ocean-100 shadow-luxury space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-seafoam-mist flex items-center justify-center text-brand-ocean-teal mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-deep-ocean">
                Your Custom Journey Awaits
              </h3>
              <p className="text-xs text-brand-deep-ocean/70 max-w-md mx-auto leading-relaxed">
                Adjust the duration, style, and travel pace to build an illustrative, day-by-day sample route.
              </p>
              <Button
                variant="coral"
                size="md"
                onClick={handleGenerate}
              >
                Build 7-day sample itinerary
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
