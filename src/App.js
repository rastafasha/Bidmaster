import React, { useState } from 'react';
import AuthWrapper from './components/Auth/AuthWrapper';
import AdminDashboard from './components/Admin/AdminDashboard';
import PartnerDashboard from './components/Partner/PartnerDashboard';

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
    switch(view) {
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} />;
      case 'partner':
        return <PartnerDashboard partnerId={currentUser.id} onLogout={handleLogout} />;
     
      default:
        return <AuthWrapper onLoginSuccess={handleLoginSuccess} onChangeView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderView()}
    </div>
  );
};

export default App;
