import { useContext, createContext, type PropsWithChildren } from 'react';
import {setStorageItemAsync, useStorageState} from './useStorageState';
import {router} from "expo-router";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { criarConta, login } from '@/services/auth';
import { signOut } from 'firebase/auth';
import firebase from 'firebase/app'
import * as SQLite from 'expo-sqlite';
import { dropTable, createTables } from '@/services/database';




const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
const auth = getAuth();


const AuthContext = createContext<{
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    signUp: (email: string, password: string) => void;
    firebaseApp?: FirebaseApp | null;
    session?: string | null;
    isLoading: boolean;
    changeTheme: (theme: string) => void;
    theme?: string | null;
    isLoadingTheme: boolean;
}>({
    signIn: (email: string, password: string) => null,
    signOut: () => null,
    signUp: (email: string, password: string) => null,
    firebaseApp: firebaseApp,
    session: null,
    isLoading: false,
    changeTheme: async (theme: string) => null,
    theme: null,
    isLoadingTheme: false,
    // @ts-ignore
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[isLoadingTheme, theme], setTheme] = useStorageState('theme');

    return (
        <AuthContext.Provider
            value={{
                signIn: async (email:string, password: string) => {
                    await login(email,password, setSession);
                       
                },
                signOut: async () => {
                    signOut(auth).then(() => {})
                    setSession(null);
                    
                    await createTables();
                    return router.replace("/login");
                   
                },
                signUp: async (email: string, password: string) => {
                    // Perform sign-in logic here
                    let l = await criarConta(email,password);
                    console.log(l);
                    
                    // @ts-ignore
                    return router.replace("(tabs)");
                },
                changeTheme: async (theme: string) => {
                    await setStorageItemAsync('theme', theme);
                },
                
                session,
                isLoading,
                theme,
                isLoadingTheme,
            }}>
            {children}
        </AuthContext.Provider>
    );
}