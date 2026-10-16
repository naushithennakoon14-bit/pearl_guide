import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [policyModal, setPolicyModal] = useState(null); // 'privacy' | 'terms' | null
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast('Thanks for your interest. Newsletter sign-ups are not connected in this preview.', 'info');
    setEmail('');
  };

  return (
    <footer className="bg-brand-deep-ocean text-brand-seafoam-mist pt-16 pb-10 border-t-4 border-brand-ocean-teal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex mb-4 focus-visible:outline-offset-4" aria-label="Pearl Guide home">
              <img
                src="/assets/pearl-guide-logo.png"
                alt="Pearl Guide"
                className="block h-32 w-32 sm:h-36 sm:w-36 object-contain"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-sm text-brand-seafoam-mist/85 leading-relaxed max-w-sm mb-6">
              Find places, experiences, and trip-planning tools for exploring Sri Lanka—from the hill country to the southern coast.
            </p>
          </div>

          {/* Curated Destinaton Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-warm-sand mb-4">
              Explore Regions
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-seafoam-mist/80">
              <li>
                <Link to="/destinations?region=Cultural+Triangle" className="hover:text-brand-tropical-aqua transition-colors">
                  Cultural Triangle & Sigiriya
                </Link>
              </li>
              <li>
                <Link to="/destinations?region=Central+Highlands" className="hover:text-brand-tropical-aqua transition-colors">
                  Central Highlands & Ella
                </Link>
              </li>
              <li>
                <Link to="/destinations?region=Southern+Coast" className="hover:text-brand-tropical-aqua transition-colors">
                  Southern Coast & Galle Fort
                </Link>
              </li>
              <li>
                <Link to="/destinations?region=Eastern+Coast" className="hover:text-brand-tropical-aqua transition-colors">
                  Eastern Coast & Trincomalee
                </Link>
              </li>
              <li>
                <Link to="/destinations?category=Wildlife" className="hover:text-brand-tropical-aqua transition-colors">
                  Yala & Wilpattu Safaris
                </Link>
              </li>
            </ul>
          </div>

          {/* Journeys & Tools */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-warm-sand mb-4">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-seafoam-mist/80">
              <li>
                <Link to="/planner" className="hover:text-brand-tropical-aqua transition-colors flex items-center gap-1.5">
                  <span>Trip Planner</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-tropical-aqua transition-colors">
                  Chauffeured Private Tours
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-tropical-aqua transition-colors">
                  Scenic Highland Train Passes
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-tropical-aqua transition-colors">
                  Ayurveda Wellness Retreats
                </Link>
              </li>
              <li>
                <Link to="/my-trips" className="hover:text-brand-tropical-aqua transition-colors">
                  Saved Destinations
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-warm-sand mb-4">
              Ceylon Dispatches
            </h4>
            <p className="text-xs text-brand-seafoam-mist/80 mb-3">
              Receive monthly seasonal monsoonal updates, hidden waterfall coordinates, and tea harvest stories.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Your email address for travel dispatches"
                  className="w-full px-3.5 py-2.5 bg-ocean-900 border border-ocean-700 rounded-xl text-xs text-white placeholder-brand-seafoam-mist/40 focus:outline-none focus:border-brand-tropical-aqua"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 bg-brand-coral-energy hover:bg-coral-600 text-white rounded-xl text-xs font-bold transition-all shadow-coral-glow flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="mt-4 text-[11px] text-brand-seafoam-mist/60 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-brand-tropical-aqua" />
              <span>Tourist Police Hotline: <strong className="text-white">1912</strong> (Sri Lanka)</span>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-brand-seafoam-mist/75 gap-4">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} Pearl Guide (Ceylon Curated). All rights reserved.</p>
            <p className="text-[11px] text-brand-warm-sand/80 mt-1">
              Preview only: travel details and prices are illustrative. No reservation is confirmed here.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setPolicyModal('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setPolicyModal('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <span>•</span>
            <Link to="/admin" className="hover:text-brand-tropical-aqua transition-colors">Admin Console</Link>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      {policyModal && (
        <Modal
          isOpen={!!policyModal}
          onClose={() => setPolicyModal(null)}
          title={policyModal === 'privacy' ? 'Privacy Policy & Data Ethics' : 'Terms of Service & Booking Protocols'}
          subtitle="Pearl Guide Ceylon Curated"
        >
          <div className="space-y-4 text-xs text-brand-deep-ocean leading-relaxed">
            {policyModal === 'privacy' ? (
              <>
                <p>
                  <strong>Pearl Guide</strong> is a travel-planning preview. Review a provider's privacy policy before sharing personal or travel details, and do not enter passport or payment information here.
                </p>
                <div className="p-3 bg-brand-seafoam-mist rounded-xl border border-ocean-100">
                  <strong className="block text-brand-deep-ocean mb-1">Preview notice:</strong>
                  Newsletter and booking interactions shown here are not connected to live services.
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Reservation & Cancellation Policy:</strong>
                  This preview does not confirm reservations. Check current terms, availability, and cancellation rules directly with your travel provider.
                </p>
                <p>
                  <strong>Scenic Railway Passes:</strong>
                  Train schedules and tickets should be confirmed with Sri Lanka Railways or an authorized ticket provider.
                </p>
                <div className="p-3 bg-brand-seafoam-mist rounded-xl border border-ocean-100">
                  <strong className="block text-brand-deep-ocean mb-1">Payment notice:</strong>
                  No live payment is collected through this preview.
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </footer>
  );
};
