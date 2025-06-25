import React, { useState } from 'react';
import AuthWrapper from './components/Auth/AuthWrapper';
import AdminDashboard from './components/Admin/AdminDashboard';
import PartnerDashboard from './components/Partner/PartnerDashboard';
import { UserProvider } from './context/UserContext';
import { ProjectProvider } from './context/ProjectContext';
import { AuthProvider } from './context/AuthContext';
import { ProjectTypeProvider } from './context/ProjectTypeContext';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('auth'); // 'auth', 'admin', 'partner', 'login-email'

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setView(user.role === 'admin' ? 'admin' : 'partner');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('auth');
  };

const renderView = () => {
    if (!currentUser) {
      return <AuthWrapper onLoginSuccess={handleLoginSuccess} onChangeView={setView} />;
    }
    if (currentUser.role === 'admin') {
      return <AdminDashboard onLogout={handleLogout} />;
    }
    if (currentUser.role === 'partner') {
      return <PartnerDashboard partnerId={currentUser.id} onLogout={handleLogout} />;
    }
    // Fallback for unexpected roles
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Rol de usuario no reconocido: {currentUser.role}</p>
      </div>
    );
  };

  return (
    <AuthProvider>
      <UserProvider>
      <ProjectProvider>
      <ProjectTypeProvider>
        <div className="min-h-screen bg-gray-50">
          {renderView()}
        </div>
      </ProjectTypeProvider>
      </ProjectProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
