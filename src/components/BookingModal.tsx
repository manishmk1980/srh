import React, { useState } from 'react';
import { X, Check, Calendar, Clock, AlertCircle, Lock, ShieldCheck, CreditCard, Printer, CheckCircle2 } from 'lucide-react';
import { ServiceType, BookingSubmission } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServiceId: ServiceType | null;
  onBookingComplete: (booking: BookingSubmission) => void;
}

const SERVICES_DATA = [
  { id: ServiceType.VITAL_SCREENING, title: 'Vital Screening', price: 199, duration: '15 mins', description: 'Assesses key vital signs like ECG pulse, Blood Pressure, Blood Oxygen, and Temperature.' },
  { id: ServiceType.VITALS_CONSULTATION, title: 'Vitals + Consultation', price: 399, duration: '30 mins', description: 'Complete vitals check-up followed by active remote general physician consultation.' },
  { id: ServiceType.FOLLOW_UP, title: 'Follow-up Consultation', price: 299, duration: '20 mins', description: 'Follow-up on medical reports and receive professional expert guidance on your health journey.' },
  { id: ServiceType.SPECIALIST, title: 'Specialist Consultation', price: 599, duration: '40 mins', description: 'In-depth review and video support consultation with seasoned specialist doctors.' },
];

const TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:30 AM - 11:30 AM',
  '12:00 PM - 01:00 PM',
  '02:00 PM - 03:00 PM',
  '03:30 PM - 04:30 PM',
  '05:00 PM - 06:00 PM'
];

