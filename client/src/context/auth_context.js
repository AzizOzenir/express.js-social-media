"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const router = useRouter();
  const pathname = usePathname();


  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    if (!authToken ) {
      if (!pathname.includes("signup")) {
        router.push("/login");
      }
    } else {
      if (pathname.includes("login") || pathname.includes("signup")) {
        router.push("/line");
      } else {
        router.push(pathname);
      }
    }
  }, [authToken, router]);

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
