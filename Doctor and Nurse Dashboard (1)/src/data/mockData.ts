import { Patient, VitalSign, MedicalRecord, Prescription, Treatment, Appointment, Medication, SystemLog, Account, Document } from '../types';

export const mockPatients: Patient[] = [
  {
    id: 'P001',
    name: '홍길동',
    birthDate: '1985-03-15',
    gender: 'male',
    phone: '010-1234-5678',
    address: '서울시 강남구',
    registrationDate: '2024-01-10',
    chartNumber: 'C2024001',
  },
  {
    id: 'P002',
    name: '김영희',
    birthDate: '1990-07-22',
    gender: 'female',
    phone: '010-2345-6789',
    address: '서울시 서초구',
    registrationDate: '2024-02-15',
    chartNumber: 'C2024002',
  },
  {
    id: 'P003',
    name: '박철수',
    birthDate: '1978-11-30',
    gender: 'male',
    phone: '010-3456-7890',
    address: '서울시 송파구',
    registrationDate: '2024-03-20',
    chartNumber: 'C2024003',
  },
];

export const mockVitalSigns: VitalSign[] = [
  {
    id: 'V001',
    patientId: 'P001',
    timestamp: '2025-11-28T09:30:00',
    bloodPressure: '120/80',
    pulse: 72,
    temperature: 36.5,
    symptoms: '두통, 어지러움',
    medicalHistory: '고혈압 약 복용 중',
    recordedBy: '이간호사',
  },
  {
    id: 'V002',
    patientId: 'P002',
    timestamp: '2025-11-28T10:15:00',
    bloodPressure: '115/75',
    pulse: 68,
    temperature: 37.2,
    symptoms: '기침, 목 통증',
    medicalHistory: '특이사항 없음',
    recordedBy: '이간호사',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'A001',
    patientId: 'P001',
    patientName: '홍길동',
    chartNumber: 'C2024001',
    registeredAt: '2025-11-28T09:00:00',
    status: 'waiting',
    queueNumber: 1,
    vitalSigns: mockVitalSigns[0],
  },
  {
    id: 'A002',
    patientId: 'P002',
    patientName: '김영희',
    chartNumber: 'C2024002',
    registeredAt: '2025-11-28T10:00:00',
    status: 'waiting',
    queueNumber: 2,
    vitalSigns: mockVitalSigns[1],
  },
  {
    id: 'A003',
    patientId: 'P003',
    patientName: '박철수',
    chartNumber: 'C2024003',
    registeredAt: '2025-11-28T11:00:00',
    status: 'waiting',
    queueNumber: 3,
  },
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 'MR001',
    patientId: 'P001',
    visitDate: '2025-11-20',
    doctorId: 'doc001',
    doctorName: '김의사',
    subjective: '두통과 어지러움 호소',
    objective: 'BP 130/85, 체온 정상',
    assessment: '긴장성 두통 의심',
    plan: '진통제 처방, 1주일 후 재진',
    diagnosis: '긴장성 두통',
    icdCode: 'G44.2',
    status: 'completed',
  },
  {
    id: 'MR002',
    patientId: 'P002',
    visitDate: '2025-11-15',
    doctorId: 'doc001',
    doctorName: '김의사',
    subjective: '기침과 가래',
    objective: '체온 37.5°C, 청진 상 이상 없음',
    assessment: '급성 상기도 감염',
    plan: '해열제, 진해거담제 처방',
    diagnosis: '급성 상기도 감염',
    icdCode: 'J06.9',
    status: 'completed',
  },
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'PR001',
    recordId: 'MR001',
    patientId: 'P001',
    medicationName: '타이레놀',
    dosage: '500mg',
    frequency: '1일 3회',
    duration: '7일',
    quantity: 21,
    instructions: '식후 30분',
    prescribedDate: '2025-11-20',
  },
  {
    id: 'PR002',
    recordId: 'MR002',
    patientId: 'P002',
    medicationName: '해열제',
    dosage: '650mg',
    frequency: '1일 3회',
    duration: '5일',
    quantity: 15,
    instructions: '식후 복용',
    prescribedDate: '2025-11-15',
  },
];

export const mockTreatments: Treatment[] = [
  {
    id: 'T001',
    recordId: 'MR001',
    patientId: 'P001',
    treatmentType: 'test',
    name: 'X-ray 촬영',
    status: 'completed',
    performedBy: '이간호사',
    performedAt: '2025-11-20T14:30:00',
    notes: '흉부 X-ray 정상',
  },
];

export const mockMedications: Medication[] = [
  {
    id: 'M001',
    name: '타이레놀',
    stock: 500,
    unit: '정',
    price: 500,
    lowStockThreshold: 100,
  },
  {
    id: 'M002',
    name: '해열제',
    stock: 80,
    unit: '정',
    price: 700,
    lowStockThreshold: 100,
  },
  {
    id: 'M003',
    name: '진해거담제',
    stock: 200,
    unit: '정',
    price: 800,
    lowStockThreshold: 100,
  },
  {
    id: 'M004',
    name: '주사제(비타민B)',
    stock: 30,
    unit: '앰플',
    price: 5000,
    lowStockThreshold: 50,
  },
];

export const mockDocuments: Document[] = [
  {
    id: 'DOC001',
    patientId: 'P001',
    recordId: 'MR001',
    type: 'prescription',
    content: '타이레놀 500mg 1일 3회 7일간',
    issuedBy: '김의사',
    issuedAt: '2025-11-20T15:00:00',
    printed: true,
  },
];

export const mockSystemLogs: SystemLog[] = [
  {
    id: 'LOG001',
    timestamp: '2025-11-28T08:30:00',
    userId: 'doc001',
    userName: '김의사',
    action: '로그인',
    details: '시스템 로그인 성공',
    ipAddress: '192.168.1.10',
  },
  {
    id: 'LOG002',
    timestamp: '2025-11-28T09:00:00',
    userId: 'nurse001',
    userName: '이간호사',
    action: '환자 접수',
    details: '환자 홍길동(C2024001) 접수',
    ipAddress: '192.168.1.20',
  },
  {
    id: 'LOG003',
    timestamp: '2025-11-28T09:30:00',
    userId: 'doc001',
    userName: '김의사',
    action: 'EMR 조회',
    details: '환자 홍길동(C2024001) 차트 조회',
    ipAddress: '192.168.1.10',
  },
];

export const mockAccounts: Account[] = [
  {
    id: 'doc001',
    employeeId: 'D001',
    name: '김의사',
    role: 'doctor',
    email: 'doctor@hospital.com',
    phone: '010-1111-2222',
    isActive: true,
    createdAt: '2024-01-01',
    lastLogin: '2025-11-28T08:30:00',
  },
  {
    id: 'nurse001',
    employeeId: 'N001',
    name: '이간호사',
    role: 'nurse',
    email: 'nurse@hospital.com',
    phone: '010-3333-4444',
    isActive: true,
    createdAt: '2024-01-01',
    lastLogin: '2025-11-28T09:00:00',
  },
  {
    id: 'admin001',
    employeeId: 'A001',
    name: '박관리자',
    role: 'admin',
    email: 'admin@hospital.com',
    phone: '010-5555-6666',
    isActive: true,
    createdAt: '2024-01-01',
    lastLogin: '2025-11-28T07:00:00',
  },
];
