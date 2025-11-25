import { useState } from 'react';
import { Search, Plus, UserPlus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockPatients } from '../data/mockData';
import { Patient } from '../types';

interface PatientListProps {
  onPatientSelect: (patientId: string) => void;
}

export function PatientList({ onPatientSelect }: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = mockPatients.filter((patient) => {
    const query = searchQuery.toLowerCase();
    return (
      patient.firstName.toLowerCase().includes(query) ||
      patient.lastName.toLowerCase().includes(query) ||
      patient.email.toLowerCase().includes(query) ||
      patient.phoneNumber.includes(query)
    );
  });

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Patients</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          New Patient
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search patients by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Age / Gender
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Blood Type
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Insurance
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr
                key={patient.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onPatientSelect(patient.id)}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{patient.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-900">{calculateAge(patient.dateOfBirth)} years</p>
                  <p className="text-sm text-gray-500">{patient.gender}</p>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline">{patient.bloodType}</Badge>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900">{patient.phoneNumber}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900">{patient.insurance.provider}</p>
                  <p className="text-xs text-gray-500">{patient.insurance.policyNumber}</p>
                </td>
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPatientSelect(patient.id);
                    }}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No patients found matching your search.</p>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredPatients.length} of {mockPatients.length} patients
      </div>
    </div>
  );
}