export default function BookingModal({
  isOpen,
  onClose,
  selectedServiceId,
  onBookingComplete,
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Service details, 2: Info, 3: Secure Razorpay, 4: Receipt
  const [serviceId, setServiceId] = useState<ServiceType>(selectedServiceId || ServiceType.VITAL_SCREENING);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTimeSlot, setBookingTimeSlot] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'upi' | 'card'>('razorpay');
  const [cardNo, setCardNo] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [bookingDetails, setBookingDetails] = useState<BookingSubmission | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isOpen) return null;

  const currentService = SERVICES_DATA.find(s => s.id === serviceId) || SERVICES_DATA[0];

  // Validate Step 2: Informational fields
  const validatePatientInfo = () => {
    const errs: string[] = [];
    if (!patientName.trim()) errs.push('Please enter patient full name.');
    if (!patientEmail.trim() || !/^\S+@\S+\.\S+$/.test(patientEmail)) errs.push('Please enter a valid email address.');
    if (!patientPhone.trim() || !/^[6-9]\d{9}$/.test(patientPhone.trim())) errs.push('Please enter a valid 10-digit mobile number.');
    if (!bookingDate) errs.push('Please select a screening appointment date.');
    if (!bookingTimeSlot) errs.push('Please select a preferred time slot.');
    
    // Check if target date is in the future
    if (bookingDate) {
      const selected = new Date(bookingDate);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selected < today) {
        errs.push('Screening appointment date must be in the future.');
      }
    }

    setErrors(errs);
    return errs.length === 0;
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePatientInfo()) {
      setStep(3);
    }
  };

  const validateCardDetails = () => {
    const errs: string[] = [];
    if (paymentMethod === 'card') {
      if (!/^\d{16}$/.test(cardNo.replace(/\s+/g, ''))) errs.push('Please enter valid 16-digit card number.');
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) errs.push('Please enter expiry in MM/YY format.');
      if (!/^\d{3}$/.test(cardCvv)) errs.push('Please enter 3-digit CVV.');
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) errs.push('Please enter a valid UPI address (e.g. mobile@paytm).');
    }
    setErrors(errs);
    return errs.length === 0;
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCardDetails()) return;

    setIsProcessingPayment(true);
    setErrors([]);

    // Simulating gateway transaction latency to mimic authentic Razorpay system
    setTimeout(() => {
      const transactionId = 'PAY_' + Math.random().toString(36).substring(2, 11).toUpperCase();
      const bookingCode = 'SRH-' + Math.floor(100000 + Math.random() * 900000);
      
      const newBooking: BookingSubmission = {
        id: bookingCode,
        serviceId,
        patientName,
        patientEmail,
        patientPhone,
        bookingDate,
        bookingTimeSlot,
        paymentMethod,
        paymentStatus: 'completed',
        amountPaid: currentService.price,
        createdAt: new Date().toLocaleString(),
      };

      setBookingDetails(newBooking);
      onBookingComplete(newBooking);
      setIsProcessingPayment(false);
      setStep(4);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-550 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-xs"
      id="booking-modal-portal"
    >
      <div 
        className="relative w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-3xl border border-[#D7E7EA] flex flex-col"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-primary-teal to-[#0E7490] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 bg-white/20 rounded-full text-xs font-bold font-mono tracking-wider">
              STEP {step} OF 4
            </span>
            <h3 className="font-heading font-extrabold text-lg tracking-tight">
              {step === 1 && 'Select Your Service Checkup'}
              {step === 2 && 'Patient Registration'}
              {step === 3 && 'Secure Razorpay Checkout'}
              {step === 4 && 'Booking Confirmed!'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors focus:ring-2 focus:ring-[#FABC09] outline-none"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal Scroll Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-red-800 text-sm">Please correct the following:</span>
                <ul className="list-disc list-inside text-xs text-red-700 mt-1 space-y-0.5 font-medium">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* STEP 1: Select Service Checkup */}
          {step === 1 && (
            <div className="space-y-6" id="booking-step-1">
              <p className="text-sm text-text-muted font-sans font-medium">
                Choose one of our premium clinical test series. Each is tailored to deliver precise vital screenings instantly with expert digital teleconsultation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES_DATA.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setServiceId(srv.id);
                      setStep(2);
                    }}
                    className={`p-5 rounded-2xl text-left border-2 transition-all duration-200 outline-none flex flex-col justify-between ${
                      serviceId === srv.id
                        ? 'border-primary-teal bg-bg-soft/50 ring-2 ring-primary-teal'
                        : 'border-[#D7E7EA] hover:border-primary-teal/50 bg-[#F7FBFC]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-heading font-extrabold text-[#0B1633] text-lg">
                          {srv.title}
                        </span>
                        {serviceId === srv.id && (
                          <span className="bg-primary-teal text-white p-0.5 rounded-full">
                            <Check className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      <span className="inline-block mt-1 p-0.5 px-2 bg-[#EEF8FA] rounded-md text-[11px] font-mono text-[#0E7490] font-bold">
                        {srv.duration} Duration
                      </span>
                      <p className="text-xs text-text-muted mt-2 font-medium line-clamp-2">
                        {srv.description}
                      </p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-[#D7E7EA]/50 flex justify-between items-baseline">
                      <span className="text-[11px] font-extrabold uppercase tracking-wide text-text-light">Starting From</span>
                      <span className="text-xl font-heading font-extrabold text-[#0B1633]">₹{srv.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Patient Registration Info */}
          {step === 2 && (
            <form onSubmit={handleNextToPayment} className="space-y-5" id="booking-step-2">
              <div className="p-4 bg-[#EEF8FA] rounded-xl border border-[#D7E7EA] flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs text-[#0E7490] font-bold uppercase tracking-wider font-mono">Selected Plan:</span>
                  <h4 className="font-heading font-extrabold text-[#0B1633]">{currentService.title}</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-text-light font-medium uppercase">Pre-tax Total</span>
                  <div className="text-xl font-extrabold text-primary-teal">₹{currentService.price}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="full-name">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter Patient Full Name"
                    className="w-full px-4 py-3 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-teal bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="email">
                    Patient Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-teal bg-white font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="phone-no">
                    Patient Mobile <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text-light font-mono">
                      +91
                    </span>
                    <input
                      id="phone-no"
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-4 py-3 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-teal bg-white font-mono font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="pref-date">
                    Appointment Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0E7490] w-4 h-4 pointer-events-none" />
                    <input
                      id="pref-date"
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-teal bg-white font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5">
                  Preferred Time Slot <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setBookingTimeSlot(slot)}
                      className={`py-2 px-3 text-xs rounded-xl font-mono transition-all font-semibold border ${
                        bookingTimeSlot === slot
                          ? 'bg-[#0E7490] text-white border-[#0E7490]'
                          : 'bg-white hover:bg-bg-soft border-[#D7E7EA] text-text-navy'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#D7E7EA] flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-xs font-bold border border-[#D7E7EA] rounded-full text-text-navy hover:bg-bg-light transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold rounded-full bg-primary-teal text-white hover:bg-primary-teal/90 transition-all flex items-center gap-1.5 shadow-md"
                >
                  Proceed to Payment Selection
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Secure Razorpay Payment Checkout Simulation */}
          {step === 3 && (
            <div className="space-y-6" id="booking-step-3">
              <div className="rounded-2xl border-2 border-[#FABC09] bg-[#071201] text-white p-5 select-none relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FABC09]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#FABC09] font-mono">Razorpay SECURED GATEWAY</span>
                    <h4 className="font-heading font-extrabold text-base leading-tight">SRH Swasth Seva Booking</h4>
                  </div>
                  <Lock className="w-5 h-5 text-[#FABC09] animate-pulse" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-white/60">Patient Reference:</span>
                    <p className="font-bold">{patientName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-white/60">Payable Amount:</span>
                    <p className="text-lg font-bold text-[#FABC09] font-mono">₹{currentService.price}.00</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold text-text-navy uppercase tracking-wider">Select Payment Mode</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => { setPaymentMethod('razorpay'); setErrors([]); }}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                      paymentMethod === 'razorpay'
                        ? 'border-[#0E7490] bg-[#EEF8FA] text-[#0E7490]'
                        : 'border-[#D7E7EA] bg-white hover:bg-bg-light text-text-navy'
                    }`}
                  >
                    <span className="text-[11px] bg-sky-100 text-[#1D4ED8] p-1 px-2 rounded-md font-extrabold font-mono uppercase">UPI Express</span>
                    Mock UPI Direct
                  </button>
                  <button
                    onClick={() => { setPaymentMethod('card'); setErrors([]); }}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                      paymentMethod === 'card'
                        ? 'border-[#0E7490] bg-[#EEF8FA] text-[#0E7490]'
                        : 'border-[#D7E7EA] bg-white hover:bg-bg-light text-text-navy'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#0E7490]" />
                    Debit/Credit Card
                  </button>
                  <button
                    onClick={() => { setPaymentMethod('upi'); setErrors([]); }}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                      paymentMethod === 'upi'
                        ? 'border-[#0E7490] bg-[#EEF8FA] text-[#0E7490]'
                        : 'border-[#D7E7EA] bg-white hover:bg-bg-light text-text-navy'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-[#0E7490]" />
                    UPI ID Handler
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-bg-soft rounded-xl border border-[#D7E7EA] mt-3 space-y-3 animate-fade-in">
                    <div>
                      <label className="block text-[10px] font-bold text-text-navy uppercase tracking-wider mb-1">Card Number (16 Digits)</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNo}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                          setCardNo(v);
                        }}
                        placeholder="4532 7182 9102 3847"
                        className="w-full px-3 py-2 border border-[#D7E7EA] rounded-lg text-sm bg-white font-mono font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-text-navy uppercase tracking-wider mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\D/g, '');
                            if (v.length > 2) v = v.substring(0,2) + '/' + v.substring(2,4);
                            setCardExpiry(v);
                          }}
                          placeholder="09/27"
                          className="w-full px-3 py-2 border border-[#D7E7EA] rounded-lg text-sm bg-white font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-navy uppercase tracking-wider mb-1">CVV Code</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-[#D7E7EA] rounded-lg text-sm bg-white font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-bg-soft rounded-xl border border-[#D7E7EA] mt-3 space-y-3 animate-fade-in">
                    <div>
                      <label className="block text-[10px] font-bold text-text-navy uppercase tracking-wider mb-1">UPI Address</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="9876543210@paytm"
                        className="w-full px-3 py-2 border border-[#D7E7EA] rounded-lg text-sm bg-white font-mono font-bold text-[#0E7490]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'razorpay' && (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Service enquiry support is available. Our team will confirm scope, availability, and next steps.</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#D7E7EA] flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={isProcessingPayment}
                  className="px-5 py-2.5 text-xs font-bold border border-[#D7E7EA] rounded-full text-text-navy hover:bg-bg-light transition-all disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleProcessPayment}
                  disabled={isProcessingPayment}
                  className="px-6 py-2.5 text-xs font-extrabold rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md disabled:bg-emerald-400"
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Confirming and Syncing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      Complete Payment (₹{currentService.price})
                    </>
                  )}
                </button>
              </div>

              <div className="flex justify-center items-center gap-4 text-[10px] text-text-light font-bold">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-600" /> Hosted on Secured Servers</span>
                <span>•</span>
                <span>Operated by Ambey Sales</span>
              </div>
            </div>
          )}

          {/* STEP 4: Successful Booking Receipt Slip */}
          {step === 4 && bookingDetails && (
            <div className="space-y-6" id="booking-step-4">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center p-2.5 bg-emerald-100 rounded-full text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-heading font-extrabold text-[#0B1633] text-xl">Payment & Appointment Confirmed!</h4>
                <p className="text-xs text-text-muted max-w-md mx-auto">
                  Your payment has been cleared via secure gateway. A SMS invoice confirmation has been sent to <span className="font-semibold text-text-navy">{bookingDetails.patientPhone}</span>.
                </p>
              </div>

              {/* Patient Health Pass Receipt Print Box */}
              <div className="border border-[#D7E7EA] rounded-2xl bg-white shadow-xs overflow-hidden print:border-0 print:shadow-none" id="print-receipt-pass">
                <div className="bg-[#072033] px-5 py-3 text-white flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] tracking-wider font-extrabold text-[#FABC09] uppercase font-mono">Digital Health Pass</span>
                    <span className="text-xs font-extrabold uppercase">SRH Swasth Seva</span>
                  </div>
                  <span className="font-mono text-xs font-extrabold text-[#FABC09] bg-white/10 px-2 py-0.5 rounded-md">
                    CODE: {bookingDetails.id}
                  </span>
                </div>

                <div className="p-5 font-sans space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-text-light font-bold uppercase text-[9px]">Patient Name</span>
                      <p className="font-bold text-text-navy">{bookingDetails.patientName}</p>
                    </div>
                    <div>
                      <span className="text-text-light font-bold uppercase text-[9px]">Phone Number</span>
                      <p className="font-bold text-text-navy font-mono">+91 {bookingDetails.patientPhone}</p>
                    </div>
                    <div>
                      <span className="text-text-light font-bold uppercase text-[9px]">Booking Date</span>
                      <p className="font-bold text-text-navy font-mono">{bookingDetails.bookingDate}</p>
                    </div>
                    <div>
                      <span className="text-text-light font-bold uppercase text-[9px]">Time Slot</span>
                      <p className="font-bold text-[#0E7490] font-mono text-[10px]">{bookingDetails.bookingTimeSlot}</p>
                    </div>
                  </div>

                  <hr className="border-[#D7E7EA]" />

                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <span className="text-text-light font-bold uppercase text-[9px]">Registered Service / Screen</span>
                      <h5 className="font-bold text-text-navy text-sm">{currentService.title}</h5>
                      <span className="inline-block mt-1 p-0.5 px-2 bg-slate-100 rounded text-[9px] text-text-muted font-bold">
                        Duration: {currentService.duration} check-time
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-text-light font-bold uppercase text-[9px]">Transactions Paid</span>
                      <p className="text-base font-extrabold text-[#0B1633] font-mono">₹{bookingDetails.amountPaid}.00</p>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 p-0.5 px-1.5 rounded">
                        SECURE COMPLETED
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#EEF8FA] p-3 rounded-xl border border-[#D7E7EA]/60 text-[10px] text-text-muted space-y-1">
                    <span className="font-bold text-[#0E7490] block text-[11px]">Appointment Instructions:</span>
                    <p>1. Please arrive at the selected Ambey Sales center 10 minutes prior to your selected slot.</p>
                    <p>2. Keep a digitized version/screenshot of this confirmation page ready on your mobile.</p>
                    <p>3. Do not eat very heavy foods 1 hour before vital screening checks if checking glucose markers.</p>
                  </div>
                </div>

                {/* Footer seal of trust on invoice */}
                <div className="bg-slate-50 px-5 py-2.5 flex justify-between items-center border-t border-[#D7E7EA]/60 text-[9px] text-text-light">
                  <span>Operated by: Ambey Sales Support</span>
                  <span className="font-mono">IP Secured Gateway Standard</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 text-xs font-bold border border-[#D7E7EA] rounded-full text-text-navy hover:bg-bg-light transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Pass/Invoice
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-extrabold rounded-full bg-primary-teal text-white hover:bg-primary-teal/90 transition-all shadow-md"
                >
                  Done, Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
