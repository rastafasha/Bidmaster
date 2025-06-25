import React, { useEffect, useState } from 'react';
import { useUsers } from '../../context/UserContext';
import UserProfileForm from '../UserProfileForm';

const roles = ['admin', 'partner', 'viewer'];

const AdminUserList = () => {
  const { users, getUsers, updateUser } = useUsers();
  const [localUsers, setLocalUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showUserProfileModal, setShowUserProfileModal] = useState(false);

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

  const closeOnOverlayClick = (e, closeFunc) => {
    if (e.target === e.currentTarget) {
      closeFunc();
    }
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
              <td className="border border-gray-300 px-4 py-2" onClick={() => { setSelectedUser(user); setShowUserProfileModal(true);}}>{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
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
                      {console.log('AdminUserList: selectedUser:', selectedUser)}
                      <UserProfileForm
                        initialData={selectedUser || {}}
                        onSave={(data) => {
                          console.log('User profile saved:', data);
                          updateUser(data._id, data);
                          setShowUserProfileModal(false);
                        }}
                        onCancel={() => setShowUserProfileModal(false)}
                      />
                    </div>
                  </div>
                )}
    </div>
  );
};

export default AdminUserList;
