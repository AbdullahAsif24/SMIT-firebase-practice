'use client'
import { useAuthContext } from "@/context/auth.context";
import { SignOutFunc, auth } from "@/firebase/firebaseAuth";
import './home.css'
import { useState, useEffect } from "react";
import { fetchTodos, saveTodo } from "@/firebase/firestore";

export default function LoggedIn() {
    const [todo, setTodo] = useState('');

    const authContext = useAuthContext();

    if (!authContext) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    const { user, crrTodo, setCrrTodo } = authContext as NonNullable<typeof authContext>;

    function extractNameFromEmail(email: string | null | undefined): string | undefined {
        const namePart = email?.split("@")[0];
        const formattedName = namePart
            ?.replace(/[\._]/g, " ")
            ?.split(" ")
            ?.map((word:any) => word.charAt(0).toUpperCase() + word.slice(1))
            ?.join(" ");
        return formattedName;
    }
    
    let name = extractNameFromEmail(user?.email);

    useEffect(() => {
        fetchTodos(setCrrTodo);
    }, [setCrrTodo]);

    return (
        <>
            <div id="formDiv">
                <h1>ToDo List for {name}</h1>
                <form id="addTodoForm" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        name="entry"
                        id="todoText"
                        placeholder="Add your new ToDo..."
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    <button
                        name="submit"
                        id="todoAdd"
                        onClick={() => saveTodo(todo)}
                    >
                        +
                    </button>
                </form>
                <ul id="todoUl">
                    {Array.isArray(crrTodo) && crrTodo.length > 0 ? (
                        crrTodo.map((todo: any, index: number) => (
                            <li key={index}>{todo.todo}</li>
                        ))
                    ) : (
                        <li>No todos available</li>
                    )}
                </ul>
                <div className="mt-4 flex justify-center items-center">
                    <button
                        className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-900 font-bold hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none-sm float-right"
                        onClick={() => SignOutFunc(auth)}
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </>
    );
}
