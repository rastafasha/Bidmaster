import React, { useState, useEffect } from 'react';
import projects from '../../mock/projects';

const ProjectForm = ({ projectId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    urlPdf: null,
    type: 'Construcción',
    partners: [],
    deliveryDate: new Date().toISOString().split('T')[0],
    hasPresentation: false
  });

  const [allPartners] = useState(['Constructora ABC', 'Arquitectos XYZ', 'Tech Solutions', 'AgroInnov', 'Estudio DEF']);

  useEffect(() => {
    if (projectId) {
      const existingProject = projects.find(p => p.id === projectId);
      if (existingProject) {
        setFormData({
          ...existingProject,
          urlPdf: null,
          deliveryDate: existingProject.deliveryDate || new Date().toISOString().split('T')[0]
        });
      }
    }
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'urlPdf' && files.length > 0) {
      setFormData({
        ...formData,
        urlPdf: files[0]
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handlePartnerToggle = (partner) => {
    setFormData(prev => ({
      ...prev,
      partners: prev.partners.includes(partner)
        ? prev.partners.filter(p => p !== partner)
        : [...prev.partners, partner]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden   mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {projectId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL del Proyecto</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subir PDF</label>
              <input
                type="file"
                name="urlPdf"
                accept="application/pdf"
                onChange={handleChange}
                className="w-full"
              />
              {formData.urlPdf && (
                <p className="mt-2 text-sm text-gray-600">Archivo seleccionado: {formData.urlPdf.name}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Proyecto</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="Construcción">Construcción</option>
                <option value="Diseño Urbano">Diseño Urbano</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Infraestructura">Infraestructura</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Entrega</label>
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Asociados</label>
            <div className="space-y-2">
              {allPartners.map(partner => (
                <div key={partner} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`partner-${partner}`}
                    checked={formData.partners.includes(partner)}
                    onChange={() => handlePartnerToggle(partner)}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor={`partner-${partner}`} className="ml-3 text-sm text-gray-700">
                    {partner}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasPresentation"
              name="hasPresentation"
              checked={formData.hasPresentation}
              onChange={handleChange}
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <label htmlFor="hasPresentation" className="ml-3 text-sm text-gray-700">
              ¿Tiene presentación lista para enviar?
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {projectId ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
