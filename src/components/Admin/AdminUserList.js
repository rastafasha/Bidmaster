import React, { useEffect, useState } from 'react';
import { useUsers } from '../../context/UserContext';

const roles = ['admin', 'partner', 'viewer'];

const AdminUserList = () => {
  const { users, getUsers, updateUser } = useUsers();
  const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleRoleChange = async (userId, newRole) => {
    await updateUser(userId, { role: newRole });
    setLocalUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Lista de Usuarios</h2>
      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Correo Electrónico</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Rol</th>
          </tr>
        </thead>
        <tbody>
          {localUsers.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
