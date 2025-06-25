import { createContext, useContext, useState } from "react";
import {
    getUsersRequest,
    getUserRequest,
updateUserRequest,
deleteUserRequest
} from '../api/users'
const UserContext = createContext();

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context; // Ensure the context is returned
};

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);

    const getUsers = async () =>{
       try {
        const res = await getUsersRequest();
        setUsers(res.data)
        console.log(res);
       } catch (error) {
            console.log(error);
       }
       
    }
    

    const deleteUser = async(id)=>{
      try {
        const res =  await deleteUserRequest(id);
        console.log(res);
        if(res.status === 204) setUsers(users.filter(user => user._id !== id))

      } catch (error) {
        console.log(error);
      }
    }

    const getUser = async(id)=>{
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (id, user) =>{
        try {
            const res = await updateUserRequest(id, user);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserContext.Provider value={{
            users,
            getUsers,
            deleteUser,
            getUser,
            updateUser
            
            
        }}>
            {children}
        </UserContext.Provider>
    )
}