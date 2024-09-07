"use client";

import { errorComeLogin, loginWithEmailPassword } from '../firebase/firebaseAuth';
import { useState } from "react";

type loginType = {
    setLoginOrSignup: (fn: string) => void;
};

export default function LogIn({ setLoginOrSignup }: loginType) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isShow, setIsShow] = useState(false);

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Reset error and success state before login attempt
        setIsShow(false);
        setError('');

        try {
            // Call login function and wait for the result
            await loginWithEmailPassword(email, password);

            // Check if errorComeLogin is set (assuming it is a variable that gets updated)
            const errorMessage = errorComeLogin; // Ensure errorComeLogin is correctly set after login

            if (errorMessage) {
                setError(errorMessage); // Set error state if there's an error
            } else {
                setError(''); // Clear error if login is successful
            }
        } catch (err) {
            // Handle any unexpected errors
            setError('An unexpected error occurred.');
        }

        setIsShow(true); // Show the message (either error or success)
    };

    return (
        <>
            <div className="flex h-screen bg-indigo-700">
                <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
                    <h1 className="text-center font-bold text-xl text-indigo-700 pb-3">Log in to your account</h1>
                    <form>
                        <div>
                            <label className="block mb-2 text-indigo-500" htmlFor="Email">Email</label>
                            <input
                                className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                                type="email"
                                name="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-indigo-500" htmlFor="password">Password</label>
                            <input
                                className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                className="w-full bg-indigo-700 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 mb-6 rounded"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <footer>
                        <button
                            className="text-indigo-700 hover:text-blue-700 text-sm float-right"
                            onClick={() => setLoginOrSignup('signup')}
                        >
                            Register
                        </button>
                    </footer>

                    {/* Display the message only if isShow is true */}
                    {isShow && (
                        <div className={`text-center py-3 ${error === '' ? 'text-red-700' : 'text-green-700'}`}>
                            {error === '' ? 'Invalid Credentials' : "Successfully logged in"}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
