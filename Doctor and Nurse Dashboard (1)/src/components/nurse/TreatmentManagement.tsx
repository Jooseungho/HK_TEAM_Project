import React, { useState } from 'react';
import { Appointment } from '../../types';
import { Syringe, CheckCircle, Clock, AlertCircle, Activity } from 'lucide-react';

interface TreatmentManagementProps {
  appointments: Appointment[];
}

interface TreatmentTask {
  id: string;
  appointmentId: string;
  patientName: string;
  chartNumber: string;
  treatmentType: 'injection' | 'procedure' | 'test';
  name: string;
  notes: string;
  status: 'pending' | 'completed';
  prescribedAt: string;
}

export default function TreatmentManagement({ appointments }: TreatmentManagementProps) {
  const [treatments, setTreatments] = useState<TreatmentTask[]>([
    {
      id: 'T001',
      appointmentId: 'A001',
      patientName: '홍길동',
      chartNumber: 'C2024001',
      treatmentType: 'injection',
      name: '비타민 주사',
      notes: '우측 팔에 주사',
      status: 'pending',
      prescribedAt: '2025-11-28T10:30:00',
    },
    {
      id: 'T002',
      appointmentId: 'A002',
      patientName: '김영희',
      chartNumber: 'C2024002',
      treatmentType: 'test',
      name: 'X-ray 촬영',
      notes: '흉부 X-ray',
      status: 'pending',
      prescribedAt: '2025-11-28T11:00:00',
    },
  ]);

  const handleComplete = (treatmentId: string) => {
    setTreatments(prev => 
      prev.map(t => 
        t.id === treatmentId 
          ? { ...t, status: 'completed' as const }
          : t
      )
    );
    alert('처치가 완료되었습니다. 사용된 약품/소모품이 자동으로 차감됩니다.');
  };

  const pendingTreatments = treatments.filter(t => t.status === 'pending');
  const completedTreatments = treatments.filter(t => t.status === 'completed');

  const getTreatmentIcon = (type: string) => {
    switch (type) {
      case 'injection':
        return <Syringe className="w-5 h-5 text-green-600" />;
      case 'test':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Activity className="w-5 h-5 text-purple-600" />;
    }
  };

  const getTreatmentTypeLabel = (type: string) => {
    switch (type) {
      case 'injection':
        return '주사';
      case 'procedure':
        return '처치';
      case 'test':
        return '검사';
      default:
        return type;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Pending Treatments */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <h2 className="text-gray-900">대기 중인 처치</h2>
            <span className="ml-auto px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
              {pendingTreatments.length}건
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {pendingTreatments.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">대기 중인 처치가 없습니다</p>
            </div>
          ) : (
            pendingTreatments.map(treatment => (
              <div key={treatment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getTreatmentIcon(treatment.treatmentType)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-gray-900">{treatment.patientName}</h3>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {treatment.chartNumber}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {new Date(treatment.prescribedAt).toLocaleString('ko-KR', {
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs rounded">
                          {getTreatmentTypeLabel(treatment.treatmentType)}
                        </span>
                        <p className="text-gray-900">{treatment.name}</p>
                      </div>
                      {treatment.notes && (
                        <p className="text-gray-600 text-sm mt-2">{treatment.notes}</p>
                      )}
                    </div>

                    <button
                      onClick={() => handleComplete(treatment.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      처치 완료
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Completed Treatments */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-gray-900">완료된 처치</h2>
            <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {completedTreatments.length}건
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {completedTreatments.length === 0 ? (
            <div className="p-12 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">완료된 처치가 없습니다</p>
            </div>
          ) : (
            completedTreatments.map(treatment => (
              <div key={treatment.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getTreatmentIcon(treatment.treatmentType)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">{treatment.patientName}</h3>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {treatment.chartNumber}
                      </span>
                      <span className="ml-auto px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                        완료
                      </span>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-2">
                      {new Date(treatment.prescribedAt).toLocaleString('ko-KR', {
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">
                          {getTreatmentTypeLabel(treatment.treatmentType)}
                        </span>
                        <p className="text-gray-900">{treatment.name}</p>
                      </div>
                      {treatment.notes && (
                        <p className="text-gray-600 text-sm mt-2">{treatment.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
