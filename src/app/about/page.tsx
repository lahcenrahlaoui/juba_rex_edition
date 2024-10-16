"use client";

import { useContext } from "react";
import { JubarexContext, JubarexContextType } from "../context";

export default function About() {
  const {
    user,
    setUser,
    userProfile,
    setUserProfile,
    logout,
    refreshUserFromToken,
  } = useContext(JubarexContext) as JubarexContextType;

  return (
    <section className="relative">
      <h1>
        {user?.firstname} {user?.lastname}
      </h1>
      <h2>Email : {user?.email} </h2>
      <h2>Is Admin ? : {user?.isAdmin ? "true" : "false"} </h2>
    </section>
  );
}
