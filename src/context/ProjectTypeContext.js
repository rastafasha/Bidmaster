import { createContext, useContext, useState } from "react";
import {createProjectTypeRequest, deleteProjectTypeRequest, 
    getProjectTypesRequest, 
    getProjectTypesUserRequest,
    getProjectTypeRequest,
    updateProjectTypeRequest
} from '../api/projectTypes';

const ProjectTypeContext = createContext();

export const useProjectTypes = () => {
    const context = useContext(ProjectTypeContext);
    if (!context) {
        throw new Error('useTask must be used within an ProjectTypeProvider');
    }
    return context; // Ensure the context is returned
};

export function ProjectTypeProvider({ children }) {
    const [projectTypes, setProjectTypes] = useState([]);
    
    const getProjectTypes = async () =>{
       try {
        const res = await getProjectTypesRequest();
        setProjectTypes(res.data)
        console.log(res);
       } catch (error) {
            console.log(error);
       }
       
    }
    const getProjectTypesByUSer = async (id) =>{
       try {
        const res = await getProjectTypesUserRequest(id);
        console.log(res);
        setProjectTypes(res.data)
       } catch (error) {
            if(error.status === 400){
                return error.message
            }
            console.log(error);
       }
       
    }

    const createProjectType = async (task) =>{
        const res = await createProjectTypeRequest(task);
        console.log(res);
    }

    const deleteProjectType = async(id)=>{
      try {
        const res =  await deleteProjectTypeRequest(id);
        console.log(res);
        if(res.status === 204) setProjectTypes(tasks.filter(task => task._id !== id))

      } catch (error) {
        console.log(error);
      }
    }

    const getProjectType = async(id)=>{
        try {
            const res = await getProjectTypeRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateProjectType = async (id, task) =>{
        try {
            const res = await updateProjectTypeRequest(id, task);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProjectContext.Provider value={{
            projectTypes,
            createProjectType,
            getProjectTypes,
            getProjectTypesByUSer,
            deleteProjectType,
            getProjectType,
            updateProjectType
            
            
        }}>
            {children}
        </ProjectContext.Provider>
    )
}