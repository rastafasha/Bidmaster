import React, { useState, useEffect } from 'react';
import ProjectCard from '../ProjectCard';
import ProjectForm from '../Project/ProjectForm';
import projects from '../../mock/projects';
import ProjectTypeManager from './ProjectTypeManager';
import UserProfileForm from '../UserProfileForm';
import AdminUserList from './AdminUserList';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ApprovedProjectsChart from './ApprovedProjectsChart';
import EconomicMovementChart from './EconomicMovementChart';
import Projects from './Projects';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';

const AdminDashboard = () => {
  const [currentNav, setCurrentNav] = useState('Dashboard');
  const [showTypeManagerModal, setShowTypeManagerModal] = useState(false);
  const [showProjectFormModal, setShowProjectFormModal] = useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [projectData, setProjectData] = useState(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const { t } = useTranslation();

  const onLogout = () => {
    // Implement your logout logic here, e.g., clearing auth tokens, redirecting, etc.
    console.log('Logout clicked');
    // Example: redirect to login page
    window.location.href = '/login';
  };

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

  useEffect(() => {
    if (searchTerm || filterType) {
      const filtered = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType ? project.type === filterType : true;
        return matchesSearch && matchesType;
      });
      setProjectData(filtered);
    } else {
      setProjectData(projects);
    }
  }, [searchTerm, filterType]);

  const handleNewProject = () => {
    setCurrentProjectId(null);
    setShowProjectFormModal(true);
  };

  const handleEditProject = (id) => {
    setCurrentProjectId(id);
    setShowProjectFormModal(true);
  };

  const handleSaveProject = (project) => {
    if (currentProjectId) {
      setProjectData(prev => 
        prev.map(p => p.id === currentProjectId ? { ...project, id: currentProjectId } : p)
      );
    } else {
      const newId = Math.max(...projectData.map(p => p.id)) + 1;
      setProjectData(prev => [...prev, { ...project, id: newId }]);
    }
    setShowProjectFormModal(false);
  };

  const handleDeleteProject = (id) => {
    setProjectData(prev => prev.filter(p => p.id !== id));
  };

  const closeOnOverlayClick = (e, closeFunc) => {
    if (e.target === e.currentTarget) {
      closeFunc();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
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
        <LanguageSelector />
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



        {/* Content area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {showUserList ? (
            <AdminUserList />
          ) : currentNav === 'Projects' ? (
            <Projects />
          ) : (
            <>
              <div className="mb-8 flex justify-end items-center">
                <button
                  onClick={handleNewProject}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  + 
                </button>
                <button
                  onClick={() => setShowTypeManagerModal(true)}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors ml-4"
                >
                  {t('Editar Tipo de Proyecto')}
                </button>
                <button
                  onClick={() => setShowUserProfileModal(true)}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors ml-4"
                >
                  {t('Perfil de Usuario')}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <ApprovedProjectsChart data={[
                  { month: 'Enero', approvedProjects: 5 },
                  { month: 'Febrero', approvedProjects: 8 },
                  { month: 'Marzo', approvedProjects: 6 },
                  { month: 'Abril', approvedProjects: 10 },
                  { month: 'Mayo', approvedProjects: 7 },
                  { month: 'Junio', approvedProjects: 9 },
                ]} />
                <EconomicMovementChart data={[
                  { category: 'Ingresos', value: 40000 },
                  { category: 'Gastos', value: 15000 },
                  { category: 'Inversiones', value: 10000 },
                  { category: 'Otros', value: 5000 },
                ]} />
              </div>

              {projectData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectData.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onTogglePresentation={() => {}}
                      showAdminControls={true}
                      onEdit={() => handleEditProject(project.id)}
                      onDelete={() => handleDeleteProject(project.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No se encontraron proyectos que coincidan con la búsqueda</p>
                </div>
              )}
            </>
          )}

          {showTypeManagerModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={(e) => closeOnOverlayClick(e, () => setShowTypeManagerModal(false))}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full relative">
                <button
                  onClick={() => setShowTypeManagerModal(false)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  aria-label="Cerrar modal"
                >
                  &#x2715;
                </button>
                <ProjectTypeManager />
              </div>
            </div>
          )}

          {showProjectFormModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={(e) => closeOnOverlayClick(e, () => setShowProjectFormModal(false))}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full relative">
                <button
                  onClick={() => setShowProjectFormModal(false)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  aria-label="Cerrar modal"
                >
                  &#x2715;
                </button>
                <ProjectForm
                  projectId={currentProjectId}
                  onSave={handleSaveProject}
                  onCancel={() => setShowProjectFormModal(false)}
                />
              </div>
            </div>
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
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
