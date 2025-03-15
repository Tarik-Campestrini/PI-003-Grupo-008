import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    if (userToken && usersStorage) {
      const tokenData = JSON.parse(userToken);
      const users = JSON.parse(usersStorage);

      const hasUser = users.find((user) => user.email === tokenData.email);
      
      if (hasUser) {
        setUser({ email: hasUser.email });
      }
    }
  }, []);

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db")) || [];

    const hasUser = usersStorage.find((user) => user.email === email);

    if (hasUser) {
      if (hasUser.password === password) {
        const token = Math.random().toString(36).substr(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email });
        return null; // Login bem-sucedido
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signout = () => {
    localStorage.removeItem("user_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};



// Criamos um hook personalizado para acessar o contexto facilmente
export const useAuth = () => {
  return useContext(AuthContext);
};