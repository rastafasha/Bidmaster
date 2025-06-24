import React, { useState } from 'react';
import { useProjectTypes } from '../../context/ProjectTypeContext';

const ProjectTypeManager = () => {
const { projectTypes, setProjectTypes, createProjectType, deleteProjectType, 
    getProjectTypesRequest, 
    getProjectTypesUserRequest,
    getProjectTypeRequest,
    updateProjectType } = useProjectTypes();
  // const [projectTypes, setProjectTypes] = useState([
  //   'Construcción',
  //   'Diseño Urbano',
  //   'Tecnología',
  //   'Infraestructura'
  // ]);
  const [newType, setNewType] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddType = async () => {
    const trimmed = newType.trim();
    if (trimmed && !projectTypes.some(pt => pt.name === trimmed)) {
      try {
        const created = await createProjectType({ name: trimmed });
        setProjectTypes([...projectTypes, created]);
        setNewType('');
      } catch (error) {
        console.error('Failed to create project type:', error);
      }
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditValue(projectTypes[index].name);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = () => {
    const trimmed = editValue.trim();
    if (trimmed && !projectTypes.some(pt => pt.name === trimmed)) {
      const updated = [...projectTypes];
      updated[editIndex] = { ...updated[editIndex], name: trimmed };
      try {
        updateProjectType(updated[editIndex]._id, { name: trimmed });
        setProjectTypes(updated);
        setEditIndex(null);
        setEditValue('');
        
      } catch (error) {
        console.error('Failed to update project type:', error);
        
      }
    }
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditValue('');
  };

  const handleDelete = async (index) => {
    const idToDelete = projectTypes[index]._id;
    try {
      await deleteProjectType(idToDelete);
      const updated = projectTypes.filter((_, i) => i !== index);
      setProjectTypes(updated);
      if (editIndex === index) {
        setEditIndex(null);
        setEditValue('');
      }
    } catch (error) {
      console.error('Failed to delete project type:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Gestor de Tipos de Proyecto</h2>
      
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Nuevo tipo de proyecto"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleAddType}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Agregar
        </button>
      </div>

      <ul>
      {projectTypes.map((type, index) => (
        <li key={index} className="flex items-center justify-between mb-2">
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={handleEditChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={handleEditSave}
                className="ml-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                onClick={handleEditCancel}
                className="ml-2 px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <span>{type.name}</span>
              <div>
                <button
                  onClick={() => handleEditClick(index)}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="ml-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </>
          )}
        </li>
      ))}
      </ul>
    </div>
  );
};

export default ProjectTypeManager;
