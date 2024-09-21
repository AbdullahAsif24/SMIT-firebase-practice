import {
    addDoc,
    collection,
    doc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { auth } from "./firebaseAuth";
import { app } from "./firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";


const db = getFirestore(app);

type UserType = {
    email: string;
    rollNum: string;
    studentName: string;
    uid: string;
};

export async function saveUser(user: UserType) {
    //   let docRef = doc(db, "collectionName", "docID");
    //   await setDoc(docRef, user);

    //   let collectionRef = collection(db, "collectionName");
    //   await addDoc(collectionRef, user);

    try {
        let docRef = doc(db, "users", user.uid);
        await setDoc(docRef, user);
    } catch (e) {
        console.log(e);
    }
}


export async function saveTodo(todo: string) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            let uid = user.uid; // Now we have the uid after authentication
            let newTodo = { todo, uid };

            try {
                let collectionRef = collection(db, "todos");
                await addDoc(collectionRef, newTodo);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("User is not authenticated");
        }
    });
}

export async function fetchTodos(setCrrTodo: (todos: any[]) => void) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            let currentUserUID = user.uid; // uid is now available after authentication
            let collectionRef = collection(db, "todos");

            // Query the todos collection with the condition
            let q = query(collectionRef, where("uid", "==", currentUserUID));
            let allTodosSnapshot = await getDocs(q);

            // Collect the todos into an array
            let todosArray: any[] = [];
            allTodosSnapshot.forEach((todo) => {
                let todoData = todo.data();
                todoData.id = todo.id; // Include the id for reference
                todosArray.push(todoData); // Add todoData to the array
            });

            // Update the state with the todos array
            setCrrTodo(todosArray);
        } else {
            console.log("User is not authenticated");
        }
    });
}
