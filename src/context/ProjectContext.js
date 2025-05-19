import { createContext, useContext, useState } from "react";
import {createProjectRequest, deleteProjectRequest, 
    getProjectsRequest, 
    getProjectsUserRequest,
    getProjectRequest,
    updateProjectRequest
} from '../api/projects';

const ProjectContext = createContext();

export const useProjects = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useTask must be used within an ProjectProvider');
    }
    return context; // Ensure the context is returned
};

export function ProjectProvider({ children }) {
    const [projects, setProjects] = useState([]);
    
    const getProjects = async () =>{
       try {
        const res = await getProjectsRequest();
        setProjects(res.data)
        console.log(res);
       } catch (error) {
            console.log(error);
       }
       
    }
    const getProjectsByUSer = async (id) =>{
       try {
        const res = await getProjectsUserRequest(id);
        console.log(res);
        setProjects(res.data)
       } catch (error) {
            if(error.status === 400){
                return error.message
            }
            console.log(error);
       }
       
    }

    const createProject = async (task) =>{
        const res = await createProjectRequest(task);
        console.log(res);
    }

    const deleteProject = async(id)=>{
      try {
        const res =  await deleteProjectRequest(id);
        console.log(res);
        if(res.status === 204) setProjects(tasks.filter(task => task._id !== id))

      } catch (error) {
        console.log(error);
      }
    }

    const getProject = async(id)=>{
        try {
            const res = await getProjectRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateProject = async (id, task) =>{
        try {
            const res = await updateProjectRequest(id, task);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProjectContext.Provider value={{
            projects,
            createProject,
            getProjects,
            getProjectsByUSer,
            deleteProject,
            getProject,
            updateProject
            
            
        }}>
            {children}
        </ProjectContext.Provider>
    )
}