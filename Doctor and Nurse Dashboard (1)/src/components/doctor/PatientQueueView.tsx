import React from 'react';
import { Appointment } from '../../types';
import { Clock, Phone, User, Activity, AlertCircle } from 'lucide-react';

interface PatientQueueViewProps {
  appointments: Appointment[];
  onCallPatient: (appointment: Appointment) => void;
}

export default function PatientQueueView({ appointments, onCallPatient }: PatientQueueViewProps) {
  const waitingAppointments = appointments.filter(a => a.status === 'waiting');
  const inProgressAppointments = appointments.filter(a => a.status === 'in-progress');

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* In Progress Section */}
      {inProgressAppointments.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600" />
            <h2 className="text-blue-900">진료 중인 환자</h2>
          </div>
          
          <div className="space-y-3">
            {inProgressAppointments.map(appointment => (
              <div key={appointment.id} className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center">
                      {appointment.queueNumber}
                    </div>
                    <div>
                      <p className="text-gray-900">{appointment.patientName}</p>
                      <p className="text-gray-500 text-sm">차트번호: {appointment.chartNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600">진료 중</p>
                    <p className="text-gray-500 text-sm">{formatTime(appointment.registeredAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Waiting Queue */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-900">대기 중인 환자</h2>
              <p className="text-gray-500 text-sm mt-1">총 {waitingAppointments.length}명이 대기 중입니다</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {waitingAppointments.length === 0 ? (
            <div className="p-12 text-center">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">대기 중인 환자가 없습니다</p>
            </div>
          ) : (
            waitingAppointments.map(appointment => (
              <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="bg-yellow-500 text-white w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{appointment.queueNumber}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900">{appointment.patientName}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {appointment.chartNumber}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTime(appointment.registeredAt)}
                        </div>
                      </div>

                      {appointment.vitalSigns && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-700 text-sm mb-2">Vital Signs</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">혈압</p>
                              <p className="text-gray-900">{appointment.vitalSigns.bloodPressure}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">맥박</p>
                              <p className="text-gray-900">{appointment.vitalSigns.pulse} bpm</p>
                            </div>
                            <div>
                              <p className="text-gray-500">체온</p>
                              <p className="text-gray-900">{appointment.vitalSigns.temperature}°C</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-gray-500 text-sm">증상</p>
                            <p className="text-gray-900">{appointment.vitalSigns.symptoms}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onCallPatient(appointment)}
                    className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    호출
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
