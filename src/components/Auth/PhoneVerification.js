import React, { useState } from 'react';

const PhoneVerification = ({ phone, onVerify }) => {
  const [code, setCode] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSendCode = () => {
    // Simular envío de código
    setIsSent(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="text-gray-700">{phone}</span>
      </div>

      {!isSent ? (
        <button
          onClick={handleSendCode}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Enviar código de verificación
        </button>
      ) : (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Código de verificación</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ingresa el código de 6 dígitos"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <button
            onClick={() => onVerify(code)}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Verificar teléfono
          </button>
        </>
      )}
    </div>
  );
};

export default PhoneVerification;