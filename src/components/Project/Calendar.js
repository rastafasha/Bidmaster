import React from 'react';
import projects from '../../mock/projects';
import users from '../../mock/users';

const Calendar = ({ currentUserId }) => {
  // Find current user from mock users
  const currentUser = users.find(user => user.id === currentUserId);

  if (!currentUser) {
    return <div>No user found</div>;
  }

  // Filter projects based on user role
  let filteredProjects = [];

  if (currentUser.role === 'admin') {
    filteredProjects = projects;
  } else if (currentUser.role === 'partner') {
    filteredProjects = projects.filter(project =>
      project.partners.includes(currentUser.partnerCompany)
    );
  } else {
    return <div>Access denied: Unknown role</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Calendario de Proyectos</h2>
      {filteredProjects.length === 0 ? (
        <p>No hay proyectos disponibles para mostrar.</p>
      ) : (
        <ul className="space-y-3">
          {filteredProjects.map(project => (
            <li key={project.id} className="border rounded p-3 shadow-sm">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p>Fecha de entrega: {new Date(project.deliveryDate).toLocaleDateString()}</p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Ver detalles
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Calendar;
