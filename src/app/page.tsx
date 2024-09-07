"use client";

import LogIn from "@/components/login";
import SignUp from "@/components/signup";
import { useState } from "react";


export default function Home() {
  const [loginOrSignup, setLoginOrSignup] = useState('signup')

  return (
    <>
      {
        loginOrSignup ==='signup'? (
          <SignUp setLoginOrSignup={setLoginOrSignup}  />
        ) : (
          <LogIn setLoginOrSignup={setLoginOrSignup} />
        )
      }
      
    </>
  );
}