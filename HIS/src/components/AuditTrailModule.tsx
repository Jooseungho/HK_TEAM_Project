import { useState } from 'react';
import { ArrowLeft, FileText, Search, Filter, Download, Eye, Edit, Trash2, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

interface AuditTrailModuleProps {
  onBack: () => void;
}

type ActionType = '조회' | '수정' | '삭제' | '생성';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userId: string;
  role: string;
  action: ActionType;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  success: boolean;
}

export function AuditTrailModule({ onBack }: AuditTrailModuleProps) {
  const [logs] = useState<AuditLog[]>([
    {
      id: 'LOG001',
      timestamp: '2024-11-25 10:30:45',
      user: '김의사',
      userId: 'DR001',
      role: '의사',
      action: '조회',
      resource: '환자 진료기록',
      resourceId: 'P2024001',
      details: '김철수 환자 EMR 조회',
      ipAddress: '192.168.1.100',
      success: true
    },
    {
      id: 'LOG002',
      timestamp: '2024-11-25 10:28:12',
      user: '이간호사',
      userId: 'NR001',
      role: '간호사',
      action: '수정',
      resource: '바이탈 사인',
      resourceId: 'V2024001',
      details: '혈압 측정값 입력: 120/80',
      ipAddress: '192.168.1.105',
      success: true
    },
    {
      id: 'LOG003',
      timestamp: '2024-11-25 10:25:33',
      user: '박원무',
      userId: 'AD001',
      role: '원무과',
      action: '생성',
      resource: '수납 내역',
      resourceId: 'B2024001',
      details: '진료비 수납 처리 완료',
      ipAddress: '192.168.1.110',
      success: true
    },
    {
      id: 'LOG004',
      timestamp: '2024-11-25 10:20:15',
      user: '김의사',
      userId: 'DR001',
      role: '의사',
      action: '생성',
      resource: '처방',
      resourceId: 'RX001',
      details: '타이레놀 500mg 처방 등록',
      ipAddress: '192.168.1.100',
      success: true
    },
    {
      id: 'LOG005',
      timestamp: '2024-11-25 10:15:08',
      user: '최관리자',
      userId: 'AD999',
      role: '관리자',
      action: '삭제',
      resource: '환자 기록',
      resourceId: 'P2024099',
      details: '중복 등록 환자 기록 삭제',
      ipAddress: '192.168.1.200',
      success: true
    },
    {
      id: 'LOG006',
      timestamp: '2024-11-25 10:10:22',
      user: '박의사',
      userId: 'DR002',
      role: '의사',
      action: '조회',
      resource: '환자 진료기록',
      resourceId: 'P2024002',
      details: '이영희 환자 과거 진료 이력 조회',
      ipAddress: '192.168.1.101',
      success: true
    },
    {
      id: 'LOG007',
      timestamp: '2024-11-25 10:05:45',
      user: '미승인사용자',
      userId: 'UNKNOWN',
      role: '미승인',
      action: '조회',
      resource: '환자 진료기록',
      resourceId: 'P2024001',
      details: '권한 없는 접근 시도',
      ipAddress: '192.168.1.999',
      success: false
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterSuccess, setFilterSuccess] = useState<string>('all');

  const getActionColor = (action: ActionType) => {
    const colors = {
      '조회': 'bg-blue-100 text-blue-800',
      '수정': 'bg-yellow-100 text-yellow-800',
      '삭제': 'bg-red-100 text-red-800',
      '생성': 'bg-green-100 text-green-800'
    };
    return colors[action];
  };

  const getActionIcon = (action: ActionType) => {
    const icons = {
      '조회': Eye,
      '수정': Edit,
      '삭제': Trash2,
      '생성': UserPlus
    };
    const Icon = icons[action];
    return <Icon className="w-4 h-4" />;
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.includes(searchQuery) ||
      log.resource.includes(searchQuery) ||
      log.details.includes(searchQuery) ||
      log.resourceId.includes(searchQuery);
    
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesSuccess = filterSuccess === 'all' || 
      (filterSuccess === 'success' && log.success) ||
      (filterSuccess === 'failed' && !log.success);

    return matchesSearch && matchesAction && matchesSuccess;
  });

  const stats = {
    total: logs.length,
    today: logs.filter(l => l.timestamp.startsWith('2024-11-25')).length,
    failed: logs.filter(l => !l.success).length,
    users: new Set(logs.map(l => l.userId)).size
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-gray-900">Audit Trail (감사 로그)</h2>
              <p className="text-sm text-gray-500">시스템 접근 및 데이터 변경 이력</p>
            </div>
          </div>

          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            로그 내보내기
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">총 로그 수</span>
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-gray-900">{stats.total}건</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">금일 활동</span>
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-gray-900">{stats.today}건</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">실패한 접근</span>
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-gray-900">{stats.failed}건</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">활성 사용자</span>
                <UserPlus className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-gray-900">{stats.users}명</div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label>검색</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="사용자, 리소스, 상세내용 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>작업 유형</Label>
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="조회">조회</SelectItem>
                    <SelectItem value="수정">수정</SelectItem>
                    <SelectItem value="생성">생성</SelectItem>
                    <SelectItem value="삭제">삭제</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>상태</Label>
                <Select value={filterSuccess} onValueChange={setFilterSuccess}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="success">성공</SelectItem>
                    <SelectItem value="failed">실패</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Logs Table */}
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-gray-900">감사 로그 목록</h3>
              <span className="text-sm text-gray-500">
                {filteredLogs.length}건의 기록
              </span>
            </div>

            <div className="space-y-2">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-4 border rounded-lg ${
                    log.success 
                      ? 'border-gray-200 hover:bg-gray-50' 
                      : 'border-red-200 bg-red-50'
                  } transition-colors`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {log.id}
                      </Badge>
                      <Badge className={getActionColor(log.action)}>
                        <span className="flex items-center gap-1">
                          {getActionIcon(log.action)}
                          {log.action}
                        </span>
                      </Badge>
                      {!log.success && (
                        <Badge className="bg-red-100 text-red-800">
                          실패
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">사용자</p>
                      <p className="text-sm text-gray-900">
                        {log.user}
                        <Badge variant="outline" className="ml-2 text-xs">
                          {log.role}
                        </Badge>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">사용자 ID</p>
                      <p className="text-sm text-gray-900">{log.userId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">리소스</p>
                      <p className="text-sm text-gray-900">{log.resource}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">리소스 ID</p>
                      <p className="text-sm text-gray-900">{log.resourceId}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">상세 내용</p>
                    <p className="text-sm text-gray-700">{log.details}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      IP: {log.ipAddress}
                    </span>
                    <Button size="sm" variant="outline">
                      상세 보기
                    </Button>
                  </div>
                </div>
              ))}

              {filteredLogs.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">검색 결과가 없습니다</p>
                </div>
              )}
            </div>
          </Card>

          {/* Alert for Failed Access */}
          {logs.filter(l => !l.success).length > 0 && (
            <Card className="p-6 border-red-200 bg-red-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">보안 경고</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    {logs.filter(l => !l.success).length}건의 실패한 접근 시도가 감지되었습니다.
                    시스템 보안을 위해 확인이 필요합니다.
                  </p>
                  <Button size="sm" variant="outline">
                    상세 확인하기
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
