"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = () => {
      const authToken = localStorage.getItem("userAuth");
      if (authToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Handle route protection
    if (!isLoading) {
      const isLoginPage = pathname === "/user";
      const isProtectedRoute = pathname?.startsWith("/user/") && pathname !== "/user";

      if (isAuthenticated && isLoginPage) {
        // If logged in and on login page, redirect to dashboard
        router.push("/user/dashboard");
      } else if (!isAuthenticated && isProtectedRoute) {
        // If not logged in and trying to access protected route, redirect to login
        router.push("/user");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const login = (token) => {
    localStorage.setItem("userAuth", token);
    setIsAuthenticated(true);
    router.push("/user/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("userAuth");
    setIsAuthenticated(false);
    router.push("/user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

