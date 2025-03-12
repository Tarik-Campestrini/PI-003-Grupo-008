import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email);
      if (hasUser) setUser(hasUser[0]);
    }

  }, []);

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("user_db"));

    const hasUser = usersStorage?.filter((user) => user.email === email);
    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substr(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      } else {
        return "E-mail ou senha incorretros"
      }
    } else {
      return "Usuário não cadastrado";
    }
  };
  return <AuthContext.Provider values={{ user, signed: !!user, signin }}>{ children }</AuthContext.Provider>
};