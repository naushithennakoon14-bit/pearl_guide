import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  Calendar,
  Car,
  Shield,
  Menu,
  X,
  Heart,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSavedTrips } from '../../context/SavedTripsContext';
import { Button } from '../common/Button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout, switchDemoRole } = useAuth();
  const { savedDestinationIds } = useSavedTrips();
  const navigate = useNavigate();

  // Close menus on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: "Explore", path: "/destinations", icon: Compass },
    { name: "Trip Planner", path: "/planner", icon: Sparkles },
    { name: "Travel Services", path: "/services", icon: Car },
    { name: "My Trips", path: "/my-trips", icon: Heart, count: savedDestinationIds.length },
    { name: "Dashboard", path: "/dashboard", icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-deep-ocean/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[5.5rem] lg:min-h-[6rem]">
          <Link to="/" className="group shrink-0 rounded-sm" aria-label="Pearl Guide home">
            <img
              src="/assets/pearl-guide-logo.png"
              alt="Pearl Guide"
              className="block h-[5.25rem] w-[5.25rem] sm:h-[5.75rem] sm:w-[5.75rem] object-contain"
              decoding="async"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-medium tracking-normal transition-all duration-150 rounded-md ${
                      isActive
                        ? 'text-brand-deep-ocean font-bold bg-brand-ocean-teal/10 after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brand-ocean-teal'
                        : 'text-brand-deep-ocean/75 hover:text-brand-deep-ocean hover:bg-brand-seafoam-mist/80'
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-brand-ocean-teal/80 shrink-0" />
                    <span>{link.name}</span>
                    {link.count > 0 && (
                      <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-bold bg-brand-coral-energy text-white">
                        {link.count}
                      </span>
                    )}
                  </span>
                </NavLink>
              );
            })}

            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-brand-deep-ocean text-brand-tropical-aqua'
                      : 'text-brand-deep-ocean/80 hover:text-brand-deep-ocean hover:bg-brand-seafoam-mist'
                  }`
                }
              >
                <Shield className="w-3.5 h-3.5 text-brand-coral-energy" />
                <span>Admin</span>
              </NavLink>
            )}
          </nav>

          {/* User & Role Switcher Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-brand-deep-ocean/15 text-brand-deep-ocean hover:border-brand-ocean-teal transition-all shadow-paper"
                title="Preview role switch"
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
                aria-label="Switch preview persona"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-tropical-aqua"></span>
                <span className="capitalize">{user ? user.role : 'Guest'} Mode</span>
                <ChevronDown className="w-3.5 h-3.5 text-brand-ocean-teal" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-luxury border border-ocean-100 py-2 z-50 animate-slide-up"
                  role="menu"
                  aria-label="Preview Personas"
                >
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ocean-700">
                    Switch Preview Persona
                  </div>
                  <button
                    role="menuitem"
                    onClick={() => { switchDemoRole('traveler'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-brand-deep-ocean hover:bg-brand-seafoam-mist flex items-center justify-between"
                  >
                    <span>Traveler (Elena)</span>
                    {user?.role === 'traveler' && <span className="text-brand-ocean-teal">✓</span>}
                  </button>
                  <button
                    role="menuitem"
                    onClick={() => { switchDemoRole('admin'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-brand-deep-ocean hover:bg-brand-seafoam-mist flex items-center justify-between"
                  >
                    <span>Admin (Chaminda)</span>
                    {user?.role === 'admin' && <span className="text-brand-ocean-teal">✓</span>}
                  </button>
                  <div className="border-t border-ocean-100 my-1"></div>
                  <button
                    role="menuitem"
                    onClick={() => { logout(); setUserDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-brand-coral-energy hover:bg-coral-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <Link to="/dashboard" className="flex items-center gap-2.5 pl-2 group" aria-label="Go to User Dashboard">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-ocean-teal/40 group-hover:ring-brand-coral-energy transition-all"
                />
                <div className="text-left hidden xl:block">
                  <div className="text-xs font-bold text-brand-deep-ocean leading-tight">{user.name}</div>
                  <div className="text-[10px] text-brand-ocean-teal capitalize">{user.role}</div>
                </div>
              </Link>
            ) : (
              <Button
                variant="coral"
                size="sm"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
            )}

            <Button
              variant="coral"
              size="sm"
              icon={Sparkles}
              onClick={() => navigate('/planner')}
              className="hidden xl:inline-flex"
            >
              Plan Journey
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-11 min-w-11 p-2 rounded-xl text-brand-deep-ocean hover:bg-brand-seafoam-mist focus:outline-none focus:ring-2 focus:ring-brand-ocean-teal"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-t border-ocean-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 animate-slide-up shadow-luxury"
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                      isActive
                        ? 'bg-brand-ocean-teal/15 text-brand-deep-ocean'
                        : 'text-brand-deep-ocean/80 hover:bg-brand-seafoam-mist'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-brand-ocean-teal" />
                    <span>{link.name}</span>
                  </div>
                  {link.count > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-coral-energy text-white">
                      {link.count}
                    </span>
                  )}
                </NavLink>
              );
            })}

            {isAdmin && (
              <NavLink
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-brand-deep-ocean bg-brand-warm-sand/40"
              >
                <Shield className="w-5 h-5 text-brand-coral-energy" />
                <span>Admin Operations</span>
              </NavLink>
            )}

            <div className="pt-4 border-t border-ocean-100 mt-2 flex flex-col gap-2">
              <div className="flex items-center justify-between px-2 text-xs font-semibold text-ocean-700">
                <span>Preview Mode Persona:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => switchDemoRole('traveler')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      user?.role === 'traveler' ? 'bg-brand-ocean-teal text-white' : 'bg-ocean-100 text-brand-deep-ocean'
                    }`}
                  >
                    Traveler
                  </button>
                  <button
                    onClick={() => switchDemoRole('admin')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      user?.role === 'admin' ? 'bg-brand-ocean-teal text-white' : 'bg-ocean-100 text-brand-deep-ocean'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              {!isAuthenticated ? (
                <Button
                  variant="coral"
                  className="w-full mt-2"
                  onClick={() => { setMobileMenuOpen(false); navigate('/auth'); }}
                >
                  Sign In / Register
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                >
                  Log Out
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
