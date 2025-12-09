import React, { useState } from 'react';
import { mockMedications } from '../../data/mockData';
import { Medication } from '../../types';
import { Package, Plus, Edit, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';

export default function InventoryManagement() {
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    stock: 0,
    unit: '정',
    price: 0,
    lowStockThreshold: 100,
  });

  const lowStockItems = medications.filter(m => m.stock < m.lowStockThreshold);
  const totalValue = medications.reduce((sum, m) => sum + (m.stock * m.price), 0);

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || formData.stock <= 0) {
      alert('약품명과 재고를 입력해주세요.');
      return;
    }

    const newMedication: Medication = {
      id: `M${String(medications.length + 1).padStart(3, '0')}`,
      name: formData.name,
      stock: formData.stock,
      unit: formData.unit,
      price: formData.price,
      lowStockThreshold: formData.lowStockThreshold,
    };

    setMedications([...medications, newMedication]);
    setFormData({
      name: '',
      stock: 0,
      unit: '정',
      price: 0,
      lowStockThreshold: 100,
    });
    setShowAddForm(false);
    alert('약품이 등록되었습니다.');
  };

  const handleStockAdjustment = (medId: string, adjustment: number) => {
    setMedications(prev =>
      prev.map(m =>
        m.id === medId ? { ...m, stock: Math.max(0, m.stock + adjustment) } : m
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">총 약품 종류</p>
              <p className="text-gray-900 text-2xl mt-1">{medications.length}개</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">재고 부족</p>
              <p className="text-gray-900 text-2xl mt-1">{lowStockItems.length}개</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">이번 달 사용</p>
              <p className="text-gray-900 text-2xl mt-1">358건</p>
            </div>
            <TrendingDown className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-red-900 mb-2">재고 부족 알림</h3>
              <p className="text-red-700 text-sm mb-3">
                {lowStockItems.length}개 약품의 재고가 기준치 이하입니다. 빠른 발주가 필요합니다.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {lowStockItems.map(med => (
                  <div key={med.id} className="p-3 bg-white rounded border border-red-200">
                    <p className="text-gray-900">{med.name}</p>
                    <p className="text-red-600 text-sm">
                      현재: {med.stock}{med.unit} / 기준: {med.lowStockThreshold}{med.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory List */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" />
                <h2 className="text-gray-900">약품 재고 현황</h2>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                약품 등록
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">약품명</th>
                  <th className="px-6 py-3 text-center text-gray-700 text-sm">현재 재고</th>
                  <th className="px-6 py-3 text-center text-gray-700 text-sm">기준 재고</th>
                  <th className="px-6 py-3 text-right text-gray-700 text-sm">단가</th>
                  <th className="px-6 py-3 text-center text-gray-700 text-sm">상태</th>
                  <th className="px-6 py-3 text-center text-gray-700 text-sm">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {medications.map(med => {
                  const stockPercentage = (med.stock / med.lowStockThreshold) * 100;
                  const isLowStock = med.stock < med.lowStockThreshold;

                  return (
                    <tr key={med.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{med.name}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className={`${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                          {med.stock}{med.unit}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-gray-600">{med.lowStockThreshold}{med.unit}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-gray-900">{med.price.toLocaleString()}원</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          {isLowStock ? (
                            <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                              <AlertTriangle className="w-3 h-3" />
                              부족
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                              정상
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleStockAdjustment(med.id, -10)}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
                          >
                            -10
                          </button>
                          <button
                            className="p-1 text-gray-600 hover:text-purple-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Medication Form */}
        <div>
          {showAddForm ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-900 mb-6">약품 등록</h3>

              <form onSubmit={handleAddMedication} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">약품명 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="약품 이름"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">초기 재고 *</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.stock === 0 ? '' : formData.stock.toString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      const numValue = value === '' ? 0 : parseInt(value, 10);
                      setFormData({ ...formData, stock: numValue });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">단위</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  >
                    <option value="정">정</option>
                    <option value="앰플">앰플</option>
                    <option value="병">병</option>
                    <option value="개">개</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">단가</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.price === 0 ? '' : formData.price.toString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      const numValue = value === '' ? 0 : parseInt(value, 10);
                      setFormData({ ...formData, price: numValue });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">기준 재고</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.lowStockThreshold === 0 ? '' : formData.lowStockThreshold.toString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      const numValue = value === '' ? 0 : parseInt(value, 10);
                      setFormData({ ...formData, lowStockThreshold: numValue });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="100"
                  />
                  <p className="text-gray-500 text-xs mt-1">재고가 이 수량 이하로 내려가면 알림이 표시됩니다</p>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    등록
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 text-center">
              <Package className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">약품 재고 관리</h3>
              <p className="text-gray-600 text-sm mb-6">
                신규 약품을 등록하거나<br />재고 수량을 조정할 수 있습니다
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                약품 등록
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}