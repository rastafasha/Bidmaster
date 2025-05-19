import { createContext, useState, useContext, useEffect,  } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context; // Ensure the context is returned
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const signup = async (user) => {
       try {
         const res = await registerRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
        };

    const signin = async (user) =>{
        try {
            const res = await loginRequest(user)  ;
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            // console.log(error);
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    const logout = () =>{
        try {
            Cookies.remove('token');
            setIsAuthenticated(false);
            setUser(null);
            const res = logoutRequest();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(errors.length > 0){
           const timer =  setTimeout(()=>{
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors])

    useEffect(()=>{
        async function checkLoging(){
            const cookies = Cookies.get();
            if(!cookies.token){
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
                try {
                    const res = await verifyTokenRequest(cookies.token);
                    if(!res.data) {
                        setIsAuthenticated(false);
                        setLoading(false);
                        return;
                    }
                    setIsAuthenticated(true)
                    setUser(res.data)
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    setIsAuthenticated(false)
                    setUser(null)
                    setLoading(false);
                }
            
        }
        checkLoging();
    },[])

    
    return (
        <AuthContext.Provider value={{ 
            signup, 
            user, 
            isAuthenticated, 
            errors, 
            signin,
            loading,
            logout,
             }}>
            {children}
        </AuthContext.Provider>
    );
};