export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  phoneNumber: string;
  email: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
  };
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  chiefComplaint: string;
  diagnosis: string;
  treatment: string;
  prescriptions: Prescription[];
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
  };
  notes: string;
  physician: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  physician: string;
  date: string;
  time: string;
  type: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show';
  notes: string;
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  specialization?: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface Allergy {
  id: string;
  allergen: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  reaction: string;
}
