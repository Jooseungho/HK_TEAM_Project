import React, { useState } from 'react';
import { mockAccounts } from '../../data/mockData';
import { Account } from '../../types';
import { UserPlus, Lock, Unlock, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function AccountManagement() {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    role: 'nurse' as 'doctor' | 'nurse' | 'admin',
    email: '',
    phone: '',
  });

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.employeeId || !formData.name || !formData.email) {
      alert('필수 항목을 입력해주세요.');
      return;
    }

    const newAccount: Account = {
      id: `user${Date.now()}`,
      employeeId: formData.employeeId,
      name: formData.name,
      role: formData.role,
      email: formData.email,
      phone: formData.phone,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: null,
    };

    setAccounts([...accounts, newAccount]);
    setFormData({
      employeeId: '',
      name: '',
      role: 'nurse',
      email: '',
      phone: '',
    });
    setShowCreateForm(false);
    alert('계정이 생성되었습니다.');
  };

  const toggleAccountStatus = (accountId: string) => {
    setAccounts(prev =>
      prev.map(acc =>
        acc.id === accountId ? { ...acc, isActive: !acc.isActive } : acc
      )
    );
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'doctor':
        return 'bg-blue-100 text-blue-700';
      case 'nurse':
        return 'bg-green-100 text-green-700';
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'doctor':
        return '의사';
      case 'nurse':
        return '간호사';
      case 'admin':
        return '관리자';
      default:
        return role;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Account List */}
      <div className="col-span-2 bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-900">계정 목록</h2>
              <p className="text-gray-500 text-sm mt-1">총 {accounts.length}개 계정</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              신규 계정 생성
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">직원 정보</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">역할</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">연락처</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">최근 로그인</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">상태</th>
                <th className="px-6 py-3 text-center text-gray-700 text-sm">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {accounts.map(account => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-900">{account.name}</p>
                      <p className="text-gray-500 text-sm">ID: {account.employeeId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${getRoleBadge(account.role)}`}>
                      {getRoleLabel(account.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-900 text-sm">{account.email}</p>
                      <p className="text-gray-500 text-sm">{account.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">
                      {account.lastLogin
                        ? new Date(account.lastLogin).toLocaleString('ko-KR', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '로그인 기록 없음'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {account.isActive ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        활성
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 text-sm">
                        <XCircle className="w-4 h-4" />
                        비활성
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => toggleAccountStatus(account.id)}
                        className="p-1 text-gray-600 hover:text-purple-600 transition-colors"
                        title={account.isActive ? '계정 잠금' : '계정 활성화'}
                      >
                        {account.isActive ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => setSelectedAccount(account)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="계정 수정"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('정말 삭제하시겠습니까?')) {
                            setAccounts(accounts.filter(a => a.id !== account.id));
                          }
                        }}
                        className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                        title="계정 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Form */}
      <div>
        {showCreateForm || selectedAccount ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-900 mb-6">
              {selectedAccount ? '계정 수정' : '신규 계정 생성'}
            </h3>

            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm">직원 번호 *</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="예: D001, N001"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">이름 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="홍길동"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">역할 *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  <option value="doctor">의사</option>
                  <option value="nurse">간호사</option>
                  <option value="admin">관리자</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">이메일 *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="email@hospital.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">연락처</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="010-0000-0000"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setSelectedAccount(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  {selectedAccount ? '수정' : '생성'}
                </button>
              </div>
            </form>

            {!selectedAccount && (
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-purple-900 text-sm">계정 생성 안내</p>
                <ul className="text-purple-700 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>초기 비밀번호는 자동 생성됩니다</li>
                  <li>생성된 계정 정보는 이메일로 전송됩니다</li>
                  <li>최초 로그인 시 비밀번호 변경이 필요합니다</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 text-center">
            <UserPlus className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">계정 관리</h3>
            <p className="text-gray-600 text-sm mb-6">
              신규 계정을 생성하거나<br />기존 계정을 수정할 수 있습니다
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              신규 계정 생성
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
