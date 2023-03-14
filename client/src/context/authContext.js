import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const signin = async (inputs) => {
    const res = await axios.post("/auth/signin", inputs);
    //   set current user
    setCurrentUser(res.data);
  };

  const signout = async () => {
    await axios.post("/auth/signout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
