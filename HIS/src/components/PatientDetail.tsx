import { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  FileText, 
  Calendar,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Heart,
  Pill
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockPatients, mockMedicalRecords, mockAppointments, mockAllergies } from '../data/mockData';

interface PatientDetailProps {
  patientId: string;
  onBack: () => void;
}

export function PatientDetail({ patientId, onBack }: PatientDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const patient = mockPatients.find((p) => p.id === patientId);
  const medicalRecords = mockMedicalRecords.filter((r) => r.patientId === patientId);
  const appointments = mockAppointments.filter((a) => a.patientId === patientId);
  const allergies = mockAllergies[patientId] || [];

  if (!patient) {
    return <div className="p-8">Patient not found</div>;
  }

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
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Patients
        </Button>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-gray-900 mb-1">
                {patient.firstName} {patient.lastName}
              </h1>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{calculateAge(patient.dateOfBirth)} years</Badge>
                <Badge variant="outline">{patient.gender}</Badge>
                <Badge variant="outline">{patient.bloodType}</Badge>
              </div>
            </div>
          </div>
          <Button>Edit Patient</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900">{patient.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900">{patient.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="text-gray-900">{patient.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-gray-900">{patient.emergencyContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Relationship</p>
                  <p className="text-gray-900">{patient.emergencyContact.relationship}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-gray-900">{patient.emergencyContact.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Insurance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Insurance Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Provider</p>
                  <p className="text-gray-900">{patient.insurance.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Policy Number</p>
                  <p className="text-gray-900">{patient.insurance.policyNumber}</p>
                </div>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Allergies
                </CardTitle>
              </CardHeader>
              <CardContent>
                {allergies.length > 0 ? (
                  <div className="space-y-3">
                    {allergies.map((allergy) => (
                      <div key={allergy.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-gray-900">{allergy.allergen}</p>
                          <Badge 
                            variant={
                              allergy.severity === 'Severe' ? 'destructive' :
                              allergy.severity === 'Moderate' ? 'default' : 
                              'outline'
                            }
                          >
                            {allergy.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{allergy.reaction}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No known allergies</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Medical Records Tab */}
        <TabsContent value="records" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Medical History</h2>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              New Record
            </Button>
          </div>

          {medicalRecords.length > 0 ? (
            <div className="space-y-4">
              {medicalRecords.map((record) => (
                <Card key={record.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-1">{record.chiefComplaint}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {record.date} • {record.physician}
                        </p>
                      </div>
                      <Badge>{record.diagnosis}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Vitals */}
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Vitals</p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600">BP</p>
                          <p className="text-sm text-gray-900">{record.vitals.bloodPressure}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600">Heart Rate</p>
                          <p className="text-sm text-gray-900">{record.vitals.heartRate} bpm</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600">Temperature</p>
                          <p className="text-sm text-gray-900">{record.vitals.temperature}°C</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600">Weight</p>
                          <p className="text-sm text-gray-900">{record.vitals.weight} kg</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600">Height</p>
                          <p className="text-sm text-gray-900">{record.vitals.height} cm</p>
                        </div>
                      </div>
                    </div>

                    {/* Treatment */}
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Treatment</p>
                      <p className="text-gray-900">{record.treatment}</p>
                    </div>

                    {/* Prescriptions */}
                    {record.prescriptions.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                          <Pill className="w-4 h-4" />
                          Prescriptions
                        </p>
                        <div className="space-y-2">
                          {record.prescriptions.map((prescription) => (
                            <div key={prescription.id} className="p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="text-gray-900">{prescription.medication}</p>
                                  <p className="text-sm text-gray-600">
                                    {prescription.dosage} - {prescription.frequency} for {prescription.duration}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">{prescription.instructions}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Notes</p>
                      <p className="text-gray-900">{record.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No medical records found for this patient.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Appointments</h2>
            <Button>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </div>

          {appointments.length > 0 ? (
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-900">{appointment.type}</p>
                          <p className="text-sm text-gray-600">
                            {appointment.date} at {appointment.time} • {appointment.physician}
                          </p>
                          {appointment.notes && (
                            <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant={
                          appointment.status === 'Scheduled' ? 'default' :
                          appointment.status === 'Completed' ? 'outline' :
                          'destructive'
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No appointments scheduled for this patient.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
