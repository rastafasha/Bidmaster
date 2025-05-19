import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-selector">
      <button
        onClick={() => changeLanguage('en')}
        className={`mr-2 px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className={`px-3 py-1 rounded ${i18n.language === 'es' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
      >
        Español
      </button>
    </div>
  );
};

export default LanguageSelector;
