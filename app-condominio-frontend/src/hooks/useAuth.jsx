import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/auth"; 

const useAuth = ()=> {
  const context = useContext(AuthContext);

  return context;

  } 
  
export default useAuth;