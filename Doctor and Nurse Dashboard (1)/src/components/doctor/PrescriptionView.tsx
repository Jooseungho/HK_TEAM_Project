import React, { useState } from 'react';
import { Appointment } from '../../types';
import { mockMedications } from '../../data/mockData';
import { Plus, Trash2, AlertTriangle, Syringe, TestTube, Package } from 'lucide-react';

interface PrescriptionViewProps {
  appointment: Appointment;
  onComplete: () => void;
}

interface PrescriptionItem {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions: string;
}

interface TreatmentItem {
  id: string;
  type: 'injection' | 'procedure' | 'test';
  name: string;
  notes: string;
}

export default function PrescriptionView({ appointment, onComplete }: PrescriptionViewProps) {
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([]);
  const [treatments, setTreatments] = useState<TreatmentItem[]>([]);
  const [newPrescription, setNewPrescription] = useState<Partial<PrescriptionItem>>({
    medicationName: '',
    dosage: '',
    frequency: '1일 3회',
    duration: '7일',
    quantity: 0,
    instructions: '식후 30분',
  });
  const [newTreatment, setNewTreatment] = useState<Partial<TreatmentItem>>({
    type: 'injection',
    name: '',
    notes: '',
  });

  const lowStockMeds = mockMedications.filter(m => m.stock < m.lowStockThreshold);

  const addPrescription = () => {
    if (!newPrescription.medicationName || !newPrescription.dosage) {
      alert('약품명과 용량을 입력해주세요.');
      return;
    }

    const medication = mockMedications.find(m => m.name === newPrescription.medicationName);
    if (medication && medication.stock < (newPrescription.quantity || 0)) {
      alert(`재고 부족: ${medication.name} (현재 재고: ${medication.stock}${medication.unit})`);
      return;
    }

    setPrescriptions([
      ...prescriptions,
      {
        id: `P${Date.now()}`,
        medicationName: newPrescription.medicationName!,
        dosage: newPrescription.dosage!,
        frequency: newPrescription.frequency || '1일 3회',
        duration: newPrescription.duration || '7일',
        quantity: newPrescription.quantity || 0,
        instructions: newPrescription.instructions || '식후 30분',
      },
    ]);

    setNewPrescription({
      medicationName: '',
      dosage: '',
      frequency: '1일 3회',
      duration: '7일',
      quantity: 0,
      instructions: '식후 30분',
    });
  };

  const removePrescription = (id: string) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const addTreatment = () => {
    if (!newTreatment.name) {
      alert('처치명을 입력해주세요.');
      return;
    }

    setTreatments([
      ...treatments,
      {
        id: `T${Date.now()}`,
        type: newTreatment.type || 'injection',
        name: newTreatment.name!,
        notes: newTreatment.notes || '',
      },
    ]);

    setNewTreatment({
      type: 'injection',
      name: '',
      notes: '',
    });
  };

  const removeTreatment = (id: string) => {
    setTreatments(treatments.filter(t => t.id !== id));
  };

  const handleSavePrescription = () => {
    if (prescriptions.length === 0 && treatments.length === 0) {
      alert('처방 또는 처치를 추가해주세요.');
      return;
    }
    alert('처방이 저장되었습니다.');
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Main Prescription Form */}
      <div className="col-span-2 space-y-6">
        {/* Patient Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-gray-900 mb-2">{appointment.patientName}</h2>
          <p className="text-gray-500">차트번호: {appointment.chartNumber}</p>
        </div>

        {/* Medication Prescription */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-900">약품 처방</h3>
          </div>

          {/* Add New Prescription */}
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">약품명</label>
                <select
                  value={newPrescription.medicationName}
                  onChange={(e) => setNewPrescription({ ...newPrescription, medicationName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">선택하세요</option>
                  {mockMedications.map(med => (
                    <option key={med.id} value={med.name}>
                      {med.name} (재고: {med.stock}{med.unit})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">용량</label>
                <input
                  type="text"
                  value={newPrescription.dosage}
                  onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="예: 500mg"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">복용 횟수</label>
                <select
                  value={newPrescription.frequency}
                  onChange={(e) => setNewPrescription({ ...newPrescription, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option>1일 1회</option>
                  <option>1일 2회</option>
                  <option>1일 3회</option>
                  <option>1일 4회</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">복용 기간</label>
                <select
                  value={newPrescription.duration}
                  onChange={(e) => setNewPrescription({ ...newPrescription, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option>3일</option>
                  <option>5일</option>
                  <option>7일</option>
                  <option>14일</option>
                  <option>30일</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">총 수량</label>
                <input
                  type="number"
                  value={newPrescription.quantity}
                  onChange={(e) => setNewPrescription({ ...newPrescription, quantity: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">복용 방법</label>
                <select
                  value={newPrescription.instructions}
                  onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option>식후 30분</option>
                  <option>식전 30분</option>
                  <option>식사와 관계없이</option>
                  <option>취침 전</option>
                </select>
              </div>
            </div>

            <button
              onClick={addPrescription}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              처방 추가
            </button>
          </div>

          {/* Prescription List */}
          <div className="space-y-2">
            {prescriptions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">처방된 약품이 없습니다</p>
            ) : (
              prescriptions.map(prescription => (
                <div key={prescription.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="text-gray-900">{prescription.medicationName} {prescription.dosage}</p>
                    <p className="text-gray-600 text-sm">
                      {prescription.frequency} × {prescription.duration} (총 {prescription.quantity}정) - {prescription.instructions}
                    </p>
                  </div>
                  <button
                    onClick={() => removePrescription(prescription.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Treatment & Tests */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Syringe className="w-5 h-5 text-green-600" />
            <h3 className="text-gray-900">주사 및 처치</h3>
          </div>

          {/* Add New Treatment */}
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">처치 유형</label>
                <select
                  value={newTreatment.type}
                  onChange={(e) => setNewTreatment({ ...newTreatment, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="injection">주사</option>
                  <option value="procedure">간단 처치</option>
                  <option value="test">검사</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm mb-1">처치명</label>
                <input
                  type="text"
                  value={newTreatment.name}
                  onChange={(e) => setNewTreatment({ ...newTreatment, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="예: X-ray 촬영, 비타민 주사"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1">특이사항</label>
              <textarea
                value={newTreatment.notes}
                onChange={(e) => setNewTreatment({ ...newTreatment, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={2}
                placeholder="간호사에게 전달할 사항을 입력하세요"
              />
            </div>

            <button
              onClick={addTreatment}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              처치 추가
            </button>
          </div>

          {/* Treatment List */}
          <div className="space-y-2">
            {treatments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">처치 항목이 없습니다</p>
            ) : (
              treatments.map(treatment => (
                <div key={treatment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    {treatment.type === 'injection' && <Syringe className="w-5 h-5 text-green-600" />}
                    {treatment.type === 'test' && <TestTube className="w-5 h-5 text-blue-600" />}
                    {treatment.type === 'procedure' && <Activity className="w-5 h-5 text-purple-600" />}
                    <div>
                      <p className="text-gray-900">{treatment.name}</p>
                      {treatment.notes && (
                        <p className="text-gray-600 text-sm">{treatment.notes}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeTreatment(treatment.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSavePrescription}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            처방전 저장 및 간호사에게 전달
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Low Stock Alert */}
        {lowStockMeds.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-red-900">재고 부족 알림</p>
                <p className="text-red-700 text-sm mt-1">
                  {lowStockMeds.length}개 약품의 재고가 부족합니다
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {lowStockMeds.map(med => (
                <div key={med.id} className="p-2 bg-white rounded border border-red-200">
                  <p className="text-gray-900 text-sm">{med.name}</p>
                  <p className="text-red-600 text-sm">
                    현재 재고: {med.stock}{med.unit} (기준: {med.lowStockThreshold}{med.unit})
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medication Inventory */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-900 mb-4">약품 재고 현황</h3>
          <div className="space-y-2">
            {mockMedications.map(med => (
              <div key={med.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-gray-900 text-sm">{med.name}</p>
                  <span className={`text-sm ${
                    med.stock < med.lowStockThreshold ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {med.stock}{med.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      med.stock < med.lowStockThreshold ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((med.stock / med.lowStockThreshold) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900 text-sm">처방 시 주의사항</p>
          <ul className="text-blue-700 text-sm mt-2 space-y-1 list-disc list-inside">
            <li>중복 처방 자동 확인</li>
            <li>재고 부족 시 알림</li>
            <li>간호사에게 자동 전달</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
