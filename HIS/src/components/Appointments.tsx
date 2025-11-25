import { useState } from 'react';
import { Calendar, Clock, Plus, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockAppointments } from '../data/mockData';

export function Appointments() {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAppointments = mockAppointments.filter((apt) => {
    if (filterStatus === 'all') return true;
    return apt.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.time);
    const dateB = new Date(b.date + ' ' + b.time);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Appointments</h1>
          <p className="text-gray-600">Manage patient appointments and scheduling</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Appointment
        </Button>
      </div>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">Filter by status:</span>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Appointments</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="no-show">No-Show</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Appointments Grid */}
      <div className="space-y-4">
        {sortedAppointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 mb-1">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                      </div>
                      <Badge
                        variant={
                          appointment.status === 'Scheduled' ? 'default' :
                          appointment.status === 'Completed' ? 'outline' :
                          appointment.status === 'Cancelled' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-6 mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span>Physician: {appointment.physician}</span>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  {appointment.status === 'Scheduled' && (
                    <Button size="sm">
                      Check In
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {sortedAppointments.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No appointments found with the selected filter.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {sortedAppointments.length} of {mockAppointments.length} appointments
      </div>
    </div>
  );
}
