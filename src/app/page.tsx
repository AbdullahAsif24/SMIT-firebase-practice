"use client";

import { useAuthContext } from "@/context/auth.context";


export default function Home() {
  const {user} = useAuthContext()

  return (
    <>
      <h1>Hello, {user?.email} </h1>
    </>
  );
}