import { createContext, useContext, useState } from "react";
import {createTaskRequest, deleteTaskRequest, 
    getTasksRequest, 
    getTasksUserRequest,
    getTaskRequest,
    updateTaskRequest
} from '../api/tasks'
const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within an TaskProvider');
    }
    return context; // Ensure the context is returned
};

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    
    const getTasks = async () =>{
       try {
        const res = await getTasksRequest();
        setTasks(res.data)
        console.log(res);
       } catch (error) {
            console.log(error);
       }
       
    }
    const getTasksByUSer = async (id) =>{
       try {
        const res = await getTasksUserRequest(id);
        console.log(res);
        setTasks(res.data)
       } catch (error) {
            if(error.status === 400){
                return error.message
            }
            console.log(error);
       }
       
    }

    const createTask = async (task) =>{
        const res = await createTaskRequest(task);
        console.log(res);
    }

    const deleteTask = async(id)=>{
      try {
        const res =  await deleteTaskRequest(id);
        console.log(res);
        if(res.status === 204) setTasks(tasks.filter(task => task._id !== id))

      } catch (error) {
        console.log(error);
      }
    }

    const getTask = async(id)=>{
        try {
            const res = await getTaskRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async (id, task) =>{
        try {
            const res = await updateTaskRequest(id, task);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            getTasksByUSer,
            deleteTask,
            getTask,
            updateTask
            
            
        }}>
            {children}
        </TaskContext.Provider>
    )
}