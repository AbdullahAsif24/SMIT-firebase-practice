"use client";

import LoggedIn from "@/components/loggedinUser";
import LogIn from "@/components/login";
import SignUp from "@/components/signup";
import { useState } from "react";


export default function Home() {
  const [loginOrSignup, setLoginOrSignup] = useState('signup')
  const [userName, setUserName] = useState('');

  if (loginOrSignup === 'signup') {
    return <SignUp setLoginOrSignup={setLoginOrSignup} />
  } else if (loginOrSignup === 'login') {
    return <LogIn setLoginOrSignup={setLoginOrSignup} setUserName={setUserName} />
  } else if (loginOrSignup === 'loggedin') {
    return <LoggedIn userName={userName} setLoginOrSignup={setLoginOrSignup} />
  }

  return (
    <>
      <h1>Home page</h1>
    </>
  );
}