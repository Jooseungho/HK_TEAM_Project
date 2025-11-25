import { 
  Users, 
  Calendar, 
  ClipboardList, 
  Activity,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { mockPatients, mockAppointments, mockMedicalRecords } from '../data/mockData';

export function Dashboard() {
  const todayAppointments = mockAppointments.filter(
    (apt) => apt.date === '2024-11-22' && apt.status === 'Scheduled'
  ).length;

  const recentRecords = mockMedicalRecords
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const upcomingAppointments = mockAppointments
    .filter((apt) => apt.status === 'Scheduled')
    .sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Dr. Wilson</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Patients</CardTitle>
            <Users className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">{mockPatients.length}</div>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              12% increase this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Today's Appointments</CardTitle>
            <Calendar className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">{todayAppointments}</div>
            <p className="text-xs text-gray-500 mt-1">4 completed, {todayAppointments} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Medical Records</CardTitle>
            <ClipboardList className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">{mockMedicalRecords.length}</div>
            <p className="text-xs text-gray-500 mt-1">Last updated today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Active Staff</CardTitle>
            <Activity className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">24</div>
            <p className="text-xs text-gray-500 mt-1">3 physicians on duty</p>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-gray-900">{appointment.patientName}</p>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{appointment.time}</p>
                    <p className="text-xs text-gray-500">{appointment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Medical Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              Recent Medical Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRecords.map((record) => {
                const patient = mockPatients.find((p) => p.id === record.patientId);
                return (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="text-gray-900">
                        {patient?.firstName} {patient?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{record.diagnosis}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{record.physician}</p>
                      <p className="text-xs text-gray-500">{record.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
