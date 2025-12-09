import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import DoctorDashboard from './components/DoctorDashboard';
import NurseDashboard from './components/NurseDashboard';
import AdminDashboard from './components/AdminDashboard';

export type UserRole = 'doctor' | 'nurse' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  role: UserRole;
  employeeId: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser.role === 'doctor' && (
        <DoctorDashboard user={currentUser} onLogout={handleLogout} />
      )}
      {currentUser.role === 'nurse' && (
        <NurseDashboard user={currentUser} onLogout={handleLogout} />
      )}
      {currentUser.role === 'admin' && (
        <AdminDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}
