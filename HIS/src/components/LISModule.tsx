import { useState } from 'react';
import { ArrowLeft, FlaskConical, Upload, FileText, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';

interface LISModuleProps {
  onBack: () => void;
}

type TestStatus = '대기' | '접수' | '진행중' | '완료';
type TestType = 'LIS' | 'RIS' | 'PACS';

interface Test {
  id: string;
  patientName: string;
  patientNumber: string;
  type: TestType;
  testName: string;
  orderedBy: string;
  orderedDate: string;
  status: TestStatus;
  result?: string;
  completedDate?: string;
}

export function LISModule({ onBack }: LISModuleProps) {
  const [tests, setTests] = useState<Test[]>([
    {
      id: 'T2024001',
      patientName: '김철수',
      patientNumber: 'P2024001',
      type: 'LIS',
      testName: '혈액검사 (CBC)',
      orderedBy: '김의사',
      orderedDate: '2024-11-25 09:30',
      status: '대기'
    },
    {
      id: 'T2024002',
      patientName: '이영희',
      patientNumber: 'P2024002',
      type: 'RIS',
      testName: 'X-Ray 흉부',
      orderedBy: '박의사',
      orderedDate: '2024-11-25 10:00',
      status: '진행중'
    },
    {
      id: 'T2024003',
      patientName: '박민수',
      patientNumber: 'P2024003',
      type: 'LIS',
      testName: '간기능검사',
      orderedBy: '이의사',
      orderedDate: '2024-11-24 14:20',
      status: '완료',
      result: 'AST: 28 U/L\nALT: 32 U/L\n정상 범위',
      completedDate: '2024-11-24 16:30'
    },
    {
      id: 'T2024004',
      patientName: '최수진',
      patientNumber: 'P2024004',
      type: 'PACS',
      testName: 'CT 복부',
      orderedBy: '김의사',
      orderedDate: '2024-11-25 11:00',
      status: '접수'
    }
  ]);

  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [testResult, setTestResult] = useState('');

  const getStatusColor = (status: TestStatus) => {
    const colors = {
      '대기': 'bg-yellow-100 text-yellow-800',
      '접수': 'bg-blue-100 text-blue-800',
      '진행중': 'bg-purple-100 text-purple-800',
      '완료': 'bg-green-100 text-green-800'
    };
    return colors[status];
  };

  const getTypeColor = (type: TestType) => {
    const colors = {
      'LIS': 'bg-cyan-100 text-cyan-800',
      'RIS': 'bg-orange-100 text-orange-800',
      'PACS': 'bg-pink-100 text-pink-800'
    };
    return colors[type];
  };

  const handleStatusChange = (testId: string, newStatus: TestStatus) => {
    setTests(tests.map(t => 
      t.id === testId ? { ...t, status: newStatus } : t
    ));
  };

  const handleResultSubmit = () => {
    if (selectedTest) {
      setTests(tests.map(t => 
        t.id === selectedTest.id 
          ? { ...t, result: testResult, status: '완료', completedDate: new Date().toISOString() } 
          : t
      ));
      setIsResultDialogOpen(false);
      setSelectedTest(null);
      setTestResult('');
    }
  };

  const stats = {
    total: tests.filter(t => t.orderedDate.startsWith('2024-11-25')).length,
    pending: tests.filter(t => t.status === '대기').length,
    inProgress: tests.filter(t => t.status === '진행중' || t.status === '접수').length,
    completed: tests.filter(t => t.status === '완료').length
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
            <h2 className="text-gray-900">LIS/RIS/PACS 연동</h2>
            <p className="text-sm text-gray-500">검사실 정보 시스템 및 영상 관리</p>
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
                <span className="text-sm text-gray-600">금일 총 검사</span>
                <FlaskConical className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-gray-900">{stats.total}건</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">대기 중</span>
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-gray-900">{stats.pending}건</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">진행 중</span>
                <FlaskConical className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-gray-900">{stats.inProgress}건</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">완료</span>
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-gray-900">{stats.completed}건</div>
            </Card>
          </div>

          {/* Test List */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">전체 검사</TabsTrigger>
              <TabsTrigger value="lis">LIS (검체검사)</TabsTrigger>
              <TabsTrigger value="ris">RIS (영상검사)</TabsTrigger>
              <TabsTrigger value="pacs">PACS (의료영상)</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {tests.map((test) => (
                <Card key={test.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{test.id}</Badge>
                        <Badge className={getTypeColor(test.type)}>
                          {test.type}
                        </Badge>
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 mb-2">{test.testName}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>환자: {test.patientName} ({test.patientNumber})</span>
                        <span>처방의: {test.orderedBy}</span>
                        <span>처방일시: {test.orderedDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {test.status === '대기' && (
                        <Button 
                          size="sm"
                          onClick={() => handleStatusChange(test.id, '접수')}
                        >
                          접수
                        </Button>
                      )}
                      {test.status === '접수' && (
                        <Button 
                          size="sm"
                          onClick={() => handleStatusChange(test.id, '진행중')}
                        >
                          검사 시작
                        </Button>
                      )}
                      {test.status === '진행중' && (
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedTest(test);
                            setIsResultDialogOpen(true);
                          }}
                        >
                          결과 입력
                        </Button>
                      )}
                      {test.status === '완료' && (
                        <Button size="sm" variant="outline">
                          결과 보기
                        </Button>
                      )}
                    </div>
                  </div>

                  {test.status === '완료' && test.result && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <p className="text-sm text-gray-500 mb-2">검사 결과</p>
                      <pre className="text-sm text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-wrap">
                        {test.result}
                      </pre>
                      <p className="text-xs text-gray-500 mt-2">
                        완료일시: {test.completedDate}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="lis" className="space-y-3">
              {tests.filter(t => t.type === 'LIS').map((test) => (
                <Card key={test.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-900">{test.testName}</span>
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {test.patientName} · {test.orderedDate}
                      </p>
                    </div>
                    <Button size="sm">상세</Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="ris" className="space-y-3">
              {tests.filter(t => t.type === 'RIS').map((test) => (
                <Card key={test.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-900">{test.testName}</span>
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {test.patientName} · {test.orderedDate}
                      </p>
                    </div>
                    <Button size="sm">상세</Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="pacs" className="space-y-3">
              {tests.filter(t => t.type === 'PACS').map((test) => (
                <Card key={test.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-900">{test.testName}</span>
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {test.patientName} · {test.orderedDate}
                      </p>
                    </div>
                    <Button size="sm">영상 보기</Button>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Result Input Dialog */}
      <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>검사 결과 입력</DialogTitle>
          </DialogHeader>
          {selectedTest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">검사명</p>
                  <p className="text-gray-900">{selectedTest.testName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">검사번호</p>
                  <p className="text-gray-900">{selectedTest.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">환자명</p>
                  <p className="text-gray-900">{selectedTest.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">등록번호</p>
                  <p className="text-gray-900">{selectedTest.patientNumber}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>검사 결과</Label>
                <Textarea
                  placeholder="검사 결과를 입력하세요..."
                  value={testResult}
                  onChange={(e) => setTestResult(e.target.value)}
                  rows={10}
                />
              </div>

              {selectedTest.type === 'PACS' && (
                <div className="space-y-2">
                  <Label>영상 파일 업로드</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                      클릭하여 파일 업로드 또는 드래그 앤 드롭
                    </p>
                    <p className="text-xs text-gray-500">
                      DICOM, JPG, PNG 파일 지원
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsResultDialogOpen(false);
                    setSelectedTest(null);
                    setTestResult('');
                  }}
                >
                  취소
                </Button>
                <Button onClick={handleResultSubmit} disabled={!testResult}>
                  결과 저장
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
