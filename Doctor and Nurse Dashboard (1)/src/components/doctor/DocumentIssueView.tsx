import React, { useState } from 'react';
import { Appointment } from '../../types';
import { FileText, Printer, Send, Eye } from 'lucide-react';

interface DocumentIssueViewProps {
  appointment: Appointment;
  onIssueDocument: (documentType: string) => void;
}

type DocumentType = 'prescription' | 'medical-certificate' | 'referral';

export default function DocumentIssueView({ appointment, onIssueDocument }: DocumentIssueViewProps) {
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('prescription');
  const [showPreview, setShowPreview] = useState(false);

  const documentTypes = [
    { value: 'prescription', label: '처방전', color: 'blue' },
    { value: 'medical-certificate', label: '진료확인서', color: 'green' },
    { value: 'referral', label: '소견서', color: 'purple' },
  ];

  const getDocumentContent = () => {
    switch (selectedDocType) {
      case 'prescription':
        return `처방전

환자명: ${appointment.patientName}
차트번호: ${appointment.chartNumber}

【처방 내용】
1. 타이레놀 500mg - 1일 3회, 7일분 (식후 30분)
2. 해열제 650mg - 1일 3회, 5일분 (식후 복용)

상기 환자에게 위와 같이 처방합니다.

발행일: ${new Date().toLocaleDateString('ko-KR')}
발행의사: 김의사`;

      case 'medical-certificate':
        return `진료확인서

환자명: ${appointment.patientName}
생년월일: 1985-03-15
차트번호: ${appointment.chartNumber}

【진료 내용】
진료일: ${new Date().toLocaleDateString('ko-KR')}
진단명: 급성 상기도 감염
진료 소견: 상기 환자는 ${new Date().toLocaleDateString('ko-KR')} 본원에서 진료를 받았음을 확인합니다.

위와 같이 확인서를 발급합니다.

발행일: ${new Date().toLocaleDateString('ko-KR')}
발행의사: 김의사`;

      case 'referral':
        return `소견서

환자명: ${appointment.patientName}
차트번호: ${appointment.chartNumber}

【소견 내용】
주요 증상: 두통, 어지러움
진단명: 긴장성 두통
소견: 상기 환자는 긴장성 두통으로 진단되었으며, 
      약물치료 및 충분한 휴식이 필요한 상태입니다.
      1주일간 경과 관찰 후 재진이 필요합니다.

권고사항:
- 충분한 수면과 휴식
- 스트레스 관리
- 처방된 약물 복용

발행일: ${new Date().toLocaleDateString('ko-KR')}
발행의사: 김의사`;
    }
  };

  const handleIssue = () => {
    onIssueDocument(selectedDocType);
    alert(`${documentTypes.find(d => d.value === selectedDocType)?.label}이(가) 발행되어 간호사에게 전송되었습니다.`);
  };

  const handlePrint = () => {
    alert('문서를 출력합니다.');
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Document Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">문서 종류 선택</h2>
        
        <div className="space-y-3">
          {documentTypes.map((docType) => (
            <button
              key={docType.value}
              onClick={() => {
                setSelectedDocType(docType.value as DocumentType);
                setShowPreview(true);
              }}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                selectedDocType === docType.value
                  ? `border-${docType.color}-500 bg-${docType.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className={`w-5 h-5 ${
                  selectedDocType === docType.value ? `text-${docType.color}-600` : 'text-gray-400'
                }`} />
                <span className="text-gray-900">{docType.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-900 text-sm">문서 발행 안내</p>
          <ul className="text-blue-700 text-sm mt-2 space-y-1 list-disc list-inside">
            <li>문서는 발행 이력에 자동 저장</li>
            <li>간호사에게 실시간 전송</li>
            <li>환자 상태 자동 업데이트</li>
          </ul>
        </div>
      </div>

      {/* Document Preview */}
      <div className="col-span-2 bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <h2 className="text-gray-900">문서 미리보기</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Printer className="w-4 h-4" />
                출력
              </button>
              <button
                onClick={handleIssue}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
                간호사에게 전송
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {showPreview ? (
            <>
              {/* Document Header */}
              <div className="text-center mb-8">
                <h1 className="text-gray-900 text-3xl mb-4">
                  {documentTypes.find(d => d.value === selectedDocType)?.label}
                </h1>
                <div className="w-16 h-1 bg-blue-600 mx-auto" />
              </div>

              {/* Patient Info */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">환자명</p>
                    <p className="text-gray-900">{appointment.patientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">차트번호</p>
                    <p className="text-gray-900">{appointment.chartNumber}</p>
                  </div>
                </div>
              </div>

              {/* Document Content */}
              <div className="p-8 border-2 border-gray-300 rounded-lg bg-white min-h-[500px]">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                  {getDocumentContent()}
                </pre>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center text-gray-500 text-sm">
                이 문서는 전자적으로 발행되었습니다.
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">문서 종류를 선택하면 미리보기가 표시됩니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
