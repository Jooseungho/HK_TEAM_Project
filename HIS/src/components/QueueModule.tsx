import { useState } from 'react';
import { ArrowLeft, Users, Bell, Phone, Monitor } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface QueueModuleProps {
  onBack: () => void;
}

type QueueStatus = '대기' | '호출' | '진료중' | '완료';

interface QueueItem {
  id: string;
  queueNumber: number;
  patientName: string;
  patientNumber: string;
  department: string;
  doctor: string;
  registeredTime: string;
  status: QueueStatus;
  calledTime?: string;
}

export function QueueModule({ onBack }: QueueModuleProps) {
  const [queues, setQueues] = useState<QueueItem[]>([
    {
      id: '1',
      queueNumber: 1,
      patientName: '김철수',
      patientNumber: 'P2024001',
      department: '내과',
      doctor: '김의사',
      registeredTime: '09:30',
      status: '호출'
    },
    {
      id: '2',
      queueNumber: 2,
      patientName: '이영희',
      patientNumber: 'P2024002',
      department: '내과',
      doctor: '김의사',
      registeredTime: '09:45',
      status: '대기'
    },
    {
      id: '3',
      queueNumber: 3,
      patientName: '박민수',
      patientNumber: 'P2024003',
      department: '정형외과',
      doctor: '이의사',
      registeredTime: '10:00',
      status: '대기'
    },
    {
      id: '4',
      queueNumber: 4,
      patientName: '최수진',
      patientNumber: 'P2024004',
      department: '내과',
      doctor: '김의사',
      registeredTime: '10:15',
      status: '대기'
    },
    {
      id: '5',
      queueNumber: 5,
      patientName: '정민호',
      patientNumber: 'P2024005',
      department: '외과',
      doctor: '박의사',
      registeredTime: '10:30',
      status: '대기'
    }
  ]);

  const getStatusColor = (status: QueueStatus) => {
    const colors = {
      '대기': 'bg-yellow-100 text-yellow-800',
      '호출': 'bg-blue-100 text-blue-800',
      '진료중': 'bg-purple-100 text-purple-800',
      '완료': 'bg-green-100 text-green-800'
    };
    return colors[status];
  };

  const handleCallPatient = (id: string) => {
    setQueues(queues.map(q => 
      q.id === id 
        ? { ...q, status: '호출', calledTime: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) } 
        : q
    ));
  };

  const handleStartConsultation = (id: string) => {
    setQueues(queues.map(q => 
      q.id === id ? { ...q, status: '진료중' } : q
    ));
  };

  const handleComplete = (id: string) => {
    setQueues(queues.map(q => 
      q.id === id ? { ...q, status: '완료' } : q
    ));
  };

  const departments = ['전체', '내과', '외과', '정형외과', '소아과'];
  const [selectedDepartment, setSelectedDepartment] = useState('전체');

  const filteredQueues = selectedDepartment === '전체' 
    ? queues 
    : queues.filter(q => q.department === selectedDepartment);

  const stats = {
    total: queues.filter(q => q.status !== '완료').length,
    waiting: queues.filter(q => q.status === '대기').length,
    called: queues.filter(q => q.status === '호출').length,
    inProgress: queues.filter(q => q.status === '진료중').length
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-gray-900">대기·호출 시스템 (Queue)</h2>
            <p className="text-sm text-gray-500">환자 대기열 및 호출 관리</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">총 대기 인원</span>
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-gray-900">{stats.total}명</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">대기 중</span>
                <Users className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-gray-900">{stats.waiting}명</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">호출됨</span>
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-gray-900">{stats.called}명</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">진료 중</span>
                <Monitor className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-gray-900">{stats.inProgress}명</div>
            </Card>
          </div>

          <Tabs defaultValue="control" className="space-y-4">
            <TabsList>
              <TabsTrigger value="control">호출 제어</TabsTrigger>
              <TabsTrigger value="display">대기 현황판</TabsTrigger>
              <TabsTrigger value="mobile">모바일 뷰</TabsTrigger>
            </TabsList>

            <TabsContent value="control" className="space-y-4">
              {/* Department Filter */}
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">진료과 필터:</span>
                  {departments.map((dept) => (
                    <Button
                      key={dept}
                      variant={selectedDepartment === dept ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedDepartment(dept)}
                    >
                      {dept}
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Queue List */}
              <div className="space-y-3">
                {filteredQueues.filter(q => q.status !== '완료').map((queue) => (
                  <Card key={queue.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-3xl text-blue-600 mb-1">
                            {queue.queueNumber}
                          </div>
                          <div className="text-xs text-gray-500">대기번호</div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-gray-900">{queue.patientName}</span>
                            <Badge variant="outline">{queue.patientNumber}</Badge>
                            <Badge className={getStatusColor(queue.status)}>
                              {queue.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{queue.department}</span>
                            <span>담당의: {queue.doctor}</span>
                            <span>접수: {queue.registeredTime}</span>
                            {queue.calledTime && (
                              <span>호출: {queue.calledTime}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {queue.status === '대기' && (
                          <Button onClick={() => handleCallPatient(queue.id)}>
                            <Bell className="w-4 h-4 mr-2" />
                            호출하기
                          </Button>
                        )}
                        {queue.status === '호출' && (
                          <>
                            <Button onClick={() => handleCallPatient(queue.id)}>
                              <Bell className="w-4 h-4 mr-2" />
                              재호출
                            </Button>
                            <Button onClick={() => handleStartConsultation(queue.id)}>
                              진료 시작
                            </Button>
                          </>
                        )}
                        {queue.status === '진료중' && (
                          <Button onClick={() => handleComplete(queue.id)}>
                            진료 완료
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="display" className="space-y-4">
              <Card className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-gray-900 mb-2">대기 현황판</h2>
                  <p className="text-gray-500">환자 대기 상황을 실시간으로 확인하세요</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Current Patient */}
                  <div className="border-2 border-blue-500 rounded-lg p-8 bg-blue-50">
                    <div className="text-center mb-4">
                      <Bell className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-blue-600">현재 호출</p>
                    </div>
                    {queues.find(q => q.status === '호출') ? (
                      <div className="text-center">
                        <div className="text-5xl text-blue-600 mb-4">
                          {queues.find(q => q.status === '호출')?.queueNumber}
                        </div>
                        <div className="text-gray-900 mb-1">
                          {queues.find(q => q.status === '호출')?.department}
                        </div>
                        <div className="text-sm text-gray-600">
                          {queues.find(q => q.status === '호출')?.doctor}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        대기 중인 환자가 없습니다
                      </div>
                    )}
                  </div>

                  {/* Waiting List */}
                  <div className="border border-gray-200 rounded-lg p-8">
                    <div className="text-center mb-6">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">대기 목록</p>
                    </div>
                    <div className="space-y-3">
                      {queues
                        .filter(q => q.status === '대기')
                        .slice(0, 5)
                        .map((queue) => (
                          <div
                            key={queue.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl text-gray-700">
                                {queue.queueNumber}
                              </span>
                              <span className="text-gray-600 text-sm">
                                {queue.department}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {queue.registeredTime}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                  <p>마지막 업데이트: {new Date().toLocaleTimeString('ko-KR')}</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="mobile" className="space-y-4">
              <Card className="p-8 max-w-md mx-auto">
                <div className="text-center mb-8">
                  <Phone className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">모바일 대기 확인</h3>
                  <p className="text-sm text-gray-500">
                    환자가 모바일에서 확인하는 화면입니다
                  </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                  <div className="text-center mb-4">
                    <p className="text-sm text-blue-600 mb-2">내 대기번호</p>
                    <div className="text-6xl text-blue-600">2</div>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      대기 중
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">진료과</span>
                    <span className="text-gray-900">내과</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">담당 의사</span>
                    <span className="text-gray-900">김의사</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">접수 시간</span>
                    <span className="text-gray-900">09:45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">내 앞 대기</span>
                    <span className="text-gray-900">1명</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Bell className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="text-sm text-gray-600">
                      <p className="mb-1">호출 시 알림을 받으실 수 있습니다.</p>
                      <p className="text-xs text-gray-500">
                        진료실 근처에서 대기해 주시기 바랍니다.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
