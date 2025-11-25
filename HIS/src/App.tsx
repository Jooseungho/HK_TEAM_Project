import { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { ADTModule } from './components/ADTModule';
import { OCSModule } from './components/OCSModule';
import { EMRModule } from './components/EMRModule';
import { BillingModule } from './components/BillingModule';
import { LISModule } from './components/LISModule';
import { QueueModule } from './components/QueueModule';
import { AuditTrailModule } from './components/AuditTrailModule';
import { AuthProvider } from './contexts/AuthContext';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Header } from './components/Header';
import { useAuth } from './contexts/AuthContext';

type Module = 'menu' | 'adt' | 'ocs' | 'emr' | 'billing' | 'lis' | 'queue' | 'audit';

function AppContent() {
  const [currentModule, setCurrentModule] = useState<Module>('menu');
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleModuleSelect = (module: string) => {
    setCurrentModule(module as Module);
  };

  const handleBackToMenu = () => {
    setCurrentModule('menu');
  };

  if (!isAuthenticated) {
    return showRegister ? (
      <RegisterForm onBackToLogin={() => setShowRegister(false)} />
    ) : (
      <LoginForm onRegisterClick={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header title="병원 정보 시스템" />
      <div className="flex-1 overflow-hidden">
        {currentModule === 'menu' && <MainMenu onModuleSelect={handleModuleSelect} />}
        {currentModule === 'adt' && <ADTModule onBack={handleBackToMenu} />}
        {currentModule === 'ocs' && <OCSModule onBack={handleBackToMenu} />}
        {currentModule === 'emr' && <EMRModule onBack={handleBackToMenu} />}
        {currentModule === 'billing' && <BillingModule onBack={handleBackToMenu} />}
        {currentModule === 'lis' && <LISModule onBack={handleBackToMenu} />}
        {currentModule === 'queue' && <QueueModule onBack={handleBackToMenu} />}
        {currentModule === 'audit' && <AuditTrailModule onBack={handleBackToMenu} />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}