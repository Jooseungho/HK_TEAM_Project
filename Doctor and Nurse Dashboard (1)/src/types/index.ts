export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  phone: string;
  address: string;
  registrationDate: string;
  chartNumber: string;
}

export interface VitalSign {
  id: string;
  patientId: string;
  timestamp: string;
  bloodPressure: string;
  pulse: number;
  temperature: number;
  symptoms: string;
  medicalHistory: string;
  recordedBy: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  visitDate: string;
  doctorId: string;
  doctorName: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  diagnosis: string;
  icdCode: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
}

export interface Prescription {
  id: string;
  recordId: string;
  patientId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions: string;
  prescribedDate: string;
}

export interface Treatment {
  id: string;
  recordId: string;
  patientId: string;
  treatmentType: 'injection' | 'procedure' | 'test';
  name: string;
  status: 'pending' | 'completed' | 'cancelled';
  performedBy: string | null;
  performedAt: string | null;
  notes: string;
}

export interface Document {
  id: string;
  patientId: string;
  recordId: string;
  type: 'prescription' | 'medical-certificate' | 'referral';
  content: string;
  issuedBy: string;
  issuedAt: string;
  printed: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  chartNumber: string;
  registeredAt: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  queueNumber: number;
  vitalSigns?: VitalSign;
}

export interface Medication {
  id: string;
  name: string;
  stock: number;
  unit: string;
  price: number;
  lowStockThreshold: number;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  ipAddress: string;
}

export interface Account {
  id: string;
  employeeId: string;
  name: string;
  role: 'doctor' | 'nurse' | 'admin';
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  lastLogin: string | null;
}
