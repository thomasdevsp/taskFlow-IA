import LoginWithGoogle from "./components/loginWithGoogle";
import style from "./style.module.scss";

export default function Login() {

  return (
    <div
      className={style.LoginContainer}
    >
      <h1
        className={style.H1}
      >
        My Hub App
      </h1>
      <div
        className={style.Divider}
      />

      <LoginWithGoogle />

    </div>
  )
}
