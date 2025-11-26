"use client"

import { signOut } from "next-auth/react";
import { GoSignOut } from "react-icons/go";
import style from "./style.module.scss";

export default function SignOut() {
  return (
    <GoSignOut
      size={18}
      className={style.SignOutButton}
      onClick={() => signOut()}
    />
  )
}
