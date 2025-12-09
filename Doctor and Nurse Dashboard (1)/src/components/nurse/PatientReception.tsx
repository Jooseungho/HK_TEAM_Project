import React, { useState } from 'react';
import { Patient, Appointment, VitalSign } from '../../types';
import { Search, Activity, Plus, User } from 'lucide-react';

interface PatientReceptionProps {
  patients: Patient[];
  appointments: Appointment[];
  onAddAppointment: (appointment: Appointment) => void;
  nurseName: string;
}

export default function PatientReception({ patients, appointments, onAddAppointment, nurseName }: PatientReceptionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [vitalSigns, setVitalSigns] = useState({
    bloodPressure: '',
    pulse: '',
    temperature: '',
    symptoms: '',
    medicalHistory: '',
  });

  const filteredPatients = patients.filter(p => 
    p.name.includes(searchTerm) || 
    p.phone.includes(searchTerm) ||
    p.chartNumber.includes(searchTerm)
  );

  // Sort by registration date descending (most recent first)
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
  });

  const handleReception = () => {
    if (!selectedPatient) {
      alert('환자를 선택해주세요.');
      return;
    }

    if (!vitalSigns.bloodPressure || !vitalSigns.pulse || !vitalSigns.temperature) {
      alert('Vital Signs를 모두 측정해주세요.');
      return;
    }

    const vitalSignData: VitalSign = {
      id: `V${Date.now()}`,
      patientId: selectedPatient.id,
      timestamp: new Date().toISOString(),
      bloodPressure: vitalSigns.bloodPressure,
      pulse: parseInt(vitalSigns.pulse),
      temperature: parseFloat(vitalSigns.temperature),
      symptoms: vitalSigns.symptoms,
      medicalHistory: vitalSigns.medicalHistory,
      recordedBy: nurseName,
    };

    const newAppointment: Appointment = {
      id: `A${Date.now()}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      chartNumber: selectedPatient.chartNumber,
      registeredAt: new Date().toISOString(),
      status: 'waiting',
      queueNumber: appointments.filter(a => a.status !== 'cancelled').length + 1,
      vitalSigns: vitalSignData,
    };

    onAddAppointment(newAppointment);
    
    // Reset form
    setSelectedPatient(null);
    setVitalSigns({
      bloodPressure: '',
      pulse: '',
      temperature: '',
      symptoms: '',
      medicalHistory: '',
    });
    setSearchTerm('');

    alert(`접수가 완료되었습니다.\n대기번호: ${newAppointment.queueNumber}`);
  };

  const todayAppointments = appointments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.registeredAt.startsWith(today);
  });

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Patient Search */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-gray-900 mb-4">환자 검색</h2>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="이름, 전화번호, 차트번호로 검색"
            />
          </div>

          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {sortedPatients.length === 0 ? (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">검색 결과가 없습니다</p>
              </div>
            ) : (
              sortedPatients.map(patient => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedPatient?.id === patient.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900">{patient.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      patient.gender === 'male' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-pink-100 text-pink-700'
                    }`}>
                      {patient.gender === 'male' ? '남' : '여'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">차트번호: {patient.chartNumber}</p>
                  <p className="text-gray-500 text-sm">생년월일: {patient.birthDate}</p>
                  <p className="text-gray-500 text-sm">연락처: {patient.phone}</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-900 mb-4">오늘 접수 현황</h3>
          <div className="space-y-2">
            {todayAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">접수된 환자가 없습니다</p>
            ) : (
              todayAppointments.slice(-5).reverse().map(appointment => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      {appointment.queueNumber}
                    </div>
                    <div>
                      <p className="text-gray-900">{appointment.patientName}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(appointment.registeredAt).toLocaleTimeString('ko-KR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    appointment.status === 'waiting' ? 'bg-yellow-100 text-yellow-700' :
                    appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {appointment.status === 'waiting' ? '대기' :
                     appointment.status === 'in-progress' ? '진료중' : '완료'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Vital Signs Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-green-600" />
          <h2 className="text-gray-900">Vital Signs 측정</h2>
        </div>

        {selectedPatient ? (
          <div className="space-y-6">
            {/* Patient Info */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-gray-900 mb-1">{selectedPatient.name}</h3>
              <p className="text-gray-600 text-sm">차트번호: {selectedPatient.chartNumber}</p>
              <p className="text-gray-600 text-sm">생년월일: {selectedPatient.birthDate}</p>
            </div>

            {/* Vital Signs Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">혈압 *</label>
                  <input
                    type="text"
                    value={vitalSigns.bloodPressure}
                    onChange={(e) => setVitalSigns({ ...vitalSigns, bloodPressure: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="120/80"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">맥박 *</label>
                  <input
                    type="number"
                    value={vitalSigns.pulse}
                    onChange={(e) => setVitalSigns({ ...vitalSigns, pulse: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="72"
                  />
                  <p className="text-gray-500 text-xs mt-1">bpm</p>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">체온 *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={vitalSigns.temperature}
                    onChange={(e) => setVitalSigns({ ...vitalSigns, temperature: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="36.5"
                  />
                  <p className="text-gray-500 text-xs mt-1">°C</p>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">현재 증상</label>
                <textarea
                  value={vitalSigns.symptoms}
                  onChange={(e) => setVitalSigns({ ...vitalSigns, symptoms: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="환자가 호소하는 증상을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">병력 및 특이사항</label>
                <textarea
                  value={vitalSigns.medicalHistory}
                  onChange={(e) => setVitalSigns({ ...vitalSigns, medicalHistory: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="기존 병력, 복용 중인 약물 등을 입력하세요"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReception}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  접수 완료
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">환자를 선택해주세요</p>
          </div>
        )}
      </div>
    </div>
  );
}