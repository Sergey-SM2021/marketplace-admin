import { Button, Field, Modal } from "ui"

import { FC, memo } from "react"

interface IAuthModal {
  onLogin?: () => void
  onRegister?: () => void
  mode: Boolean
}

export const AuthModal: FC<IAuthModal> = memo(
  ({ onLogin, onRegister, mode }) => {
    return (
      <Modal title={mode ? "Зарегистрироваться" : "Войти"}>
        <div className="grid gap-8">
          <Field placeholder="username" />
          <Field placeholder="password" />
          <Button isDangerous onClick={onRegister} className="justify-self-end">
            Зарегистрироваться
          </Button>
          <Button onClick={onLogin} className="justify-self-end">
            Войти
          </Button>
        </div>
      </Modal>
    )
  }
)
