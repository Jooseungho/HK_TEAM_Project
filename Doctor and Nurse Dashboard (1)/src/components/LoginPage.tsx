import React, { useState } from 'react';
import { User, UserRole } from '../App';
import { Activity } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const mockUsers = {
  doctor: { id: 'doc001', name: '김의사', role: 'doctor' as UserRole, employeeId: 'D001' },
  nurse: { id: 'nurse001', name: '이간호사', role: 'nurse' as UserRole, employeeId: 'N001' },
  admin: { id: 'admin001', name: '박관리자', role: 'admin' as UserRole, employeeId: 'A001' },
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'nurse' | 'admin'>('doctor');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(mockUsers[selectedRole]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-600 p-3 rounded-full">
            <Activity className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-center text-gray-900 mb-2">병원 EMR 시스템</h1>
        <p className="text-center text-gray-500 mb-8">로그인하여 시스템에 접속하세요</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">계정 유형</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('doctor')}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${
                  selectedRole === 'doctor'
                    ? 'bg-blue-50 border-blue-600 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                의사
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('nurse')}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${
                  selectedRole === 'nurse'
                    ? 'bg-green-50 border-green-600 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                간호사
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-purple-50 border-purple-600 text-purple-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                관리자
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">직원 번호</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="직원 번호를 입력하세요"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm">데모 계정 정보:</p>
          <p className="text-blue-600 text-sm mt-1">의사: D001 / 간호사: N001 / 관리자: A001</p>
        </div>
      </div>
    </div>
  );
}
