import { useState } from 'react';
import { ArrowLeft, CreditCard, DollarSign, FileText, Printer } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

interface BillingModuleProps {
  onBack: () => void;
}

interface BillingItem {
  id: string;
  patientName: string;
  patientNumber: string;
  visitDate: string;
  items: Array<{
    name: string;
    code: string;
    quantity: number;
    unitPrice: number;
  }>;
  totalAmount: number;
  insurance: number;
  copay: number;
  status: '미수납' | '수납완료' | '환불';
  paymentMethod?: string;
}

export function BillingModule({ onBack }: BillingModuleProps) {
  const [billings] = useState<BillingItem[]>([
    {
      id: 'B2024001',
      patientName: '김철수',
      patientNumber: 'P2024001',
      visitDate: '2024-11-25',
      items: [
        { name: '초진진찰료', code: 'A0101', quantity: 1, unitPrice: 15000 },
        { name: '타이레놀 500mg', code: 'M0001', quantity: 21, unitPrice: 500 },
        { name: '혈액검사', code: 'L0101', quantity: 1, unitPrice: 25000 }
      ],
      totalAmount: 50500,
      insurance: 35350,
      copay: 15150,
      status: '미수납'
    },
    {
      id: 'B2024002',
      patientName: '이영희',
      patientNumber: 'P2024002',
      visitDate: '2024-11-25',
      items: [
        { name: '재진진찰료', code: 'A0102', quantity: 1, unitPrice: 10000 },
        { name: 'X-Ray 흉부', code: 'R0101', quantity: 1, unitPrice: 35000 }
      ],
      totalAmount: 45000,
      insurance: 31500,
      copay: 13500,
      status: '수납완료',
      paymentMethod: '카드'
    }
  ]);

  const [selectedBilling, setSelectedBilling] = useState<BillingItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const getStatusColor = (status: string) => {
    const colors = {
      '미수납': 'bg-yellow-100 text-yellow-800',
      '수납완료': 'bg-green-100 text-green-800',
      '환불': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const todayStats = {
    totalRevenue: billings.reduce((sum, b) => sum + b.totalAmount, 0),
    collected: billings.filter(b => b.status === '수납완료').reduce((sum, b) => sum + b.copay, 0),
    pending: billings.filter(b => b.status === '미수납').reduce((sum, b) => sum + b.copay, 0),
    count: billings.length
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
            <h2 className="text-gray-900">원무·수납 (Billing)</h2>
            <p className="text-sm text-gray-500">진료비 계산 및 수납 관리</p>
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
                <span className="text-sm text-gray-600">금일 총 진료비</span>
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-gray-900">
                {todayStats.totalRevenue.toLocaleString()}원
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">수납 완료</span>
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-gray-900">
                {todayStats.collected.toLocaleString()}원
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">미수납</span>
                <FileText className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-gray-900">
                {todayStats.pending.toLocaleString()}원
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">진료 건수</span>
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-gray-900">{todayStats.count}건</div>
            </Card>
          </div>

          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pending">미수납 목록</TabsTrigger>
              <TabsTrigger value="completed">수납 완료</TabsTrigger>
              <TabsTrigger value="payment">수납 처리</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-3">
              {billings.filter(b => b.status === '미수납').map((billing) => (
                <Card key={billing.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gray-900">{billing.patientName}</span>
                        <Badge variant="outline">{billing.patientNumber}</Badge>
                        <Badge className={getStatusColor(billing.status)}>
                          {billing.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        진료일: {billing.visitDate} · 진료비번호: {billing.id}
                      </p>
                    </div>
                    <Button onClick={() => setSelectedBilling(billing)}>
                      수납하기
                    </Button>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="space-y-2">
                      {billing.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.name} ({item.code}) x {item.quantity}
                          </span>
                          <span className="text-gray-900">
                            {(item.unitPrice * item.quantity).toLocaleString()}원
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">총 진료비</span>
                        <span className="text-gray-900">
                          {billing.totalAmount.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">보험 부담금</span>
                        <span className="text-blue-600">
                          -{billing.insurance.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-900">환자 본인부담금</span>
                        <span className="text-gray-900">
                          {billing.copay.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3">
              {billings.filter(b => b.status === '수납완료').map((billing) => (
                <Card key={billing.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gray-900">{billing.patientName}</span>
                        <Badge variant="outline">{billing.patientNumber}</Badge>
                        <Badge className={getStatusColor(billing.status)}>
                          {billing.status}
                        </Badge>
                        {billing.paymentMethod && (
                          <Badge variant="outline">{billing.paymentMethod}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        진료일: {billing.visitDate} · 진료비번호: {billing.id}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Printer className="w-4 h-4 mr-2" />
                      영수증 출력
                    </Button>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">수납 금액</span>
                      <span className="text-green-600">
                        {billing.copay.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              {selectedBilling ? (
                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-gray-900 mb-4">진료비 상세</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">환자명</p>
                        <p className="text-gray-900">{selectedBilling.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">등록번호</p>
                        <p className="text-gray-900">{selectedBilling.patientNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">진료일</p>
                        <p className="text-gray-900">{selectedBilling.visitDate}</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2 mb-4">
                      {selectedBilling.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="text-gray-900">
                            {(item.unitPrice * item.quantity).toLocaleString()}원
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">총 진료비</span>
                        <span className="text-gray-900">
                          {selectedBilling.totalAmount.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">보험 부담금 (70%)</span>
                        <span className="text-blue-600">
                          -{selectedBilling.insurance.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-900">본인부담금</span>
                        <span className="text-gray-900">
                          {selectedBilling.copay.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-gray-900 mb-6">수납 처리</h3>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>수납 금액</Label>
                        <Input
                          value={selectedBilling.copay.toLocaleString()}
                          readOnly
                          className="text-right"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>결제 방법</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger>
                            <SelectValue placeholder="결제 방법 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">현금</SelectItem>
                            <SelectItem value="card">신용카드</SelectItem>
                            <SelectItem value="transfer">계좌이체</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="space-y-2">
                          <Label>카드번호</Label>
                          <Input placeholder="1234-5678-****-****" />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>비고</Label>
                        <Input placeholder="특이사항 입력 (선택)" />
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setSelectedBilling(null)}
                        >
                          취소
                        </Button>
                        <Button
                          className="flex-1"
                          disabled={!paymentMethod}
                        >
                          수납 완료
                        </Button>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Printer className="w-4 h-4 mr-2" />
                          영수증 미리보기
                        </Button>
                        <Button variant="outline" className="w-full">
                          <FileText className="w-4 h-4 mr-2" />
                          보험청구 데이터 생성
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">수납할 항목을 선택하세요</h3>
                  <p className="text-gray-500">
                    미수납 목록에서 수납할 항목을 선택해주세요
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
