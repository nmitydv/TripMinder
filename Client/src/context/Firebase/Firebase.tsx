import { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
    GoogleAuthProvider,
    UserCredential,
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
// import { Navigate, useNavigate } from 'react-router-dom';
import { firebaseConfig } from '../../helpers/constants/idConstants';

type FirebaseContextType = {
    signupUserWithEmailPassword: (
        email: string,
        password: string
    ) => Promise<UserCredential>;
    signinWithGoogle: () => Promise<UserCredential>;
    signInUserWithEmailPassword: (
        email: string,
        password: string
    ) => Promise<UserCredential>;
    forgotPasswordByEmail: (email: string) => Promise<void>;
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const messaging = getMessaging(firebaseApp);

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => useContext(FirebaseContext);

export const getOrRegisterServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        return window.navigator.serviceWorker
            .getRegistration('/firebase-cloud-messaging-push-scope')
            .then((serviceWorker) => {
                if (serviceWorker) return serviceWorker;
                return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
                    scope: '/firebase-cloud-messaging-push-scope',
                });
            });
    }
    throw new Error('The browser doesn`t support service worker.');
};
export const getFirebaseMessaging = () => messaging;

export const getFirebaseToken = () =>
    getOrRegisterServiceWorker()
        .then((serviceWorkerRegistration) =>   getToken(messaging, { vapidKey: 'BBe5fxX8AURKPXp7SpeDLp_GGSMzG2ykA1XqemDgZlLoIPVS5eXPzeqRon48-0heSNKL-didnxTul4Oh3GEc5LM', serviceWorkerRegistration }));

export const FirebaseProvider = (props: React.PropsWithChildren<object>) => {
    // const navigate = useNavigate();
    const signupUserWithEmailPassword = (email: string, password: string) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    };

    const signInUserWithEmailPassword = (email: string, password: string) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    };

    const forgotPasswordByEmail = (email: string) => {
        return sendPasswordResetEmail(firebaseAuth, email);
    };

    const signinWithGoogle = () => {
        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({
            prompt: 'select_account',
        });
        return signInWithPopup(firebaseAuth, provider);
    };

    return (
        <FirebaseContext.Provider
            value={{
                signupUserWithEmailPassword,
                signinWithGoogle,
                signInUserWithEmailPassword,
                forgotPasswordByEmail,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};
