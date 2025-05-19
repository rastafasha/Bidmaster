import React, { useState, useEffect } from 'react';
import SocialLogin from './SocialLogin';
import PhoneVerification from './PhoneVerification';
import users from '../../mock/users';
import { useNavigate } from "react-router-dom";
import EmailLogin from './EmailLogin';


import EmailRegister from './EmailRegister';

const AuthWrapper = ({ onLoginSuccess }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authStep, setAuthStep] = useState('social'); // 'social', 'phone', 'login', 'register'
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

  if (authStep === 'register') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
          <EmailRegister />
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
            onClick={() => setAuthStep('social')}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (authStep === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
          <EmailLogin 
            email={tempUser?.phone} 
            password={tempUser?.password} 
            onVerify={handlePhoneVerify} 
          />
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
            onClick={() => setAuthStep('social')}
          >
            Back 
          </button>
        </div>
      </div>
    );
  }

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
          >
            
            </PhoneVerification>
          
        )}
        <p className='text-center'>-or-</p>
        
        {/* {authStep === 'login' ? (
          <EmailLogin onLogin={handleEmailLogin} />
        ) : (
          <EmailLogin 
            email={tempUser?.phone} 
            password={tempUser?.password} 
            onVerify={handlePhoneVerify} 
          />
        )} */}

         <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
          onClick={() => setAuthStep('login')}
        >Login Email</button>
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
          onClick={() => setAuthStep('register')}
        >Register Email</button>
      </div>
    </div>
  );
};

export default AuthWrapper;
