import React, { useState } from 'react';
import projects from '../../mock/projects';
import users from '../../mock/users';
import ProjectCard from '../ProjectCard';
import UserProfileForm from '../UserProfileForm';
import SidebarPartner from './SidebarPartner';
import TopbarPartner from './TopbarPartner';
import Calendar from '../Project/Calendar';
import { useTranslation } from 'react-i18next';

const PartnerDashboard = ({ partnerId, onLogout }) => {
  const partner = users.find(u => u.id === partnerId && u.role === 'partner');
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [currentNav, setCurrentNav] = useState('Dashboard');
  const [showUserList, setShowUserList] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const { t } = useTranslation();
  

  // Placeholder for logged-in user profile data
  const loggedInUserProfile = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    skills: '',
    isAsociado: true,
    role: 'Asociado Senior',
    projects: [
      { name: 'Proyecto A', price: 10000, profitPercentage: 10 },
      { name: 'Proyecto B', price: 20000, profitPercentage: 15 }
    ]
  };

  if (!partner) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Asociado no encontrado</p>
      </div>
    );
  }

  const partnerProjects = projects.filter(project =>
    project.partners.includes(partner.partnerCompany)
  );

  const closeOnOverlayClick = (e, closeFunc) => {
    if (e.target === e.currentTarget) {
      closeFunc();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <SidebarPartner
            currentNav={currentNav} 
            setCurrentNav={(nav) => {
              setCurrentNav(nav);
              if (nav === 'Team') {
                setShowUserList(true);
              } else {
                setShowUserList(false);
              }
            }} 
            onShowUserList={() => {
              setShowUserList(true);
              setCurrentNav('Team');
            }}
            onLogout={onLogout}
          />
    {/* Main content */}
    <div className="flex flex-col flex-1">

      {/* Top bar */}
      <TopbarPartner/>
      
      {/* Content area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Proyectos de {partner.partnerCompany}</h1>
                <p className="text-gray-600">Bienvenido, {partner.name}</p>
              </div>
              <button
                onClick={() => setShowUserProfileModal(true)}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {t('Perfil de Usuario')}
              </button>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors ml-4"
              >
                {t('Calendar')}
              </button>
              {/* <button
                onClick={onLogout}
                className="text-gray-500 hover:text-gray-700"
              >
                Cerrar sesión
              </button> */}
            </div>

            {!showCalendar && (partnerProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partnerProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onTogglePresentation={() => {}}
                    showAdminControls={false}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No hay proyectos asignados</p>
              </div>
            ))}

            {showCalendar && (
              <Calendar currentUserId={partnerId} />
            )}

            {showUserProfileModal && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={(e) => closeOnOverlayClick(e, () => setShowUserProfileModal(false))}
              >
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
                  <button
                    onClick={() => setShowUserProfileModal(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    aria-label="Cerrar modal"
                  >
                    &#x2715;
                  </button>
                  <UserProfileForm
                    initialData={loggedInUserProfile}
                    onSave={(data) => {
                      console.log('User profile saved:', data);
                      setShowUserProfileModal(false);
                    }}
                    onCancel={() => setShowUserProfileModal(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </main>

    </div>
    </div>
  );
};

export default PartnerDashboard;
