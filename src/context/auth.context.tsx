"use client";

import { app } from "@/firebase/firebaseconfig"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


type UserType = {
    email: string | null,
    uid: string
}

type AuthContextProviderType = {
    children: ReactNode
}

type AuthContextType = {
    user: UserType | null
    setCrrTodo: (todo: any) => void
    crrTodo: any
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: AuthContextProviderType) {
    const [user, setUser] = useState<UserType | null>(null);
    const [crrTodo, setCrrTodo] = useState('')

    const route = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (loggedInUser) => {
            if (loggedInUser) {
                const { email, uid } = loggedInUser;
                setUser({ email, uid });
                if (loggedInUser.emailVerified) {
                    route.push("/home");
                }else{
                    route.push("/verification");
                }
            }
            else {
                console.log('inside onauthstatechange else statement');
                setUser(null);
                route.push("/signup");
            }
        });
    }, [])

    return (
        <AuthContext.Provider value={{ user, setCrrTodo, crrTodo }} >
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => useContext(AuthContext);