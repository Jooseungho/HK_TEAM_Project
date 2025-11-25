import { useState } from 'react';
import { ArrowLeft, Stethoscope, Activity, FileText, Pill } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface EMRModuleProps {
  onBack: () => void;
}

interface VitalSigns {
  bloodPressure: string;
  pulse: string;
  temperature: string;
  respiratoryRate: string;
  weight: string;
  height: string;
}

export function EMRModule({ onBack }: EMRModuleProps) {
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    bloodPressure: '',
    pulse: '',
    temperature: '',
    respiratoryRate: '',
    weight: '',
    height: ''
  });

  const [soapNote, setSoapNote] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });

  const mockPatients = [
    { id: 'P2024001', name: '김철수', age: 39, gender: '남' },
    { id: 'P2024002', name: '이영희', age: 34, gender: '여' },
    { id: 'P2024003', name: '박민수', age: 46, gender: '남' }
  ];

  const recentRecords = [
    {
      date: '2024-11-20',
      chiefComplaint: '두통',
      diagnosis: 'R51 (두통)',
      doctor: '김의사'
    },
    {
      date: '2024-11-15',
      chiefComplaint: '감기 증상',
      diagnosis: 'J00 (급성 비인두염)',
      doctor: '박의사'
    }
  ];

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
              <h2 className="text-gray-900">EMR (진료기록)</h2>
              <p className="text-sm text-gray-500">Electronic Medical Record</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="환자 선택" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} ({patient.id}) - {patient.age}세/{patient.gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedPatient && (
              <Button>
                진료기록 저장
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {!selectedPatient ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Stethoscope className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-gray-900 mb-2">환자를 선택하세요</h3>
            <p className="text-gray-500">진료를 시작하려면 상단에서 환자를 선택해주세요</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Patient Info & History */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">환자 정보</h3>
                <div className="space-y-3">
                  {mockPatients.find(p => p.id === selectedPatient) && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">이름</p>
                        <p className="text-gray-900">
                          {mockPatients.find(p => p.id === selectedPatient)?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">등록번호</p>
                        <p className="text-gray-900">{selectedPatient}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">나이</p>
                          <p className="text-gray-900">
                            {mockPatients.find(p => p.id === selectedPatient)?.age}세
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">성별</p>
                          <p className="text-gray-900">
                            {mockPatients.find(p => p.id === selectedPatient)?.gender}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">최근 진료 이력</h3>
                  <Button size="sm" variant="outline">
                    전체보기
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentRecords.map((record, index) => (
                    <div key={index} className="border-l-2 border-blue-500 pl-3 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{record.date}</Badge>
                      </div>
                      <p className="text-sm text-gray-900 mb-1">{record.chiefComplaint}</p>
                      <p className="text-xs text-gray-500">{record.diagnosis}</p>
                      <p className="text-xs text-gray-500 mt-1">담당의: {record.doctor}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">알레르기 정보</h3>
                <div className="space-y-2">
                  <Badge className="bg-red-100 text-red-800">페니실린</Badge>
                  <p className="text-xs text-gray-500">중증 알레르기 반응</p>
                </div>
              </Card>
            </div>

            {/* Middle Column - Medical Record */}
            <div className="col-span-2 space-y-6">
              <Tabs defaultValue="vitals" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
                  <TabsTrigger value="soap">SOAP</TabsTrigger>
                  <TabsTrigger value="diagnosis">진단</TabsTrigger>
                  <TabsTrigger value="orders">처치/처방</TabsTrigger>
                </TabsList>

                <TabsContent value="vitals" className="space-y-4">
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <h3 className="text-gray-900">활력징후 입력</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>혈압 (mmHg)</Label>
                        <Input
                          placeholder="120/80"
                          value={vitalSigns.bloodPressure}
                          onChange={(e) => setVitalSigns({...vitalSigns, bloodPressure: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>맥박 (회/분)</Label>
                        <Input
                          placeholder="72"
                          value={vitalSigns.pulse}
                          onChange={(e) => setVitalSigns({...vitalSigns, pulse: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>체온 (°C)</Label>
                        <Input
                          placeholder="36.5"
                          value={vitalSigns.temperature}
                          onChange={(e) => setVitalSigns({...vitalSigns, temperature: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>호흡수 (회/분)</Label>
                        <Input
                          placeholder="16"
                          value={vitalSigns.respiratoryRate}
                          onChange={(e) => setVitalSigns({...vitalSigns, respiratoryRate: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>체중 (kg)</Label>
                        <Input
                          placeholder="70"
                          value={vitalSigns.weight}
                          onChange={(e) => setVitalSigns({...vitalSigns, weight: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>신장 (cm)</Label>
                        <Input
                          placeholder="175"
                          value={vitalSigns.height}
                          onChange={(e) => setVitalSigns({...vitalSigns, height: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-gray-900 mb-3">이전 측정 기록</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span>2024-11-20</span>
                          <span>120/80 mmHg · 72 bpm · 36.5°C</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>2024-11-15</span>
                          <span>118/78 mmHg · 70 bpm · 36.8°C</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="soap" className="space-y-4">
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <h3 className="text-gray-900">SOAP 기록</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>S (Subjective) - 주관적 소견</Label>
                        <Textarea
                          placeholder="환자가 호소하는 증상을 기록합니다"
                          rows={3}
                          value={soapNote.subjective}
                          onChange={(e) => setSoapNote({...soapNote, subjective: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>O (Objective) - 객관적 소견</Label>
                        <Textarea
                          placeholder="검진 결과, 검사 수치 등을 기록합니다"
                          rows={3}
                          value={soapNote.objective}
                          onChange={(e) => setSoapNote({...soapNote, objective: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>A (Assessment) - 평가</Label>
                        <Textarea
                          placeholder="진단 및 평가 내용을 기록합니다"
                          rows={3}
                          value={soapNote.assessment}
                          onChange={(e) => setSoapNote({...soapNote, assessment: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>P (Plan) - 계획</Label>
                        <Textarea
                          placeholder="치료 계획을 기록합니다"
                          rows={3}
                          value={soapNote.plan}
                          onChange={(e) => setSoapNote({...soapNote, plan: e.target.value})}
                        />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="diagnosis" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-gray-900 mb-4">진단 코드 입력 (ICD-10)</h3>
                    
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input placeholder="진단코드 또는 질병명 검색 (예: J00, 감기)" className="flex-1" />
                        <Button>검색</Button>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-3">선택된 진단</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                              <span className="text-gray-900">J00 - 급성 비인두염 (감기)</span>
                              <Badge className="ml-2" variant="outline">주진단</Badge>
                            </div>
                            <Button size="sm" variant="ghost">삭제</Button>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-900 mb-2">자주 사용하는 진단</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                            J00 급성 비인두염
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                            K29 위염
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                            R51 두통
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                            M54 등통증
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Pill className="w-5 h-5 text-green-600" />
                      <h3 className="text-gray-900">처치 및 처방</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Select>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="처방 유형" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="medication">약물</SelectItem>
                            <SelectItem value="test">검사</SelectItem>
                            <SelectItem value="procedure">시술</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="약품명/검사명/시술명 검색" className="flex-1" />
                        <Button>추가</Button>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4 min-h-[200px]">
                        <p className="text-sm text-gray-500 mb-3">처방 목록</p>
                        <div className="space-y-2">
                          <div className="p-3 border border-gray-200 rounded">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-900">타이레놀 500mg</span>
                              <Button size="sm" variant="ghost">삭제</Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <Input placeholder="1일 3회" />
                              <Input placeholder="7일분" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">
                        OCS로 처방 전송
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
