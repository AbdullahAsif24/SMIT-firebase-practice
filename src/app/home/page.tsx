'use client'
import { useAuthContext } from "@/context/auth.context";
import { SignOutFunc, auth } from "@/firebase/firebaseAuth";


export default function LoggedIn() {
    const {user} = useAuthContext()

    function extractNameFromEmail(email: string): string {
        // Get the part before the "@" symbol
        const namePart = email?.split("@")[0];
      
        // Replace dots and underscores with spaces
        const formattedName = namePart
          ?.replace(/[\._]/g, " ") // Replace dots and underscores with spaces
          ?.split(" ")             // Split by space
          ?.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          ?.join(" ");             // Join back into a string
      
        return formattedName;
      }

    let name = extractNameFromEmail(user?.email)

    return (
        <>
            <div className="h-screen bg-indigo-700 flex items-center justify-center flex-col gap-2">
                <h1 className="font-bold text-2xl">Hello {name}</h1>
                <div className="flex">
                    <button className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-900 font-bold hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none-sm float-right"
                        onClick={() => {SignOutFunc(auth)}}
                    >Sign out</button>
                </div>
            </div>
        </>
    )
}
