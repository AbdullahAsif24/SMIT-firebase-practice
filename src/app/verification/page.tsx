'use client'
import { EmailVerificationFunc, SignOutFunc, auth } from "@/firebase/firebaseAuth"
import { useState } from "react"

export default function VerifiedPage() {
    const [err, setErr] = useState('Verification Email sent')

    const handleSendVerification = async () => {
        try {
            await EmailVerificationFunc()
            setErr('Verification email sent successfully')
        } catch (error: any) {
            // Extract error code from FirebaseError: auth/too-many-requests
            const errorCode = error.message || 'unknown-error'; 
            
            // Split and format the error message after 'auth/'
            const formattedError = errorCode
            ?.split('/')[1]  // Split by '/' and get the part after 'auth/'
            ?.replace(/[\(\)\-]/g, " ")  // Replace parentheses and hyphens with spaces
            ?.split(" ")  // Split by space
            ?.filter(Boolean)  // Remove empty strings from array
            ?.map((word:any) => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize each word
            ?.join(" ");  // Join the words back together

            setErr(formattedError || 'An error occurred');
        }
    }

    return (
        <>
            <div className="h-screen bg-indigo-700 flex items-center justify-center flex-row gap-2">
                <h1>{err}</h1>
                <button className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-900 font-bold hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none-sm float-right"
                    onClick={handleSendVerification}
                >Send verification email</button>
                <button className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-900 font-bold hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none-sm float-right"
                    onClick={() => { SignOutFunc(auth) }}
                >Sign out</button>
            </div>
        </>
    )
}
