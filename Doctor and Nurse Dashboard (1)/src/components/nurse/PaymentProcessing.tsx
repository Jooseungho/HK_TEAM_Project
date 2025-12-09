import React, { useState } from 'react';
import { Appointment } from '../../types';
import { CreditCard, Receipt, DollarSign, CheckCircle } from 'lucide-react';

interface PaymentProcessingProps {
  appointments: Appointment[];
}

interface PaymentItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function PaymentProcessing({ appointments }: PaymentProcessingProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');

  const calculatePayment = (appointment: Appointment): PaymentItem[] => {
    // Mock payment calculation based on diagnosis
    return [
      { name: '초진료', quantity: 1, unitPrice: 15000, total: 15000 },
      { name: '진찰료', quantity: 1, unitPrice: 10000, total: 10000 },
      { name: '처방전 발행', quantity: 1, unitPrice: 3000, total: 3000 },
      { name: '약제비', quantity: 1, unitPrice: 12000, total: 12000 },
    ];
  };

  const handlePayment = () => {
    if (!selectedAppointment) return;
    
    alert('수납이 완료되었습니다.');
    setSelectedAppointment(null);
  };

  const paymentItems = selectedAppointment ? calculatePayment(selectedAppointment) : [];
  const totalAmount = paymentItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Completed Appointments */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900">수납 대기 환자</h2>
          <p className="text-gray-500 text-sm mt-1">진료가 완료된 환자 목록</p>
        </div>

        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {appointments.length === 0 ? (
            <div className="p-12 text-center">
              <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">수납 대기 중인 환자가 없습니다</p>
            </div>
          ) : (
            appointments.map(appointment => (
              <button
                key={appointment.id}
                onClick={() => setSelectedAppointment(appointment)}
                className={`w-full text-left p-6 hover:bg-gray-50 transition-colors ${
                  selectedAppointment?.id === appointment.id ? 'bg-green-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center">
                      {appointment.queueNumber}
                    </div>
                    <div>
                      <h3 className="text-gray-900">{appointment.patientName}</h3>
                      <p className="text-gray-500 text-sm">차트번호: {appointment.chartNumber}</p>
                      <p className="text-gray-500 text-sm">
                        진료 완료: {new Date(appointment.registeredAt).toLocaleTimeString('ko-KR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      수납 대기
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-green-600" />
            <h2 className="text-gray-900">수납 처리</h2>
          </div>
        </div>

        {selectedAppointment ? (
          <div className="p-6">
            {/* Patient Info */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
              <h3 className="text-gray-900 mb-1">{selectedAppointment.patientName}</h3>
              <p className="text-gray-600 text-sm">차트번호: {selectedAppointment.chartNumber}</p>
              <p className="text-gray-600 text-sm">대기번호: {selectedAppointment.queueNumber}</p>
            </div>

            {/* Payment Items */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">수납 내역</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-700 text-sm">항목</th>
                      <th className="px-4 py-3 text-center text-gray-700 text-sm">수량</th>
                      <th className="px-4 py-3 text-right text-gray-700 text-sm">단가</th>
                      <th className="px-4 py-3 text-right text-gray-700 text-sm">금액</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paymentItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{item.quantity}</td>
                        <td className="px-4 py-3 text-right text-gray-600">
                          {item.unitPrice.toLocaleString()}원
                        </td>
                        <td className="px-4 py-3 text-right text-gray-900">
                          {item.total.toLocaleString()}원
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Amount */}
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">총 수납액</span>
                <span className="text-gray-900 text-2xl">{totalAmount.toLocaleString()}원</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-3">결제 수단</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-gray-900 text-center">카드</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-gray-900 text-center">현금</p>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handlePayment}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                수납 완료
              </button>
              <button
                onClick={() => alert('영수증이 출력됩니다.')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Receipt className="w-5 h-5" />
                영수증 출력
              </button>
            </div>

            {/* Notes */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-900 text-sm">수납 처리 안내</p>
              <ul className="text-blue-700 text-sm mt-2 space-y-1 list-disc list-inside">
                <li>진단명 및 행위 항목 기반 자동 계산</li>
                <li>수납 완료 시 자동으로 문서 발행</li>
                <li>영수증은 출력 또는 전자 발행 가능</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">환자를 선택하여 수납을 진행하세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
