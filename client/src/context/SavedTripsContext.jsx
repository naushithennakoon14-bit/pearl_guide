import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const SavedTripsContext = createContext();

const INITIAL_SAVED_DESTINATIONS = ['sigiriya', 'ella', 'galle-fort'];

const INITIAL_TRIPS = [
  {
    id: "trip_7day_classic",
    title: "7-Day Cultural Triangle & Hill Country Expedition",
    durationDays: 7,
    travelStyle: "Cultural & Scenic",
    pace: "Balanced",
    destinations: ["Sigiriya", "Kandy", "Nuwara Eliya", "Ella", "Galle"],
    estimatedBudgetUSD: 1450,
    createdDate: "Oct 12, 2026",
    days: [
      {
        dayNumber: 1,
        title: "Arrival in Negombo & Transfer to Cultural Triangle",
        morning: "Private chauffeur greeting at Bandaranaike International Airport (CMB). Scenic coastal drive via Kurunegala.",
        afternoon: "Check-in at luxury eco-lodge in Habarana with tropical welcome drink.",
        evening: "Sunset herb garden walk and authentic Sri Lankan clay-pot curry banquet."
      },
      {
        dayNumber: 2,
        title: "Sigiriya Lion Rock & Minneriya Elephant Gathering",
        morning: "Dawn ascent of 5th-century Sigiriya Rock Fortress before sunrise heat.",
        afternoon: "Open-top 4x4 safari drive through Minneriya National Park observing wild elephant herds.",
        evening: "Traditional ayurvedic relaxation foot massage at your lodge."
      },
      {
        dayNumber: 3,
        title: "Dambulla Cave Temples to Royal Kandy",
        morning: "Explore the 1st-century BCE gilded cave monastery of Dambulla.",
        afternoon: "Scenic drive into Central Highlands; aromatic spice garden exploration in Matale.",
        evening: "Attend the evening drum ceremony at the Temple of the Sacred Tooth Relic."
      },
      {
        dayNumber: 4,
        title: "Peradeniya Botanics & Ceylon Blue Train to Ella",
        morning: "Walk through royal palm avenues and orchid pavilions in Peradeniya.",
        afternoon: "Board the reserved First-Class observation carriage on the world-famous Highland rail line.",
        evening: "Arrive in mist-covered Ella; hillside dinner overlooking Ravana Valley."
      },
      {
        dayNumber: 5,
        title: "Nine Arch Bridge & Tea Estate Tasting",
        morning: "Walk along lush railway tracks to Nine Arch Bridge to catch the morning mountain train.",
        afternoon: "Artisan single-estate Ceylon tea tasting and plucking demonstration.",
        evening: "Cocktails and contemporary Sri Lankan fusion fare in Ella village."
      },
      {
        dayNumber: 6,
        title: "Descent to the Southern Coast & Yala Safari",
        morning: "Descend the southern escarpment passing Ravana Waterfall.",
        afternoon: "Afternoon leopard and birdlife safari in Yala National Park Block 1.",
        evening: "Transfer to boutique ocean villa in Galle Fort."
      },
      {
        dayNumber: 7,
        title: "Galle Fort Ramparts & Coastal Return",
        morning: "Morning stroll on 17th-century Dutch colonial ramparts and lighthouse.",
        afternoon: "Artisan gem shopping and fresh coconut refreshments.",
        evening: "Chauffeured Southern Expressway transfer back to CMB airport for departure."
      }
    ]
  }
];

export const SavedTripsProvider = ({ children }) => {
  const { addToast } = useToast();

  const [savedDestinationIds, setSavedDestinationIds] = useState(() => {
    const saved = localStorage.getItem('pearl_saved_destinations');
    return saved ? JSON.parse(saved) : INITIAL_SAVED_DESTINATIONS;
  });

  const [savedTrips, setSavedTrips] = useState(() => {
    const saved = localStorage.getItem('pearl_saved_trips');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  const [activeBooking, setActiveBooking] = useState(() => {
    const saved = localStorage.getItem('pearl_active_booking');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('pearl_saved_destinations', JSON.stringify(savedDestinationIds));
  }, [savedDestinationIds]);

  useEffect(() => {
    localStorage.setItem('pearl_saved_trips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  useEffect(() => {
    if (activeBooking) {
      localStorage.setItem('pearl_active_booking', JSON.stringify(activeBooking));
    } else {
      localStorage.removeItem('pearl_active_booking');
    }
  }, [activeBooking]);

  const toggleSaveDestination = (destId, destName = "Destination") => {
    setSavedDestinationIds((prev) => {
      const exists = prev.includes(destId);
      if (exists) {
        addToast(`Removed ${destName} from saved list`, 'info');
        return prev.filter((id) => id !== destId);
      } else {
        addToast(`Saved ${destName} to your bucket list!`, 'success');
        return [...prev, destId];
      }
    });
  };

  const isSaved = (destId) => savedDestinationIds.includes(destId);

  const saveCustomTrip = (trip) => {
    const newTrip = {
      id: `trip_${Date.now()}`,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...trip,
    };
    setSavedTrips((prev) => [newTrip, ...prev]);
    addToast('Itinerary saved to My Trips!', 'success');
    return newTrip;
  };

  const deleteTrip = (tripId) => {
    setSavedTrips((prev) => prev.filter((t) => t.id !== tripId));
    addToast('Itinerary removed', 'info');
  };

  const startBooking = (bookingData) => {
    setActiveBooking(bookingData);
  };

  const clearBooking = () => {
    setActiveBooking(null);
  };

  return (
    <SavedTripsContext.Provider
      value={{
        savedDestinationIds,
        toggleSaveDestination,
        isSaved,
        savedTrips,
        saveCustomTrip,
        deleteTrip,
        activeBooking,
        startBooking,
        clearBooking,
      }}
    >
      {children}
    </SavedTripsContext.Provider>
  );
};

export const useSavedTrips = () => useContext(SavedTripsContext);
