"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/lib/api";

interface User {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await authService.getCurrentUser();
            setUser(response.data);
        } catch (error) {
            localStorage.removeItem("auth_token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (token: string) => {
        localStorage.setItem("auth_token", token);
        await fetchUser();
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
