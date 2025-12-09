import React, { useState } from 'react';
import { mockDocuments } from '../../data/mockData';
import { Patient } from '../../types';
import { FileText, Printer, Download, CheckCircle, Send, X, Clock, Plus } from 'lucide-react';

interface DocumentRequest {
  id: string;
  patientId: string;
  patientName: string;
  chartNumber: string;
  documentType: 'prescription' | 'medical-certificate' | 'referral';
  status: 'requested' | 'issued';
  requestedAt: string;
  issuedAt?: string;
}

interface DocumentViewerProps {
  onMarkAsRead: () => void;
  patients: Patient[];
}

export default function DocumentViewer({ onMarkAsRead, patients }: DocumentViewerProps) {
  const [documents, setDocuments] = useState(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState(documents[0] || null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedDocType, setSelectedDocType] = useState<'prescription' | 'medical-certificate' | 'referral'>('prescription');
  const [requests, setRequests] = useState<DocumentRequest[]>([
    {
      id: 'REQ001',
      patientId: 'P001',
      patientName: '홍길동',
      chartNumber: 'C2024001',
      documentType: 'prescription',
      status: 'issued',
      requestedAt: '2025-11-28T10:00:00',
      issuedAt: '2025-11-28T10:30:00',
    },
  ]);

  const documentTypes = [
    { value: 'prescription', label: '처방전 재발행', color: 'blue' },
    { value: 'medical-certificate', label: '진료확인서 재발행', color: 'green' },
    { value: 'referral', label: '소견서 발행', color: 'purple' },
  ];

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'prescription':
        return '처방전';
      case 'medical-certificate':
        return '진료확인서';
      case 'referral':
        return '소견서';
      default:
        return type;
    }
  };

  const getDocumentTypeBadge = (type: string) => {
    switch (type) {
      case 'prescription':
        return 'bg-blue-100 text-blue-700';
      case 'medical-certificate':
        return 'bg-green-100 text-green-700';
      case 'referral':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handlePrint = (docId: string) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId ? { ...doc, printed: true } : doc
      )
    );
    alert('문서가 출력됩니다.');
    onMarkAsRead();
  };

  const handleSubmitRequest = () => {
    if (!selectedPatient) {
      alert('환자를 선택해주세요.');
      return;
    }

    const newRequest: DocumentRequest = {
      id: `REQ${Date.now()}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      chartNumber: selectedPatient.chartNumber,
      documentType: selectedDocType,
      status: 'requested',
      requestedAt: new Date().toISOString(),
    };

    setRequests([...requests, newRequest]);
    setShowRequestModal(false);
    setSelectedPatient(null);
    alert('의사에게 문서 요청이 전송되었습니다.');
  };

  const requestedRequests = requests.filter(r => r.status === 'requested');
  const issuedRequests = requests.filter(r => r.status === 'issued');

  return (
    <div className="space-y-6">
      {/* Request Button */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-900">문서 관리</h2>
            <p className="text-gray-500 text-sm mt-1">의사가 발행한 문서 조회 및 출력, 문서 재발행 요청</p>
          </div>
          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            의사에게 문서 요청하기
          </button>
        </div>
      </div>

      {/* Document Requests Status */}
      {(requestedRequests.length > 0 || issuedRequests.length > 0) && (
        <div className="grid grid-cols-2 gap-6">
          {/* Requested Documents */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <h3 className="text-gray-900">요청 대기 중</h3>
                <span className="ml-auto px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  {requestedRequests.length}건
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
              {requestedRequests.length === 0 ? (
                <div className="p-8 text-center">
                  <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">요청 대기 중인 문서가 없습니다</p>
                </div>
              ) : (
                requestedRequests.map(request => (
                  <div key={request.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-gray-900">{request.patientName}</h4>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {request.chartNumber}
                          </span>
                        </div>
                        <span className={`inline-block px-2 py-1 rounded text-xs ${getDocumentTypeBadge(request.documentType)}`}>
                          {getDocumentTypeLabel(request.documentType)}
                        </span>
                        <p className="text-gray-500 text-sm mt-2">
                          요청: {new Date(request.requestedAt).toLocaleString('ko-KR', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
                        대기 중
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recently Issued */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="text-gray-900">최근 발행 완료</h3>
                <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {issuedRequests.length}건
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
              {issuedRequests.length === 0 ? (
                <div className="p-8 text-center">
                  <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">발행된 문서가 없습니다</p>
                </div>
              ) : (
                issuedRequests.map(request => (
                  <div key={request.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-gray-900">{request.patientName}</h4>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {request.chartNumber}
                          </span>
                        </div>
                        <span className={`inline-block px-2 py-1 rounded text-xs ${getDocumentTypeBadge(request.documentType)}`}>
                          {getDocumentTypeLabel(request.documentType)}
                        </span>
                        <p className="text-gray-500 text-sm mt-2">
                          발행: {request.issuedAt && new Date(request.issuedAt).toLocaleString('ko-KR', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => alert('문서를 출력합니다.')}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        출력
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Document List & Preview */}
      <div className="grid grid-cols-3 gap-6">
        {/* Document List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900">발행된 문서 목록</h3>
            <p className="text-gray-500 text-sm mt-1">의사가 발행한 모든 문서</p>
          </div>

          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {documents.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">문서가 없습니다</p>
              </div>
            ) : (
              documents.map(document => (
                <button
                  key={document.id}
                  onClick={() => setSelectedDocument(document)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedDocument?.id === document.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs ${getDocumentTypeBadge(document.type)}`}>
                      {getDocumentTypeLabel(document.type)}
                    </span>
                    {!document.printed && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                        미출력
                      </span>
                    )}
                  </div>

                  <p className="text-gray-900 mb-1">환자 ID: {document.patientId}</p>
                  <p className="text-gray-600 text-sm">발행: {document.issuedBy}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(document.issuedAt).toLocaleString('ko-KR', {
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Document Preview */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-gray-900">문서 미리보기</h3>
              </div>
              {selectedDocument && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePrint(selectedDocument.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    출력
                  </button>
                  <button
                    onClick={() => alert('문서를 다운로드합니다.')}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    다운로드
                  </button>
                </div>
              )}
            </div>
          </div>

          {selectedDocument ? (
            <div className="p-6">
              {/* Document Header */}
              <div className="text-center mb-8">
                <h1 className="text-gray-900 text-3xl mb-4">
                  {getDocumentTypeLabel(selectedDocument.type)}
                </h1>
                <div className="w-16 h-1 bg-blue-600 mx-auto" />
              </div>

              {/* Document Info */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">환자 ID</p>
                    <p className="text-gray-900">{selectedDocument.patientId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">진료 기록 ID</p>
                    <p className="text-gray-900">{selectedDocument.recordId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">발행자</p>
                    <p className="text-gray-900">{selectedDocument.issuedBy}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">발행일시</p>
                    <p className="text-gray-900">
                      {new Date(selectedDocument.issuedAt).toLocaleString('ko-KR')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Content */}
              <div className="mb-8 p-8 border-2 border-gray-300 rounded-lg bg-white min-h-[400px]">
                <h3 className="text-gray-900 mb-4">문서 내용</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedDocument.content}
                  </p>
                </div>

                {selectedDocument.type === 'prescription' && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-gray-600 text-sm">
                      상기 환자에게 위와 같이 처방합니다.
                    </p>
                    <div className="mt-6 text-right">
                      <p className="text-gray-900">발행: {selectedDocument.issuedBy}</p>
                      <p className="text-gray-600 text-sm">
                        {new Date(selectedDocument.issuedAt).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {selectedDocument.printed ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-700">출력 완료</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5 text-yellow-600" />
                      <span className="text-yellow-700">출력 대기</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">문서를 선택하여 미리보기</p>
            </div>
          )}
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">문서 요청</h3>
                <button
                  onClick={() => {
                    setShowRequestModal(false);
                    setSelectedPatient(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">환자 선택 *</label>
                <select
                  value={selectedPatient?.id || ''}
                  onChange={(e) => {
                    const patient = patients.find(p => p.id === e.target.value);
                    setSelectedPatient(patient || null);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">환자를 선택하세요</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} ({patient.chartNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">문서 종류 *</label>
                <div className="space-y-2">
                  {documentTypes.map(docType => (
                    <button
                      key={docType.value}
                      onClick={() => setSelectedDocType(docType.value as any)}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        selectedDocType === docType.value
                          ? `border-${docType.color}-500 bg-${docType.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className={`w-4 h-4 ${
                          selectedDocType === docType.value ? `text-${docType.color}-600` : 'text-gray-400'
                        }`} />
                        <span className="text-gray-900">{docType.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRequestModal(false);
                    setSelectedPatient(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSubmitRequest}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  요청 전송
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
