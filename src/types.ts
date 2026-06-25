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
  duration: string;
  benefits: string[];
  recommendedFor: string;
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
  mobile: string;
  organizationName: string;
  organizationType: string;
  requirementType: string;
  modelOfInterest: string;
  deploymentLocation: string;
  message: string;
}
