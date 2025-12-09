import React, { useState } from 'react';
import { User } from '../App';
import { LogOut, Users, Activity, Package, FileText, Shield } from 'lucide-react';
import AccountManagement from './admin/AccountManagement';
import SystemLogs from './admin/SystemLogs';
import InventoryManagement from './admin/InventoryManagement';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type ViewType = 'accounts' | 'logs' | 'inventory';

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>('accounts');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">관리자 시스템</h1>
                <p className="text-gray-500 text-sm">{user.name} 님 환영합니다</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 text-sm">전체 계정</p>
                  <p className="text-blue-900 text-2xl mt-1">12명</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 text-sm">활성 계정</p>
                  <p className="text-green-900 text-2xl mt-1">10명</p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-800 text-sm">재고 부족</p>
                  <p className="text-yellow-900 text-2xl mt-1">2개</p>
                </div>
                <Package className="w-8 h-8 text-yellow-600" />
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
              onClick={() => setCurrentView('accounts')}
              className={`px-6 py-3 transition-colors ${
                currentView === 'accounts'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              계정 관리
            </button>
            <button
              onClick={() => setCurrentView('logs')}
              className={`px-6 py-3 transition-colors ${
                currentView === 'logs'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              시스템 로그
            </button>
            <button
              onClick={() => setCurrentView('inventory')}
              className={`px-6 py-3 transition-colors ${
                currentView === 'inventory'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              재고 관리
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        {currentView === 'accounts' && <AccountManagement />}
        {currentView === 'logs' && <SystemLogs />}
        {currentView === 'inventory' && <InventoryManagement />}
      </main>
    </div>
  );
}