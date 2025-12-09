import React, { useState } from 'react';
import { User } from '../App';
import { LogOut, Users, ClipboardList, FileText, Activity, Bell, Search } from 'lucide-react';
import { mockAppointments, mockMedicalRecords, mockPrescriptions, mockTreatments } from '../data/mockData';
import { Appointment } from '../types';
import PatientQueueView from './doctor/PatientQueueView';
import MedicalRecordView from './doctor/MedicalRecordView';
import PrescriptionView from './doctor/PrescriptionView';
import DocumentIssueView from './doctor/DocumentIssueView';

interface DoctorDashboardProps {
  user: User;
  onLogout: () => void;
}

type ViewType = 'queue' | 'record' | 'prescription' | 'documents';

export default function DoctorDashboard({ user, onLogout }: DoctorDashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>('queue');
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const waitingCount = appointments.filter(a => a.status === 'waiting').length;
  const inProgressCount = appointments.filter(a => a.status === 'in-progress').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;

  const handleCallPatient = (appointment: Appointment) => {
    setAppointments(prev => 
      prev.map(a => 
        a.id === appointment.id ? { ...a, status: 'in-progress' as const } : a
      )
    );
    setSelectedAppointment({ ...appointment, status: 'in-progress' });
    setCurrentView('record');
  };

  const handleCompleteConsultation = () => {
    if (selectedAppointment) {
      setAppointments(prev => 
        prev.map(a => 
          a.id === selectedAppointment.id ? { ...a, status: 'completed' as const } : a
        )
      );
      setSelectedAppointment(null);
      setCurrentView('queue');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">의사 진료 시스템</h1>
                <p className="text-gray-500 text-sm">{user.name} 님 환영합니다</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                {waitingCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {waitingCount}
                  </span>
                )}
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-800 text-sm">대기 중</p>
                  <p className="text-yellow-900 text-2xl mt-1">{waitingCount}명</p>
                </div>
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 text-sm">진료 중</p>
                  <p className="text-blue-900 text-2xl mt-1">{inProgressCount}명</p>
                </div>
                <ClipboardList className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 text-sm">완료</p>
                  <p className="text-green-900 text-2xl mt-1">{completedCount}명</p>
                </div>
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentView('queue')}
              className={`px-6 py-3 transition-colors ${
                currentView === 'queue'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              환자 대기열
            </button>
            <button
              onClick={() => setCurrentView('record')}
              className={`px-6 py-3 transition-colors ${
                currentView === 'record'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              disabled={!selectedAppointment}
            >
              진료 기록
            </button>
            <button
              onClick={() => setCurrentView('prescription')}
              className={`px-6 py-3 transition-colors ${
                currentView === 'prescription'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              disabled={!selectedAppointment}
            >
              처방 관리
            </button>
            <button
              onClick={() => setCurrentView('documents')}
              className={`px-6 py-3 transition-colors ${
                currentView === 'documents'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              문서 발행
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        {currentView === 'queue' && (
          <PatientQueueView
            appointments={appointments}
            onCallPatient={handleCallPatient}
          />
        )}
        
        {currentView === 'record' && selectedAppointment && (
          <MedicalRecordView
            appointment={selectedAppointment}
            onComplete={handleCompleteConsultation}
          />
        )}
        
        {currentView === 'prescription' && selectedAppointment && (
          <PrescriptionView
            appointment={selectedAppointment}
            onComplete={handleCompleteConsultation}
          />
        )}
        
        {currentView === 'documents' && (
          <DocumentIssueView
            appointment={selectedAppointment!}
            onIssueDocument={(docType) => {
              // Document issued, update status
              if (selectedAppointment) {
                handleCompleteConsultation();
              }
            }}
          />
        )}
      </main>
    </div>
  );
}