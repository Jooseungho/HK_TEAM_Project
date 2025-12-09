import React, { useState } from 'react';
import { Appointment } from '../../types';
import { mockMedicalRecords, mockPrescriptions } from '../../data/mockData';
import { FileText, Clock, Activity, AlertCircle, Save, CheckCircle } from 'lucide-react';

interface MedicalRecordViewProps {
  appointment: Appointment;
  onComplete: () => void;
}

export default function MedicalRecordView({ appointment, onComplete }: MedicalRecordViewProps) {
  const patientHistory = mockMedicalRecords.filter(r => r.patientId === appointment.patientId);
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [icdCode, setIcdCode] = useState('');

  const handleSave = () => {
    // In a real app, this would save to a database
    alert('진료 기록이 저장되었습니다.');
  };

  const handleComplete = () => {
    if (!diagnosis || !icdCode) {
      alert('진단명과 ICD 코드를 입력해주세요.');
      return;
    }
    onComplete();
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Main SOAP Form */}
      <div className="col-span-2 space-y-6">
        {/* Patient Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-gray-900">{appointment.patientName}</h2>
              <p className="text-gray-500">차트번호: {appointment.chartNumber}</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                진료 중
              </span>
            </div>
          </div>

          {appointment.vitalSigns && (
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-500 text-sm">혈압</p>
                <p className="text-gray-900">{appointment.vitalSigns.bloodPressure}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">맥박</p>
                <p className="text-gray-900">{appointment.vitalSigns.pulse} bpm</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">체온</p>
                <p className="text-gray-900">{appointment.vitalSigns.temperature}°C</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">측정시간</p>
                <p className="text-gray-900 text-sm">
                  {new Date(appointment.vitalSigns.timestamp).toLocaleTimeString('ko-KR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          )}

          {appointment.vitalSigns && (
            <div className="mt-4 space-y-2">
              <div>
                <p className="text-gray-500 text-sm">현재 증상</p>
                <p className="text-gray-900">{appointment.vitalSigns.symptoms}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">병력</p>
                <p className="text-gray-900">{appointment.vitalSigns.medicalHistory}</p>
              </div>
            </div>
          )}
        </div>

        {/* SOAP Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-900 mb-4">SOAP 진료 기록</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Subjective (주관적 증상)
              </label>
              <textarea
                value={subjective}
                onChange={(e) => setSubjective(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="환자가 호소하는 증상을 기록하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Objective (객관적 소견)
              </label>
              <textarea
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="진찰 소견 및 검사 결과를 기록하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Assessment (평가/진단)
              </label>
              <textarea
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="진단 및 평가 내용을 기록하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Plan (치료 계획)
              </label>
              <textarea
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="치료 계획 및 처방을 기록하세요"
              />
            </div>
          </div>
        </div>

        {/* Diagnosis & ICD */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-900 mb-4">진단명 및 진단코드</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">진단명 *</label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="예: 급성 상기도 감염"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">ICD-10 코드 *</label>
              <input
                type="text"
                value={icdCode}
                onChange={(e) => setIcdCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="예: J06.9"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            임시 저장
          </button>
          <button
            onClick={handleComplete}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
            진료 완료
          </button>
        </div>
      </div>

      {/* History Sidebar */}
      <div className="space-y-6">
        {/* Medical History & Prescriptions Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="text-gray-900">과거 진료·처방 이력</h3>
          </div>

          {patientHistory.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">이전 진료 기록이 없습니다</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {patientHistory.map(record => {
                const recordPrescriptions = mockPrescriptions.filter(
                  p => p.patientId === appointment.patientId && p.prescribedDate === record.visitDate
                );

                return (
                  <div key={record.id} className="border-l-4 border-blue-500 pl-4 pb-4">
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <p className="text-blue-700">{record.visitDate}</p>
                    </div>

                    {/* Medical Record */}
                    <div className="p-4 bg-gray-50 rounded-lg mb-3">
                      <p className="text-gray-700 text-sm mb-1">진료 기록</p>
                      <p className="text-gray-900 mb-1">{record.diagnosis}</p>
                      <p className="text-gray-500 text-sm">ICD: {record.icdCode}</p>
                      {record.plan && (
                        <p className="text-gray-600 text-sm mt-2">{record.plan}</p>
                      )}
                    </div>

                    {/* Prescriptions */}
                    {recordPrescriptions.length > 0 && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-gray-700 text-sm mb-2">처방 내역</p>
                        <div className="space-y-2">
                          {recordPrescriptions.map(prescription => (
                            <div key={prescription.id} className="p-2 bg-white rounded">
                              <p className="text-gray-900 text-sm">{prescription.medicationName}</p>
                              <p className="text-gray-600 text-xs">{prescription.dosage} - {prescription.frequency}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Alerts */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-900 text-sm">중복 처방 주의</p>
              <p className="text-yellow-700 text-sm mt-1">
                진료 기록 저장 시 자동으로 중복 처방 여부를 확인합니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}