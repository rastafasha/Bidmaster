import React from 'react';

const Topbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Todos los tipos</option>
                    <option value="Construcción">Construcción</option>
                    <option value="Diseño Urbano">Diseño Urbano</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Infraestructura">Infraestructura</option>
                  </select>
                </div>
              </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Notifications">
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="flex items-center space-x-3">
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
            alt="User avatar"
          />
          <span className="text-gray-700 font-medium">Tom Cook</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
