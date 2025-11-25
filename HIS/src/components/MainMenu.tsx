import { 
  UserPlus, 
  Pill, 
  Stethoscope, 
  CreditCard, 
  FlaskConical, 
  Users, 
  FileText 
} from 'lucide-react';
import { Card } from './ui/card';

interface MainMenuProps {
  onModuleSelect: (module: string) => void;
}

const modules = [
  {
    id: 'adt',
    title: 'ADT',
    subtitle: '환자등록·접수·입퇴원',
    description: '환자 등록, 외래 접수, 입퇴원 처리 및 환자 상태 관리',
    icon: UserPlus,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  {
    id: 'ocs',
    title: 'OCS',
    subtitle: '처방 시스템',
    description: '약/검사/시술 처방 입력 및 처방 상태 관리',
    icon: Pill,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-600'
  },
  {
    id: 'emr',
    title: 'EMR',
    subtitle: '진료기록',
    description: 'SOAP 기록, Vital Signs, 진단코드(ICD-10) 입력',
    icon: Stethoscope,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
  {
    id: 'billing',
    title: '원무·수납',
    subtitle: 'Billing',
    description: '진료비 계산, 수납 처리 및 보험청구 데이터 생성',
    icon: CreditCard,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600'
  },
  {
    id: 'lis',
    title: 'LIS/RIS/PACS',
    subtitle: '검사 시스템 연동',
    description: '검사 처방, 대기 목록, 결과 입력 및 조회',
    icon: FlaskConical,
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50',
    textColor: 'text-cyan-600'
  },
  {
    id: 'queue',
    title: '대기·호출 시스템',
    subtitle: 'Queue Management',
    description: '환자 대기열 관리 및 진료실 호출 시스템',
    icon: Users,
    color: 'bg-pink-500',
    lightColor: 'bg-pink-50',
    textColor: 'text-pink-600'
  },
  {
    id: 'audit',
    title: 'Audit Trail',
    subtitle: '감사 로그',
    description: '사용자 접근 기록 및 데이터 변경 이력 추적',
    icon: FileText,
    color: 'bg-slate-500',
    lightColor: 'bg-slate-50',
    textColor: 'text-slate-600'
  }
];

export function MainMenu({ onModuleSelect }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-2">병원 정보 시스템</h1>
          <p className="text-gray-600">Hospital Information System & EMR</p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {modules.map((module) => (
            <Card
              key={module.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-gray-300"
              onClick={() => onModuleSelect(module.id)}
            >
              <div className="p-6">
                <div className={`w-16 h-16 ${module.lightColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <module.icon className={`w-8 h-8 ${module.textColor}`} />
                </div>
                
                <h3 className="text-gray-900 mb-1">{module.title}</h3>
                <p className={`text-sm ${module.textColor} mb-3`}>
                  {module.subtitle}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {module.description}
                </p>
              </div>
              
              <div className={`h-1 ${module.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600">시스템 정상 작동 중</span>
          </div>
        </div>
      </div>
    </div>
  );
}
