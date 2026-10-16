import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// 10 Core Pages
import { Home } from './pages/Home';
import { ExploreDestinations } from './pages/ExploreDestinations';
import { DestinationDetails } from './pages/DestinationDetails';
import { AITripPlanner } from './pages/AITripPlanner';
import { TravelServices } from './pages/TravelServices';
import { AuthPage } from './pages/AuthPage';
import { UserDashboard } from './pages/UserDashboard';
import { MyTrips } from './pages/MyTrips';
import { BookingCheckout } from './pages/BookingCheckout';
import { AdminDashboard } from './pages/AdminDashboard';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-seafoam-mist text-brand-deep-ocean selection:bg-brand-tropical-aqua selection:text-brand-deep-ocean font-sans">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<ExploreDestinations />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/planner" element={<AITripPlanner />} />
          <Route path="/services" element={<TravelServices />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/checkout" element={<BookingCheckout />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
