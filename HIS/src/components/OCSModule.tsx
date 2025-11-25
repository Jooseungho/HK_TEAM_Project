import { useState } from 'react';
import { ArrowLeft, Pill, Plus, FileText, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface OCSModuleProps {
  onBack: () => void;
}

type PrescriptionStatus = '접수됨' | '진행중' | '완료' | '취소됨';
type PrescriptionType = '약물' | '검사' | '시술';

interface Prescription {
  id: string;
  patientName: string;
  patientNumber: string;
  type: PrescriptionType;
  items: string[];
  status: PrescriptionStatus;
  prescribedBy: string;
  prescribedDate: string;
  notes?: string;
}

export function OCSModule({ onBack }: OCSModuleProps) {
  const [prescriptions] = useState<Prescription[]>([
    {
      id: 'RX001',
      patientName: '김철수',
      patientNumber: 'P2024001',
      type: '약물',
      items: ['타이레놀 500mg', '아목시실린 250mg'],
      status: '접수됨',
      prescribedBy: '김의사',
      prescribedDate: '2024-11-25 09:30',
      notes: '식후 30분'
    },
    {
      id: 'RX002',
      patientName: '이영희',
      patientNumber: 'P2024002',
      type: '검사',
      items: ['혈액검사 (CBC)', 'X-Ray 흉부'],
      status: '진행중',
      prescribedBy: '박의사',
      prescribedDate: '2024-11-25 10:00'
    },
    {
      id: 'RX003',
      patientName: '박민수',
      patientNumber: 'P2024003',
      type: '시술',
      items: ['봉합술'],
      status: '완료',
      prescribedBy: '이의사',
      prescribedDate: '2024-11-25 08:15'
    }
  ]);

  const [isNewPrescriptionOpen, setIsNewPrescriptionOpen] = useState(false);

  const getStatusColor = (status: PrescriptionStatus) => {
    const colors = {
      '접수됨': 'bg-blue-100 text-blue-800',
      '진행중': 'bg-yellow-100 text-yellow-800',
      '완료': 'bg-green-100 text-green-800',
      '취소됨': 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getTypeColor = (type: PrescriptionType) => {
    const colors = {
      '약물': 'bg-purple-100 text-purple-800',
      '검사': 'bg-cyan-100 text-cyan-800',
      '시술': 'bg-orange-100 text-orange-800'
    };
    return colors[type];
  };

  const getTypeStats = () => {
    const today = prescriptions.filter(p => p.prescribedDate.startsWith('2024-11-25'));
    return {
      total: today.length,
      medication: today.filter(p => p.type === '약물').length,
      test: today.filter(p => p.type === '검사').length,
      procedure: today.filter(p => p.type === '시술').length,
    };
  };

  const stats = getTypeStats();

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
              <h2 className="text-gray-900">OCS (처방 시스템)</h2>
              <p className="text-sm text-gray-500">Order Communication System</p>
            </div>
          </div>
          
          <Dialog open={isNewPrescriptionOpen} onOpenChange={setIsNewPrescriptionOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                신규 처방
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>신규 처방 입력</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>환자 선택</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="환자 검색" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="P2024001">김철수 (P2024001)</SelectItem>
                        <SelectItem value="P2024002">이영희 (P2024002)</SelectItem>
                        <SelectItem value="P2024003">박민수 (P2024003)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>처방 유형</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="유형 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medication">약물 처방</SelectItem>
                        <SelectItem value="test">검사 처방</SelectItem>
                        <SelectItem value="procedure">시술 처방</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>처방 항목</Label>
                  <div className="flex gap-2">
                    <Input placeholder="약품명, 검사명 또는 시술명 입력" />
                    <Button size="sm">추가</Button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 min-h-[100px]">
                    <p className="text-sm text-gray-500">추가된 항목이 여기에 표시됩니다</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>용법</Label>
                    <Input placeholder="1일 3회, 식후 30분" />
                  </div>
                  <div className="space-y-2">
                    <Label>투약 일수</Label>
                    <Input type="number" placeholder="7" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>특이사항</Label>
                  <Textarea placeholder="처방 관련 특이사항을 입력하세요" rows={3} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewPrescriptionOpen(false)}>
                  취소
                </Button>
                <Button onClick={() => setIsNewPrescriptionOpen(false)}>
                  처방 저장
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">금일 총 처방</span>
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-gray-900">{stats.total}건</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">약물 처방</span>
                <Pill className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-gray-900">{stats.medication}건</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">검사 처방</span>
                <FileText className="w-5 h-5 text-cyan-600" />
              </div>
              <div className="text-gray-900">{stats.test}건</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">시술 처방</span>
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-gray-900">{stats.procedure}건</div>
            </Card>
          </div>

          {/* Prescription List */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="medication">약물</TabsTrigger>
              <TabsTrigger value="test">검사</TabsTrigger>
              <TabsTrigger value="procedure">시술</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-lg">
                        {prescription.id}
                      </Badge>
                      <Badge className={getTypeColor(prescription.type)}>
                        {prescription.type}
                      </Badge>
                      <Badge className={getStatusColor(prescription.status)}>
                        {prescription.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {prescription.status === '접수됨' && (
                        <Button size="sm" variant="outline">
                          진행
                        </Button>
                      )}
                      {prescription.status === '진행중' && (
                        <Button size="sm">
                          완료
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        상세
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">환자정보</p>
                      <p className="text-gray-900">
                        {prescription.patientName} ({prescription.patientNumber})
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">처방의</p>
                      <p className="text-gray-900">{prescription.prescribedBy}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">처방 항목</p>
                    <div className="space-y-1">
                      {prescription.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {prescription.notes && (
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-500 mb-1">특이사항</p>
                      <p className="text-sm text-gray-700">{prescription.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{prescription.prescribedDate}</span>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="medication">
              {prescriptions.filter(p => p.type === '약물').map((prescription) => (
                <Card key={prescription.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-900">{prescription.id}</span>
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {prescription.patientName} · {prescription.items.join(', ')}
                      </p>
                    </div>
                    <Button size="sm">상세</Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="test">
              {prescriptions.filter(p => p.type === '검사').map((prescription) => (
                <Card key={prescription.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-900">{prescription.id}</span>
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {prescription.patientName} · {prescription.items.join(', ')}
                      </p>
                    </div>
                    <Button size="sm">상세</Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="procedure">
              {prescriptions.filter(p => p.type === '시술').map((prescription) => (
                <Card key={prescription.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-900">{prescription.id}</span>
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {prescription.patientName} · {prescription.items.join(', ')}
                      </p>
                    </div>
                    <Button size="sm">상세</Button>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
