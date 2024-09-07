
import { app } from './firebaseconfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export let errorComeLogin:any;
export let errorComeSignup:any;

export function signupWithEmailPassword(email: string, password: string) {

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user, 'user created successfully.');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            errorComeSignup = errorMessage
            console.error(errorMessage);
            // ..
        });
}


export function loginWithEmailPassword(email: string, password: string) {


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user, 'user')
            errorComeLogin = ''
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            errorComeLogin = errorMessage
            console.error(errorMessage);

        });
}