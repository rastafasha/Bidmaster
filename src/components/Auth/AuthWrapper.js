import React, { useState, useEffect } from 'react';
import SocialLogin from './SocialLogin';
import PhoneVerification from './PhoneVerification';
import users from '../../mock/users';

const AuthWrapper = ({ onLoginSuccess }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authStep, setAuthStep] = useState('social'); // 'social' or 'phone'
  const [tempUser, setTempUser] = useState(null);

  const handleSocialLogin = (provider) => {
    // Simular login con red social
    const user = users.find(u => u.socialLogin === provider);
    if (user) {
      setTempUser(user);
      if (user.verified) {
        setCurrentUser(user);
        onLoginSuccess(user);
      } else {
        setAuthStep('phone');
      }
    }
  };

  const handlePhoneVerify = (code) => {
    // Simular verificación de código
    if (code.length === 6) {
      const updatedUser = { ...tempUser, verified: true };
      setCurrentUser(updatedUser);
      onLoginSuccess(updatedUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          {authStep === 'social' ? 'Iniciar sesión' : 'Verificar teléfono'}
        </h2>
        
        {authStep === 'social' ? (
          <SocialLogin onLogin={handleSocialLogin} />
        ) : (
          <PhoneVerification 
            phone={tempUser?.phone} 
            onVerify={handlePhoneVerify} 
          />
        )}
      </div>
    </div>
  );
};

export default AuthWrapper;