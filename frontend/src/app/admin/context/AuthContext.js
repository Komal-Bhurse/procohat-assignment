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
      const authToken = localStorage.getItem("adminAuthToken");
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
      const isLoginPage = pathname === "/admin";
      const isProtectedRoute = pathname?.startsWith("/admin/") && pathname !== "/admin";

      if (isAuthenticated && isLoginPage) {
        // If logged in and on login page, redirect to dashboard
        router.push("/admin/dashboard");
      } else if (!isAuthenticated && isProtectedRoute) {
        // If not logged in and trying to access protected route, redirect to login
        router.push("/admin");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const login = (token) => {
    localStorage.setItem("adminAuthToken", token);
    setIsAuthenticated(true);
    router.push("/admin/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("adminAuthToken");
    setIsAuthenticated(false);
    router.push("/admin");
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

