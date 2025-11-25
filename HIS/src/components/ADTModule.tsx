import { useState } from 'react';
import { ArrowLeft, UserPlus, Users, Bed, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ADTModuleProps {
  onBack: () => void;
}

type PatientStatus = '대기' | '진료중' | '완료' | '입원' | '퇴원';

interface Patient {
  id: string;
  name: string;
  patientNumber: string;
  birthDate: string;
  gender: string;
  phone: string;
  status: PatientStatus;
  visitDate: string;
  department: string;
}

export function ADTModule({ onBack }: ADTModuleProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: '김철수',
      patientNumber: 'P2024001',
      birthDate: '1985-03-15',
      gender: '남',
      phone: '010-1234-5678',
      status: '대기',
      visitDate: '2024-11-25 09:30',
      department: '내과'
    },
    {
      id: '2',
      name: '이영희',
      patientNumber: 'P2024002',
      birthDate: '1990-07-22',
      gender: '여',
      phone: '010-2345-6789',
      status: '진료중',
      visitDate: '2024-11-25 10:00',
      department: '외과'
    },
    {
      id: '3',
      name: '박민수',
      patientNumber: 'P2024003',
      birthDate: '1978-11-08',
      gender: '남',
      phone: '010-3456-7890',
      status: '입원',
      visitDate: '2024-11-23 14:20',
      department: '정형외과'
    }
  ]);

  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);

  const getStatusColor = (status: PatientStatus) => {
    const colors = {
      '대기': 'bg-yellow-100 text-yellow-800',
      '진료중': 'bg-blue-100 text-blue-800',
      '완료': 'bg-green-100 text-green-800',
      '입원': 'bg-purple-100 text-purple-800',
      '퇴원': 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  const filteredPatients = patients.filter(p => 
    p.name.includes(searchQuery) || 
    p.patientNumber.includes(searchQuery) ||
    p.phone.includes(searchQuery)
  );

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
              <h2 className="text-gray-900">ADT (환자등록·접수·입퇴원)</h2>
              <p className="text-sm text-gray-500">Admission, Discharge, Transfer</p>
            </div>
          </div>
          
          <Dialog open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="w-4 h-4" />
                신규 환자 등록
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>신규 환자 등록</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label>환자명</Label>
                  <Input placeholder="이름 입력" />
                </div>
                <div className="space-y-2">
                  <Label>주민등록번호</Label>
                  <Input placeholder="000000-0000000" />
                </div>
                <div className="space-y-2">
                  <Label>성별</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">남</SelectItem>
                      <SelectItem value="female">여</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>연락처</Label>
                  <Input placeholder="010-0000-0000" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>주소</Label>
                  <Input placeholder="주소 입력" />
                </div>
                <div className="space-y-2">
                  <Label>보험 유형</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nhis">건강보험</SelectItem>
                      <SelectItem value="medicaid">의료급여</SelectItem>
                      <SelectItem value="uninsured">비급여</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>진료과</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">내과</SelectItem>
                      <SelectItem value="surgery">외과</SelectItem>
                      <SelectItem value="pediatrics">소아과</SelectItem>
                      <SelectItem value="orthopedics">정형외과</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewPatientOpen(false)}>
                  취소
                </Button>
                <Button onClick={() => setIsNewPatientOpen(false)}>
                  등록
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="reception" className="space-y-6">
          <TabsList>
            <TabsTrigger value="reception" className="gap-2">
              <UserPlus className="w-4 h-4" />
              외래 접수
            </TabsTrigger>
            <TabsTrigger value="inpatient" className="gap-2">
              <Bed className="w-4 h-4" />
              입원 관리
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2">
              <Users className="w-4 h-4" />
              환자 조회
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reception" className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="환자명, 등록번호, 연락처로 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-gray-900">{patient.name}</span>
                        <Badge variant="outline">{patient.patientNumber}</Badge>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{patient.birthDate} ({patient.gender})</span>
                        <span>{patient.phone}</span>
                        <span>{patient.department}</span>
                        <span>{patient.visitDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        접수
                      </Button>
                      <Button size="sm">
                        상세보기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="inpatient" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">총 입원 환자</span>
                  <Bed className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-gray-900">12명</div>
                <p className="text-xs text-gray-500 mt-1">현재 병상 사용률 75%</p>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">금일 입원</span>
                  <UserPlus className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-gray-900">3명</div>
                <p className="text-xs text-gray-500 mt-1">전일 대비 +1명</p>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">금일 퇴원 예정</span>
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-gray-900">2명</div>
                <p className="text-xs text-gray-500 mt-1">퇴원 준비 중</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">입원 환자 목록</h3>
              <div className="space-y-3">
                {patients.filter(p => p.status === '입원').map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-gray-900">{patient.name}</span>
                        <Badge variant="outline">{patient.patientNumber}</Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {patient.department} · 입원일: {patient.visitDate}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      퇴원 처리
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            <Card className="p-6">
              <div className="mb-4">
                <Label>환자 검색</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="환자명, 등록번호, 주민번호, 연락처"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    검색
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-gray-900">{patient.name}</span>
                          <Badge variant="outline">{patient.patientNumber}</Badge>
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 text-sm text-gray-600">
                          <div>생년월일: {patient.birthDate}</div>
                          <div>성별: {patient.gender}</div>
                          <div>연락처: {patient.phone}</div>
                          <div>진료과: {patient.department}</div>
                        </div>
                      </div>
                      <Button size="sm">
                        상세정보
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
