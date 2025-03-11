"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Type basé sur ton entity User
export type UserRole = "intern" | "company";

export interface IUser {
    id: number;
    email: string;
    role: UserRole;

    // Infos intern (nullable)
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    status?: "unapplied" | "applied" | "found_a_job";

    // Infos company (nullable)
    companyName?: string;
    industryType?: string;
    website?: string;

    // Champs communs
    phone?: string;
    image?: string; // Stocke en URL ou Base64 côté frontend, pas Buffer
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

// Hook personnalisé pour faciliter l'utilisation
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};

// Props Provider
interface UserProviderProps {
    children: ReactNode;
}

// Composant Provider avec fetch périodique
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    // Mise à jour partielle du user
    const updateUser = (updatedFields: Partial<IUser>) => {
        setUser((prevUser) => (prevUser ? { ...prevUser, ...updatedFields } : prevUser));
    };

    // Fonction pour récupérer les infos utilisateur
    const fetchUser = async () => {
        try {
            const response = await fetch("http://localhost:3000/auth/me", {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) throw new Error("Non authentifié");
            const userData: IUser = await response.json();
            setUser(userData);
        } catch (err) {
            console.log("🔴 Erreur lors du fetch des données utilisateur :", err);
            setUser(null);
        }
    };

    // Fetch au chargement initial + Fetch périodique toutes les 2 secondes
    useEffect(() => {
        fetchUser(); // Premier fetch au chargement

        const interval = setInterval(() => {
            fetchUser();
        }, 2000); // 🔄 Fetch toutes les 2 secondes

        return () => clearInterval(interval); // Nettoyage du setInterval
    }, []);

    return <UserContext.Provider value={{ user, setUser, updateUser }}>{children}</UserContext.Provider>;
};
