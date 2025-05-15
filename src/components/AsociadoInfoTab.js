import React from 'react';

const AsociadoInfoTab = ({ role, projects }) => {
  // Calculate total earnings and display project info
  const totalEarnings = projects.reduce((sum, project) => {
    const earnings = (project.price || 0) * ((project.profitPercentage || 0) / 100);
    return sum + earnings;
  }, 0);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Información Asociado</h3>
      <p className="mb-2"><strong>Rol:</strong> {role || 'N/A'}</p>
      <div>
        <h4 className="font-semibold mb-2">Proyectos</h4>
        {projects.length > 0 ? (
          <table className="w-full border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-1 text-left">Nombre</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Precio</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Porcentaje de Ganancia</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Ganancia</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => {
                const earnings = (project.price || 0) * ((project.profitPercentage || 0) / 100);
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-3 py-1">{project.name}</td>
                    <td className="border border-gray-300 px-3 py-1">${project.price?.toFixed(2) || '0.00'}</td>
                    <td className="border border-gray-300 px-3 py-1">{project.profitPercentage || 0}%</td>
                    <td className="border border-gray-300 px-3 py-1">${earnings.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td className="border border-gray-300 px-3 py-1" colSpan={3}>Total Ganado</td>
                <td className="border border-gray-300 px-3 py-1">${totalEarnings.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p>No hay proyectos asignados.</p>
        )}
      </div>
    </div>
  );
};

export default AsociadoInfoTab;
