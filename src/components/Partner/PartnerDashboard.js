import React from 'react';
import ProjectCard from '../ProjectCard';
import projects from '../../mock/projects';
import users from '../../mock/users';

const PartnerDashboard = ({ partnerId, onLogout }) => {
  const partner = users.find(u => u.id === partnerId && u.role === 'partner');
  
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proyectos de {partner.partnerCompany}</h1>
          <p className="text-gray-600">Bienvenido, {partner.name}</p>
        </div>
        <button 
          onClick={onLogout}
          className="text-gray-500 hover:text-gray-700"
        >
          Cerrar sesión
        </button>
      </div>
      
      {partnerProjects.length > 0 ? (
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
      )}
    </div>
  );
};

export default PartnerDashboard;

// DONE