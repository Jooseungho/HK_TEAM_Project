import { useState } from 'react';
import { Search, UserPlus, Mail, Phone } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { mockStaff } from '../data/mockData';

export function StaffDirectory() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStaff = mockStaff.filter((staff) => {
    const query = searchQuery.toLowerCase();
    return (
      staff.firstName.toLowerCase().includes(query) ||
      staff.lastName.toLowerCase().includes(query) ||
      staff.role.toLowerCase().includes(query) ||
      staff.department.toLowerCase().includes(query) ||
      (staff.specialization && staff.specialization.toLowerCase().includes(query))
    );
  });

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Staff Directory</h1>
          <p className="text-gray-600">Hospital staff and personnel management</p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search staff by name, role, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <Card key={staff.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600">
                      {staff.firstName[0]}{staff.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-gray-900">
                      {staff.firstName} {staff.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{staff.role}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    staff.status === 'Active' ? 'default' :
                    staff.status === 'On Leave' ? 'secondary' :
                    'outline'
                  }
                >
                  {staff.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Department</p>
                  <p className="text-sm text-gray-900">{staff.department}</p>
                </div>

                {staff.specialization && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Specialization</p>
                    <p className="text-sm text-gray-900">{staff.specialization}</p>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{staff.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{staff.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredStaff.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No staff members found matching your search.</p>
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-600">
        Showing {filteredStaff.length} of {mockStaff.length} staff members
      </div>
    </div>
  );
}
