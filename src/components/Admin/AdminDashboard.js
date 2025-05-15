import React, { useState, useEffect } from 'react';
import ProjectCard from '../ProjectCard';
import ProjectForm from '../Project/ProjectForm';
import projects from '../../mock/projects';
import ProjectTypeManager from './ProjectTypeManager';

const AdminDashboard = ({ onLogout }) => {
  const [view, setView] = useState('list');
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [projectData, setProjectData] = useState(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showTypeManagerModal, setShowTypeManagerModal] = useState(false);
  const [showProjectFormModal, setShowProjectFormModal] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleNewProject}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            + Nuevo Proyecto
          </button>
          <button
            onClick={() => setShowTypeManagerModal(true)}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Editar Tipo de Proyecto
          </button>
          <button 
            onClick={onLogout}
            className="text-gray-500 hover:text-gray-700"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {showTypeManagerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
    </div>
  );
};

export default AdminDashboard;
