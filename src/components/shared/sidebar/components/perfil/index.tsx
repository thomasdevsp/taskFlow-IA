import { auth } from "@/app/api/auth/auth"
import Image from "next/image"
import SignOut from "../signOut"
import style from "./style.module.scss"

export default async function Perfil() {
  const session = await auth()

  return (
    <div className={style.Perfil}>
      <Image
        src={session?.user.image ?? ''}
        alt=""
        width={30}
        height={30}
      />

      <div className={style.PerfilInfos}>

        <span>
          {session?.user.name}
        </span>

        <p>
          {session?.user.email}
        </p>

      </div>

      <SignOut />
    </div>
  )
}
