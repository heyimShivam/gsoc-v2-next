"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { toast } from "sonner";

export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    description: string;
    githubUsername: string;
    quote: string;
    bookmarkedOrganizationIds: string[];

    _links?: {
        self?: {
            href: string;
        };
        bookmarks?: {
            href: string;
        };
        logout?: {
            href: string;
        };
    };
};

export type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<
    AuthContextType | undefined
>(undefined);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    /*
     * Get currently authenticated user
     * from the backend session.
     */
    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    // Not logged in
                    setUser(null);
                    return;
                }

                const result: User =
                    await response.json();

                setUser(result);
            } catch (error) {
                console.error(
                    "Failed to load current user:",
                    error
                );

                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadCurrentUser();
    }, []);

    /*
     * Logout
     */
    const logout = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Logout failed: ${response.status} `);
            }

            setUser(null);

            toast.success("Logged out successfully!", {
                description: "See you again soon.",
            });

        } catch (error) {
            console.error("Logout error:", error);

            toast.error("Logout failed!", {
                description: "Something went wrong. Please try again.",
            });
        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}