import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  CreditCard,
  Lock,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Car,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useSavedTrips } from '../context/SavedTripsContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const BookingCheckout = () => {
  const navigate = useNavigate();
  const { activeBooking, clearBooking } = useSavedTrips();
  const { user } = useAuth();
  const { addToast } = useToast();

  // Fallback default booking if user accessed directly
  const booking = activeBooking || {
    serviceType: "private_chauffeur",
    title: "Chauffeured Private Vehicle & Guide",
    destination: "Colombo → Cultural Triangle → Central Highlands",
    entryFeeUSD: 36,
    basePriceUSD: 140,
    days: 3,
    travelers: 2,
  };

  const [fullName, setFullName] = useState(user?.name || 'Elena Rostova');
  const [email, setEmail] = useState(user?.email || 'elena.travels@example.com');
  const [phone, setPhone] = useState('+41 79 123 4567');
  const [passport, setPassport] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Colombo Airport (CMB) or Hotel');
  const [specialRequests, setSpecialRequests] = useState('Child booster seat requested if possible. Preference for vegetarian Sri Lankan curries.');
  const [paymentMethod, setPaymentMethod] = useState('card_sandbox');
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  // Itemized Calculations
  const subtotal = booking.basePriceUSD * (booking.days || 1);
  const entryFeesTotal = (booking.entryFeeUSD || 0) * (booking.travelers || 2);
  const ecoLevy = 15; // Sri Lanka Wildlife Conservation & Tree Planting Fund
  const grandTotalUSD = subtotal + entryFeesTotal + ecoLevy;

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    setConfirmationModalOpen(true);
    addToast('Booking preview ready. No reservation was submitted.', 'info');
  };

  const handleFinish = () => {
    setConfirmationModalOpen(false);
    clearBooking();
    navigate('/dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Test Preview Advisory Banner */}
      <div className="bg-brand-warm-sand/40 border border-brand-warm-sand rounded-2xl p-4 flex items-start gap-3 text-brand-deep-ocean">
        <ShieldAlert className="w-5 h-5 text-brand-coral-energy shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <strong className="block text-brand-deep-ocean mb-0.5 font-bold">
            Preview only — no reservation or payment will be submitted:
          </strong>
          Use placeholder details only. Do not enter passport or payment information; this preview does not contact a provider or process bookings.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Traveler & Logistics Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-ocean-100 shadow-luxury space-y-6">
          <div className="border-b border-ocean-50 pb-4">
            <Badge variant="teal" size="sm" className="mb-2">Step 1 of 2</Badge>
            <h1 className="text-2xl font-serif font-bold text-brand-deep-ocean">
              Traveler Information & Pickup
            </h1>
            <p className="text-xs text-brand-deep-ocean/70 mt-1">
              Please provide passenger details as they appear on international passports.
            </p>
          </div>

          <form onSubmit={handleConfirmReservation} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkout-fullname" className="block font-bold text-brand-deep-ocean mb-1">
                  Lead Passenger Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-ocean-teal absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="checkout-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 form-input-brand"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkout-email" className="block font-bold text-brand-deep-ocean mb-1">
                  Email Address for Vouchers
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-brand-ocean-teal absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 form-input-brand"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkout-phone" className="block font-bold text-brand-deep-ocean mb-1">
                  WhatsApp Contact Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-brand-ocean-teal absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 form-input-brand"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkout-passport" className="block font-bold text-brand-deep-ocean mb-1">
                  Passport Number (Optional for Preview)
                </label>
                <input
                  id="checkout-passport"
                  type="text"
                  value={passport}
                  onChange={(e) => setPassport(e.target.value)}
                  className="w-full px-3 py-2.5 form-input-brand"
                />
              </div>
            </div>

            <div>
              <label htmlFor="checkout-pickup" className="block font-bold text-brand-deep-ocean mb-1">
                Pickup Location in Sri Lanka
              </label>
              <input
                id="checkout-pickup"
                type="text"
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="e.g. Bandaranaike Intl Airport CMB (Flight UL504) or Colombo Hotel"
                className="w-full px-3 py-2.5 form-input-brand"
              />
            </div>

            <div>
              <label htmlFor="checkout-requests" className="block font-bold text-brand-deep-ocean mb-1">
                Dietary, Luggage or Accessibility Notes
              </label>
              <textarea
                id="checkout-requests"
                rows="3"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-3 py-2.5 form-input-brand leading-relaxed"
              />
            </div>

            {/* Payment Method Selector Preview */}
            <div className="pt-4 border-t border-ocean-50 space-y-3">
              <label className="block font-bold text-brand-deep-ocean uppercase tracking-wider text-[11px]">
                Payment Option (Preview Gateway)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card_sandbox')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'card_sandbox'
                      ? 'border-brand-ocean-teal bg-brand-seafoam-mist/50 ring-1 ring-brand-ocean-teal'
                      : 'border-ocean-100 hover:border-brand-ocean-teal'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-brand-ocean-teal mb-1.5" />
                  <div className="font-bold text-brand-deep-ocean">Card (preview)</div>
                  <div className="text-[10px] text-brand-deep-ocean/60">Not connected</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('arrival_cash')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'arrival_cash'
                      ? 'border-brand-ocean-teal bg-brand-seafoam-mist/50 ring-1 ring-brand-ocean-teal'
                      : 'border-ocean-100 hover:border-brand-ocean-teal'
                  }`}
                >
                  <Calendar className="w-5 h-5 text-brand-ocean-teal mb-1.5" />
                  <div className="font-bold text-brand-deep-ocean">Pay on arrival (preview)</div>
                  <div className="text-[10px] text-brand-deep-ocean/60">Not connected</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-brand-ocean-teal bg-brand-seafoam-mist/50 ring-1 ring-brand-ocean-teal'
                      : 'border-ocean-100 hover:border-brand-ocean-teal'
                  }`}
                >
                  <Lock className="w-5 h-5 text-brand-ocean-teal mb-1.5" />
                  <div className="font-bold text-brand-deep-ocean">Bank transfer (preview)</div>
                  <div className="text-[10px] text-brand-deep-ocean/60">Not connected</div>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="coral"
              size="lg"
              className="w-full shadow-coral-glow mt-4"
            >
              Review Booking Preview (${grandTotalUSD} USD)
            </Button>
          </form>
        </div>

        {/* Right Column: Order Summary & Itemized Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-ocean-100 shadow-luxury space-y-6">
          <div className="border-b border-ocean-50 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ocean-teal">
              Illustrative Pricing
            </span>
            <h2 className="text-xl font-serif font-bold text-brand-deep-ocean mt-0.5">
              Trip Booking Summary
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-brand-seafoam-mist/50 border border-ocean-100 space-y-2">
              <div className="font-serif font-bold text-base text-brand-deep-ocean">
                {booking.title}
              </div>
              <div className="text-brand-ocean-teal font-medium">
                {booking.destination}
              </div>
              <div className="flex gap-4 text-brand-deep-ocean/70 pt-1 text-[11px]">
                <span>Duration: <strong>{booking.days || 1} Days</strong></span>
                <span>Travelers: <strong>{booking.travelers || 2}</strong></span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between text-brand-deep-ocean">
                <span>Example vehicle rate ({booking.days || 1} days)</span>
                <span className="font-semibold">${subtotal} USD</span>
              </div>

              {entryFeesTotal > 0 && (
                <div className="flex justify-between text-brand-deep-ocean">
                  <span>Sample park & site fees</span>
                  <span className="font-semibold">${entryFeesTotal} USD</span>
                </div>
              )}

              <div className="flex justify-between text-brand-deep-ocean">
                <span>Tolls & fuel</span>
                <span className="text-brand-deep-ocean/60 font-semibold">Not verified</span>
              </div>

              <div className="flex justify-between text-brand-deep-ocean">
                <span>Example additional fee</span>
                <span className="font-semibold">${ecoLevy} USD</span>
              </div>

              <div className="border-t border-ocean-100 pt-3 flex justify-between items-center text-sm font-bold text-brand-deep-ocean">
                <span className="text-base font-serif">Example total (USD)</span>
                <span className="text-2xl font-serif font-black text-brand-coral-energy">
                  ${grandTotalUSD}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-seafoam-mist/70 border border-ocean-100 space-y-2 text-xs text-brand-deep-ocean">
            <div className="flex items-center gap-2 font-bold text-brand-ocean-teal">
              <CheckCircle2 className="w-4 h-4" />
              <span>Before you travel</span>
            </div>
            <p className="text-[11px] text-brand-deep-ocean/70 leading-relaxed">
              Confirm current prices, availability, transport, and cancellation terms directly with providers. This preview does not make a booking.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmationModalOpen}
        onClose={handleFinish}
        title="Booking Preview"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-warm-sand/40 text-brand-deep-ocean flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-brand-coral-energy" />
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold text-brand-deep-ocean">
              Preview ready, {fullName}!
            </h3>
            <p className="text-xs text-brand-deep-ocean/80 max-w-sm mx-auto mt-2 leading-relaxed">
              This is an example for <strong className="text-brand-deep-ocean">{booking.title}</strong>. No reservation was submitted, no provider was contacted, and no payment was taken.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-seafoam-mist text-left text-xs space-y-2 border border-ocean-100">
            <div className="flex justify-between">
              <span className="text-brand-deep-ocean/60">Example pickup:</span>
              <span className="font-bold text-brand-deep-ocean">{pickupLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-deep-ocean/60">Illustrative total:</span>
              <span className="font-bold text-brand-coral-energy">${grandTotalUSD} USD</span>
            </div>
          </div>

          <Button
            variant="coral"
            size="md"
            className="w-full"
            onClick={handleFinish}
          >
            Return to Dashboard
          </Button>
        </div>
      </Modal>
    </div>
  );
};
