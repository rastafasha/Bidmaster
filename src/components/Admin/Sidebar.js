import React from 'react';
import navigation from './navigationData';

const teams = [
  { id: 1, name: 'Heroicons', initials: 'H' },
  { id: 2, name: 'Tailwind Labs', initials: 'T' },
  { id: 3, name: 'Workcation', initials: 'W' }
];

const Sidebar = ({ currentNav, setCurrentNav, onShowUserList }) => {
  return (
    <div className="flex flex-col w-64 bg-indigo-700 text-indigo-100">
      <div className="flex items-center h-16 px-6 font-bold text-xl border-b border-indigo-600">
        Logo
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentNav(item.name)}
            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left ${
              item.name === currentNav
                ? 'bg-indigo-800 text-white'
                : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </button>
        ))}

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold tracking-wider text-indigo-300 uppercase">
            Your teams
          </h3>
          <div className="mt-1 space-y-1">
            {teams.map((team) => (
              <button
                key={team.id}
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left text-indigo-100 hover:bg-indigo-600 hover:text-white"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold uppercase tracking-wider text-white mr-3">
                  {team.initials}
                </span>
                {team.name}
              </button>
            ))}
            <button
              onClick={onShowUserList}
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left text-indigo-100 hover:bg-indigo-600 hover:text-white mt-4"
            >
              Lista de Usuarios
            </button>
          </div>
        </div>
      </nav>
      <div className="flex-shrink-0 p-4 border-t border-indigo-600">
        <button className="group flex items-center text-sm font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600 w-full px-3 py-2">
          <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Settings
        </button>
        <button className="group flex items-center text-sm font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600 w-full px-3 py-2">
          <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
