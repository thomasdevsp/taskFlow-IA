"use client"

import style from "./style.module.scss";

import { signIn } from "next-auth/react";

export default function LoginWithGoogle() {

  const handleLogin = () => {
    try {
      signIn(
        "google",
        { callbackUrl: "/" }
      );

    } catch (error) {
      console.log("Login error:", error);
    }

  }

  return (
    <div
      className={style.LoginWrapper}
    >
      <button
        className={style.LoginBtn}
        onClick={handleLogin}
      >
        Entrar com Google
      </button>
    </div>
  )
}
