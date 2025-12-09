import React, { useState } from 'react';
import { Patient } from '../../types';
import { UserPlus, Search, User } from 'lucide-react';

interface PatientRegistrationProps {
  patients: Patient[];
  onAddPatient: (patient: Patient) => void;
}

export default function PatientRegistration({ patients, onAddPatient }: PatientRegistrationProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: 'male' as 'male' | 'female',
    phone: '',
    address: '',
  });

  const filteredPatients = searchTerm
    ? patients.filter(p => 
        p.name.includes(searchTerm) || 
        p.chartNumber.includes(searchTerm) ||
        p.phone.includes(searchTerm)
      )
    : patients;

  // Sort by registration date descending (most recent first)
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.birthDate || !formData.phone) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    const newPatient: Patient = {
      id: `P${String(patients.length + 1).padStart(3, '0')}`,
      name: formData.name,
      birthDate: formData.birthDate,
      gender: formData.gender,
      phone: formData.phone,
      address: formData.address,
      registrationDate: new Date().toISOString().split('T')[0],
      chartNumber: `C2024${String(patients.length + 1).padStart(3, '0')}`,
    };

    onAddPatient(newPatient);
    setFormData({
      name: '',
      birthDate: '',
      gender: 'male',
      phone: '',
      address: '',
    });
    setShowForm(false);
    alert(`환자 등록이 완료되었습니다.\n차트번호: ${newPatient.chartNumber}`);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Patient List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">등록 환자 목록</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              신규 등록
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="이름, 전화번호, 차트번호로 검색"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {sortedPatients.length === 0 ? (
            <div className="p-12 text-center">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">검색 결과가 없습니다</p>
            </div>
          ) : (
            sortedPatients.map(patient => (
              <div key={patient.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
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
                    {patient.address && (
                      <p className="text-gray-500 text-sm">주소: {patient.address}</p>
                    )}
                    <p className="text-gray-400 text-sm mt-1">등록일: {patient.registrationDate}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Registration Form */}
      <div>
        {showForm ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-gray-900 mb-6">신규 환자 등록</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">환자명 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="환자 이름"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">생년월일 *</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">성별 *</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => setFormData({ ...formData, gender: 'male' })}
                      className="mr-2"
                    />
                    남성
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => setFormData({ ...formData, gender: 'female' })}
                      className="mr-2"
                    />
                    여성
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">연락처 *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="010-0000-0000"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">주소</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="주소를 입력하세요"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-12 text-center">
            <UserPlus className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">신규 환자 등록</h3>
            <p className="text-gray-600 mb-6">
              신규 환자를 등록하려면<br />상단의 '신규 등록' 버튼을 클릭하세요
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              신규 등록 시작
            </button>
          </div>
        )}
      </div>
    </div>
  );
}