import React, { useState } from 'react';
import projects from '../mock/projects';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projectData, setProjectData] = useState(projects);

  const togglePresentation = (projectId) => {
    setProjectData(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? { ...project, hasPresentation: !project.hasPresentation }
          : project
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Proyectos para Pujas</h1>
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          + Nuevo Proyecto
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectData.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onTogglePresentation={togglePresentation}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;