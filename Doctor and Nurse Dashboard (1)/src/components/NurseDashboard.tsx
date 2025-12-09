import React, { useState } from 'react';
import { User } from '../App';
import { LogOut, UserPlus, Users, Activity, Bell, FileText } from 'lucide-react';
import { mockPatients, mockAppointments, mockDocuments } from '../data/mockData';
import PatientRegistration from './nurse/PatientRegistration';
import PatientReception from './nurse/PatientReception';
import TreatmentManagement from './nurse/TreatmentManagement';
import PaymentProcessing from './nurse/PaymentProcessing';
import DocumentViewer from './nurse/DocumentViewer';

interface NurseDashboardProps {
  user: User;
  onLogout: () => void;
}

type ViewType = 'registration' | 'reception' | 'treatment' | 'payment' | 'documents';

export default function NurseDashboard({ user, onLogout }: NurseDashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>('reception');
  const [patients, setPatients] = useState(mockPatients);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [unreadDocuments, setUnreadDocuments] = useState(mockDocuments.filter(d => !d.printed).length);

  const todayAppointments = appointments.length;
  const waitingCount = appointments.filter(a => a.status === 'waiting').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">간호사 업무 시스템</h1>
                <p className="text-gray-500 text-sm">{user.name} 님 환영합니다</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView('documents')}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadDocuments > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadDocuments}
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
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 text-sm">총 접수</p>
                  <p className="text-blue-900 text-2xl mt-1">{todayAppointments}명</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-800 text-sm">대기 중</p>
                  <p className="text-yellow-900 text-2xl mt-1">{waitingCount}명</p>
                </div>
                <Activity className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 text-sm">진료 완료</p>
                  <p className="text-green-900 text-2xl mt-1">{completedCount}명</p>
                </div>
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-800 text-sm">등록 환자</p>
                  <p className="text-purple-900 text-2xl mt-1">{patients.length}명</p>
                </div>
                <UserPlus className="w-8 h-8 text-purple-600" />
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
              onClick={() => setCurrentView('registration')}
              className={`px-6 py-3 transition-colors ${
                currentView === 'registration'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              환자 등록
            </button>
            <button
              onClick={() => setCurrentView('reception')}
              className={`px-6 py-3 transition-colors ${
                currentView === 'reception'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              환자 접수
            </button>
            <button
              onClick={() => setCurrentView('treatment')}
              className={`px-6 py-3 transition-colors ${
                currentView === 'treatment'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              처치 관리
            </button>
            <button
              onClick={() => setCurrentView('payment')}
              className={`px-6 py-3 transition-colors ${
                currentView === 'payment'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              수납 처리
            </button>
            <button
              onClick={() => setCurrentView('documents')}
              className={`relative px-6 py-3 transition-colors ${
                currentView === 'documents'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              문서 조회
              {unreadDocuments > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadDocuments}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        {currentView === 'registration' && (
          <PatientRegistration
            patients={patients}
            onAddPatient={(patient) => setPatients([...patients, patient])}
          />
        )}
        
        {currentView === 'reception' && (
          <PatientReception
            patients={patients}
            appointments={appointments}
            onAddAppointment={(appointment) => setAppointments([...appointments, appointment])}
            nurseName={user.name}
          />
        )}
        
        {currentView === 'treatment' && (
          <TreatmentManagement appointments={appointments} />
        )}
        
        {currentView === 'payment' && (
          <PaymentProcessing appointments={appointments.filter(a => a.status === 'completed')} />
        )}
        
        {currentView === 'documents' && (
          <DocumentViewer 
            onMarkAsRead={() => setUnreadDocuments(0)} 
            patients={patients}
          />
        )}
      </main>
    </div>
  );
}
