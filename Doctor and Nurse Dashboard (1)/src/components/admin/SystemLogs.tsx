import React, { useState } from 'react';
import { mockSystemLogs } from '../../data/mockData';
import { SystemLog } from '../../types';
import { Activity, Search, Download, Filter } from 'lucide-react';

export default function SystemLogs() {
  const [logs, setLogs] = useState<SystemLog[]>(mockSystemLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');

  const actionTypes = ['all', '로그인', '로그아웃', '환자 접수', 'EMR 조회', 'EMR 수정', '문서 발행', '처리 취소'];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.userName.includes(searchTerm) ||
      log.action.includes(searchTerm) ||
      log.details.includes(searchTerm);
    
    const matchesFilter = filterAction === 'all' || log.action === filterAction;
    
    return matchesSearch && matchesFilter;
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case '로그인':
        return 'bg-green-100 text-green-700';
      case '로그아웃':
        return 'bg-gray-100 text-gray-700';
      case 'EMR 조회':
        return 'bg-blue-100 text-blue-700';
      case 'EMR 수정':
        return 'bg-purple-100 text-purple-700';
      case '문서 발행':
        return 'bg-yellow-100 text-yellow-700';
      case '처리 취소':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="사용자, 작업, 세부사항으로 검색"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {actionTypes.map(action => (
                <option key={action} value={action}>
                  {action === 'all' ? '전체 작업' : action}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => alert('로그를 다운로드합니다.')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            내보내기
          </button>
        </div>
      </div>

      {/* Logs List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <h2 className="text-gray-900">시스템 로그</h2>
            </div>
            <span className="text-gray-500 text-sm">{filteredLogs.length}개 로그</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">시간</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">사용자</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">작업</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">세부사항</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">IP 주소</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">검색 결과가 없습니다</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-gray-900 text-sm">
                        {new Date(log.timestamp).toLocaleString('ko-KR', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900 text-sm">{log.userName}</p>
                        <p className="text-gray-500 text-xs">ID: {log.userId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${getActionBadge(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm">{log.details}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm font-mono">{log.ipAddress}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">
              총 {filteredLogs.length}개의 로그가 표시되고 있습니다
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                이전
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                다음
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Log Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-500 text-sm mb-1">오늘 로그인</p>
          <p className="text-gray-900 text-2xl">15회</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-500 text-sm mb-1">EMR 조회</p>
          <p className="text-gray-900 text-2xl">42건</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-500 text-sm mb-1">EMR 수정</p>
          <p className="text-gray-900 text-2xl">28건</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-500 text-sm mb-1">문서 발행</p>
          <p className="text-gray-900 text-2xl">35건</p>
        </div>
      </div>
    </div>
  );
}
