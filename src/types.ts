export enum ServiceType {
  VITAL_SCREENING = 'VITAL_SCREENING',
  VITALS_CONSULTATION = 'VITALS_CONSULTATION',
  FOLLOW_UP = 'FOLLOW_UP',
  SPECIALIST = 'SPECIALIST'
}

export interface HealthService {
  id: ServiceType;
  title: string;
  description: string;
  price: number;
  startingPriceLabel: string;
  duration: string;
  benefits: string[];
  recommendedFor: string;
}

export interface BookingSubmission {
  id: string;
  serviceId: ServiceType;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  bookingDate: string;
  bookingTimeSlot: string;
  paymentMethod: 'razorpay' | 'upi' | 'card';
  paymentStatus: 'pending' | 'completed';
  amountPaid: number;
  createdAt: string;
}

export interface KioskMeasurement {
  heartRate: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  bloodOxygen: number;
  bodyTemperature: number;
  bmi: number;
  healthAssessment: string;
  status: 'optimal' | 'warning' | 'critical';
}

export interface InquiryFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  companyName?: string;
  userSegment: 'clinic' | 'ngo' | 'csr' | 'corporate' | 'individual';
  selectedService?: ServiceType | string;
}
