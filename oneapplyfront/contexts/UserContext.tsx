"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Type basé sur ton entity User
export type UserRole = "intern" | "company";

export interface IUser {
    id: number;
    email: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    status?: "unapplied" | "applied" | "found_a_job";
    companyName?: string;
    industryType?: string;
    website?: string;
    phone?: string;
    image?: string;
    address?: string;
    isVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// Type du contexte utilisateur
interface IUserContext {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    updateUser: (updatedFields: Partial<IUser>) => void;
}

// Création du contexte
const UserContext = createContext<IUserContext | undefined>(undefined);

// Hook personnalisé pour accéder au contexte
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};

// Composant Provider
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [pendingEmail, setPendingEmailState] = useState<string | null>(null);

    const updateUser = (updatedFields: Partial<IUser>) => {
        setUser((prevUser) => (prevUser ? { ...prevUser, ...updatedFields } : prevUser));
    };

    // ✅ Fonction pour récupérer l'utilisateur depuis l'API
    const fetchUser = async () => {
        try {
            const response = await fetch("http://localhost:3000/auth/me", {
                method: "GET",
                credentials: "include"
            });
            if (!response.ok) throw new Error("Non authentifié");

            const userData: IUser = await response.json();
            setUser(userData);
            console.log("✅ Utilisateur récupéré :", userData);
        } catch (err) {
            setUser(null);
            console.warn("⚠️ Utilisateur non authentifié.");
        }
    };

    useEffect(() => {
        // 🔥 Stocke l'état d'authentification
        if (user) {
            console.log("✅ Utilisateur connecté :", user);
            localStorage.setItem("isAuthenticated", "true");
        } else {
            console.log("⚠️ Aucun utilisateur connecté.");
            localStorage.removeItem("isAuthenticated");
        }
    }, [user]);

    useEffect(() => {
        // 🔥 Vérifie l'email en attente de vérification
        const storedEmail = localStorage.getItem("pendingEmail");
        if (storedEmail) {
            setPendingEmailState(storedEmail);
        }

        // 🔥 Récupère l'utilisateur au démarrage
        fetchUser();

        // 🔄 Met à jour l'utilisateur toutes les 2 secondes
        const interval = setInterval(fetchUser, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
