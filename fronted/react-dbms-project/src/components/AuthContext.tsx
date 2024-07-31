import { createContext, ReactNode, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  loggin: () => void;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setLogin] = useState(false);
  const loggin = () => {
    console.log("in login");
    setLogin(true);
  };
  const logout = () => {
    console.log("in logout");
    setLogin(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, loggin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
