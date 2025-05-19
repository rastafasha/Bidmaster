import React, { useEffect, useState } from "react";
import navigationPartner from './NavigationDataPartner';
import { useTranslation } from 'react-i18next';
const SidebarPartner = ({ currentNav, setCurrentNav, onShowUserList, onLogout }) => {

  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      window.deferredPrompt = event;
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    promptEvent.prompt();
    await promptEvent.userChoice;
    window.deferredPrompt = null;
    setIsReadyForInstall(false);
  }

  return (
    <div className={`flex flex-col bg-indigo-700 text-indigo-100 transition-width duration-300 ease-in-out
      ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center h-16 px-2 font-bold text-xl border-b border-indigo-600">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Toggle sidebar"
        >
          <svg
            className="h-6 w-6 text-indigo-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        {isOpen && <span className="ml-4">{t('BidMaster')}</span>}
      </div>
      <nav className="flex-1 px-1 py-6 space-y-1 overflow-y-auto">
        {navigationPartner.map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentNav(item.name)}
            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left
              ${item.name === currentNav
                ? 'bg-indigo-800 text-white'
                : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'}
              relative`}
          >
            <span className="mr-3 flex-shrink-0">{item.icon}</span>
            {isOpen ? (
              t(item.name)
            ) : (
              <span className="absolute left-full ml-2 w-max max-w-xs rounded-md bg-indigo-900 px-2 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {t(item.name)}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="flex-shrink-0 p-4 border-t border-indigo-600 space-y-2">
        <button className="group flex items-center text-sm font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600 w-full px-3 py-2 relative">
          <svg className="mr-3 h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {isOpen ? (
             t('Settings')
          ) : (
            <span className="absolute left-full ml-2 w-max max-w-xs rounded-md bg-indigo-900 px-2 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {t('Settings')}
            </span>
          )}
        </button>
        {isReadyForInstall && (
          <button onClick={downloadApp} className="group flex items-center text-sm font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600 w-full px-3 py-2 relative">
            <svg className="mr-3 h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {isOpen ? (
              t('Istall App')
            ) : (
              <span className="absolute left-full ml-2 w-max max-w-xs rounded-md bg-indigo-900 px-2 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {t('Istall App')}
              </span>
            )}
          </button>
        )}
        <button onClick={onLogout} className="group flex items-center text-sm font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600 w-full px-3 py-2 relative">
          <svg className="mr-3 h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {isOpen ? (
            t('Logout')
          ) : (
            <span className="absolute left-full ml-2 w-max max-w-xs rounded-md bg-indigo-900 px-2 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {t('Logout')}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SidebarPartner;
