
import { app } from './firebaseconfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);


export function signupWithEmailPassword(email: string, password: string) {

    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user, 'user created successfully.');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
            throw new Error(errorMessage);
            // ..
        });
}


export function loginWithEmailPassword(email: string, password: string) {

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user, 'user')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
            throw new Error(errorMessage)
        });
}