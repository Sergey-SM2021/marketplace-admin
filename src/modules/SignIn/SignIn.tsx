import { Button, Field, Modal } from "ui"

import { NavLink, useNavigate } from "react-router-dom"
import { makeAuth } from "modules/IsAuth/store"

interface ISignIn {}

export const SignIn = () => {
  const nav = useNavigate()

  const handlerClick = () => {
    makeAuth()
  }
  return (
    <Modal title="Войти">
      <div className="grid gap-8">
        <Field placeholder="username" />
        <Field placeholder="password" />
        <NavLink to="/signup" className="justify-self-end">
          <Button isDangerous>Зарегистрироваться</Button>
        </NavLink>
        <Button onClick={handlerClick} className="justify-self-end">
          Войти
        </Button>
      </div>
    </Modal>
  )
}
