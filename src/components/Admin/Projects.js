import React, { useState, useEffect } from 'react';
import ProjectCard from '../ProjectCard';
import ProjectForm from '../Project/ProjectForm';
import projects from '../../mock/projects';

const Projects = () => {
  const [projectData, setProjectData] = useState(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showProjectFormModal, setShowProjectFormModal] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);

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
    <div className="p-6  ">
      <div className="mb-8 flex justify-end items-center">
        <button
          onClick={handleNewProject}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          + Nuevo Proyecto
        </button>
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

      {showProjectFormModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto z-50 p-4 sm:p-6 min-h-screen"
          onClick={(e) => closeOnOverlayClick(e, () => setShowProjectFormModal(false))}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto max-h-screen">
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

export default Projects;
